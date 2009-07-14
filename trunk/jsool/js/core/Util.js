js.core.Util = {
	isObject: function(obj){
		return typeof obj == 'object';
	},
	isString: function(obj){
		return String.isString(obj);
	},
	isArray: function(obj){
		return Array.isArray(obj);
	},
	isNumber: function(obj){
		return typeof obj == 'number';
	}
};