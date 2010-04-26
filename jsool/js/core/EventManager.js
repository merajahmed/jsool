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

jsool.namespace("js.core");

js.core.EventManager = (function create_event_manager(){
	var domEvents = [
	                 "focus","blur",
	                 "mouseover","mouseout","mouseup","mousedown","mousemove",	                 
	                 "click","dblclick",
	                 "keydown","keypress","keyup",
	                 "change","error","load",
	                 "contextmenu",
	                 "resize","reset",
	                 "scroll","select","submit"];
	
	var domEventsRe = new RegExp("("+domEvents.join("|")+")");
	
	var elsMap = {};
	
	// Adds an event listener to a DOM element
	function addListener(el, ev, fn, scope){
		if(!ev.match(domEventsRe))return false;
		
		var id = jsool.id(el),//The id of the element
			elEvs = elsMap[id] = elsMap[id] || {},//All the registered events of the element
			hs = elEvs[ev] = elEvs[ev] || [];//All handlers registered for the event
		
		scope = scope || el;
		
		var handler = function(event){
			event = event || window.event;
			fn.call(scope, event);
		};
		
		hs.push({
			EVENT: ev,
			FUNCTION: fn,
			HANDLER: handler,
			ELEMENT: el,
			SCOPE: scope
		});
		
		jsool.isIE ? el.attachEvent('on'+ev, handler) : el.addEventListener(ev, handler, false);
		
		return true;
	}
	
	// Do removes an event listener to a DOM element
	function doRemoveListener(el, ev, handler){
		jsool.isIE ? el.detachEvent('on'+ev, handler) : el.removeEventListener(ev, handler, false);
	}
	
	// Find and request a event listener to be removed from a DOM element
	function removeListener(el,ev, fn){
		var id = jsool.id(el),
			evs = elsMap[id][ev];
		
		//REMOVE SPECIFC HANDLER
		if(fn){
			for(var i=0,e;e=evs[i++];){
				if(e.FUNCTION == fn){
					doRemoveListener(el, ev, e.HANDLER);
					delete elsMap[id][ev][i];
				}
			}
		}else{
		//REMOVE ALL HANDLERS FOR THE EVENT
			for(var i=0,e;e=evs[i++];){
				doRemoveListener(el, ev, e.HANDLER);
			}
			delete elsMap[id][ev];
		}
	}
	
	//Removes all listeners from an element
	function detroyListeners(el){
		var id = jsool.id(el);
		var evs = elsMap[id];
		
		jsool.iterate(evs,function(at, vl){
			Array.iterate(vl, function(i, val){
				doRemoveListener(el, at, val.HANDLER);
				delete elsMap[id][at][i];
			});
			delete elsMap[id][at];
		});
	}
	
	//Show to world your skills
	return {
		on: addListener,
		addListener: addListener,
		un: removeListener,
		removeListener: removeListener,
		destroy: detroyListeners,
		detroyListeners: detroyListeners,
		isDomEvent: function(name){
			return name.match(domEventsRe) != null;
		}
	};
})();