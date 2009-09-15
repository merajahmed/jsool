js.dom.Helper = (function(){
	var DOC = window.document;
	var getTagRe = /^[<]([\w]+)/;
	
	return{
		createDom: function(html, parent){
			var el;
			if(String.isString(html)){
				el = DOC.createDocumentFragment();
				el.innerHTML = html;
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
				parent.appendChild(el);
			}
			
			return el;
		},
		applyStyle: function(el, style){
			if(el.nodeType && style){
				var els = el.style;
				jsool.iterate(style,function(at,val){
					els[at] = val;
				});
			}
		}
	};
})();