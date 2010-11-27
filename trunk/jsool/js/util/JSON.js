jsool.namespace("js.util");

js.util.JSON = (function(){
	var useNative = window.JSON && window.JSON.parse && window.JSON.stringify;
	
	if(useNative){
		return {
			encode: function(object){
				return window.JSON.stringify(object);
			},
			decode: function(string){
				return window.JSON.parse(string);
			}
		}; 
	}else{
		function encodeArray(a,b){
			b.append("[");
			for(var i=0,e;e=a[i++];){
				if(i>1){
					b.append(",");
				}
				encodeObject(e,b);
			}
			b.append("]");
		}
		
		var quote = "\"";
		
		function encodeString(s,b){
			b.append(quote + String(s) + quote);
		}
		
		function encodeObject(o,b){
			var type = typeof o,t, first = true,v;
			if(type === "undefined" || o === null){
				b.append(null);
			}else if(type === "number"){
				b.append(String(o));
			}else if(type === "boolean"){
				b.append(o ? "true" : "false");
			}else if(Array.isArray(o)){
				encodeArray(o,b);
			}else if(type === "string"){
				encodeString(o,b);
			}else if(type === "object"){
				b.append("{");
				for(var p in o){
					v = o[p];
					if(v != null && v !== 0 && typeof v !== "function"){
						if(!first){
							b.append(",");
						}
						b.append("\"").append(p).append("\":");
						encodeObject(v,b);
						first = false;
					}
				}
				b.append("}");
			}
		}
		
		return {
			decode: function(string){
				return window.eval("("+string+")");
			},
			encode: function(object){
				var b = new js.util.StringBuilder();
				encodeObject(object, b);
				return b.toString();
			}
		};
	}
})();