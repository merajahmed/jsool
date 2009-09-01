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

js.flux.UIManager = (function(){
	var proxy; // The element that will be used do insert the element in the page
	var context; //Graphical context where the elements will be rendered
	var fluxWorker; //Pseudo thread that will update the UI
	
	var initialized = false;
	var idle = true;
	var updateInterval = 30;
	
	var queueUpdate = false; //Flags if a component requested UI to update
	var components = []; // Components added to the root
	
	var focused = null;
	
	var laf; // look and feel
	
	function init(){
		if(!laf)laf = js.flux.laf.Soft;
		
		proxy = new js.canvas.Canvas();
		context = proxy.getContext();
		proxy.setClass('flux-proxy');
		js.html.Element.BODY.append(proxy);
		
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
	
	var mouseListener = function(event){
		event = event || window.event;
		var pos;
		if(js.core.Browser.isIE){
			pos = {x:event.clientX+document.body.scrollLeft,
					y:event.clientY+document.body.scrollTop};
		}else{
			pos = {x:event.pageX,y:event.pageY};
		}
		
		for(var i=0,c;c=components[i++];){
			if(c.contains(pos.x,pos.y)){
				focused = c;
				c.fireEvent(jsool.apply({},{x:pos.x,y:pos.y},event));
				return false;
			}
		}
	};
	
	function prepareListeners(){
		var w=window,f;
		if(w.addEventListener){
			f = function(ev, handler){
				w.addEventListener(ev,handler,false);
			};
		}else{
			f = function(ev, handler){
				w.attachEvent('on'+ev,handler);
			};
		}
		
		f('click',mouseListener);
	}
	
	function resize(){
		proxy.setAttribute('width', window.innerWidth);
		proxy.setAttribute('height', window.innerHeight);
		updateUI();
	}
	
	function queueUpdateUI(){
		if(queueUpdate){
			updateUI();
			queueUpdate = false;
		}
	}
	
	function startWorker(){
		if(idle)
			fluxWorker = window.setInterval(queueUpdateUI, updateInterval);
	}
	
	function stopWorker(){
		if(!idle)
			window.clearInterval(fluxWorker);
	}
	
	function updateUI(){		
		if(components.length < 1)return;
		if(components.length > 1) components.sort(function(a,b){return a.z - b.z;});
		context.clear();
		try{
			for(var i = 0, c; c = components[i++];){
				if(c.isVisible())c.updateUI(context);
			}
		}catch(e){
			alert(e.toString());
		}
	}
	
	return{
		add: function(component){
			if(!component.instanceOf(js.flux.Component))
				throw new js.core.Exception('Illegal argument: '+component);
			components.push(component);
			if(!initialized)
				init();
		},
		update: function(){
			queueUpdate = true;
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