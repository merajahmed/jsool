Array.isArray = function(obj){
	return obj.constructor == Array;
};

Array.prototype.shuffle = function(){
	this.sort(function(a,b){
		return (Math.random() > 0.5 ? 1 : -1);
	});
};

Array.prototype.instanceOf = function(clazz){
	return clazz == Array;
};

if(!Array.prototype.forEach){
	Array.prototype.forEach = function(action){
		var length = this.length;
		
		for(var i = 0; i < length; i++){
			action(this[i]);
		}
	};
}

if(!Array.prototype.every){
	Array.prototype.every = function(action){
		var length = this.length;
		
		for(var i = 0; i < length; i++){
			if(!action(this[i])){
				return false;
			}
		}
		
		return true;
	};
}

if(!Array.prototype.filter){
	Array.prototype.filter = function(action){
		var length = this.length;
		var newArray = new Array();
		
		for(var i = 0; i < length; i++){
			if(action(this[i])){
				newArray.push(this[i]);
			}
		}
		
		return newArray;
	};
}

if(!Array.prototype.map){
	Array.prototype.map = function(action){
		var length = this.length;
		var newArray = new Array();
		
		for(var i = 0; i < length; i++){			
			newArray.push(action(this[i]));
		}
		
		return newArray;
	};
}

if (!Array.prototype.indexOf)
{
	Array.prototype.indexOf = function(elt /*, from*/)
	{
		var len = this.length >>> 0;
		var from = Number(arguments[1]) || 0;
		
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		
		if (from < 0) from += len;
		
		for (; from < len; from++)
		{
			if (from in this && this[from] === elt) return from;
		}
		return -1;
	};
}

Array.prototype.concat = function(){
	var result = [];
	var length = arguments.length;
	
	for(var a = 0; a < length; a ++){
		var arr = arguments[a];
		var len = arr.length;		
		for(var b = 0; b < len; b++){
			result.push(arr[b]);
		}
	}
};