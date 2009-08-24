//for some help
//http://extjs.com/deploy/dev/ext-all-debug.js
//var s = jsool.time();for(var i = 0; i < 5000; i++)var res = js.html.DomQuery.get('tr.a');jsool.time() - s;
//var s = jsool.time();for(var i = 0; i < 5000; i++)var res = document.querySelectorAll('tr.a');jsool.time() - s;
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
	
	function getClass(ctx, cls){
		var nodes = getNodes(ctx);
		var res = [], ind = 0;
		for(var i = 0, ci; ci = nodes[i];i++){
			if(ci && ci.className === cls)
				res[ind++] = ci;
		}
		return res;
	}
	
	function getNodes(ctx, tagname){
		tagname = tagname || "*";
		if(ctx.getElementsByTagName)
			return ctx.getElementsByTagName(tagname);
		
		if(tagname == "*")
			return ctx;
		tagname = tagname.toLowerCase();		
		var res = [], int = 0;
		for(var i = 0, ci; ci = ctx[i];i++){
			if(ci && ci.tagName.toLowerCase() === tagname)
				res[ind++] = ci;
		}
		return res;
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
		//get the first real context
		if(m){//match something
			if(m[1] == "#"){//Its an Id
				res.push({
					query: m[2],
					filter: startWithId
				});
			}else if(m[1] == "."){//Its a class
				res.push({
					query: m[2],
					filter: getClass
				});
			}else{//Its a tag
				res.push({
					query: m[2],
					filter: getNodes
				});
			}
			selector = selector.replace(m[0],'');
		}
		
		while(selector.length > 0){
			m = selector.match(qTIR);
			if(m[1] == "#"){//Its an Id
				res.push({
					query: m[2],
					filter: getId
				});
			}else if(m[1] == "."){//Its a class
				res.push({
					query: m[2],
					filter: getClass
				});
			}else{//Its a tag
				res.push({
					query: m[2],
					filter: getNodes
				});
			}
			selector = selector.replace(m[0],'');
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
				var compiled = selectorCache[selector];
				if(!compiled){
					selector = selector.trim();
					compiled = compile(selector);
					selectorCache[selector] = compiled;
				}
				var res = runQuery(compiled, context);
				return res;
			}else if(typeof selector == "object"){
				if(selector.nodeType){ //if its a DOMElement, return it
					return [selector];
				}
			}
		}
	};
})();