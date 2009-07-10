if(!js.core)
	js.core = {};
//EXCEPTION==========================================================
function Exception(msg, reason){
    if(msg == null)    	
        throw new Error("An Exception must have a message");
    this.message = msg;
    if(reason != null)
        this.cause = reason;
    return null;
}
Exception.prototype.cause = null;
Exception.prototype.message = "";
Exception.prototype.type = 'js.core.Exception';
Exception.prototype.prepareMessage = function(){
	var message;
	var root = this.cause.type;
	
	message = [root,": ", this.message].join("");
	
    return message;
};
Exception.prototype.toString = function(){
	var message;
	
	if(this.cause != null && this.cause.type == 'js.core.Exception'){
		message = [this.prepareMessage(),this.cause.toString()].join("\n");
	}else{
		message = this.prepareMessage();
	}
    return message;
};
js.core.Exception = Exception;
//OBSERVABLE=========================================================
js.core.Observable = js.Extends(Object, {
	events: null,
	addEvent: function(ev){
		if(!this.events)this.events = new js.util.HashMap();
		
		if(js.isArray(ev)){
			var l = ev.length;
			for(var i = 0; i < l; i++)
				this.events.put(ev.get(i), new Array());
		}else
			this.events.put(ev, new Array());
	},
	addListener: function(listener){
		var listeners;
		var scope;
		
		if(listener.scope)
			scope = listener.scope;
		else
			scope = this;
		
		for(var i in listener){
			if(this.events.containsKey(i)){
				listeners = this.events.get(i);
				listeners.add({
					scope:scope,
					func:listener[i]
				});
			}
		}
	},
	fireEvent: function(event){
		var type = event.type;
		if(!this.events)
			return;
		
		var listeners = this.events.get(type);
		if(listeners)
			listeners.forEach(function(listener){
				listener.func.apply(listener.scope, [event]);
			});
	},
	destroyListeners: function(){
		delete this.events;
	}
}, "js.core.Observable");
//GLOBAL EVENT LISTENER==============================================
js.core.GlobalEventListener = js.Extends(js.core.Observable, {
	constructor: function(){
		if(!js.UIManager){
			throw new Exception('The UIManager must be started before GlobalEventListener', this);
		}
		Object.apply(this, arguments);
	},
	keyListeners: null,
	mouseListeners: null,
	init: function(){
		var that = this;
		window.onkeydown = function(event){
			that.fireKeyEvent(event);
			return false;
		};
		window.onkeyup = function(event){
			that.fireKeyEvent(event);
			return false;
		};
		window.onkeypress = function(event){
			that.fireKeyEvent(event);
			return false;
		};
		window.onmousedown = function(event){
			that.fireMouseEvent(event);
			return false;
		};
		window.onmouseup = function(event){
			that.fireMouseEvent(event);
			return false;
		};
		window.onmousein = function(event){
			that.fireMouseEvent(event);
			return false;
		};
		window.onmouseout = function(event){
			that.fireMouseEvent(event);
			return false;
		};
		window.onclick = function(event){			
			that.fireMouseEvent(event);
			return false;
		};
		window.ondblclick = function(event){
			that.fireMouseEvent(event);
			return false;
		};
		this.addEvent(['keydown','keyup','keypress','mousedown','mouseup','mousein','mouseout','click','dblclick']);
	},
	fireMouseEvent: function(event){
		window.focus();
		var components = js.UIManager.components;
		var comp;
		var len = components.length;
		
		components.sort(function(c1, c2){
			return c2.z - c1.z;
		});
		
		for(var i = 0; i < len; i++){			
			if(components[i].contains(event.clientX, event.clientY)){
				comp = components[i];
				js.UIManager.setFocus(comp);
				comp.fireEvent(event);				
				return;
			}
		}
		this.fireEvent(event);
	},
	fireKeyEvent: function(event){
		if(js.UIManager.getFocused())
			js.UIManager.getFocused().fireEvent(event);
		this.fireEvent(event);
	}
}, 'js.core.GlobalEventListener');
//GLOBAL EVENT HANDLER===============================================
js.core.GlobalEventHandler = js.Extends(Object, {
	constructor: function(){
		Object.apply(this, arguments);
		this.scope = this;
	},
	scope: null,
	keypress: function(event){
		var modifier = 0;
		var key = event.keyCode;
		
		if(event.ctrlKey)
			modifier = 1;
		if(event.altKey)
			modifier = 2;
		if(event.shiftKey)
			modifier = 3;
		if(event.ctrlKey && event.altKey)
			modifier = 4;
		if(event.ctrlKey && event.shiftKey)
			modifier = 5;
		
		switch (key) {
		case KeyEvent.DOM_VK_F5:
			window.location.reload();
			break;
		}
	}
}, 'js.core.GlobalEventHandler');