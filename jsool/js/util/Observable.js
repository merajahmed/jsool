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

jsool.namespace("js.util");

js.util.Observable = $extends(js.core.Object, {
	events: null,
	addEvent: function(){
		var args = arguments;
		if(!this.events)this.events = new js.util.HashMap();
		
		if(Array.isArray(args[0])){
			var ev = args[0];
			for(var i=0,h; h = ev[i++];){
				this.events.put(h, null);
			}
		}else if(args.length > 1){
			var that = this;
			Array.iterate(args,function(i,o){
				if(!that.events.containsKey(o)){
					that.events.put(o,null);
				}
			});
		}else if(args.length == 1 && !this.events.containsKey(args[0])){
			this.events.put(args[0], null);
		}
	},
	on: function(listener,fn,scope){
		if(!this.events)return;
		if(String.isString(listener)){
			var t = {};
			t[listener] = fn;
			t.scope = scope || this;
			listener = t;
		}
		
		var listeners;
		var scope;
		if(listener.scope)
			scope = listener.scope;
		else
			scope = this;
		for(var i in listener){
			if(this.events.containsKey(i)){
				listeners = this.events.get(i);
				if(!listeners){
					listeners = [];
					this.events.put(i,listeners);
				}
				listeners.push({
					scope:scope,
					func:listener[i]
				});
			}
		}
	},
	fireEvent: function(){
		var args = arguments;
		var type;
		if(typeof args[0] === "string"){
			type = args[0];
			args = Array.prototype.slice.apply(args,[1]);
		}else{
			type = args[0].type;
		}
		if(!this.events) return;
		
		var listeners = this.events.get(type);
		if(listeners != null){
			var listener;
			for(var i = 0; i < listeners.length;i++){
				listener = listeners[i];
				//Using timeout, so the handlers may be execute simultaneously
				window.setTimeout(function handler(){
					listener.func.apply(listener.scope, args);
				},0);
			}
		}
	},
	destroyListeners: function(){
		delete this.events;
	}
}, "js.util.Observable");