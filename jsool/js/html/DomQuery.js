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

//For performance testing
// var res;var s = +new Date; var i=10000;while(--i)res = js.html.DomQuery.get("table tr .a");(+new Date) - s;
// REFERENCE
// http://www.w3.org/TR/2005/WD-css3-selectors-20051215/#selectors
js.html.DomQuery = (function(){
	var selectorCache = {};
	var qTIR= /^(#)?([\w-\*]+)/; //Query Type Identifier Regexp
	var byIdRe = /^#([\w-]+)/;
	var byClassRe = /^\.([\w-]+)/;
	var byAttributeRe = /^\[([\w]+)(.*[=])?(\w+)?]/;
	var digitRe = /\{(\d+)\}/g;
	var pseudoRe = /^:[\w]+(-[\w]+)?(\(.+\))?/;
	var plainTagRe = /^([\w-]+)/;
	
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
			if(node.tagName === tag){
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
	
	var pseudo = {
		'root':null
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
		var fn = ['var query=function(ctx){'];
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
			if(selector.charAt(0) == ' '){// "Sub select"
				selector = selector.trim();
				
				if((m = selector.match(plainTagRe))){
					fn.push('ctx=getNodes(ctx,"'+m[1]+'");');
					selector = selector.replace(m[0],"");
				}else{
					fn.push('ctx=getNodes(ctx);');	
				}
				
				found = true;
				
			}else if((m = selector.match(byIdRe))){// Filter ID
				
				fn.push('ctx=byId(ctx,"'+m[1]+'");');
				selector = selector.replace(m[0],"");
				found = true;
				
			}else if((m = selector.match(byClassRe))){//filter class name
				
				fn.push('ctx=byClass(ctx,"'+m[1]+'");');
				selector = selector.replace(m[0],"");
				found = true;
				
			}else if((m = selector.match(plainTagRe))){// filter tag
				
				fn.push('ctx=byTag(ctx,"'+m[1]+'");');
				selector = selector.replace(m[0],"");
				found = true;
				
			}else if((m = selector.match(byAttributeRe))){// filter by attribute
				
				fn.push("ctx=byAttribute(ctx,\"{1}\",\"{2}\",\"{3}\");".replace(digitRe,function(macth, index){
					return m[index];
				}));
				
				selector = selector.replace(m[0],"");
				found = true;
			}/*else
				
			if((m = selector.match(pseudoRe))){
				selector = selector.replace(m[0],"");
				found = true;
			}*/
			
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
	return{ 
		query: function(selector, context){
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
		},
		wrap: function(selector, context){
			var query = js.html.DomQuery.query(selector, context);
			var result = [];
			var El = js.html.Element;
			
			for(var i = 0, item;item = query[i++];){
				result.push(El.get(item));
			}
			
			return result;
		}
	};
})();