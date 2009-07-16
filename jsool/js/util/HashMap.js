js.util.HashMap = Extends(js.util.Map,{
	constructor: function(){
		js.core.Object.apply(this, arguments);
		this.keys = new js.util.HashSet();
		this.map = {};
	},
	keys: null,
	values: null,
	map: null,
	_size: 0,
	put: function(key, value){
		var type = typeof key;
		
		var hash;
		
		if((type == 'object' && key.hashCode)){
			hash = key.hashCode();
		}else if(type == 'number' || type == 'string'){
			hash = key.toString();
		}else{
			throw new js.core.Exception("Invalid argument type: "+key.toString(), this, arguments);
		}
		
		if(this.keys.contains(key)){
			this.remove(key);
			this._size--;
		}
		
		this.keys.add(key);
		this._size++;
		
		this.map[hash] = value;
		
		return true;
	},
	containsKey: function(key){
		return this.keys.contains(key);
	},
	containsValue: function(value){
		for(var p in this.map){
			if(this.map[p] == value){
				return true;
			}
		}
		return false;
	},
	get: function(key){
		return this.map[this.mapCode(key)];		
	},
	size: function(){
		return this._size;	
	},
	remove: function(key){
		var el = this.get(key);
		if(el == null) return false;
		
		this.keys.remove(key);
		
		delete this.map[this.mapCode(key)];
		
		this._size--;
		
		return true;
	},
	mapCode: function(obj){
		if(typeof obj == 'object' && obj.hashCode)
			return obj.hashCode();
		else
			return obj.toString();
	},
	contains: function(object){
		return this.containsValue(object);
	},
	clear: function(){
		this.keys.clear();
		this._size = 0;
		this.map = {};
	}
},'js.util.HashMap');