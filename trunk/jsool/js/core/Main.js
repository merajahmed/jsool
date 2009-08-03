var js = {core:{},util:{},html:{},net:{},canvas:{},widget:{}};
var emptyFn = function(){return undefined;};
js.core = (function(){
	var systemOperations = new Array();
	var onReadyActions = new Array();
	var documentReady = false;
	var systemReady = false;
	return {
		onReady: function(fn){onReadyActions.push(fn);},
		onSystemReady: function(fn){systemOperations.push(fn);},
		doReady: function(){
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
		},
		prepareSystem: function(){
			for(var i = 0; i< systemOperations.length; i++){
				systemOperations[i]();
			}
		},
		time: function(){return (new Date()).getTime();},
		start: function(){
			documentReady = true;
			this.prepareSystem();
			systemReady = true;
			this.doReady();
		},
		isReady: function(){
			return systemReady && documentReady;
		}
	};
})();

var global_compiling_time = 0;

var $extends = function(superclass, prototype, type){
	var start = js.core.time();
	var cls;
	
	if(prototype['constructor'] && prototype.constructor.toString().indexOf("Object") > 10 || prototype.constructor.toString().indexOf("Object") < 0){
		cls = prototype.constructor;
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
	
	global_compiling_time = global_compiling_time + js.core.time() - start;
	return cls;
};

window.onload = function(){
	js.core.start();
	delete js.core.start;
};