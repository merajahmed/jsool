Array.isArray = function(obj){
	return obj.constructor == Array;
};

Array.prototype.shuffle = function(){
	this.sort(function(a,b){
		return (Math.random() > 0.5 ? 1 : -1);
	});
};

Array.prototype.prototypeOf = function(clazz){
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

if(!Array.prototype.indexOf){
	Array.prototype.indexOf = function(obj){
		var length = this.length;		
		
		for(var i = 0; i < length; i++){			
			if(obj == this[i]){
				return i;
			}
		}
		
		return -1;
	};
}