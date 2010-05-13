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

jsool.namespace("js.dom");

js.dom.CompositeElement = $extends(js.core.Object,{
	cons: function(els){
		this.elements = els;
	},
	elements: [],
	/**
	 * Adds new elements to the Object
	 */
	add: function(arr){
		this.elements.addAll(arr);
	},
	/**
	 * Return how many elements the object has
	 */
	size: function(){
		return this.elements.size();
	},
	/**
	 * Removes all elements
	 */
	clear: function(){
		this.elements.clear(); 
	},
	/**
	 * Runs a function on every element
	 */
	each: function(fn,scope){
		var el,i=0,res=[];
		
		while((el=this.elements[i++])){
			res.push(fn.apply(scope||el,[el]));
		}
		
		return res;
	},
	/**
	 * Returns the first element
	 */
	first: function(){
		return this.elements[0];
	},
	/**
	 * Get the indexed element
	 */
	item: function(index){
		return this.elements[index];
	},
	set: function(attr, value){
		var that = this;
		if(typeof attr === "object"){
			jsool.iterate(attr,function(at, val){
				Array.iterate(that.elements, function set(index, el){
					el[at] = val;
				});
			});
		}else{
			Array.iterate(that.elements, function set(index, el){
				el[attr] = value;
			});
		}
		
		return this;
	},
	on: function(event, handler){
		var that = this;
		var EM = js.core.EventManager;
		Array.iterate(that.elements, function on(index, el){
			EM.on(el,event,handler,el);
		});
		return this;
	},
	un: function(event, handler){
		var that = this;
		var EM = js.core.EventManager;
		Array.iterate(that.elements, function un(index, el){
			EM.un(el,event,handler,el);
		});
		return this;
	},
	addClass: function(cls){
		var that = this, reg = new RegExp("\\b"+cls+"\\b",g);
		Array.iterate(that.elements, function addClass(index, el){
			if(!el.className.match(reg)){
				el.className+=cls.trim();
			}
		});
		return this;
	},
	setClass: function(cls){
		var that = this;
		Array.iterate(that.elements, function setClass(index, el){			
			el.className = cls.trim();
		});
		return this;
	},
	removeClass: function(cls){
		var that = this,cur,reg = new RegExp("\\b"+cls.trim()+"\\b");
		Array.iterate(that.elements, function removeClass(index, el){
			el.className = el.className.replace(reg,"");
		});
		return this;
	},
	setText: function(text){
		var tn = document.createTextNode(text);
		Array.iterate(this.elements,function(i,e){
			e.innerHTML = "";
			e.appendChild(tn.cloneNode());
		});
		return this;
	},
	applyStyle: function(arg1,arg2){
		if(typeof arg1 == 'string'){
			Array.iterate(this.elements,function(i,e){
				e.style[arg1] = arg2;
			});
		}else if(typeof arg1 == 'object'){			
			Array.iterate(this.elements,function(i,e){
				var style = e.style;
				jsool.iterate(arg1, function(att, val){
					style[att] = val;
				});
			});
		}
		return this;
	}
},"js.dom.CompositeElement");

js.dom.Element.select = function(selector, context){
	var els = Raze.query(selector, context);
	return new js.dom.CompositeElement(els);
};

jsool.select = js.dom.Element.select;