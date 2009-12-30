(function build_raze_2(raze){
	if(!raze){
		window.Raze = {};
		raze = window.Raze; 
	}
	var qTIR= /^(#|\.)?([\w-\*]+)/, //Query Type Identifier Regexp
		byIdRe = /^#([\w-]+)/,//is an ID?
		byClassRe = /^\.([\w-]+)/,//is a Class?
		byAttributeRe = /^\[([\w]+)(.*[=])?(\w+)?]/,//is an Attribute? 
		digitRe = /\{(\d+)\}/g,// is it like {1} ??
		pseudoRe = /^:(\w+(-child)?)(\((\w+)\))?/,//is it a Pseudo?
		plainTagRe = /^([\w-]+)/,//is it a plain tag?
		features = null,
		e="",
		ready = false,
		cache = {
			filter:{},
			selector:{},
			query:{}
		};
	//FUNCTIONS
	var fnGetTag,
		fnGetClass,
		fnGetId,
		fnByClass;
	
	function clearCache(){
		queryCache = {};
	}
	
	function compile(sel){
		sel = sel.replace(/\[class=(\w*)]/g,'.$1');
		sel = sel.replace(/\[id=(\w*)]/g,'#$1');
		
		var t = /[$]/g,
		filters = sel.split(/\s+/),
		o,
		m,
		fn,
		s=["var q=function(ctx){"];
		
		for(var i=0,f;f=filters[i++];){			
			if(cache.filter[f]){
				s.push(cache.filter[f]);
			}else{
				//Create basic "GETS"
				o=f;
				fn = [];
				m = f.match(qTIR);
				if(m){
					if(m[1]=="#"){
						fn.push(fnGetId.replace(t,m[2]));
					}else if(m[1]=="."){
						fn.push(fnGetClass.replace(t,m[2]));
					}else{
						fn.push(fnGetNodes.replace(t,m[2]));
					}
					f = f.replace(m[0],e);
				}else{
					fn.push(fnGetNodes.replace(t,"*"))
				}
				
				//CREATE FILTERS
				if(f.length>0){
					var before;
					fn.push("{var filtered=[];for(var a=0,el;el=ctx[a++];){if(");
					while(f.length>0){
						before = f;
						if((m=f.match(byIdRe))){
							fn.push("el.id == \""+m[1]+"\"");
							f=f.replace(m[0],e);
						}else if((m=f.match(byClassRe))){
							fn.push("typeof el.className===\"string\" && el.className.match(/\\b"+m[1]+"\\b/)");
							f=f.replace(m[0],e);
						}else if((m=f.match(plainTagRe))){
							fn.push("el.tagName===\""+m[1].toUpperCase()+"\"");
							f=f.replace(m[0],e);
						}else if((m=f.match(byAttributeRe))){
							var attr = m[1] == "class" ? "className" : m[1];
							fn.push("el[\""+attr+"\"]");
							if(m[3]){								
								fn.push(" && String(el[\""+attr+"\"])"+m[2].replace(/^[=]$/,"==")+"\""+m[3]+"\"");
							}
							f=f.replace(m[0],e);
						}else if((m=f.match(pseudoRe))){
							fn.push("true");//NO IMPLEMENTED BY NOW
						}
						fn.push(" && ");
						if(before == f){
							throw new Error("Syntax error: "+f);
						}
					}
					fn.push("true){filtered.push(el);}}ctx=filtered};");
				}
				cache.filter[o]=fn.join(e);
				s.push(cache.filter[o]);
			}
		}
		s.push("return ctx;};")
		eval(s.join(e));
		return q;
	}
	
	function query(selector, context){
		context = context || window.document;
		if(!ready){
			createFunctions();
			ready=true;
		}
		
		if(typeof selector == "string"){
			var result, results = [],
			parts = selector.split(','),
			compiled;
			
			for(var i=0, part;part=parts[i++];){
				if(!(compiled = cache.selector[part])){
					compiled = compile(part);
					cache.selector[part] = compiled;
				}
				
				result = compiled(context);
				
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
	
	function createFunctions(){
		var features = detectFeatures();
		
		//GENERAL FUNCTIONS
		fnGetNodes = "\nif(ctx.getElementsByTagName){ctx=ctx.getElementsByTagName(\"$\");}else{var ns=[];var cs;for(var i=0,n;n=ctx[i++];){"+
		"cs = n.getElementsByTagName(\"$\");for(var j = 0, ch; ch = cs[j++];){ns.push(ch);}}ctx=ns;}\n";
		
		fnByClass = "\nvar r=[];for(var i=0,n;n=ctx[i++];){if(typeof n.className===\"string\" && n.className.match(\"\\\\b\$\\\\b\")){r.push(n);}}ctx=r;\n";
		
		fnById = "\nvar r=[];if(ctx.nodeType&&ctx.id==\"$\"){r=[ctx];}else if(ctx.join){for(var i=0,n;n=ctx[i++];){if(n.id==\"$\"){r=[n];}}}ctx=r;\n"
		
		fnGetId = "\nif(ctx.nodeType&&ctx.nodeType===9){ctx=[ctx.getElementById(\"$\")];}else{"+fnGetNodes.replace(/[$]/g,"*")+fnById+"}";
		
		if(features.getClassName){
			fnGetClass="\nif(ctx.nodeType){ctx=ctx.getElementsByClassName(\"$\");}else if(ctx.join){var r=[];for(var i=0,n;n=ctx[i++];){var ns=n.getElementsByTagName(\"$\");for(var j=0,ch;ch=ns[j++];){r.push(ch);}}}ctx=r;\n"
		}else{
			fnGetClass= fnGetNodes + fnByClass;
		}
	}
	
	function detectFeatures(){
		var doc = window.document;
		var span = doc.createElement('span');
		span.innerHTML = "<span class=\"_jsool_domquery_\" id=\"_jsool_domquery_\">&#160;</span>";
		span.appendChild(doc.createComment('test'));
		
		var features = {};
				
		//Detects if browser implements element.getElementsByClassName
		features.getClassName = span.getElementsByClassName && span.getElementsByClassName("_jsool_domquery_").length > 0;

		/*
		
		//detects if browser gets comments when query for "universal tag"
		features.getsComments = span.getElementsByTagName && span.getElementsByTagName('*').length > 1;
		
		//Detects if this browser implements querySelectorAll
		features.querySelector = false && span.querySelectorAll && span.querySelectorAll('#_jsool_domquery_').length > 0;
		
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
		
		
		*/
		return features;
	}
	
	raze.query = query;
	raze.compile = function(selector){
		if(!cache.selector[selector]){
			cache.selector[selector] = compile(selector);
		}
		return cache.selector[selector];
	};
	
	raze.queryNode = function(selector, context){
		var res = query(selector, context);
		if(res[0]){
			return res[0];
		}else{
			return null;
		}
	};
})();