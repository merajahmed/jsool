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
		updateInterval = 20, //The interval between screen updates
		emptyRuns = 0, // number of times that the worker runned without updating any component
		maxEmptyRuns = 30, // Max number of times that the worker may run without updating the UI.
	
		queueUpdate = false; //Flags if a component requested UI to update
		components = [], // Components added to the root
	
		focused = null;	 // The current focused component
	
	/**
	 * Initializes the UIManager
	 */
	function init(){
		if(!laf)laf = js.flux.laf.Soft;
		
		proxy = new js.canvas.Canvas();
		context = proxy.getContext();
		proxy.setClass('flux-proxy');
		js.dom.Element.BODY.append(proxy);
		
		if(window.addEventListener){
			window.addEventListener('resize',resize,false);
		}else{
			window.attachEvent('onresize',resize);
		}
		resize();
		prepareListeners();
		startWorker();
		initialized = true;
	}
	
	/**
	 * The default mouse listener function.
	 * It runs every time an event is fired by the window and sends the event to a component on the screen.
	 */
	var mouseListener = function(event){
		var pos;
		if(jsool.isIE){
			pos = {x:event.clientX+document.body.scrollLeft,
					y:event.clientY+document.body.scrollTop};
		}else{
			pos = {x:event.pageX,y:event.pageY};
		}
		var comp;
		for(var i=0,c;c=components[i++];){
			if(c.contains(pos.x,pos.y)){
				c = c.getComponentAt(pos.x,pos.y) || c;
				focused = c;
				c.fireEvent(jsool.apply({},{x:pos.x,y:pos.y},event),c);
				return false;
			}
		}
	};
	
	/**
	 * Sets the listeners of the window
	 */
	function prepareListeners(){
		var EM = js.core.EventManager;
		EM.on(window,'click',mouseListener);
		//EM.on(window,'dblclick',mouseListener);
		//EM.on(window,'mouseover',mouseListener);
		//EM.on(window,'mouseup',mouseListener);
		//EM.on(window,'mousedown',mouseListener);
		//EM.on(window,'mouseout',mouseListener);
		//EM.on(window,'mousemove',mouseListener);
	}
	
	/**
	 * Resizes the proxy everytime that the window is resized.
	 */
	function resize(){
		proxy.set('width', window.innerWidth);
		proxy.set('height', window.innerHeight);
		queueUpdate=true;
		updateUI();
	}
	
	/**
	 * Starts the flux worker
	 */
	function startWorker(){
		if(idle){
			idle = false;
			fluxWorker = window.setInterval(updateUI, updateInterval);
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
	
	/**
	 * Updates all the visible components on the screen/proxy
	 */
	function updateUI(){
		if(queueUpdate){
			emptyRuns = 0;
			queueUpdate = false;
			if(components.length < 1)return;
			if(components.length > 1) components.sort(function(a,b){return a.z - b.z;});
			context.clear();
			try{
				for(var i=0,comp; comp = components[i++];){
					if(comp.isVisible()){
						comp.updateUI(context);
					}
				}
			}catch(e){
				alert(e.toString());
			}
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
	
	return{
		/**
		 * Adds a component to the UIManager
		 */
		add: function(component){
			if(!component.instanceOf(js.flux.Component))
				throw new js.core.Exception('Illegal argument: '+component);
			components.push(component);
			component.setParent(this);
			if(!initialized)
				init();
		},
		/**
		 * Request the UIManager to update the UI.
		 */
		update: function(){
			queueUpdate = true;
			if(idle){
				startWorker();
			}
		},
		start: startWorker,
		stop: stopWorker,
		getLookAndFeel: function(){return laf;},
		requestFocus: function(comp){
			if(comp.instanceOf(js.flux.Component)){
				focused = comp;
			}
		},
		getFocused: function(){
			return focused;
		}
	};
})();