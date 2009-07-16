js.util.Locale = Extends(js.core.Object,{
	constructor: function(language){
		var length = this.cache.length;
		
		for(var i = 0; i < length; i++){
			if(this.cache[i].language == language){
				return this.cache[i];
			}
		}
		
		js.core.Object.apply(this,arguments);
		
		this.language = language;
		this.cache.push(this);
	},
	cache: [],
	language: null,
	weekdays: null,
	months: null
},'js.util.Locale');

js.util.Locale.DEFAULT = null;

//Creates some default location
js.core.Main.onSystemReady(function(){
	var loc = js.util.Locale;
	
	var usa = new js.util.Locale('en-US');
	usa.weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	usa.months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	
	loc.USA = usa;
	
	var brazil = new js.util.Locale('pt-BR');
	brazil.weekdays = ['Domingo','Segunda-feira','Terca-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'];
	brazil.months = ['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
	
	loc.BRAZIL = brazil;
	
	js.util.Locale.DEFAULT = loc.BRAZIL;
});