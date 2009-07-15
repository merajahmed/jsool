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
	datePatterns: null
},'js.util.Locale');

js.util.Locale.DEFAULT = null;

//Creates some default location
js.core.Main.onSystemReady(function(){
	var loc = js.util.Locale;
	
	var usa = new js.util.Locale('en-US');
	usa.datePatterns = new js.util.DatePatterns();
	usa.datePatterns.weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	usa.datePatterns.months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	
	loc.USA = usa;
	
	var brazil = new js.util.Locale('pt-BR');
	brazil.datePatterns = new js.util.DatePatterns();
	brazil.datePatterns.weekdays = ['Domingo','Segunda-feira','Terca-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'];
	brazil.datePatterns.months = ['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
	
	loc.BRAZIL = brazil;
	
	js.util.Locale.DEFAULT = new js.util.Locale(window.navigator.language);
});