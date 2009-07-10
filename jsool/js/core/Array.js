Array.isArray = function(obj){
	return obj.constructor == Array;
};

Array.prototype.prototypeOf = function(clazz){
	return clazz == Array;
};