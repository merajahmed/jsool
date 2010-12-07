jsool.applyIf(Function.prototype,{
	/**
	 * Binds the function on a object
	 * */
	bind: function(obj){
		var fn = this;
		return function(){
			return fn.apply(obj,arguments);
		};
	},
	wrap: function(){
		var args = arguments,
		fn = this;
		return function(){
			return fn.apply(this,args);
		};
	}
});