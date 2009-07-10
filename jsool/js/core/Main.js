var js = {
	core:{},
	util:{},
	html:{},
	net: {}
};

function emptyFn(){return null;}

js.core.Main = {
	systemOperations: new Array(),
	onReadyActions: new Array(),
	onReady: function(fn){
		this.onReadyActions.push(fn);
	},
	onSystemReady: function(fn){
		this.systemOperations.push(fn);
	},
	doReady: function(){
		for(var i = 0; i< this.onReadyActions.length; i++){
			try{
				this.onReadyActions[i]();
			}catch(e){
				alert(e);
			}
		}
	},
	prepareSystem: function(){
		for(var i = 0; i< this.systemOperations.length; i++){
			this.systemOperations[i]();
		}
	}
};

js.core.Main.extend = function(superclass, prototype, type){
	var cls;
	
	if(prototype['constructor'] && prototype.constructor.toString().indexOf("Object") > 9 || prototype.constructor.toString().indexOf("Object") < 0){
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
	
	return cls;
};

var Extends = js.core.Main.extend;

window.onload = function(){
	js.core.Main.prepareSystem();
	js.core.Main.doReady();
	
	delete js.core.Main;
};