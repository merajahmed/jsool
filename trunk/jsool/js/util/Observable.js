js.util.Observable = $extends(js.core.Object, {
	events: null,
	addEvent: function(ev){
		if(!this.events)this.events = new js.util.HashMap();
		
		if(Array.isArray(ev)){
			var l = ev.length;
			for(var i = 0; i < l; i++){
				//this.events.put(ev[i], new js.util.ArrayList());
				this.addEvent(ev[i]);
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
					listeners = new js.util.ArrayList();
					this.events.put(i,listeners);
				}
				
				listeners.add({
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
			for(var i = 0; i < listeners.size(); i++){
				listener = listeners.get(i);
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