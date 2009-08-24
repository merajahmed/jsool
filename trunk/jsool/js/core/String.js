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
if(!String.prototype.trim){
	String.prototype.trim = function(){
		return this.replace(/^\s*([\S\s]*?)\s*$/, '$1');
	};
}
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

String.prototype.instanceOf = function(clazz){
	return clazz == String || clazz == js.core.Object;
};

String.isString = function(obj){
	return typeof obj == 'string';
};

String.decodeHTML = function(string){
	var code = new RegExp("&#[0-9]{1,3};",'g');
	var matches = string.match(code);
	
	if(matches){
		var getChar = function(code){
			code = code.substring(2);
			code = code.substring(0, code.length - 1);
			var charNum = window.parseInt(code, 10);
			return String.fromCharCode(charNum);
		};
		
		for(var i = 0; i < matches.length; i++){
			var newChar = getChar(matches[i]);
			string = string.replace(matches[i],newChar);
		}
	}
	
	return string;
};

String.encodeHTML = function(string){
	var charBuffer = [];
	
	for(var pos = 0; pos < string.length; pos++){
		var chr = string.charAt(pos);
		
		if(chr >= 'a' && chr <= 'z' || chr >= 'A' && chr <= 'Z' || chr >= '0' && chr <= '9'){
			charBuffer.push(chr);
		}else{
			charBuffer.push("&#"+string.charCodeAt(pos)+";");
		}
	}
	return charBuffer.join('');
};

String.prototype.encodeHTML = function(){
	return String.encodeHTML(this);
};

String.prototype.decodeHTML = function(){
	return String.decodeHTML(this);
};