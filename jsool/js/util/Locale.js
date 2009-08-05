js.util.Locale = $extends(js.core.Object,{
	cons: function(language){
		var length = this.cache.length;
		
		for(var i = 0; i < length; i++){
			if(this.cache[i].language == language){
				return this.cache[i];
			}
		}
		
		this.language = language;
		this.cache.push(this);
	},
	cache: [],
	language: null,
	weekdays: null,
	months: null,
	datePattern: null
},'js.util.Locale');

js.util.Locale.DEFAULT = null;

//Creates some default location
jsool.onSystemReady(function(){
	var loc = js.util.Locale;
	
	var usa = new js.util.Locale('en-US');
	usa.weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	usa.months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	usa.datePattern = 'MM/dd/yyyy';
	
	
	loc.USA = usa;
	
	var brazil = new js.util.Locale('pt-BR');
	brazil.weekdays = ['Domingo','Segunda-feira','Terca-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'];
	brazil.months = ['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
	brazil.datePattern = 'dd/MM/yyyy';
	
	loc.BRAZIL = brazil;
	
	js.util.Locale.DEFAULT = loc.USA;
});