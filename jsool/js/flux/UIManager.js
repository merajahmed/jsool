/*  JSOOL - JavaScript Object Oriented Library 
 *
 *  Copyright (c) 2009, Mikhail Domanoski.
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without modification,
 *  are permitted provided that the following conditions are met:
 *
 *      * Redistributions of source code must retain the above copyright notice,
 *        this list of conditions and the following disclaimer.
 *
 *      * Redistributions in binary form must reproduce the above copyright notice,
 *        this list of conditions and the following disclaimer in the documentation
 *        and/or other materials provided with the distribution.
 *
 *      * Neither the name of Mikhail Domanoski nor the names of its
 *        contributors may be used to endorse or promote products derived from this
 *        software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 *  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 *  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 *  ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 *  ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

jsool.namespace("js.flux");

js.flux.UIManager = (function(){
	var proxy, // The element that will be used do insert the element in the page
		context, //Graphical context where the elements will be rendered
		fluxWorker, //Pseudo thread that will update the UI
		laf, //The current Look and fell
	
		initialized = false, // flags if the UIManager is initialized
		idle = true, //flags if the fluxWorker is running
		locked = false,
		//about 20 fps
		updateInterval = 50, //The interval between screen updates
		emptyRuns = 0, // number of times that the worker runned without updating any component
		maxEmptyRuns = 5, // Max number of times that the worker may run without updating the UI.
	
		queueUpdate = false, //Flags if a component requested UI to update
	
		focused = null,	 // The current focused component
		currentOver = null,	 // The component wich tha mouse is over
		
		root = null,
		
		HOLD_MOUSE_MOVE = 3,
		
		mouseMoveHolded = 0;
	
	/**
	 * Initializes the UIManager
	 */
	function init(){
		proxy = new js.canvas.Canvas();
		context = proxy.getContext();
		proxy.setClass('flux-proxy');
		js.dom.Element.BODY.append(proxy);
		
		if(window.addEventListener){
			window.addEventListener('resize',resize,false);
		}else{
			window.attachEvent('onresize',resize);
		}
		
		root = new js.flux.RootContainer();
		
		resize();
		prepareListeners();		
		initialized = true;
		
		if(!locked)
			startWorker();
	}
	
	/**
	 * The default mouse listener function.
	 * It runs every time an event is fired by the window and sends the event to a component on the screen.
	 */
	var mouseListener = function(event){
		if(locked)return false;
		
		//ajust the position
		var pos,comp,ev,c;
			
		if((c = root.getComponentAt(event.x,event.y)) && c != root){
			
			//Deals with mousemove, mouseover and mouseout events
			if(event.type === "mousemove"){
				mouseMoveHolded--;
				
				if(mouseMoveHolded >= 0){
					return false;
				}
				
				mouseMoveHolded = HOLD_MOUSE_MOVE;
				
				if(currentOver != c){
					var ev = {
						type: "mouseout",
						source: c,
						timestamp: event.timestamp
					};
					if(currentOver){
						currentOver.fireEvent(ev,currentOver);
					}
					ev.type = "mouseover";
					c.fireEvent(ev,c);
				}
				currentOver = c;
			}else{
				//Deals with most events events
				ev = jsool.apply({},event);
				c.fireEvent(ev,c);
				
				//Deals with focus and lostfocus events
				if(c.canFocus && (event.type === "click" || event.type === "dblclick")){
					if(focused){
						ev.type = "lostfocus";
						focused.fireEvent(ev,c);
					}
					
					ev.type = "focus";
					focused = c;
					c.fireEvent(ev,c);
				}
			}
				
			queueUpdate = true;
			
			if(idle && !locked){
				startWorker();
			}
			return true;
		}
		
		if(currentOver){
			currentOver.fireEvent(jsool.apply({},{x:pos.x,y:pos.y,type:"mouseout"},event),currentOver);
			currentOver = null;
			return true;
		}
		return false;
	};
	
	/**
	 * Sets the listeners of the window
	 */
	function prepareListeners(){
		var EM = js.core.EventManager,
			p = proxy.dom;
		EM.on(p,'click',mouseListener);
		EM.on(p,'dblclick',mouseListener);	
		EM.on(p,'mouseup',mouseListener);
		EM.on(p,'mousedown',mouseListener);
		EM.on(p,'mousemove',mouseListener);
	}
	
	/**
	 * Resizes the proxy everytime that the window is resized.
	 */
	function resize(){
		proxy.set('width', window.innerWidth);
		proxy.set('height', window.innerHeight);
		
		root.height = window.innerHeight;
		root.width = window.innerWidth;
		root.x = 0;
		root.y = 0;
		
		queueUpdate=true;
		updateUI();
	}
	
	/**
	 * Starts the flux worker
	 */
	function startWorker(){
		if(idle){
			idle = false;
			fluxWorker = window.setInterval(requestUpdate, updateInterval);
		}
	}
	
	/**
	 * Stops the flux worker
	 */
	function stopWorker(){
		if(!idle){
			idle = true;
			window.clearInterval(fluxWorker);
		}
	}
	
	function requestUpdate(){
		if(locked)return;
		
		if(queueUpdate){
			emptyRuns = 0;
			queueUpdate = false;
			updateUI();
		}else{
			emptyRuns++;
			if(emptyRuns >= maxEmptyRuns){
				if(!idle){
					stopWorker();
				}
				emptyRuns = 0;
			}
		}
	}
	
	/**
	 * Updates all the visible components on the screen/proxy
	 */
	function updateUI(){
		try{
			root.updateUI(context);
		}catch(e){
			var b = {};
			throw new js.core.Exception("An error occurred while updating the UI",{type:"js.flux.UIManager",cls:{prototype:{updateUI:b}}},{callee:b},e);
		}
	}
	
	return{
		/**
		 * Adds a component to the UIManager
		 */
		add: function(component){
			if(!component.instanceOf(js.flux.Component))
				throw new js.core.Exception('Illegal argument: '+component);
			
			if(!initialized)
				init();
			
			root.add(component);
		},
		/**
		 * Request the UIManager to update the UI.
		 */
		update: function(){
			queueUpdate = true;
			if(idle && !locked){
				startWorker();
			}
		},
		start: startWorker,
		stop: stopWorker,
		getLookAndFeel: function(){
			return laf;
		},
		requestFocus: function(comp){
			if(comp.instanceOf(js.flux.Component)){
				focused = comp;
			}
		},
		getFocused: function(){
			return focused;
		},
		
		lock: function(){
			locked = true;
			stopWorker();
		},
		unlock: function(){
			locked = false;
			if(queueUpdate)
				startWorker();
		},
		laf: jsool.laf || js.flux.laf.Soft
	};
})();