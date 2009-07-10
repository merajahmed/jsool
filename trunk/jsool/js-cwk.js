//OBJECT=============================================================
function Object(){
	this.hash = (Math.round((Math.random()*1000)) + (new Date()).getTime()).toString(16).toUpperCase();
}
Object.prototype.hash = "";
Object.prototype.type = "Object";
Object.prototype.superclass = Object;
Object.prototype.hashCode = function(){
	return this.hash;
};
Object.prototype.toString = function(){
    return this.type + "@" + this.hash;
};
//ARRAY==============================================================
Array.prototype.get = function(index){
	var arr = this;
	if(index >= arr.length || index < 0)
		throw new Error("Array index out of bounds: "+index);
	return arr[index];
};
Array.prototype.superclass = Object;
Array.prototype.add = function(object){
	var arr = this;
	arr.push(object);
};
Array.prototype.set = function(obj, index){
	(this)[index] = obj;
};
Array.prototype.addAll = function(array){
	if(array.iterator){
		var i = array.iterator();
		while(i.hasNext()) this.add(i.next());
	}else{
		var l = array.length;
		for(var j = 0; j < l; j++)
			this.add(array[j]);
	}
};
//Remove item or index
Array.prototype.remove = function(object){
	var index;	
	if(typeof object != 'number')
		index = this.indexOf(object);
	else
		index = object;
	
	if(index >= this.length || index < 0){
		throw new Error("Array index out of bounds: "+index);
	}	
	delete this[index];	
	var length = this.length - 1;
	for(var i = index ; i < length; i++){		
		this[i] = this[i+1];
	}
	if(this.pop) this.pop();
};
//Clear the array
Array.prototype.clear = function(){
	while(this.length > 0)
		this.pop();
};
Array.prototype.poll = function(){
	return this.shift();
};
//Creates a copy of the array
Array.prototype.clone = function(){
	var copy = new Array();
	copy.addAll(this);
	return copy;	
};
//Returns the index of the item on array
Array.prototype.indexOf = function(object){
	var arr = this;
	var l = arr.length;
	for(var i = 0; i < l; i++){
		if(arr[i] == object)
			return i;
	}
	return -1;
};
Array.prototype.contains = function(object){
	return this.indexOf(object) != -1;
};
Array.prototype.isEmpty = function(){
	return this.length == 0;
};
Array.prototype.toArray = function(){
	return (this);
};
//In case of Internet explorer
if(!Array.prototype.forEach){
	Array.prototype.forEach = function(fn){
		var arr = (this);
		var len = arr.length;
		
		for(var i = 0; i<len; i++)fn(arr[i]);
	};
}
//Creates a iterator
Array.prototype.iterator = function(){
	var list = (this);
	return {
		size: list.length,
		index: 0,
		hasNext: function(){				
			return this.index < this.size;
		},
		next: function(){
			if(!this.hasNext())
				throw new Exception('Array Index Out Of Bounds: '+this.index, {type: 'ArrayListIterator'});
			
			var val = list[this.index];
			this.index ++;
			return val;
		},
		nextIndex: function(){
			return this.index;
		}
	};
};
Array.prototype.size = function(){
	return this.length;
};
//STRING=============================================================
String.prototype.replaceAll = function(search, replacement){
	var str = this;
	var pos = str.indexOf(search);	
	while (pos > -1){
		str = str.replace(search, replacement);
		pos = str.indexOf(search); 
	}	
	return (str);
};
String.prototype.superclass = Object;
String.prototype.toCharArray = function(){
	var chars = new Array();
	var str = new String(this);
	var l = str.length;
	for(var i = 0; i < l; i++){
		chars.add(str[i]);
	}
	return chars;
};
String.prototype.trim = function(){
	return this.replace(/^\s*([\S\s]*?)\s*$/, '$1');
};
//Adds suport to notaions like {key} = value
String.prototype.insert = function(key, value){
	return this.replaceAll("[\\{]"+key+"[\\}]", value);
};
//=======================================================================================
//CWK====================================================================================
//=======================================================================================
//CWK CORE===========================================================
var CWK = {
	version: '0.1',
	engine: 'HTML5CANVAS',
	noUI: false,
	userAgent: new String(navigator.userAgent).toLowerCase(),
	onReadyActions: new Array(),
	onReady: function(fn){
		this.onReadyActions.add(fn);
	},
	doReady: function(){
		for(var i = 0; i< this.onReadyActions.length; i++){
			this.onReadyActions[i]();
		}
	},
	isGecko: function(){
		return (this.userAgent.indexOf('gecko') != -1);
	},
	isFF: function(){
		return this.isGecko() && (this.userAgent.indexOf('firefox') != -1);
	},
	isOpera: function(){
		return (this.userAgent.indexOf('opera') != -1);
	},
	isSafari: function(){
		return (this.userAgent.indexOf('safari') != -1);
	},
	isWebKit: function(){
		return (this.userAgent.indexOf('webkit') != -1);
	},
	isIE: function(){
		return new String(navigator.appName).indexOf('Internet Explorer') >= 0;
	},
	getTime: function(){
		return (new Date()).getTime();
	},
	emptyFn: function(){return null;},
	isArray: function(obj){
		//Tested with custom methods, so it can be applyed to LinkedList to
		return (typeof(obj.get)!="undefined"&&typeof(obj.add)!="undefined"&&typeof(obj.iterator)!="undefined");
	}
};
js.Extends = function(superclass, prototype, type){
	var cls;
	var indexOfObject;
	if(js.isIE())
		indexOfObject = 10;
	else
		indexOfObject = 9;
		
	if(prototype['constructor'] && prototype.constructor.toString().indexOf("Object") != indexOfObject){
		cls = prototype.constructor;
	}else{
		cls = function(){superclass.apply(this,arguments);};
	}
	
	for(var sp in superclass.prototype){
		cls.prototype[sp] = superclass.prototype[sp];
	}
	
	if(js.isIE())
		cls.prototype['toString'] = superclass.prototype['toString'];
	
	for(var p in prototype){
		cls.prototype[p] = prototype[p];
	}
	
	cls.prototype.superclass = superclass;
	cls.prototype.type = type;
	
	return cls;
};
//=======================================================================================
//BROWSER COMPATBILITY===================================================================
//=======================================================================================
if(js.isIE()){
	js.addEventListener = function(domObject, eventType, handler){
		domObject.attachEvent('on' + eventType, handler);
	};
	
	js.removeEventListener = function(domObject, eventType, handler){
		domObject.detachEvent("on"+ eventType, handler);
	};
}else{
	js.addEventListener = function(domObject, eventType, handler){
		return domObject.addEventListener(eventType, handler, false);
	};
	
	js.removeEventListener = function(domObject, eventType, handler){
		return domObject.removeEventListener(eventType, handler, false);
	};
}

//===================================================================
//LIBRARY START UP===================================================
//===================================================================
js.addEventListener(window, 'load', function(){
	
	//Checks if user wanna use Flow (Canvas based GUI)
	if(!js.noUI){
		//I'm damn tired of Internet explorer
		if(js.isIE()){
			alert("Internet Explorer does not support this library.");
			return;
		}
		
		//Starts UIManager
		js.UIManager = new js.flow.UIManager();
		js.UIManager.setLookAndFeel(js.flow.laf.Soft);
		js.UIManager.startUpdateUITask();
		
		//Starts Global Event Listener
		js.GlobalEventListener = new js.core.GlobalEventListener();
		js.GlobalEventListener.init();
		
		//Creates the Global Event Handler
		js.GlobalEventHandler = new js.core.GlobalEventHandler();
		js.GlobalEventListener.addListener(js.GlobalEventHandler);
	}
	
	//Launch waiting functions
	js.doReady();
});