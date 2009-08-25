//For performance testing
// var res;var s = +new Date; var i=10000;while(--i)res = js.html.DomQuery.get("table tr .a");(+new Date) - s;
js.html.DomQuery = (function(){
	var selectorCache = {};
	var qTIR= /^(#)?([\w-\*]+)/;//Query Type Identifier Regexp
	var byIdRe = /^#([\w-]+)/;
	var byClassRe = /^\.([\w-]+)/;
	
	function getId(ctx, id){
		if(ctx.getElementById){
			return [ctx.getElementById(id)];
		}
		var nodes = getNodes(ctx);
		return byId(nodes, id);
	}
	
	function getNodes(ctx, tag){
		var nodes = [];
		var childs;
		if(typeof ctx.getElementsByTagName != "undefined"){
			ctx = [ctx];
        }
		tag = tag || "*";
		for(var i = 0, node; node = ctx[i++];){
			childs = node.getElementsByTagName(tag);
			for(var j = 0, child; child = childs[j++];){
				nodes.push(child);
			}
		}
		return nodes;
	}
	
	function byTag(ctx, tag){
		if(!tag){
			return ctx;
		}
		tag = tag.toUpperCase();
		if(ctx.nodeType){
			ctx = [ctx];
		}
		var nodes = [];
		for(var i = 0, node; node = ctx[i++];){
			if(node.nodeType == 1 && node.tagName == tag){
				nodes.push(node);
			}
		}
		return nodes;
	}
	
	function byId(ctx, id){
		if(ctx.nodeType){
			ctx = [ctx];
		}
		for(var i = 0, node; node = ctx[i++];){
			if(node.id == id){
				return [node];
			}
		}
		return [];
	}
	
	function byClass(ctx, cls){
		var nodes = [];
		for(var i = 0, node; node = ctx[i++];){
			if(node.className == cls){
				nodes.push(node);
			}
		}
		return nodes;
	}
	
	/**
	 * Implementation inspired by ExtJs DomQuery
	 */
	function compile(selector){
		var batch = [];
		var m = selector.match(qTIR);
		var fn = ['var query = function(ctx){ '];
		if(m){
			if(m[1] == "#"){
				fn.push('ctx=getId(ctx,"'+m[2]+'");');
			}else{
				fn.push('ctx=getNodes(ctx,"'+m[2]+'");');				
			}
			selector = selector.replace(m[0], "");
		}else{
			fn.push('ctx=getNodes(ctx,"*");');
		}
		
		while(selector.length > 0){
			if(selector.charAt(0) == ' '){
				fn.push('ctx=getNodes(ctx);');
			}
			selector = selector.trim();
			if((m = selector.match(byIdRe))){
				fn.push('ctx=byId(ctx,"'+m[1]+'");');
				selector = selector.replace(m[0],"");
			}else
			
			if((m = selector.match(byClassRe))){
				fn.push('ctx=byClass(ctx,"'+m[1]+'");');
				selector = selector.replace(m[0],"");
			}else
			
			if((m = selector.match(/^([\w-]+)/))){
				fn.push('ctx=byTag(ctx,"'+m[1]+'");');
				selector = selector.replace(m[0],"");
			}else{
				throw new js.core.Exception("Error while compiling query: "+selector);
			}
		}
		fn.push('return ctx;};');
		var i = 10000;
		eval(fn.join(''));
		return query;
	}
	
	return {
		/**
		 * Returns the elements that match the providen selector
		 */
		get: function(selector, context){
			selector = selector || document;//assure that theres a selector
			context = context || document;//assure that thres a context
			
			if(typeof selector == "string"){
				selector = selector.trim();
				
				var batch, result, results = [];
				var parts = selector.split(',');
				
				for(var i = 0, part;part = parts[i++];){
					part = part.trim();
					if(!(batch = selectorCache[part])){
						batch = compile(part);
						selectorCache[part] = batch;
					}
					result = batch(context);
					if(parts.length == 1){
						return result;
					}else{
						results = results.concat(result);
					}
				}
				return results;
			}else if(typeof selector == "object"){
				if(selector.nodeType){ //if its a DOMElement, return it
					return [selector];
				}
			}
		}
	};
})();