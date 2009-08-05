js.util.ReferenceMap = $extends(js.util.Map,{
	cons: function(){
		this.keys = new js.util.LinkedList();
		this.values = new js.util.LinkedList();
	},
	values: null,
	keys: null,
	put: function(key, value){
		var index = this.keys.indexOf(key);
		
		if(index >= 0){
			this.values.add(value, index);
		}else{
			this.keys.add(key);
			this.values.add(key);
		}
	},
	containsKey: function(key){
		return this.keys.contains(key);
	},
	containsValue: function(value){
		return this.values.contains(value);
	},
	size: function(){return this.keys.size();},
	clear: function(){
		this.keys.clear();
		this.values.clear();
	},
	get: function(key){
		var index = this.keys.indexOf(key);
		
		if(index < 0){
			return null;
		}else{
			return this.values.get(index);
		}
	}
},'js.util.ReferenceMap');