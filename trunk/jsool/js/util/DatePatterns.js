js.util.DatePatterns = Extends(js.core.Object,{
	weekdays: null,
	months: null,
	formatLongYear: function(date){return new String(date.getFullYear());},
	formatShortYear: function(date){var year = new String(date.getFullYear());return year.substring(2);},
	formatLongMonth: function(date){return this.months[date.getMonth()];},
	formatShortMonth: function(date){var month = this.months[date.getMonth()];return month.substring(0,3);},
	formatLongNumericMonth: function(date){var month = new String(date.getMonth()+1);return (month.length < 2 ? '0'+month : month);},
	formatShortNumericMonth: function(date){return new String(date.getMonth()+1);},
	formatLongDay: function(date){var day = new String(date.getDate());return (day.length < 2 ? '0'+day : day);},
	formatShortDay: function(date){var day = new String(date.getDate());return day;},
	formatLongWeekday: function(date){return this.weekdays[date.getDay()];},
	formatShortWeekday: function(date){var day = this.weekdays[date.getDay()];return day.substring(0,3);},
	getPatternByKey: function(pkey){
		var key = pkey.match(/[a-zA-Z]/)[0];
		
		for(var i = 0; i < this.patterns.length; i ++){
			if(this.patterns[i].key == key){
				return this.patterns[i];
			}
		}
		
		return null;
	},
	patterns: [{
		name: 'LONG_YEAR',
		pattern: /y{3,}/,
		key: 'lyear',
		format: 'formatLongYear'
	},{
		name: 'SHOR_YEAR',
		pattern: /y{1,2}/,
		key: 'syear',
		format: 'formatShortYear'
	},{
		name: 'LONG_MONTH',
		pattern: /M{4,}/,
		key: 'lmonth',
		format: 'formatLongMonth'
	},{
		name: 'SHORT_MONTH',
		pattern: /M{3}/,
		key: 'smonth',
		format: 'formatShortMonth'
	},{
		name: 'LONG_NUM_MONTH',
		pattern: /M{2}/,
		key: 'lnmonth',
		format: 'formatLongNumericMonth'
	},{
		name: 'SHORT_NUM_MONTH',
		pattern: /M{1}/,
		key: 'snmonth',
		format: 'formatShortNumericMonth'
	},{
		name: 'LONG_DAY',
		pattern: /d{2,}/,
		key: 'lday',
		format: 'formatLongDay'
	},{
		name: 'SHORT_DAY',
		pattern: /d/,
		key: 'sday',
		format: 'formatShortDay'
	},{
		name: 'LONG_WEEKDAY',
		pattern: /E{4,}/,
		key: 'lwday',
		format: 'formatLongWeekday'
	},{
		name: 'SHORT_WEEKDAY',
		pattern: /E{1,3}/,
		key: 'swday',
		format: 'formatShortWeekday'
	}]
},'js.util.DatePatterns');