var js = {core:{},util:{},html:{},net:{},canvas:{},widget:{},data:{}};

var jsool = (function(){
	/**
	 * Operations that will be fired after the page is ready but before the application start
	 */
	var systemOperations = new Array();
	/**
	 * Operations that will be fired after the system is ready
	 */
	var onReadyActions = new Array();
	/**
	 * flags if the document is ready
	 */
	var documentReady = false;
	/**
	 * flags if framework is ready
	 */
	var systemReady = false;
	
	var that = this;
	
	that.doReady = function(){
		for(var i = 0; i< onReadyActions.length; i++){
			try{
				onReadyActions[i]();
			}catch(e){
				if(typeof console != 'undefined'){
					console.info(e.toString());
					console.error(e.toString());
				}else{
					alert(e.description || e.toString());
					throw e;
				}
			}
		}
	};
	
	that.prepareSystem = function(){
		for(var i = 0; i< systemOperations.length; i++){
			systemOperations[i]();
		}
	};
	
	return {
		/**
		 * Adds a function that wil be fired just after the framework
		 */
		onReady: function(fn){onReadyActions.push(fn);},
		/**
		 * Adds a function that wil be fired just after the page is ready
		 */
		onSystemReady: function(fn){systemOperations.push(fn);},
		/**
		 * returns tha system time in milli-seconds
		 */
		time: function(){return (new Date()).getTime();},
		start: function(){
			documentReady = true;
			that.prepareSystem();
			systemReady = true;
			that.doReady();
		},
		isReady: function(){
			return systemReady && documentReady;
		},
		emptyFn: function(){return undefined;},
		
		apply: function(object, source, defaults){
			if(defaults){
				jsool.apply(object, defaults);
			}
			
			if(object && source && typeof source == 'object'){
				for(var p in source){
					object[p] = source[p];
				}
			}
			
			return object;
		}
	};
})();

/**
 * Defines the framework object-oriented paradigm implementation
 */
jsool.$extends = function(superclass, prototype, type){
	var cls;
	
	if(prototype['constructor'] && prototype.constructor.toString().indexOf("Object") > 10 || prototype.constructor.toString().indexOf("Object") < 0){
		//cls = prototype.constructor;
		cls = function(){
			superclass.apply(this,arguments);
			prototype.constructor.apply(this, arguments);
		};
	}else{
		cls = function(){superclass.apply(this,arguments);};
	}
	
	for(var sp in superclass.prototype){
		cls.prototype[sp] = superclass.prototype[sp];
	}
	
	if(js.core.Browser.isIE())
		cls.prototype['toString'] = superclass.prototype['toString'];
	
	for(var p in prototype){
		cls.prototype[p] = prototype[p];
	}
	
	cls.prototype.supercls = superclass;
	cls.prototype.type = type;
	cls.prototype.cls = cls;
	return cls;
};

var $extends = jsool.$extends;

window.onload = function(){
	jsool.start();
	delete jsool.start;
};