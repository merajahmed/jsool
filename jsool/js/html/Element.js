/**
 * @class js.html.Element
 * @extends js.util.Observable
 * 
 * Base class for any html element
 */
js.html.Element = $extends(js.core.Object,{
	/**
	 * @constructor
	 * Creates a new html element.
	 * 
	 * @param {HTMLElement} element
	 * creates an element based on a existing HTMLElement
	 * @param {string} tag
	 * creates a new element and its dom with a valid html tag
	 * 
	 * @throws {js.core.Exception} if the html tag is invalid or the providen object is not a valid dom
	 */
	constructor: function(obj){
		//Observable constructor is empty, so I call objects constructor
		js.core.Object.apply(this, arguments);
		
		var type = typeof obj;
		var tags = /\b(a|button|div|object|label|option|p|script|select|span|td|tr|th|tbody|thead|tfoot|svg|iframe|canvas)\b/;
		
		this.id = 'jsool-'+this.global.count;
		this.global.count++;
		
		if(type == 'string' && tags.test(obj)){
			this.tag = obj;
			this.cachedAttributes = {};
			this.cachedCss = {};
			this.cachedClasses = '';
			this.cachedText = '';
			//this.dom = document.createElement(obj);
		}else if(type == 'object' && obj.tagName){
			this.dom = obj;
			this.tag = obj.tagName;
			
			if(this.dom.id){
				this.id = this.dom.id;
			}else{
				this.dom.id = this.id;
			}
			
		}else{
			throw new js.core.Exception('Invalid tag: ' + obj, this);
		}
		
		this.events = {
			focus:[],blur:[],
			mousedown:[],mouseup:[],click:[],dblclick:[],
			mousein:[],mouseout:[],mousemove:[],
			keydown:[],keyup:[],keypress:[],
			load:[],unload:[],abort:[],error:[],resize:[],scroll:[]
		};
		
		js.html.Element.cache(this);
	},
	tag: null,
	/**
	 * @property {Object} commom variables for all elements 
	 */
	global: {
		count:0
	},
	/**
	 * @property {string} commom id used to cache the element on global elements cache
	 */
	jsoolId: null,
	/**
	 * @property {js.util.List} the children elements of this Element
	 */
	children: null,
	/**
	 * @property {HTMLElement} the dom of the Element
	 */
	dom: null,
	/**
	 * @property {js.html.Element} parent element
	 */
	parent: null,
	/**
	 * @property {object} stores the element attributes until the dom be created 
	 */
	cachedAttributes: null,
	/**
	 * @property {object} stores the element css styles until the dom be created 
	 */
	cachedCss: null,
	/**
	 * @property {object} stores the element css classes until the dom be created 
	 */
	cachedClasses: null,
	/**
	 * @property {string} stores the element inner text until the dom be created
	 */
	cachedText: null,
	/**
	 * @function Returns the dom of the Element
	 * @return {HTMLElement} Element's dom
	 */
	getDom: function(){
		if(!this.dom){
			var temp;
			
			this.dom = document.createElement(this.tag);
			var el = this.dom;
			el.id = this.id;
			
			temp = this.cachedAttributes;
			delete this.cachedAttributes;
			this.setAttribute(temp);
			
			temp = this.cachedCss;
			delete this.cachedCss;
			this.applyStyle(temp);
			
			temp = this.cachedClasses;
			delete this.cachedClasses;
			this.addClass(temp);
			
			temp = this.cachedText;
			delete this.cachedText;
			this.setText(temp);
		}
		return this.dom;
	},
	/**
	 * @function Set the attributes to the dom element
	 * 
	 * @param {string} name
	 * the name of the attribute
	 * @param {string} value
	 * the value of the attribute
	 * @param {object} attributes
	 * a map of attributes
	 */
	setAttribute: function(){
		if(arguments.length == 2 && typeof arguments[0] == 'string'){
			var name = arguments[0];
			var value = arguments[1];
			if(this.cachedAttributes){
				this.cachedAttributes[name] = value;
			}else{
				this.dom.setAttribute(name, value);
			}
		}else if(arguments.length == 1 && typeof arguments[0] == 'object'){
			var options = arguments[0];
			if(this.cachedAttributes){
				for(var p in options){
					this.cachedAttributes[p] = options[p];
				}
			}else{
				for(var p in options){
					this.dom.setAttribute(p, options[p]);
				}
			}
		}
	},
	/**
	 * @function
	 * 
	 * @param {string} name
	 * the name of the attribute
	 * 
	 * @return {string} value of the attribute
	 */
	getAttribute: function(name){
		if(this.cachedAttributes){
			return this.cachedAttributes[name];
		}else{
			return this.dom.getAttribute(name);
		}
	},
	/**
	 * @function
	 * 
	 * @return {string} the id of the dom element
	 */
	getId: function(){
		return this.id;
	},
	/**
	 * @function
	 * adds a new child into the elements dom and the children collection
	 * 
	 * @param {js.html.Element} child 
	 * 
	 * @throws {js.core.Exception} if the object is not an instance of js.html.Element
	 */
	append: function(child){
		if(!child.instanceOf(js.html.Element))
			throw new js.core.Exception('Invalid argument type',this, arguments);
		
		if(child.parent != null){
			child.parent.remove(child);
		}
		
		this.getDom().appendChild(child.getDom());
		child.parent = this;
	},
	/**
	 * @function
	 * Set the elements inner text.
	 * 
	 * @param {string} string
	 * 
	 * @throws {js.core.Exception} i the argument is not a string
	 */
	setText: function(value){
		if(this.cachedText != undefined){
			this.cachedText = value;
		}else{
			this.dom.appendChild(document.createTextNode(new String(value)));
		}
	},
	/**
	 * @function
	 * 
	 * @return {string} the elements tag name
	 */
	tag: function(){
		if(this.cachedAttributes)
			return this.tag;
		return this.dom.tagName;
	},
	/**
	 * @function
	 * Removes a child node from the Element
	 * 
	 * @param {js.html.Element} element
	 * The element to be removed
	 */
	remove: function(element){
		this.getDom().removeChild(element.getDom());
	},
	/**
	 * Adds an event listener to element
	 */
	addListener: function(event, handler){
		var dom = this.getDom();
		if(!(this.events[event] == undefined)){
			var that = this;
			var handlerFunction = function(event){
				event = event || window.event;
				handler.apply(that, [event]);
			};
			this.events[event].push(handlerFunction);
			
			if(dom.addEventListener){
				dom.addEventListener(event, handlerFunction, false);
			}else{
				dom.attachEvent('on'+event, handlerFunction);
			}
		}
	},
	/**
	 * @function
	 * Removes the events listeners from element
	 * 
	 * @param {null} remove all listeners
	 * @param {string} removes the handlers from the named event
	 * 
	 */
	destroyListeners: function(){
		if(!this.dom)return;		
		var w3c = this.dom.addEventListener != undefined;
		var len;
		
		if(arguments.length == 0){
			for(var ev in this.events){
				len = this.events[ev].length;
				for(var i = 0; i < len; i++){
					if(w3c){
						this.dom.removeEventListener(ev, this.events[ev][i], false);
					}else{
						this.dom.detachEvent('on'+ev, this.events[ev][i]);
					}
				}
			}
		}else if(arguments.length == 1){
			var ev = arguments[0];
			var l = this.events[ev];
			len = l.length;
			for( var j = 0; j < len; j++){
				if(w3c){
					this.dom.removeEventListener(ev, l[j], false);
				}else{
					this.dom.detachEvent('on'+ev, l[j]);
				}
			}
		}
	},
	/**
	 * @function
	 * Adds a new CSS class to the element
	 * 
	 * @param {string} name The name of the CSS class
	 */
	addClass: function(name){
		if(this.cachedClasses != undefined){
			this.cachedClasses = this.cachedClasses + name + ' ';
		}else{
			var current = this.dom.className;
			name = name.trim();
			this.dom.className = (current+name+' ');
		}
	},
	/**
	 * @function
	 * Removes a CSS class from the element
	 * 
	 * @param {string} name The name of the CSS class
	 */
	removeClass: function(name){
		if(this.cachedClasses != undefined){
			this.cachedClasses = this.cachedClasses.replace(name.trim(), '');
		}else{
			this.dom.className = this.dom.className.replace(name.trim(),'');
		}
	},
	/**
	 * @function
	 * Sets an attribute of the style of the element
	 * 
	 * @param {string} name The name style attribute
	 * @param {string} value the value of the style attribute
	 * 
	 * @param {object} collection of attributes and its values
	 */
	applyStyle: function(arg1, arg2){
		if(this.cachedCss){
			if(typeof arg1 == 'string'){
				this.cachedCss[arg1] = arg2;
			}else if(typeof arg1 == 'object'){
				for(var prop in arg1)
					this.cachedCss[prop] = arg1[prop];
			}
		}else{
			var style = this.dom.style;
			if(typeof arg1 == 'string'){
				style[arg1] = arg2;
			}else if(typeof arg1 == 'object'){
				for(var prop in arg1)
					style[prop] = arg1[prop];
			}
		}
	},
	/**
	 * @function
	 * Returns the child elements
	 * 
	 * @param {boolean} dom
	 * if <code>true</code> to the returned values be the dom elements
	 * or <code>false|null</code> to returns a <code>js.util.List</code> of Elements 
	 * 
	 * @param {object} collection of attributes and its values
	 * 
	 * @return {collection} the element's children
	 */
	getChildren: function(el){
		var toEl = (el == null ? false : el);
		if(!toEl){
			return this.getDom().childNodes;
		}else{
			var children = this.getDom().childNodes;
			var result = [];
			for(var i = 0; i < children.length; i++){
				if(children[i].nodeType != 3){
					result.push(js.html.Element.get(children[i]));
				}
			}
			return result;
		}
	},
	/**
	 * @function
	 * Gets the absolute position of the element on the page
	 * 
	 * @return {object} the element position like {x,y}
	 */
	getPosition: function(){
		var element = this.dom;
		var y = 0, x = 0;
		while(element != null){
			y += element.offsetTop;
			x += element.offsetLeft;
			element = element.offsetParent;
		}
		return {y:y,x:x};
	},
	/**
	 * @function
	 * Return parent Element
	 * 
	 * @return {js.html.Element} The parent Element
	 */
	getParent: function(){
		return this.parent; 
	},
	/**
	 * @function
	 * Destroys this element
	 */
	destroy: function(){
		//Remove from global element cache
		js.html.Element.CACHE.remove(this.id);
		
		//Remove from dom
		if(this.getParent() != null){
			this.getParent().remove(this);
		}
		if(this.dom.parentNode){
			var parent = this.dom.parentNode;
			parent.removeChild(this.dom);
		}
		
		//Destroy listeners
		this.destroyListeners();
		
		//Delete DOM
		delete this.dom;
	}
},'js.html.Element');


//Elements Cache

js.core.onSystemReady(function(){
	js.html.Element.CACHE = new js.util.HashMap();
	js.html.Element.BODY = new js.html.Element(document.getElementsByTagName('body')[0]);
	
	var brw = js.core.Browser;
	
	if(brw.isIE()){
		js.html.Element.BODY.addClass('ie');
	}else if(brw.isFF()){
		js.html.Element.BODY.addClass('ff');
	}else if(brw.isOpera()){
		js.html.Element.BODY.addClass('opera');
	}
});

/**
 * @function
 * Gets an element from cache or force creation
 * 
 * @param {string} dom the id of the dom elements
 * @param {HTMLElement} dom the existing dom of the element
 * 
 * @return {js.html.Element} an element
 */
js.html.Element.get = function(dom){
	var cache = js.html.Element.CACHE;
	if(typeof dom == 'string'){
		var el = cache.get(dom);
		
		if(el == null){
			el = document.getElementById(dom);
			return el == null ? null : new js.html.Element(el); 
		}
		
		return el;
		
		if(cached == null){
			return new js.html.Element(el);
		}else{
			return cached;
		}
		
	}else if(typeof dom == 'object'){
		var el = cache.get(dom.getAttribute('id'));
		
		if(el == null){
			return new js.html.Element(dom);
		}else{
			return el;
		}
	}
};

/**
 * @function
 * Caches an element into the global elements cache.
 * this function is called automatcally by the elements constructor
 * 
 * @param {js.html.Element} element A valid element
 * 
 * @throws {js.core.Exception} if the argument is not an instance of <code>js.html.Element</code>
 */
js.html.Element.cache = function(element){
	js.html.Element.CACHE.put(element.getId(), element);
};