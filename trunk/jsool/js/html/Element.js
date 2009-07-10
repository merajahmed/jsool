js.html.Element = Extends(js.util.Observable,{
	constructor: function(obj){
		js.util.Observable.apply(this, arguments);
		
		var type = typeof obj;
		var tags = /\b(a|button|div|object|label|option|p|script|select|span|td|tr|th|tbody|thead|tfoot)\b/;
		
		if(type == 'string' && tags.exec(obj.toLowerCase()) !== null){
			this.dom = document.createElement(obj);
		}else if(type == 'object' && obj.tagName){
			this.dom = obj;
		}else{
			throw new js.core.Exception('Invalid arguments type: ' + obj, this, arguments);
		}
		
		this.DOMEvents = new js.util.ArrayList(['abort', 'blur', 'change', 'click', 'dblclick',
		                                        'error', 'focus', 'keydown', 'keypress', 'keyup',
		                                        'load', 'mousedown', 'mousemove', 'mouseout', 'mouseover',
		                                        'mouseup', 'reset', 'resize', 'select', 'submit', 'unload']);
	},
	children: null,
	dom: null,
	classes: null,
	DOMEvents: null,
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
	getAttribute: function(name){
		return this.dom.getAttribute(name);
	},
	id: function(){
		return this.dom.id;
	},
	append: function(child){
		if(!child.instanceOf(js.html.Element))
			throw new js.core.Exception('Invalid argument type',this, arguments);
		
		if(this.children === null)
			this.children = new js.util.ArrayList();
		
		this.children.add(child);
		
		this.dom.appendChild(child.dom);
	},
	setText: function(string){
		if(typeof string != 'string')
			throw new js.core.Exception('Invalid argument type',this,arguments);
		this.dom.innerHTML = string;
	},
	tag: function(){
		return this.dom.tagName;
	},
	remove: function(element){
		this.children.remove(element);
		this.dom.removeChild(element.dom);
	},
	addListener: function(listeners){
		var addDomListener;
		var that = this;
		
		if(js.core.Browser.isIE()){
			addDomListener = function(event){
				that.dom.attachEvent('on'+event,function(ev){that.fireEvent(ev);});
			};
		}else{
			addDomListener = function(event){
				that.dom.addEventListener(event, function(ev){that.fireEvent(ev);}, false);
			};
		}
		
		for(var l in listeners){
			if(this.DOMEvents.contains(l)){
				this.DOMEvents.remove(l);
				this.addEvent(l);
				addDomListener(l);
			}
		}
		//Call parent method
		js.util.Observable.prototype.addListener.apply(this, arguments);
	},
	addClass: function(name){
		if(!this.classes)
			this.classes = new js.util.HashSet();
		
		this.classes.add(name.trim());
		
		this.dom.className = this.classes.toArray().join(" ");
	},
	removeClass: function(name){
		if(this.classes){
			this.classes.remove(name.trim());
			
			this.dom.className = this.classes.toArray().join(" ");
		}
	},
	applyStyle: function(arg1, arg2){
		var style = this.dom.style;
		if(typeof arg1 == 'string' && typeof arg2 == 'string' ){
			style[arg1] = arg2;
		}else if(typeof arg1 == 'object'){
			for(var prop in arg1)
				style[prop] = arg1[prop];
		}
	}
},'js.html.Element');