js.util.DateFormat = Extends(js.core.Object,{
	constructor: function(pattern,locale){
		js.core.Object.apply(this, arguments);
		this.setLocale(locale ? locale : js.util.Locale.DEFAULT);
		this.pattern = pattern ? pattern : this.pattern;
		
		this.patternKeyMap = new js.util.HashMap();
		
		for(var i = 0; i < this.patterns.length; i++){
			this.patternKeyMap.put('{'+this.patterns[i].key+'}', this.patterns[i]);
		}
	},
	pattern: 'EEEE, MMMM dd yyyy',
	locale: null,
	compiled: null,
	weekdays: null,
	months: null,
	patternKeyMap: null,
	format: function(date){
		var formated = new String(this.pattern);
		var pattern;		
		var length = this.patterns.length; 
		
		for(var i = 0; i < length; i++){
			pattern = this.patterns[i];
			formated = formated.replace(pattern.pattern, this['get'+pattern.name](date));
		}
		return formated;
	},
	setLocale: function(locale){
		if(!locale.instanceOf(js.util.Locale)){
			throw new js.core.Exception('Invalid argument: '+ locale, this, arguments);
		}
		this.locale = locale;
		this.months = locale.months;
		this.weekdays = locale.weekdays;
	},
	compile: function(){
		var compiled = new String(this.pattern);
		var pattern;
		var length = this.patterns.length; 
		
		for(var i = 0; i < length; i++){
			pattern = this.patterns[i];
			compiled = compiled.replace(pattern.pattern, '{'+pattern.key+'}');
		}
		
		this.compiled = compiled;
	},
	parse: function(string){
		if(!String.isString(string)){
			throw new js.core.Exception('invalid argument type: '+ string, this, arguments);
		}		
		
		if(!this.compiled) this.compile();
		
		var resultDate = new Date();
		var openToken, closeToken;
		var currentPattern;
		var referenceString = this.compiled;
		
		string = string.toLowerCase();
		
		while((openToken = referenceString.indexOf('{')) >= 0){
			closeToken = referenceString.indexOf('}')+1;
			string = string.substring(openToken);
			
			currentPattern = this.patternKeyMap.get(referenceString.substring(openToken,closeToken));
			
			try{
			string = this['parse'+currentPattern.name](string, resultDate);}catch(e){console.error(e);}
			
			referenceString = referenceString.substring(closeToken);
		}
		
		return resultDate;
	},
	patterns: [{pattern: /y{3,}/,key: '0',name: 'LongYear'},
	           {pattern: /y{1,2}/,key: '1',name: 'ShortYear'},
	           {pattern: /M{4,}/,key: '2',name: 'LongMonth'},
	           {pattern: /M{3}/,key: '3',name: 'ShortMonth'},
	           {pattern: /M{2}/,key: '4',name: 'LongNumericMonth'},
	           {pattern: /M{1}/,key: '5',name: 'ShortNumericMonth'},
	           {pattern: /d{2,}/,key: '6',name: 'LongDay'},
	           {pattern: /d/,key: '7',name: 'ShortDay'},
	           {pattern: /E{4,}/,key: '8',name: 'LongWeekday'},
	           {pattern: /E{1,3}/,key: '9',name: 'ShortWeekday'}],
	           
	//FORMATING FUNCTIONS
	getLongYear: function(date){return new String(date.getFullYear());},
	getShortYear: function(date){var year = new String(date.getFullYear());return year.substring(2);},
	getLongMonth: function(date){return this.months[date.getMonth()];},
	getShortMonth: function(date){var month = this.months[date.getMonth()];return month.substring(0,3);},
	getLongNumericMonth: function(date){var month = new String(date.getMonth()+1);return (month.length < 2 ? '0'+month : month);},
	getShortNumericMonth: function(date){return new String(date.getMonth()+1);},
	getLongDay: function(date){var day = new String(date.getDate());return (day.length < 2 ? '0'+day : day);},
	getShortDay: function(date){var day = new String(date.getDate());return day;},
	getLongWeekday: function(date){return this.weekdays[date.getDay()];},
	getShortWeekday: function(date){var day = this.weekdays[date.getDay()];return day.substring(0,3);},
	
	//PARSING FUNCTIONS
	parseLongYear: function(string, date){
		var sdate = string.substring(0, 4);
		date.setYear(parseInt(sdate));
		return string.substring(4);
	},
	parseShortYear: function(string, date){
		var sdate = string.substring(0,2);
		var ndate = (new Date()).getFullYear().toString().substring(0, 2) + sdate;		
		date.setYear(parseInt(ndate));
		return string.substring(2);
	},
	parseLongMonth: function(string, date){
		var i = 0;
		while(string.indexOf(this.months[i].toLowerCase())!= 0){i++;}
		date.setMonth(i);
		return string.substring(this.months[i].length);
	},
	parseShortMonth: function(string, date){
		var i = 0;
		while(string.indexOf(this.months[i].substring(0,3).toLowerCase())!= 0){
			i++;
		}
		date.setMonth(i);
		return string.substring(3);
	},
	parseLongNumericMonth: function(string, date){
		var month = string.substring(0,2);
		date.setMonth(window.parseInt(month)-1);
		return string.substring(2);
	},
	parseShortNumericMonth: function(string, date){
		var error = false;
		try{
			var month = window.parseInt(string.substring(0,2));			
			error = string.charCodeAt(1) < 48 || string.charCodeAt(1) > 57;
		}catch(e){
			error = true;
		}
		
		if(error || month > 12){
			month = window.parseInt(string.substring(0,1));
			date.setMonth(month-1);
			return string.substring(1);
		}else{
			date.setMonth(month-1);
			return string.substring(2);
		}
	},
	parseLongDay: function(string, date){
		var day = string.substring(0,2);
		date.setDate(window.parseInt(day));
		return string.substring(2);
	},
	parseShortDay: function(string, date){
		var error = false;
		try{
			var day = window.parseInt(string.substring(0,2));
			error = string.charCodeAt(1) < 48 || string.charCodeAt(1) > 57;
		}catch(e){
			error = true;
		}
		
		if(error || day > 31){
			day = window.parseInt(string.substring(0,1));
			date.setDate(day);
			return string.substring(1);
		}else{
			date.setDate(day);
			return string.substring(2);
		}
	}
},'js.util.DateFormat');