js.util.StringBuilder = $extends(js.core.Object, {
	cons: function(object){
		this.buffer = new Array();
		if(object)this.append(object);
	},
	_length: 0,
	buffer: null,
	append: function(object){
		var string = object.toString();
		this.buffer.push(string);
		this._length += string.length;

		return this;
	},
	clear: function(){
		this.buffer = [];
	},
	toString: function(){
		return this.buffer.join("");
	},
	deleteCharAt: function(pos){
		if(typeof pos != 'number')
			throw new js.core.Exception('Invalid argument type',this, arguments);
		
		if(pos > this._length || pos < 0)
			throw new js.core.Exception('Array out of bounds',this, arguments);
		
		var string = this.buffer.join("");
		this.clear();
		
		if(pos == 0){
			this.append(string.substring(1));
		}else if(pos == this._length){
			this.append(string.substring(0, this._length-1));
		}else{
			this.append(string.substring(0,pos));
			this.append(string.substring(pos+1));
		}
	},
	length: function(){
		return this._length;
	}
}, 'js.util.StringBuilder');