js.html.Element = Extends(js.util.Observable,{
	constructor: function(obj){
		js.util.Observable.apply(this, arguments);
		
		var type = typeof obj;
		var tags = /\b(a|button|div|object|label|option|p|script|select|span|td|tr|th|tbody|thead|tfoot)\b/;
		
		if(type == 'string' && tags.exec(obj.toLowerCase()) != null){
			this._dom = document.createElement(obj);
		}else if(type == 'object' && obj.tagName){
			this._dom = obj;
		}else{
			throw new js.core.Exception('Invalid arguments type: ' + obj, this, arguments.callee);
		}
		
		this.DOMEvents = new js.util.ArrayList(['abort', 'blur', 'change', 'click', 'dblclick',
		                                        'error', 'focus', 'keydown', 'keypress', 'keyup',
		                                        'load', 'mousedown', 'mousemove', 'mouseout', 'mouseover',
		                                        'mouseup', 'reset', 'resize', 'select', 'submit', 'unload']);
	},
	_children: null,
	_dom: null,
	DOMEvents: null,
	setAttribute: function(){
		if(arguments.length == 2 && typeof arguments[1] =='string'){
			var name = arguments[0];
			var value = arguments[1];
			this._dom.setAttribute(name, value);
		}else if(arguments.length == 1 && typeof arguments[0] == 'object'){
			var options = arguments[0];
			
			for(var p in options){
				this._dom.setAttribute(p, options[p]);
			}
		}
	},
	getAttribute: function(name){
		return this._dom.getAttribute(name);
	},
	id: function(){
		return this._dom.id;
	},
	append: function(child){
		if(!child.instanceOf(js.html.Element))
			throw new js.core.Exception('Invalid argument type',this, arguments);
		
		if(this._children == null)
			this._children = new js.util.ArrayList();
		
		this._children.add(child);
		
		this._dom.appendChild(child._dom);
	},
	setText: function(string){
		if(typeof string != 'string')
			throw new js.core.Exception('Invalid argument type',this,arguments);
		this._dom.innerHTML = string;
	},
	tag: function(){
		return this._dom.tagName;
	},
	remove: function(element){
		this._children.remove(element);
		this._dom.removeChild(element._dom);
	},
	addListener: function(listeners){
		var addDomListener;
		var that = this;
		
		if(js.core.Util.isIE()){
			addDomListener = function(event){
				that._dom.attachEvent('on'+event,function(ev){that.fireEvent(ev);});
			};
		}else{
			addDomListener = function(event){
				that._dom.addEventListener(event, function(ev){that.fireEvent(ev);}, false);
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
	}
},'js.html.Element');