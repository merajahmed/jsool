jsool.namespace("js.dom");

js.dom.Helper = (function create_helper(){
	var DOC = window.document,
		EventManager = js.core.EventManager,
		BODY,
		proxy,
		specialAttributes = /^html|tag|children|text$/,
		noCloseTags = /^input|br|hr|img$/;
	
	function init(){
		proxy = DOC.getElementById("jsool-proxy");
		if(!proxy){
			proxy = DOC.createElement("div");
			proxy.style.display = "none";
			proxy.innerHTML = "";
			proxy.id="jsool-proxy";
			BODY = DOC.getElementsByTagName("body")[0];
		}
	}
	
	function userProxy(string){
		if(!proxy) init();
		BODY.appendChild(proxy);
		proxy.innerHTML = string;
		
		var f = [];
		
		Array.iterate(proxy.childNodes,function(i,el){
			if(el.nodeType == 1){
				f.push(el);
				if(jsool.isIE) proxy.removeChild(el);
			}
		});
		
		proxy.innerHTML = "";
		BODY.removeChild(proxy);
		return f;
	}
	
	
	function createHTML(def, b){
		var atr,key,val;
		b = b || [];
		
		if(String.isString(def)){
			b.push(def);
		}else if(Array.isArray(def)){
			for(var i=0,el;el=def[i++];){
				createHTML(el,b);
			}
		}else if(jsool.isObject(def)){
			b.push('<');
			def.tag = def.tag || 'div';
			b.push(def.tag);
			
			for(atr in def){
				val = def[atr];
				
				if(!specialAttributes.test(atr)){					
					b.push(' ');
					b.push(atr);
					b.push('="');
					if(typeof val === 'object'){
						for(key in val){
							b.push(key);
							b.push(':');
							b.push(val[key]);
							b.push(';');
						}
					}else{
						b.push(val);
					}
					b.push('"');
				}
			}
			
			if(noCloseTags.test(def.tag)){
				b.push('/>');
			}else{
				b.push('>');
				if(def.children){
					createHTML(def.children,b);
				}else if(def.html){
					b.push(def.html);
				}
				b.push('</');
				b.push(def.tag);
				b.push('>');
			}
			
			
		}
		
		return b;
	}
	
	
	return{
		createHTML: function(html, parent){
			var html = createHTML(html).join('');
			
			if(parent){
				parent = parent.dom ? parent.dom : parent;
				parent.innerHTML += html;
			}
			return html;
		},
		append: function(parent, html){
			var DH = js.dom.Helper;
			parent = parent.dom ? parent.dom : parent;
			
			if(String.isString(html)){
				parent.innerHTML += html;
			}else if(jsool.isArray(html)){
				Array.iterate(html,function(i,el){
					DH.append(parent,el);
				});
			}else if(jsool.isObject(html)){
				var el = DOC.createElement(html.tag || "div");				
				
				jsool.iterate(html,function(attr, val){
					if(!(/(tag|style|html|children)/).test(attr)){
						el[attr] = val;
					}
				});
				
				if(html.style){
					js.dom.Helper.applyStyle(el, html.style);
				}
				
				parent.appendChild(el);
				
				if(html.children){
					js.dom.Helper.append(el, html.children);
				}else if(html.html){
					el.innerHTML = html.html;
				}
			}
		},
		applyStyle: function(el, style){
			if(el.nodeType && style){
				var els = el.style;
				jsool.iterate(style,function(at,val){
					if(typeof val !== "undefined"){
						els[at] = val;						
					}
				});
			}
		}
	};
})();