js.util.Observable = Extends(js.core.Object, {
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
			this.events.put(ev, new js.util.ArrayList());
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
		var listener;
		if(listeners){
			for(var i = 0; i < listeners.size(); i++){
				listener = listeners.get(i);
				listener.func.apply(listener.scope, [event]);
			}
		}
	},
	destroyListeners: function(){
		delete this.events;
	}
}, "js.util.Observable");