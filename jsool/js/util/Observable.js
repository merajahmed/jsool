js.util.Observable = $extends(js.core.Object, {
	events: null,
	addEvent: function(ev){
		if(!this.events)this.events = new js.util.HashMap();
		
		if(Array.isArray(ev)){
			var l = ev.length;
			for(var i = 0; i < l; i++){
				this.events.put(ev[i], null);
			}
		}else if(!this.events.containsKey(ev)){
			this.events.put(ev, null);
		}
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
				if(listeners == null){
					listeners = new Array();
					this.events.put(i,listeners);
				}
				listeners.push({
					scope:scope,
					func:listener[i]
				});
			}
		}
	},
	fireEvent: function(event){
		var type = event.type;
		if(!this.events) return;
		
		var listeners = this.events.get(type);
		var listener;
		if(listeners){
			var len = listeners.length;
			for(var i = 0; i < len; i++){
				listener = listeners[i];
				//Using timeout, so the handlers may be execute simultaneously
				window.setTimeout(function(){
					listener.func.apply(listener.scope, [event]);
				},0);
			}
		}
	},
	destroyListeners: function(){
		delete this.events;
	}
}, "js.util.Observable");