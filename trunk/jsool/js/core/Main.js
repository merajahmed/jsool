/*  JSOOL - JavaScript Object Oriented Library 
 *
 *  Copyright (c) 2009, Mikhail Domanoski.
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without modification,
 *  are permitted provided that the following conditions are met:
 *
 *      * Redistributions of source code must retain the above copyright notice,
 *        this list of conditions and the following disclaimer.
 *
 *      * Redistributions in binary form must reproduce the above copyright notice,
 *        this list of conditions and the following disclaimer in the documentation
 *        and/or other materials provided with the distribution.
 *
 *      * Neither the name of Mikhail Domanoski nor the names of its
 *        contributors may be used to endorse or promote products derived from this
 *        software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 *  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 *  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 *  ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 *  ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var js = {core:{},util:{},html:{},net:{},canvas:{},flux:{laf:{}},data:{},juif:{}};

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
		onReady: function(fn){
			onReadyActions.push(fn);
			if(this.isReady()){
				fn.call(jsool,[]);
			}
		},
		/**
		 * Adds a function that wil be fired just after the page is ready
		 */
		onSystemReady: function(fn){
			systemOperations.push(fn);
			if(this.isReady()){
				fn.call(jsool,[]);
			}
		},
		/**
		 * returns tha system time in milli-seconds
		 */
		time: function(){return+new Date;},
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
		},
		isDefined: function(i){
			return typeof i !== 'undefined';
		},
		applyIf: function(object, source){
			if(object){
				for(var p in source){
					if(!jsool.isDefined(object[p])){
						object[p] = source[p];
					}
				}
			}
			return object;
		},
		copy: function(object){
			if(typeof object === 'object'){
				var copy;
				if(object.cls){
					copy = new object.cls();
				}else{
					copy = {};
				}
				jsool.apply(copy,object);
			}
			return copy;
		},
		iterate: function(it,fn){
			for(var at in it){
				fn(at,it[at]);
			}
		}
	};
})();

/**
 * Defines the framework object-oriented paradigm implementation
 */
jsool.$extends = function(superclass, prototype, type){
	var cls;
	if(typeof superclass != 'function'){
		return null;
	}
	
	//ImplicitySuperConstructor
	if(prototype['cons'] && typeof prototype['cons'] == 'function'){
		cls = (function(constructor, parent){
			
			var constructor = prototype['cons'];
			var parent = superclass;
			
			//Parent constructor executes just before the class constructor
			return function ImplicitySuperConstructor(){
				parent.apply(this, arguments);
				constructor.apply(this, arguments);
			};
		})();
	//ClassConstructor	
	}else if(prototype['ccons'] && typeof prototype['ccons'] == 'function'){
		cls = (function(){
			var constructor = prototype['ccons'];
			
			//Executes only the class constructor
			return function ClassConstructor(){
				constructor.apply(this, arguments);
			};
		})();
	}else{
		cls = (function(){
			var constructor = superclass;
			
			//Executes only the parent constructor
			return function SuperConstructor(){
				constructor.apply(this, arguments);
			};
		})();
	}
	
	for(var sp in superclass.prototype){
		cls.prototype[sp] = superclass.prototype[sp];
	}
	
	if(js.core.Browser.isIE)
		cls.prototype['toString'] = superclass.prototype['toString'];
	
	for(var p in prototype){
		cls.prototype[p] = prototype[p];
	}
	
	cls.prototype.supercls = superclass;
	cls.prototype.$super = (function(){
			var sup = superclass;
			return function Super(){
				sup.apply(this, arguments);
			};
		})();
	cls.prototype.type = type;
	cls.prototype.cls = cls;
	return cls;
};

var $extends = jsool.$extends;

window.onload = function(){
	jsool.start();
	delete jsool.start;
};