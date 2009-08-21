//for some help
//http://extjs.com/deploy/dev/ext-all-debug.js
js.html.DomQuery = (function(){
	var selectorCache = {};
	var qTIR= /^(#|\.)?([\w-\*]+)/;//Query Type Identifier Regexp
	var byClassNameRe = /^\.([\w-]+)/;
	
	function startWithId(ctx, id){
		if(ctx.getElementById){
			return [ctx.getElementById(id)];
		}else{
			var ns = getNodes(ctx);
			return getId(ctx, id);
		}
	}
	
	function startWithClass(ctx, cls){
		var ns = getNodes(ctx);
		var res = [];
		for(var i = 0, ci; ci = ns[i];i++){
			if(ci && ci.className == cls){
				res.push(ci);
			}
		}
		return res;
	}
	
	function getNodes(ctx, tagname){
		if(ctx.getElementsByTagName){
			tagname = tagname || "*";
			return ctx.getElementsByTagName(tagname);
		}
	}
	
	function getId(ctx, id){
		var res = [];
		for(var i = 0, ci; ci = ctx[i];i++){
			if(ci  && ci.id == id){
				res.push(ci);
			}
		}
		return res;
	}
	
	function compile(selector){
		var res = [];
		var m = selector.match(qTIR);
		if(m){//match something
			if(m[1] == "#"){//Its an Id
				res.push({
					query: m[2],
					filter: startWithId
				});
			}else if(m[1] == "."){//Its a class
				res.push({
					query: m[2],
					filter: startWithClass
				});
			}else{//Its a tag
				res.push({
					query: m[2],
					filter: getNodes
				});
			}
			selector.replace(m[0],'');
		}
		return res;
	}
	
	function runQuery(query, context){
		var nodes = context;
		for(var i = 0, ci; ci = query[i];i++){
			nodes = ci.filter(nodes, ci.query);
		}
		return nodes;
	}
	
	return {
		get: function(selector, context){
			selector = selector || document;//assure that theres a selector
			context = context || document;//assure that thres a context
			
			if(typeof selector == "string"){
				selector = selector.trim();
				var compiled = compile(selector);
				selectorCache[selector] = compiled;
				return runQuery(compiled, context);
			}else if(typeof selector == "object"){
				if(selector.nodeType){ //if its a DOMElement, return it
					return [selector];
				}
			}
		}
	};
})();