/**
 * Verify if an object is an Array
 * @param obj is any object to be checked
 * @return <code>true</code> if the object is an array;
 */
Array.isArray = function(obj){
	return obj.constructor == Array;
};

/**
 * Shuffles the current array
 * @return a shuffled version of the array
 */
Array.prototype.shuffle = function(){
	this.sort(function(a,b){
		return (Math.random() > 0.5 ? 1 : -1);
	});
};

/**
 * Checks is this instance if of the providen type
 * @param clazz if the type to be checked
 * @return <code>true</code> if the object if of the providen type
 */
Array.prototype.instanceOf = function(clazz){
	return clazz == Array;
};

/**
 * Runs a function for every item on the array
 */
if(!Array.prototype.forEach){
	Array.prototype.forEach = function(action){
		var length = this.length;
		for(var i = 0; i < length; i++){
			action(this[i]);
		}
	};
}

/**
 * Returns true if the provided function returns true for every item on the array
 */
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
/**
 * Returns an array only with the items that returns true for the provided function
 */
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

if (!Array.prototype.indexOf){
	Array.prototype.indexOf = function(elt /*, from*/){
		var len = this.length >>> 0;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) from += len;
		for (; from < len; from++){
			if (from in this && this[from] === elt) return from;
		}
		return -1;
	};
}

/**
 * 
 * @return
 */
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

Array.prototype.sum = function() {
	return (! this.length) ? 0 : this.slice(1).sum() +((typeof this[0] == 'number') ? this[0] : 0);
};

Array.prototype.remove = function(s){
	for (i=0; i < this.length; i++){
		if (s == this[i]) this.splice(i, 1);
	}
};
Array.prototype.accumulate = function(fn){
	if(typeof fn != 'function'){
		throw new Error('Illegal Argument: '+fn);
	}
	var sum = 0;
	this.forEach(function(value){
		sum += fn(value);
	});
	return sum;
};


Array.MAX_LENGTH = 4294967295;//At least on firefox