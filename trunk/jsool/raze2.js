(function build_raze_2(raze){
	if(!raze){
		window.Raze = {};
		raze = window.Raze; 
	}
	var qTIR= /^(#|\.)?([\w-\*]+)/, //Query Type Identifier Regexp
		byIdRe = /^#([\w-]+)/,//is an ID?
		byClassRe = /^\.([\w-]+)/,//is a Class?
		byAttributeRe = /^\[([\w-]+)(.{0,1}[=><])?([\w\d\s-\.]+)?]/,//is an Attribute?
		pseudoRe = /^:(\w+(-child)?)(\((.+)\))?/,//is it a Pseudo?
		plainTagRe = /^([\w-]+)/,//is it a plain tag?
		e="",
		cache = {
			filter:{},
			selector:{}
		},
		counter=0,
		IE = String(navigator.userAgent).toUpperCase().indexOf("MSIE") >= 0;
	
	
	
	//FUNCTIONS
	var
	fnGetNodes = "\nif(ctx.getElementsByTagName){ctx=ctx.getElementsByTagName(\"$\");}else{ns=[];cs;for(i=0,n;n=ctx[i++];){"+
	"cs = n.getElementsByTagName(\"$\");for(j = 0, ch; ch = cs[j++];){ns.push(ch);}}ctx=ns;}\n",
	
	fnByClass = "\nr=[];for(var i=0,n;n=ctx[i++];){if(n.className.match(\"\\\\b\$\\\\b\")){r.push(n);}}ctx=r;\n",
	
	fnById = "\nr=[];if(ctx.nodeType&&ctx.id==\"$\"){r=[ctx];}else{for(i=0,n;n=ctx[i++];){if(n.id==\"$\"){r=[n];}}}ctx=r;\n",
	
	fnGetId = "\nif(ctx.getElementById){ctx=[ctx.getElementById(\"$\")];}else{"+fnGetNodes.replace(/[$]/g,"*")+fnById+"}",
	
	fnGetClass;
	
	if(document.getElementsByClassName){
		fnGetClass="\nif(ctx.getElementsByClassName){ctx=ctx.getElementsByClassName(\"$\");}else{r=[];for(i=0,n;n=ctx[i++];){ns=n.getElementsByClassName(\"$\");for(j=0,ch;ch=ns[j++];){r.push(ch);}}ctx=r};\n";
	}else{
		fnGetClass= fnGetNodes.replace(/[$]/g, "*") + fnByClass;
	}
	
	function contains(arr,el){
		if(!arr)return false;
		
		for(var i=0,e;e=arr[i++];){
			if(e == el)
				return true;
		}
		return false;
	}	
	
	function isNth(el, n){
		var ns = el.parentNode.childNodes,i=0,j=0,e;
		while((e=ns[i++])){
			if(e.nodeType === 1){
				if(n==j && e == el)return true;
				j++;
			}
		}
		return false;
	}
	
	var pseudos = {
		// The element if the root of the document
		"root" : "!el.tagName===\"HTML\"",
		// The element if a numbered child
		"nth-child" : "isNth(el,$arg-1)",
		// The element if the first child of it's parent
		"first-child" : "isNth(el,0)",
		// The element has no children
		"empty" : "el.childNodes.length===0",
		// The element is enabled
		"enabled" : "el.enabled",
		// The element is disabled
		"disabled" : "!el.enabled",
		// The element is checked
		"checked" : "el.checked",
		// The element does not match a query
		"not" : "!contains(query(\"$arg\"),el)",
		// The element is selected
		"selected" : "el.selected"
	};
	
	/*
	 * Compiles the css selector into a nice function.
	 */
	function compile(sel){
		// Trim the selector 
		sel = sel.replace(/^\s*([\S\s]*?)\s*$/, '$1');
		// Replace attributes to optimized selectors 
		sel = sel.replace(/\[class==?([\w\d-_]*)]/g,'.$1');
		sel = sel.replace(/\[id==?([\w\d-_]*)]/g,'#$1');
		
		var t = /[$]/g,
		e = "", // IE bug fix
		filters = sel.split(/\s+/),
		o,
		m,
		fn,
		// Function header
		/*
		 * var q = function raze2Query$0(ctx){
		 * 		ctx = ctx || window.document; // make sure theres a context
		 * 		var cs,ns,f,i,n,j,ch,r,at; //Pre define used variables
		 */
		s=["var q=function raze2Query$",++counter,"(ctx){ctx = ctx || window.document;var cs,ns,f,i,n,j,ch,r,at;"];
		
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
						// Get element by id
						fn.push(fnGetId.replace(t,m[2]));
					}else if(m[1]=="."){
						// Gets elements by class name
						fn.push(fnGetClass.replace(t,m[2]));
					}else{
						// Gets elements by tag name
						fn.push(fnGetNodes.replace(t,m[2]));
					}
					
					f=f.substring(m[0].length);
				}else{
					fn.push(fnGetNodes.replace(t,"*"));
				}

				//CREATE FILTERS
				if(f.length>0){
					var before;
					fn.push("{f=[];for(var a=0,el;el=ctx[a++];){if(");
					
					if(IE)fn.push("el.nodeType==1 &&");
					
					while(f.length>0){
						before = f;
						if((m=f.match(byIdRe))){
							// filters elements by it's ids
							fn.push("el.id=== \""+m[1]+"\"");
							f=f.substring(m[0].length);
						}else if((m=f.match(byClassRe))){
							// filters elements by it's class name
							fn.push("el.className.match(/\\b"+m[1]+"\\b/)");
							f=f.substring(m[0].length);
						}else if((m=f.match(byAttributeRe))){							
							// Filters elements by it's atributes
							var attr = m[1] == "class" ? "className" : m[1];
							fn.push("(at=(el[\""+attr+"\"]||el.getAttribute(\""+attr+"\")))");
							
							// If the attribute is being compared
							if(m[2]&&m[3]){
								switch(m[2]){
								case"=":
								case"==":
									fn.push(" && String(at)===\""+m[3]+"\"");
									break;
								case"^=":
									fn.push(" && String(at).substr(0,"+m[3].length+")===\""+m[3]+"\"");
									break;
								case"$=":
									fn.push(" && String(at).substr(0,el[\""+attr+"\"].length+"+m[3].length+") == \""+m[3]+"\"");
									break;
								case"*=":
									fn.push(" && String(at).indexOf(\""+m[3]+"\")!==-1");
									break;
								case ">=":
								case ">":
								case "<=":
								case "<":
								{
									if(m[3].match(/^\d+\.?\d+$/)){
										fn.push(" && at"+ m[2] +m[3]);
									}else{
										fn.push(" && String(at)"+ m[2] + "\"" +m[3]+"\"");
									}
									break;
								}
								default:
									fn.push(" && String(at)"+m[2]+"\""+m[3]+"\"");
									break;
								}
							}
							f=f.substring(m[0].length);
							
						}else if((m=f.match(pseudoRe))){// :first-child, :nth-child ...
							
							// Filters elements by using pseudo classes
							try{
								fn.push(pseudos[m[1]].replace("$arg",m[4]));
								f=f.substring(m[0].length);
							}catch(e){
								throw new (SyntaxError || Error)("unknown pseudo selector: "+sel+":"+m[1]);
							}
						}
						fn.push(" && ");
						if(before == f){
							throw new (SyntaxError ||  Error) ("syntax while compiling selector:\nselector: "+sel+"\ntolken: "+f+"\n");
						}
					}
					fn.push("true){f.push(el);}}ctx=f};");
				}
				cache.filter[o]=fn.join(e);
				s.push(cache.filter[o]);
			}
		}
		s.push("return ctx;};");
		// Compiles the function into q variable
		eval(s.join(e));
		return q;
	}
	
	/*
	 * Compiles the selector and execute the query
	 */
	function query(selector, context){
		
		// Make sure the selector is a String
		if(typeof selector == "string"){
			var result, results = [],
			/*
			 * Accepts multiple queries on a single String:
			 * 
			 * div.class, div#id
			 * 
			 * */
			parts = selector.split(','),
			compiled;
			
			for(var i=0, part;part=parts[i++];){
				// Checks if part of the selector is already compiled
				if(!(compiled = cache.selector[part])){
					
					// If not compiled, do it and cache
					compiled = compile(part);
					cache.selector[part] = compiled;
				}
				
				// Executes the compiled query
				result = compiled(context);
				
				// If its a single selector, return its results
				if(parts.length == 1){
					return result;
				}else{
				// If it's multiple selectors, stores it on a result array
					for(var j=0,r;r=result[j++];){
						results.push(r);
					}
				}
			}
			return results;
		}else if(typeof selector == "object"){
			if(selector.nodeType){ //if its a DOMElement, return it
					return [selector];
			}
		}
	}
	
	raze.query = query;
	raze.compile = function compileSelector(selector){
		if(!cache.selector[selector]){
			cache.selector[selector] = compile(selector);
		}
		return cache.selector[selector];
	};
	
	raze.queryNode = function queryNode(selector, context){
		var res = query(selector, context);
		return res[0] ? res[0] : null; 
	};
})();