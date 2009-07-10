String.prototype.replaceAll = function(search, replacement){
	var str = this;
	var pos = str.indexOf(search);	
	while (pos > -1){
		str = str.replace(search, replacement);
		pos = str.indexOf(search); 
	}	
	return (str);
};
String.prototype.toCharArray = function(){
	var chars = new Array();
	var str = new String(this);
	var l = str.length;
	for(var i = 0; i < l; i++){
		chars.push(str[i]);
	}
	return chars;
};
String.prototype.trim = function(){
	return this.replace(/^\s*([\S\s]*?)\s*$/, '$1');
};
String.prototype.insert = function(key, value){
	return this.replaceAll("[\\{]"+key+"[\\}]", value);
};

String.prototype.hash = 0;

String.prototype.hashCode = function(){
	var h = this.hash;	
	if(h == 0){
		var offset = 0;
		var len = this.length;
		
		for(var i = 0; i < len; i++){
			h = 31*h + this.charCodeAt(offset++);
		}
		
		this.hash = h;
	}
	
	return h;
};

String.isString = function(obj){
	return typeof obj == 'string';
};