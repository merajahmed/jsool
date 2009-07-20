Number.prototype.instanceOf = function(cls){
	return cls == Number || typeof cls == 'number';
};

Number.prototype.type = 'Number';
Number.prototype.cls = Number;
Number.prototype.supercls = Object;

Number.isNumber = function(obj){
	return typeof obj == 'number';
};