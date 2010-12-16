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
//LAST NICE WORKING VERSION 110
jsool.namespace("js.util");

js.util.Observable = $extends(js.core.Object, {
	cons:function(){
		if(this.events && Array.isArray(this.events)){
			var evs = {};
			Array.iterate(this.events,function(i,el){
				evs[el]=[];
			});
			this.events=evs;
		}
	},
	events: null,
	addEvent: function(){
		var args = arguments;
		if(!this.events)this.events = {};
		
		if(Array.isArray(args[0])){
			var ev = args[0];
			for(var i=0,h; h = ev[i++];){
				this.events[h] = [];
			}
		}else if(args.length > 1){
			var that = this;
			Array.iterate(args,function(i,o){
				if(!(o in that.events)){
					that.events[o] = [];
				}
			});
		}else if(args.length == 1 && !this.events[args[0]]){
			this.events[args[0]] = [];
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
		var sc;
		if(listener.scope)
			sc = listener.scope;
		else
			sc = this;
		for(var i in listener){
			if(this.events[i]){
				listeners = this.events[i];
				if(!listeners){
					listeners = [];
					this.events[i] = listeners;
				}
				listeners.push({
					scope:sc,
					func:listener[i]
				});
			}
		}
	},
	fireEvent: function(){
		if(!this.events) return;
		var args = arguments,
			type,
			listeners,
			listener;
		if(typeof args[0] === "string"){
			type = args[0];
			args = Array.prototype.slice.apply(args,[1]);
		}else{
			type = args[0].type;
		}
		
		listeners = this.events[type];
		if(listeners != null){
			for(var i = 0; i < listeners.length;i++){
				listener = listeners[i];
				//Using timeout, so the handlers may be execute simultaneously
				window.setTimeout(function handler(){
					listener.func.apply(listener.scope, args);
				},0);
			}
		}
		// Fire "on class" listener
		type = "on" + type;
		if(typeof this[type] === "function"){
			this[type].apply(this, args);
		}
	},
	destroyListeners: function(){
		delete this.events;
	}
}, "js.util.Observable");