jsool.namespace("js.dom");

js.dom.Helper = (function create_helper(){
	var DOC = window.document,
		BODY,
		proxy;
	
	function init(){
		proxy = document.getElementById("jsool-proxy");
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
		
		var f = DOC.createDocumentFragment();
		
		Array.iterate(proxy.childNodes,function(i,el){
			if(el.nodeType == 1){
				f.appendChild(el);
			}
		});
		
		proxy.innerHTML = "";
		BODY.removeChild(proxy);
		return f;
	}
	
	return{
		createDom: function(html, parent){
			var el;
			if(String.isString(html)){
				el = userProxy(html);
			}else if(Array.isArray(html)){
				el = DOC.createDocumentFragment();
				html.forEach(function(e){
					js.dom.Helper.createDom(e, el);
				});
			}else if(Object.isObject(html)){
				el = DOC.createElement(html.tag || "div");
				
				jsool.iterate(html,function(attr, val){
					if(!(/tag|style|html|children/).test(attr)){
						el[attr] = val;
					}
				});
				
				if(html.style){
					js.dom.Helper.applyStyle(el, html.style);
				}
				
				if(html.children){
					js.dom.Helper.createDom(html.children, el);
				}else if(html.html){
					el.innerHTML = html.html;
				}
			}
			
			if(parent){
				parent.append ? parent.append(el):parent.appendChild(el);
			}
			
			return el;
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