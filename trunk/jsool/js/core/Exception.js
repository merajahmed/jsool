js.core.Exception = Extends(js.core.Object,{
	constructor: function(message, sourceObject, sourceMethodArguments, sourceException){
		if(message == null)
			throw new Error('The Exception message must not be null');
		
		this.message = message;
		this.source = sourceObject;
		this.method = sourceMethodArguments;
		this.cause = sourceException;
	},
	message: null,
	source: null,
	method: null,
	cause: null,
	getMethod: function(){
		if(!this.source) return '';
		
		var proto = this.source.cls.prototype;
		var method = this.method.callee;
		var methodName;
		
		for(var p in proto){
			if(proto[p] == method){
				methodName = '.' + p + '(';
			}
		}
		
		var args = new Array();
		
		for(var i = 0; i < this.method.length; i++){
			if(typeof this.method[i] == 'object'){				
				args.push(this.method[i].type || this.method[i]);
			}else{
				args.push(this.method[i]);
			}
		}
		
		return methodName + args.join(',') + ')';
	},
	toString: function(){
		var out;
		
		if(this.source){
			out = this.source.type;
			
			if(this.method){
				out = out + this.getMethod();
			}
		}else{
			out = this.type;
		}
		
		out = out + ': ' + this.message;
		
		if(this.cause){
			out = out + '\n' + this.cause.toString();
		}
		
		return out;
	}
},'js.core.Exception');