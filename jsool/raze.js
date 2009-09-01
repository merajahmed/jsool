/*  Raze - Javascript CSS Selector Engine  
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
 *      * Neither the name of Raze nor the names of its
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
// var res;var s = +new Date; var i=1000;while(--i)res = Raze.query("table tr .a");(+new Date) - s;
// REFERENCE
// http://www.w3.org/TR/2005/WD-css3-selectors-20051215/#selectors
var Raze = (function(){
	var selectorCache = {};
	var qTIR= /^(#|\.)?([\w-\*]+)/; //Query Type Identifier Regexp
	var byIdRe = /^#([\w-]+)/;
	var byClassRe = /^\.([\w-]+)/;
	var byAttributeRe = /^\[([\w]+)(.*[=])?(\w+)?]/;
	var digitRe = /\{(\d+)\}/g;
	var pseudoRe = /^:(\w+(-child)?)(\((\w+)\))?/;
	var plainTagRe = /^([\w-]+)/;
	var features = null;
	
	function trim(string){
		return string.replace(/^\s*([\S\s]*?)\s*$/,'$1');
	}
	
	function getId(ctx, id){
		if(ctx.getElementById){
			return [ctx.getElementById(id)];
		}
		var ns = getNodes(ctx);
		return byId(ns, id);
	}
	
	function getNodes(ctx, tag){
		tag = tag || "*";
		if(typeof ctx.getElementsByTagName != "undefined"){
			return ctx.getElementsByTagName(tag);
        }
		var ns = [];
		var cs;
		for(var i = 0, n; n = ctx[i++];){
			cs = n.getElementsByTagName(tag);
			for(var j = 0, ch; ch = cs[j++];){
				ns.push(ch);
			}
		}
		return ns;
	}
	
	function getClass(ctx, cls){
		if(features['GetClassName']){
			if(ctx.nodeType){
				return ctx.getElementsByClassName(cls);
			}else if(ctx.length){
				var res = [];
				for(var i = 0, n; n = ctx[i++];){
					var ns = n.getElementsByClassName(cls);
					for(var j = 0, ch; ch = ns[j++];){
						res.push(ch);
					}
				}
				return res;
			}
		}
		var nodes = getNodes(ctx);
		return byClass(nodes, cls);
	}
	
	/**
	 * Filter context by tag name
	 */
	function byTag(ctx, tag){
		if(!tag){
			return ctx;
		}
		tag = tag.toUpperCase();
		if(ctx.nodeType){
			ctx = [ctx];
		}
		var res = [];
		for(var i = 0, n; n = ctx[i++];){
			if(n.tagName === tag){
				res.push(node);
			}
		}
		return res;
	}
	
	/**
	 * Filter context by id
	 */
	function byId(ctx, id){
		if(ctx.nodeType){
			ctx = [ctx];
		}
		for(var i = 0, n; n = ctx[i++];){
			if(n.id == id){
				return [n];
			}
		}
		return [];
	}
	
	/**
	 * Filter context by class name
	 */
	function byClass(ctx, cls){
		var res = [];
		for(var i = 0, n; n = ctx[i++];){
			if(n.className == cls){
				res.push(node);
			}
		}
		return res;
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
	
	/**
	 * Filter by attribute
	 */
	function byAttribute(ctx,attr,operation,value){
		var res=[], val;
		attr = attr == "className" ? "class" : attr;
		op = attributeOperators[operation];
		for(var i = 0, n; n = ctx[i++];){
			if(attr == "href"){
				val = n.getAttribute("href",2);
			}else{
				val = n.getAttribute(attr);
			}
			if((op && op(val, value)) || (!op && val)){
				res.push(node);
			}
		}
		return result;
	}
	
    function next(n){
        while((n = n.nextSibling) && n.nodeType != 1);
        return n;
    };

    function prev(n){
        while((n = n.previousSibling) && n.nodeType != 1);
        return n;
    };
	
	var pseudos = {
			'first-child':function(ctx){
				var res = [],f;
				for(var i = 0,n;n = ctx[i++];){
					if((f = n.firstChild)){
						res.push(f);
					}
				}
				return res;
			},
			'last-child':function(ctx){
				var res = [],l;
				for(var i = 0,n;n = ctx[i++];){
					if((l = n.lastChild)){
						res.push(l);
					}
				}
				return res;
			},
			'only-child':function(ctx){
				var res = [];
				for(var i = 0,n;n = ctx[i++];){
					if(!prev(n) && !next(n)){
						res.push(n);
					}
				}
				return res;
			},
			'nth-child':function(ctx, n){},
			'empty':function(ctx){
				var res=[];
				for(var i = 0,n;n = ctx[i++];){
					if(n.innerHTML == ""){
						res.push(n);
					}
				}
				return res;
			}
		};
	
	function byPseudo(ctx,pseudo,arg){
		return pseudos[pseudo](ctx,arg);
	}
	
	/**
	 * Uses browser query selector
	 */
	function querySelector(ctx, sel){
		if(ctx.querySelectorAll){
			return ctx.querySelectorAll(sel);
		}else if(ctx.length){
			var res = [], ns;
			for(var i = 0, n; n = ctx[i++];){
				ns = n.querySelectorAll(sel);
				for(var m = 0,m;m = ns[n++];){
					res.push(m);
				}
			}
			return res;
		}else{
			return [ctx];
		}
	}
	
	/**
	 * Detects some browser features
	 */
	function detectFeatures(){
		var doc = window.document;
		var span = doc.createElement('span');
		span.innerHTML = "<span class=\"_jsool_domquery_\" id=\"_jsool_domquery_\">&#160;</span>";
		span.appendChild(doc.createComment('test'));
		
		features = {};
		//Detects if this browser implements querySelectorAll
		features['QuerySelector'] = span.querySelectorAll && span.querySelectorAll('#_jsool_domquery_').length > 0;
		
		//Detects if browser implements element.getElementsByClassName
		features['GetClassName'] = span.getElementsByClassName && span.getElementsByClassName("_jsool_domquery_").length > 0;
		
		//detects if browser gets comments when query for "universal tag"
		features['GetsComments'] = span.getElementsByTagName && span.getElementsByTagName('*').length > 1;
	}
	
	/**
	 * Implementation inspired by ExtJs DomQuery
	 */
	function compile(sel){
		//To use optimized functions
		sel = sel.replace(/\[class=(\w*)]/g,'.$1');
		sel = sel.replace(/\[id=(\w*)]/g,'#$1');
		
		//Detect current browser features
		if(!features){detectFeatures();}
		
		//The header of the function
		var fn = ['var query=function(ctx){'];
		
		var m;//Regexp match
		if(features['QuerySelector'] && !sel.match(/^(#|\.)?([\w-\*]+)$/)){//Use native query selector wisely
			var diff = sel.indexOf("!=");
			if(diff < 0){
				fn.push('ctx=querySelector(ctx,"'+sel+'");');
				sel = '';
			}else{
				var lastSpace = sel.lastIndexOf(' ');
				if(lastSpace < diff){
					var partial = sel.substring(lastSpace);
					fn.push('ctx=querySelector(ctx,"'+partial+'");');
					sel= sel.replace(partial,'');
				}
			}
		}else{
			m = sel.match(qTIR);
			if(m){
				if(m[1] == "#"){
					fn.push('ctx=getId(ctx,"'+m[2]+'");');
				}else if(m[1] == '.'){
					fn.push('ctx=getClass(ctx,"'+m[2]+'");');				
				}else{
					fn.push('ctx=getNodes(ctx,"'+m[2]+'");');
				}
				sel = sel.replace(m[0], "");
			}else{
				fn.push('ctx=getNodes(ctx,"*");');
			}
		}
		var before;
		while(sel.length > 0){
			before = sel;
			if(sel.charAt(0) == ' '){// "Sub select"
				sel= trim(sel);
				if((m = sel.match(plainTagRe))){
					fn.push('ctx=getNodes(ctx,"'+m[1]+'");');
					sel= sel.replace(m[0],"");
				}else{
					fn.push('ctx=getNodes(ctx);');	
				}
			}else if((m = sel.match(byIdRe))){// Filter ID
				fn.push('ctx=byId(ctx,"'+m[1]+'");');
				sel= sel.replace(m[0],"");
			}else if((m = sel.match(byClassRe))){//filter class name
				fn.push('ctx=byClass(ctx,"'+m[1]+'");');
				sel= sel.replace(m[0],"");
			}else if((m = sel.match(plainTagRe))){// filter tag
				fn.push('ctx=byTag(ctx,"'+m[1]+'");');
				sel= sel.replace(m[0],"");
			}else if((m = sel.match(byAttributeRe))){// filter by attribute
				fn.push("ctx=byAttribute(ctx,\"{1}\",\"{2}\",\"{3}\");".replace(digitRe,function(macth, index){
					return m[index];
				}));
				sel= sel.replace(m[0],"");
			}else if((m = sel.match(pseudoRe))){
				fn.push('ctx=byPseudo(ctx,"'+m[1]+'","'+m[4]+'");');
				sel= sel.replace(m[0],"");
			}
			if(before == sel){
				throw new js.core.Exception("Error while compiling query: "+selector);
			}
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
				selector = trim(selector);
				
				var result, results = [];
				var parts = selector.split(',');
				
				for(var i = 0, part;part = parts[i++];){
					part = trim(part);
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