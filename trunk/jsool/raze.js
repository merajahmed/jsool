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
	var selectorCache = {};//Cache the query functions
	var queryCache = {};//Smart query cache
	var qTIR= /^(#|\.)?([\w-\*]+)/; //Query Type Identifier Regexp
	var byIdRe = /^#([\w-]+)/;//is an ID?
	var byClassRe = /^\.([\w-]+)/;//is a Class?
	var byAttributeRe = /^\[([\w]+)(.*[=])?(\w+)?]/;//is an Attribute? 
	var digitRe = /\{(\d+)\}/g;// is it like {1} ??
	var pseudoRe = /^:(\w+(-child)?)(\((\w+)\))?/;//is it a Pseudo?
	var plainTagRe = /^([\w-]+)/;//is it a plain tag?
	var features = null;
	
	/**
	 * Clears the smart cache
	 */
	function clearCache(){
		queryCache = {};
	}
	
	/**
	 * Removes white spaces in the begin and the end of a string
	 */
	function trim(string){
		return string.replace(/^\s*([\S\s]*?)\s*$/,'$1');
	}
	
	/**
	 * Gets elements of "id" from a root node
	 */
	function getId(ctx, id){
		if(ctx.nodeType&&ctx.nodeType===9){
			return [ctx.getElementById(id)];
		}
		var ns = getNodes(ctx);
		return byId(ns, id);
	}
	
	/**
	 * Get elements of "tag" from a root element
	 */
	function getNodes(ctx, tag){
		if(ctx.getElementsByTagName){
			return ctx.getElementsByTagName(tag);
        }
		var ns = [];
		var cs;
		for(var i=0,n;n=ctx[i++];){
			cs = n.getElementsByTagName(tag);
			for(var j = 0, ch; ch = cs[j++];){
				ns.push(ch);
			}
		}
		return ns;
	}
	
	/**
	 * Gets elements of "cls" from a root element
	 */
	function getClass(ctx, cls){
		if(features.getClassName){
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
				res.push(n);
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
				res.push(n);
			}
		}
		return res;
	}
	
	/**
	 * Operators that will be used on byAttribute filter
	 */
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
				res.push(n);
			}
		}
		return res;
	}
	
	/**
	 * Gets the next element from a reference
	 */
    function next(n){
        while((n = n.nextSibling) && n.nodeType != 1);
        return n;
    }

    /**
	 * Gets the previous element frm a reference
	 */
    function prev(n){
        while((n = n.previousSibling) && n.nodeType != 1);
        return n;
    };
	
	/**
     * Pseudo operators
     */
	var pseudos = {
		'first-child':function(n){			
			while(n = n.previousSibling){
				if(n.nodeType == 1){
					return false;
				}
			}
			return true;
		},
		'last-child':function(n){
			while(n = n.nextSibling){
				if(n.nodeType == 1){
					return false;
				}
			}
			return true;
		},
		'only-child':function(n){
			var prev = n;
			while ((prev = prev.previousSibling)) {
				if (prev.nodeType === 1) return false;
			}
			var next = n;
			while ((next = next.nextSibling)) {
				if (next.nodeType === 1) return false;
			}
			return true;
		},
		'nth-child':function(n, nth){
			var i=0,j=-1,c,cs = n.parentNode.childNodes;
			while(c=cs[i++]){
				if(c.nodeType === 1){
					j+=1;
					if(j==nth && c==n){
						return true;
					}else if(j>nth){
						return false;
					}
				}
			}
			return false;
		},
		'empty':function(n){
			return !(n.innerText || n.textContent || '').length;
		},
		'checked': function(n){
			return n.checked;
		},
		'disabled': function(n){
			return n.disabled;
		},
		'enabled': function(n){
			return !n.disabled;
		}
	};
	
	/**
	 * Filters context by a pseudo-class
	 */
	function byPseudo(ctx,pseudo,arg){
		var res=[];
		for(var i=0,n;n=ctx[i++];){
			if(pseudos[pseudo](n,arg))res.push(n);
		}
		return res;
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
				for(var n = 0,m;m = ns[n++];){
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
		//TODO false to test my codes
		features.querySelector = false && span.querySelectorAll && span.querySelectorAll('#_jsool_domquery_').length > 0;
		
		//Detects if browser implements element.getElementsByClassName
		features.getClassName = span.getElementsByClassName && span.getElementsByClassName("_jsool_domquery_").length > 0;
		
		//detects if browser gets comments when query for "universal tag"
		features.getsComments = span.getElementsByTagName && span.getElementsByTagName('*').length > 1;
		
		var ua = navigator.userAgent.toString().toUpperCase();
		var isIE = ua.indexOf("MSIE") != -1;
		var isWebKit = ua.indexOf("WEBKIT") != -1;
		
		features.useCache = !isIE && !isWebKit;
		if(features.useCache){
			var addEvent = document.addEventListener || document.attachEvent;
			addEvent("DOMAttrModified", clearCache, false);
			addEvent("DOMNodeInserted", clearCache, false);
			addEvent("DOMNodeRemoved", clearCache, false);
		}
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
		var fn = ['var q=function(ctx){'];
		var m;//Regexp match
		/*
		 * Use native query selector wisely
		 * Its not efficient to one member queries
		 */
		if(features.querySelector && sel.split(/\s+/).length > 1){
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
		return q;
	}
	
	/**
	 * Gets previous results from smart cache
	 */
	function getCache(selector, context){
		var cache = queryCache[selector];
		if(!cache)return null;
		for(var i = 0, c;c=cache[i++];){
			if(equals(c.ctx,context)){
				return c.res;
			}
		}
		return null;
	}
	
	/**
	 * Executes a dom query
	 */
	function executeQuery(selector, context){
		var query;
		if(!(query = selectorCache[selector])){
			query = compile(selector);
			selectorCache[selector] = query;
		}
		
		if(features.useCache){
			var cache;
			if(!(cache = queryCache[selector])){
				cache = [];
				queryCache[selector] = cache;
			}
			
			var res = getCache(selector, context);
			if(!res){
				res = query(context);
				cache.push({ctx:context,res:res});
			}
			return res;
		}else{
			return query(context);
		}
	}
	
	/**
	 * Checks if two objects or Arrays are equal
	 */
	function equals(a,b){
		if(a == b){
			return true;
		}else if(a.constructor == Array && b.constructor == Array){
			var i = 0;
			while(a[i] == b[i] && (i < a.length && i < b.length))i++;
			return i == a.length && i == b.length;
		}else{
			return false;
		}
	}
	
	
	return{
		/**
		 * Returns the elements that match the providen selector
		 */
		query: function(selector, context){
			selector = selector || document;//assure that theres a selector
			context = context || document;//assure that thres a context
			
			if(typeof selector == "string"){
				var result, results = [];
				var parts = selector.split(',');
				
				for(var i = 0, part;part = parts[i++];){
					result = executeQuery(part, context);
					
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
		queryNode: function(selector, context){
			var ns = Raze.query(selector, context);
			return ns.length > 0 ? ns[0] : null;
		},
		/**
		 * Used while developmento to debug performance
		 */
		test: function(selector,context){
			var res;var s = +new Date; var i=1000;while(--i)res = Raze.query(selector,context);
			return res;
		}
	};
})();