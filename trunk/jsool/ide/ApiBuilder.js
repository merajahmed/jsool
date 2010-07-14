var api,builder;

jsool.onReady(function(){
	var g = jsool.get,
		chaves = /(void|boolean|true|false|function|var)/g,
		classe;
	
	//Contadores
	var cnt = 0,
		cntAtr = 0,
		cntStaMet = 0,
		cntMet = 0;
	
	//Campos padrao
	var pacote = g("pacote"),
		pai = g("pai"),
		classe = g("classe"),
		arquivo = g("arquivo"),
		descricao = g("descricao");
	
	//Botoes
	var addAtr = g("adicionaAtributoEstatico"),
		addStaMet = g("adicionaMetodoEstatico"),
		addMet = g("adicionaMetodo");
	
	//Grids
	var atr = g("atributosEstaticos"),
		staMet = g("metodosEstaticos"),
		met = g("metodos");
	
	//CODE=============================================
	var cell = {
		tag : "td",
		html: "<input type=\"text\" />"
	},
	remove = "<span class=\"remove\">[-]</span>";
	
	function lineRemover(ev){
		var t = ev.target,
			p = t.parentNode;
		if(p.tagName == "TR" && t.tagName == "SPAN"){
			this.remove(p);
		}
	}
	
	function adicionaAtributo(ev){
		js.dom.Helper.createDom({
			id: "Atr"+cntAtr++,
			tag: "tr",
			children:[cell,cell,cell,remove]
		},atr.getDom());
	}
	
	function adicionaMetodoEstatico(ev){
		js.dom.Helper.createDom({
			id: "StaMet"+cntStaMet++,
			tag: "tr",
			children:[cell,cell,cell,cell,cell,remove]
		},staMet.getDom());
	}
	
	function adicionaMetodo(ev){
		js.dom.Helper.createDom({
			id: "Met"+cntMet++,
			tag: "tr",
			children:[cell,cell,cell,cell,cell,remove]
		},met);
	}
	
	addAtr.on("click",adicionaAtributo);
	addStaMet.on("click",adicionaMetodoEstatico);
	addMet.on("click",adicionaMetodo);
	atr.on("click",lineRemover);
	met.on("click",lineRemover);
	staMet.on("click",lineRemover);
	
	function processaArgumentos(string){
		var args = [],
			parts;
		Array.iterate(string.split(","),function(index, el){
			parts = el.trim().split(/\s+/g);
			args.push({
				tipo:parts[0],
				nome:parts[1]
			});
		});
		
		return args;
	}
	
	function sortNome(a,b){
		if(a.nome > b.nome){
			return 1;
		}else if(a.nome < b.nome){
			return -1;
		}else{
			return 0;
		}
	}
	
	api = {
		pacote: function(){return pacote.get("value");},
		pai: function(){return pai.get("value");},
		classe: function(){return classe.get("value");},
		arquivo: function(){return arquivo.get("value");},
		descricao: function(){return descricao.get("value");},
		atributos: function(){
			var atrs = [],
				ins;
			
			Array.iterate(atr.query("tr",true),function(index, el){
				ins = Raze.query("td input",el);
				atrs.push({
					tipo: ins[0].value.trim(),
					nome: ins[1].value.trim(),
					desc: ins[2].value.trim()
				});
			});
			
			atrs.sort(sortNome);
			
			return atrs;
		},
		metodosEstaticos: function(){
			var me = [],
				ins;
			
			Array.iterate(staMet.query("tr",true),function(index, el){
				ins = Raze.query("td input",el);
				me.push({
					tipo: ins[0].value.trim(),
					nome: ins[1].value.trim(),
					args: processaArgumentos(ins[2].value),
					desc: ins[3].value.trim(),
					exem: ins[4].value.trim()
				});
			});
			
			me.sort(sortNome);
			
			return me;
		},
		metodos: function(){
			var m = [],
				ins;
			
			Array.iterate(met.query("tr",true),function(index, el){
				ins = Raze.query("td input",el);
				m.push({
					tipo: ins[0].value.trim(),
					nome: ins[1].value.trim(),
					args: processaArgumentos(ins[2].value),
					desc: ins[3].value.trim(),
					exem: ins[4].value.trim()
				});
			});
			
			m.sort(sortNome);
			
			return m;
		}
	};
	
	builder = (function(){
		var sb = js.util.StringBuilder,
			className = /^\w+(\.\w+)+$/;
		
		function resolveLink(string){
			if(string.match(className)){
				var mod = string.replace(/[\b\.](\w)/g,function(a,b,c){
					return b.toUpperCase();
				});
				
				return "["+mod[0].toUpperCase()+mod.substring(1)+" "+string+"]";
			}else{
				return string;
			}
		}
		
		function build(api){
			var builder = new sb(),
				atrs,
				mets;
			
			buildHeader(api,builder);
			
			buildAttributes(api,builder);
			
			mets = api.metodosEstaticos();
			
			if(mets && mets.length > 0){
				builder.append("\n<h2>Métodos Estáticos</h2>");			
				buildMethods(mets,builder);
				builder.append("\n----\n");
			}
			
			mets = api.metodos();
			
			if(mets && mets.length > 0){
				builder.append("\n<h2>Métodos</h2>");			
				buildMethods(api.metodos(),builder);
				builder.append("\n----\n");
			}
			
			jsool.get("codigo").set("value",builder.toString());
		}
		
		//Procura primitivas e  classes
		function parseTextElements(string){
			return string
				.replace(chaves,"<strong><font face=\"monospace\" size=\"3\" color=\"#7F0055\">$1</font></strong>")
				.replace(/\w+(\.\w+)+/g,function(a,b){
					return resolveLink(a);
				});
		}
		
		function buildMethods(metodos, builder){
			Array.iterate(metodos,function(index, el){
				builder.append("\n----\n<p><font color=\"#1E4E8F\">")
				.append(parseTextElements(el.tipo))
				.append(" ")
				.append(el.nome)
				.append("(");
				
				Array.iterate(el.args,function(i,arg){
					if(i>1)builder.append(", ");
					builder.append(parseTextElements(arg.tipo))
					.append(" ")
					.append(arg.nome);
				});
				
				builder.append(")</font></p><p>")
					.append(parseTextElements(el.desc))
					.append("</p>");
				
			});
		}
		
		//Monta codigo dos atributos
		function buildAttributes(api, builder){
			atrs = api.atributos();
			
			if(atrs && atrs.length > 0){
				
				builder.append("\n<h2>Atributos:</h2>");
				
				Array.iterate(atrs,function(index, el){
					builder.append("\n----\n<p><font color=\"#1E4E8F\">");
					
					var tip = el.tipo.match(chaves)
							? el.tipo.replace(chaves,"<strong><font face=\"monospace\" size=\"4\" color=\"#7F0055\">$1</font></strong>")
							: resolveLink(el.tipo);
					
					builder.append(tip)
						.append(" ")
						.append(el.nome)
						.append("</font></p>")
						.append("\n<p>").append(parseTextElements(el.desc)).append("</p>");
				});
				
				builder.append("\n----\n");
			}
		}
		
		//Monta codigo do cabecalho
		function buildHeader(api, sb){
			sb.append("<h1>Classe <font color=\"#1E4E8F\">")
				.append(api.classe())
				.append("</font></h1>\n<p><strong>pacote: </strong>")
				.append(api.pacote())
				.append("</p>\n<p><strong>arquivo: </strong>");
			
			var arq = api.arquivo();
			arq = arq.substring(arq.lastIndexOf("/")+1);
			
			sb.append("<a href=\"")
				.append(api.arquivo())
				.append("\"><font color=\"#1E4E8F\">")
				.append(arq)
				.append("</font></a></p>");
			
			sb.append("\n<p><strong>extende: </strong><font color=\"#1E4E8F\">")
				.append(resolveLink(api.pai()))
				.append("</font></p>\n----\n");
			
			sb.append(api.descricao());
			
			sb.append("\n----\n");
		}
		
		return {build:build};
	})();
	
	jsool.get("build").on("click",function(){
		builder.build(api);
	});
});