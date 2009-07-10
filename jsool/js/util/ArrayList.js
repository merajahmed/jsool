js.util.ArrayList = Extends(js.util.List,{
	constructor: function(arg){
		js.core.Object.apply(this, arguments);
		
		this.data = new Array();
		
		if(arg != null){
			if(Array.isArray(arg)){
				this.addAll(arg);
			}else if(typeof arg == 'object' && arg.instanceOf(js.util.Collection)){
				this.addAll(arg);
			}
		}
	},
	data: null,
	_size: 0,
	indexOf: function(object){
		if(object == null){
			for(var i = 0; i < this._size; i++){
				if(this.data[i] == null){
					return i;
				}
			}
		}else if(typeof object == 'object'){
			for(var i = 0; i < this._size; i++){
				if(object.equals(this.data[i])){
					return i;
				}
			}
		}else{
			for(var i = 0; i < this._size; i++){
				if(object == this.data[i]){
					return i;
				}
			}
		}
		
		return -1;
	},
	lastIndexOf: function(object){
		if(object == null){
			for(var i = this._size - 1; i >= 0; i--){
				if(this.data[i] == null){
					return i;
				}
			}
		}else if(typeof object == 'object'){
			for(var i = this._size - 1; i >= 0; i--){
				if(object.equals(this.data[i])){
					return i;
				}
			}
		}else{
			for(var i = this._size - 1; i >= 0; i--){
				if(object == this.data[i]){
					return i;
				}
			}
		}
		
		return -1;
	},
	clone: function(){
		var clone = new ArrayList();
		clone.addAll(this.data);
		return clone;
	},
	toArray: function(){
		var arr = new Array();
		for(var i = 0; i < this._size; i++){
			arr.push(this.data[i]);
		}
		
		return arr;
	},
	get: function(index){
		if(index >= this._size){
			throw new js.core.Exception("Array Index Out Of Bounds", this, arguments);
		}
		
		return this.data[index];
	},
	add: function(object){
		this.data.push(object);
		this._size++;
	},
	remove: function(object){
		if(typeof item != 'number')
			index = this.indexOf(object);
		else
			index = object;
		
		if(index >= this.length || index < 0){
			throw new js.core.Exception("Array index out of bounds: "+index, this, arguments);
		}	
		delete this.data[index];	
		var length = this._size - 1;
		for(var i = index ; i < length; i++){		
			this.data[i] = this.data[i+1];
		}
		this._size--;
		if(this.pop) this.pop();
	},
	clear: function(){
		delete this.data;
		
		this.data = new Array();
		this._size = 0;
	},
	addAll: function(collection){
		if(Array.isArray(collection)){
			var length = collection.length;
			for(var i = 0; i < length; i++){
				this.data.push(collection[i]);
				this._size++;
			}
		}else if(typeof collection == 'object' && collection.instanceOf(js.util.Collection)){
			var iterator = collection.iterator();
			
			while(iterator.hasNext()){
				this.data.push(iterator.next());
				this._size++;
			}
		}
	},
	size: function(){
		return this._size;
	},
	iterator: function(){
		return new js.util.ArrayList.Iterator(this.data); 
	},
	contains: function(object){
		return this.indexOf(object) >= 0;
	}
},'js.util.ArrayList');

js.util.ArrayList.Iterator = Extends(js.core.Object,{
	constructor: function(list){
		js.core.Object.apply(this,arguments);
		this.size = list.length;
		this.list = list;
	},
	size: 0,
	index: 0,
	list: null,
	hasNext: function(){				
		return this.index < this.size;
	},
	next: function(){
		if(!this.hasNext())
			throw new js.core.Exception('Array Index Out Of Bounds: '+this.index, this, arguments);
		
		var val = this.list[this.index];
		this.index ++;
		return val;
	},
	nextIndex: function(){
		return this.index;
	}
},'js.util.ArrayList.Iterator');