jsool.namespace("js.util");

js.util.JSON = (function(){
	var useNative = window.JSON && window.JSON.parse && window.JSON.stringify;
	
	
	var decodeString,
		encodeObject;
	//FORCE MY CODE
	if(false && useNative){
		var nat = window.JSON;
		decodeString = function(string){
			return nat.parse(string);
		};
		
		encodeObject = function(object){
			return nat.stringify(object);
		};
	}else{
		decodeString = function(string){
			return window.eval("("+string+")");
		};
		
		encodeObject = function(o,b){
			b = b || new js.util.StringBuilder();
			var type = typeof o,
				t;
			if(type === "undefined" || o === null){
				return null;
			}else if(type === "number"){
				return String(o);
			}else if(type === "boolean"){
				return String(o);
			}else if(Array.isArray(o)){
				return encodeArray(o,b);
			}else if(type === "object"){
				b.append("{");
				for(var p in o){
					b.append(p)
					.append(":")
					.append(encodeObject(o[p],b));
				}
				b.append("}");
			}
			return b.toString();
		};
	}
	
	function encodeArray(a,b){
		b.append("[");
		for(var i=0,e;e=a[i++];){
			b.append(encodeObject(e));
		}
		b.append("]");
	}
	
	return{
		encode: encodeObject,
		decode: decodeString
	};
})();