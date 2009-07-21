/**
 * @class js.html.Element
 * @extends js.util.Observable
 * 
 * Base class for any html element
 */
js.html.Element = $extends(js.util.Observable,{
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
		
		if(type == 'string' && tags.test(obj.toLowerCase())){
			this.dom = document.createElement(obj);
		}else if(type == 'object' && obj.tagName){
			this.dom = obj;
		}else{
			throw new js.core.Exception('Invalid tag: ' + obj, this);
		}
		
		this.setAttribute('id','jsool-'+this.global.count);
		this.global.count++;
		
		js.html.Element.cache(this);
	},
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
	 * @property {js.util.Collection} the names of the valid dom events for an Element
	 */
	DOMEvents: null,
	/**
	 * @property {js.html.Element} parent element
	 */
	parent: null,
	/**
	 * @function Returns the dom of the Element
	 * @return {HTMLElement} Element's dom
	 */
	getDom: function(){
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
		if(arguments.length == 2 && typeof arguments[1] == 'string'){
			var name = arguments[0];
			var value = arguments[1];
			this.dom.setAttribute(name, value);
		}else if(arguments.length == 1 && typeof arguments[0] == 'object'){
			var options = arguments[0];
			for(var p in options){
				this.dom.setAttribute(p, options[p]);
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
		return this.dom.getAttribute(name);
	},
	/**
	 * @function
	 * 
	 * @return {string} the id of the dom element
	 */
	id: function(){
		return this.dom.id;
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
		
		this.dom.appendChild(child.dom);
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
		this.dom.innerHTML = value.toString();
	},
	/**
	 * @function
	 * 
	 * @return {string} the elements tag name
	 */
	tag: function(){
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
		this.dom.removeChild(element.dom);
	},
	/**
	 * @function
	 * Adds a new event listener to the element
	 * 
	 * @param {string} name
	 * the name of the event
	 * @param {Function} handler
	 * the function that will hands this event
	 * @param {boolean} overide
	 * overides the current event handler
	 * 
	 * On using <code>addListener(name, handler)</code> syntax,
	 * the function will set the function direct to the onevent attribute of the DOM.
	 * 
	 * This operation is much faster than events binding,
	 * but you may set only one event handler by event with this operation.
	 * 
	 * @param {object} collection
	 * A collection of events handlers
	 * 
	 * @return {boolean} if and handler has been overiden
	 */
	addListener: function(){},
	/**
	 * @function
	 * Adds a new CSS class to the element
	 * 
	 * @param {string} name The name of the CSS class
	 */
	addClass: function(name){
		var current = this.dom.className;
		name = name.trim();
		this.dom.className = (current.replace(name,'')+' '+name).trim();
	},
	/**
	 * @function
	 * Removes a CSS class from the element
	 * 
	 * @param {string} name The name of the CSS class
	 */
	removeClass: function(name){
		this.dom.className = this.dom.className.replace(name.trim(),'');
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
		var style = this.dom.style;
		if(typeof arg1 == 'string'){
			style[arg1] = arg2;
		}else if(typeof arg1 == 'object'){
			for(var prop in arg1)
				style[prop] = arg1[prop];
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
	getChildren: function(dom){
		var toDom = (dom == null ? false : el);
		if(toDom){
			return this.dom.childNodes;
		}else{
			var children = this.dom.childNodes;
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
	 * Replaces a child Element by other
	 * 
	 * @param {js.html.Element} newElement The element to be inserted
	 * @param {js.html.Element} oldElement The element that will be replaced
	 */
	replace: function(newElement, oldElement){
		if(oldElement.instanceOf(js.core.Element) && newElement.instanceOf(js.core.Element)){
			 var index = this.children.indexOf(oldElement);
			 this.children.add(newElement, index);
			 
			 this.dom.replaceChild(newElement.dom, oldElement.dom);
		}else{
			throw new js.core.Exception('Invalid argument: '+element, this, arguments);
		}
	},
	/**
	 * @function
	 * Destroys this element
	 */
	destroy: function(){
		//Remove from global element cache
		js.html.Element.CACHE.remove(this.jsoolId);
		
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
	if(typeof element != 'object' || !element.instanceOf(js.html.Element))
		throw new js.core.Exception("Invalid argument: "+element);
	js.html.Element.CACHE.put(element.id(), element);
};

//TODO for Dom query implementation getElementsByClassName