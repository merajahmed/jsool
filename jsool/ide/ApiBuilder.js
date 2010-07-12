var api;

jsool.onReady(function(){
	var g = jsool.get;
	
	//Contadores
	var cnt = 0,
		cntAtr = 0;
	
	//Campos padrao
	var pacote = g("pacote"),
		pai = g("pai"),
		classe = g("classe"),
		arquivo = g("arquivo"),
		descricao = g("descricao");
	
	//Botoes
	var addAtr = g("adicionaAtributoEstatico");
	
	//Grids
	var atr = g("atributosEstaticos");
	
	//Templates
	var tplAtr;
	
	
	
	//CODE=============================================
	cnt = 5;
	tplAtr = new js.util.StrinBuilder();
	while(cnt--){
		tplAtr.append("<tr><td></td>");
	}
	
	api = {
		pacote: function(){
			return pacote.get("value");
		},
		pai: function(){
			return pai.get("value");
		},
		classe: function(){
			return classe.get("value");
		},
		arquivo: function(){
			return arquivo.get("value");
		},
		descricao: function(){
			return descricao.get("value");
		}
	};
});