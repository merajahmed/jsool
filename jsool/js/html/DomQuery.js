//For performance testing
// var res;var s = +new Date; var i=10000;while(--i)res = js.html.DomQuery.get("table tr .a");(+new Date) - s;
js.html.DomQuery = (function(){
	var selectorCache = {};
	var qTIR= /^(#)?([\w-\*]+)/; //Query Type Identifier Regexp
	var byIdRe = /^#([\w-]+)/;
	var byClassRe = /^\.([\w-]+)/;
	var byAttributeRe = /^\[([\w]+)(.*[=])?(\w+)?]/;
	var digitRe = /\{(\d+)\}/g;
	
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
	
	var attributeOperators = {
		"=": function(a, v){return a == v;},
	    "!=":function(a, v){return a != v;},
	    "^=":function(a, v){return a && a.substr(0, v.length) == v;},
	    "$=":function(a, v){return a && a.substr(a.length-v.length) == v;},
	    "*=":function(a, v){return a && a.indexOf(v) !== -1;},
	    "%=":function(a, v){return (parseInt(a) % parseInt(v)) == 0;},
	    "|=":function(a, v){return a && (a == v || a.substr(0, v.length+1) == v+'-');},
	    "~=":function(a, v){return a && (' '+a+' ').indexOf(' '+v+' ') != -1;}
	};
	
	function byAttribute(ctx,attr,operation,value){
		var result=[], val;
		attr = attr == "className" ? "class" : attr;
		op = attributeOperators[operation];
		for(var i = 0, node; node = ctx[i++];){
			if(attr == "href"){
				val = node.getAttribute("href",2);
			}else{
				val = node.getAttribute(attr);
			}
			if((op && op(val, value)) || (!op && val)){
				result.push(node);
			}
		}
		return result;
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
		var found = false;
		while(selector.length > 0){
			if(selector.charAt(0) == ' '){
				fn.push('ctx=getNodes(ctx);');
			}
			selector = selector.trim();
			if((m = selector.match(byIdRe))){
				fn.push('ctx=byId(ctx,"'+m[1]+'");');
				selector = selector.replace(m[0],"");
				found = true;
			}else
			
			if((m = selector.match(byClassRe))){
				fn.push('ctx=byClass(ctx,"'+m[1]+'");');
				selector = selector.replace(m[0],"");
				found = true;
			}else
			
			if((m = selector.match(/^([\w-]+)/))){
				fn.push('ctx=byTag(ctx,"'+m[1]+'");');
				selector = selector.replace(m[0],"");
				found = true;
			}else
			
			if((m = selector.match(byAttributeRe))){
				fn.push("ctx=byAttribute(ctx,\"{1}\",\"{2}\",\"{3}\");".replace(digitRe,function(macth, index){
					return m[index];
				}));
				selector = selector.replace(m[0],"");
				found = true;
			}
			
			if(!found){
				throw new js.core.Exception("Error while compiling query: "+selector);
			}
			found = false;
		}
		fn.push('return ctx;};');
		eval(fn.join(''));
		return query;
	}
	
	/**
	 * Returns the elements that match the providen selector
	 */
	return function(selector, context){
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
	};
})();