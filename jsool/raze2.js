(function build_raze_2(raze){
	if(!raze){
		window.Raze = {};
		raze = window.Raze; 
	}
	var qTIR= /^(#|\.)?([\w-\*]+)/, //Query Type Identifier Regexp
		byIdRe = /^#([\w-]+)/,//is an ID?
		byClassRe = /^\.([\w-]+)/,//is a Class?
		byAttributeRe = /^\[([\w]+)(.*[=])?(.+)?]/,//is an Attribute?
		pseudoRe = /^:(\w+(-child)?)(\((.+)\))?/,//is it a Pseudo?
		plainTagRe = /^([\w-]+)/,//is it a plain tag?
		e="",
		cache = {
			filter:{},
			selector:{}
		};
	//FUNCTIONS
	var
	fnGetNodes = "\nif(ctx.getElementsByTagName){ctx=ctx.getElementsByTagName(\"$\");}else{ns=[];cs;for(i=0,n;n=ctx[i++];){"+
	"cs = n.getElementsByTagName(\"$\");for(j = 0, ch; ch = cs[j++];){ns.push(ch);}}ctx=ns;}\n",
	
	fnByClass = "\nr=[];for(var i=0,n;n=ctx[i++];){if(n.className.match(\"\\\\b\$\\\\b\")){r.push(n);}}ctx=r;\n",
	
	fnById = "\nr=[];if(ctx.nodeType&&ctx.id==\"$\"){r=[ctx];}else if(ctx.join){for(i=0,n;n=ctx[i++];){if(n.id==\"$\"){r=[n];}}}ctx=r;\n",
	
	fnGetId = "\nif(ctx.getElementById){ctx=[ctx.getElementById(\"$\")];}else{"+fnGetNodes.replace(/[$]/g,"*")+fnById+"}",
	
	fnGetClass;
	
	if(document.getElementsByClassName){
		fnGetClass="\nif(ctx.getElementsByClassName){ctx=ctx.getElementsByClassName(\"$\");}else if(ctx.join){r=[];for(i=0,n;n=ctx[i++];){ns=n.getElementsByTagName(\"$\");for(j=0,ch;ch=ns[j++];){r.push(ch);}}}ctx=r;\n";
	}else{
		fnGetClass= fnGetNodes + fnByClass;
	}
	
	function contains(arr,el){
		if(!arr)return false;
		
		for(var i=0,e;e=arr[i++];){
			if(e == el)
				return true;
		}
		return false;
	}
	
	var pseudos = {
		"root" : "!el.tagName.toUpperCase()===\"HTML\"",
		"nth-child": "el.parentNode.childNodes[$arg]===el",
		"first-child": "el.parentNode.childNodes[0]===el",
		"empty": "el.childNodes.length===0",
		"enabled": "el.enabled",
		"disabled": "!el.enabled",
		"checked": "el.checked",
		"not": "!contains(query(\"$arg\"),el)"
	};
	
	function compile(sel){
		sel = sel.replace(/\[class=(\w*)]/g,'.$1');
		sel = sel.replace(/\[id=(\w*)]/g,'#$1');
		
		var t = /[$]/g,
		filters = sel.split(/\s+/),
		o,
		m,
		fn,
		s=["var q=function(ctx){var cs,ns,filtered,i,n,j,ch,r;"];
		
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
					fn.push(fnGetNodes.replace(t,"*"));
				}
				
				//CREATE FILTERS
				if(f.length>0){
					var before;
					fn.push("{filtered=[];for(var a=0,el;el=ctx[a++];){if(");
					while(f.length>0){
						before = f;
						if((m=f.match(byIdRe))){
							fn.push("el.id == \""+m[1]+"\"");
							f=f.replace(m[0],e);
						}else if((m=f.match(byClassRe))){
							fn.push("el.className.match(/\\b"+m[1]+"\\b/)");
							f=f.replace(m[0],e);
						}else if((m=f.match(plainTagRe))){
							fn.push("el.tagName===\""+m[1].toUpperCase()+"\"");
							f=f.replace(m[0],e);
						}else if((m=f.match(byAttributeRe))){
							var attr = m[1] == "class" ? "className" : m[1];
							fn.push("el[\""+attr+"\"]");
							if(m[2]&&m[3]){
								switch(m[2]){
								case"=":
									fn.push(" && String(el[\""+attr+"\"])===\""+m[3]+"\"");
									break;
								case"^=":
									fn.push(" && el[\""+attr+"\"].substr(0,"+m[3].length+")===\""+m[3]+"\"");
									break;
								case"$=":
									fn.push(" && el[\""+attr+"\"].substr(0,el[\""+attr+"\"].length+"+m[3].length+") == \""+m[3]+"\"");
									break;
								case"*=":
									fn.push(" && el[\""+attr+"\"].indexOf(\""+m[3]+"\")!==-1");
									break;
								default:
									fn.push(" && el[\""+attr+"\"]"+m[2]+"\""+m[3]+"\"");
									break;
								}
							}
							f=f.replace(m[0],e);
						}else if((m=f.match(pseudoRe))){
							fn.push(pseudos[m[1]].replace("$arg",m[4]));
							f=f.replace(m[0],e);
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
		s.push("return ctx;};");
		eval(s.join(e));
		return q;
	}
	
	function query(selector, context){
		context = context || window.document;
		
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
	
	raze.query = query;
	raze.compile = function(selector){
		if(!cache.selector[selector]){
			cache.selector[selector] = compile(selector);
		}
		return cache.selector[selector];
	};
	
	raze.queryNode = function(selector, context){
		var res = query(selector, context);
		return res[0] ? res[0] : null; 
	};
})();