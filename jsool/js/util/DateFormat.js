js.util.DateFormat = Extends(js.core.Object,{
	constructor: function(pattern){
		js.core.Object.apply(this, arguments);
		this.locale = js.util.Locale.DEFAULT;
		this.pattern = pattern == null ? this.pattern : pattern;
	},
	pattern: '',
	locale: null,
	compiled: null,
	format: function(date){
		var datePatterns = this.locale.datePatterns;
		var formated = new String(this.pattern);
		var pattern;		
		var length = datePatterns.patterns.length; 
		
		for(var i = 0; i < length; i++){
			pattern = datePatterns.patterns[i];
			formated = formated.replace(pattern.pattern, datePatterns[pattern.format](date));
		}
		
		return formated;
	},
	setLocale: function(locale){
		this.locale = locale;
	},
	compile: function(){
		var datePatterns = this.locale.datePatterns;
		var compiled = new String(this.pattern);
		var pattern;
		var length = datePatterns.patterns.length; 
		
		for(var i = 0; i < length; i++){
			pattern = datePatterns.patterns[i];
			compiled = compiled.replace(pattern.pattern, '{'+pattern.key+'}');
		}
		
		this.compiled = compiled;
	},
	parse: function(string){
		
	}
},'js.util.DateFormat');