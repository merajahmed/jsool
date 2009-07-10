js.util.HashMap = Extends(js.util.Collection,{
	constructor: function(){
		js.core.Object.apply(this, arguments);
		this.keys = new js.util.HashSet();
		this.values = new js.util.HashSet();
		this.map = {};
	},
	keys: null,
	values: null,
	map: null,
	_size: 0,
	put: function(key, value){
		var type = typeof key;
		
		if(type != 'number' && type != 'string'){
			if(type != 'object' && !key.hash){
				throw new Exception("Invalid key element: "+key.toString(), this, arguments);
			}
		}
		
		var hash = this.mapCode(key);
		
		if(this.keys.contains(key)){
			this.remove(key);
			this._size--;
		}
		
		this.keys.add(key);
		this.values.add(value);
		this._size++;
		
		this.map[hash] = value;
		
		return true;
	},
	containsKey: function(key){
		return this.keys.contains(key);
	},
	containsValue: function(value){
		return this.values.contains(value);
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
		this.values.remove(el);
		
		delete this.map[this.mapCode(key)];
		
		this._size--;
		
		return true;
	},
	mapCode: function(key){
		if(key.propertyIsEnumerable('hash'))
			return key.hash;
		else
			return key.toString();
	},
	contains: function(object){
		return this.containsValue(object);
	},
	toArray: function(){
		var out = new Array();
		
		for(var key in this.map){
			out.push({key:key,value:this.map[key]});
		}
		
		return out;
	}
},'js.util.HashMap');