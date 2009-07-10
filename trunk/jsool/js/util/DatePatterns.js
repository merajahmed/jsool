js.util.DatePatterns = Extends(js.core.Object,{
	weekdays: null,
	months: null,
	longYear: function(date){
		return new String(date.getFullYear());
	},
	shortYear: function(date){
		var year = new String(date.getFullYear());
		return year.substring(2);
	},
	longMonth: function(date){
		return this.months[date.getMonth()];
	},
	shortMonth: function(date){
		var month = this.months[date.getMonth()]; 
		return month.substring(0,3);
	},
	longNumericMonth: function(date){
		var month = new String(date.getMonth()+1);
		return (month.length < 2 ? '0'+month : month);
	},
	shortNumericMonth: function(date){		 
		return new String(date.getMonth()+1);
	},
	longDay: function(date){
		var day = new String(date.getDate());
		return (day.length < 2 ? '0'+day : day);
	},
	shortDay: function(date){
		var day = new String(date.getDate());
		return day;
	},
	longWeekday: function(date){
		return this.weekdays[date.getDay()];
	},
	shortWeekday: function(date){
		var day = this.weekdays[date.getDay()]; 
		return day.substring(0,3);
	},
	patterns: [{
		name: 'LONG_YEAR',
		pattern: /y{3,}/,
		key: 'lyear',
		format: 'longYear'
	},{
		name: 'SHOR_YEAR',
		pattern: /y{1,2}/,
		key: 'syear',
		format: 'shortYear'
	},{
		name: 'LONG_MONTH',
		pattern: /M{4,}/,
		key: 'lmonth',
		format: 'longMonth'
	},{
		name: 'SHORT_MONTH',
		pattern: /M{3}/,
		key: 'smonth',
		format: 'shortMonth'
	},{
		name: 'LONG_NUM_MONTH',
		pattern: /M{2}/,
		key: 'lnmonth',
		format: 'longNumericMonth'
	},{
		name: 'SHORT_NUM_MONTH',
		pattern: /M{1}/,
		key: 'snmonth',
		format: 'shortNumericMonth'
	},{
		name: 'LONG_DAY',
		pattern: /d{2,}/,
		key: 'lday',
		format: 'longDay'
	},{
		name: 'SHORT_DAY',
		pattern: /d/,
		key: 'sday',
		format: 'shortDay'
	},{
		name: 'LONG_WEEKDAY',
		pattern: /E{4,}/,
		key: 'lwday',
		format: 'longWeekday'
	},{
		name: 'SHORT_WEEKDAY',
		pattern: /E{1,3}/,
		key: 'swday',
		format: 'shortWeekday'
	}]
},'js.util.DatePatterns');