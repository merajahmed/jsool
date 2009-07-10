js.core.Util = {
	isGecko: function(){
		return (this.userAgent.indexOf('gecko') != -1);
	},
	isFF: function(){
		return this.isGecko() && (this.userAgent.indexOf('firefox') != -1);
	},
	isOpera: function(){
		return (this.userAgent.indexOf('opera') != -1);
	},
	isSafari: function(){
		return (this.userAgent.indexOf('safari') != -1);
	},
	isWebKit: function(){
		return (this.userAgent.indexOf('webkit') != -1);
	},
	isIE: function(){
		return new String(navigator.appName).indexOf('Internet Explorer') >= 0;
	},
	getTime: function(){
		return (new Date()).getTime();
	},
	emptyFn: function(){return null;},
	isArray: function(obj){
		return obj.constructor == Array;
	}
};