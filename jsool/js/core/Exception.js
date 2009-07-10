js.core.Exception = Extends(js.core.Object,{
	constructor: function(message, sourceObject, sourceMethodArguments, sourceException){
		if(message == null)
			throw new Error('The Exception message must not be null');
		
		this.message = message;
		this.source = sourceObject;
		this.method = (sourceMethodArguments ? sourceMethodArguments.callee : null);
		this.cause = sourceException;
	},
	message: null,
	source: null,
	method: null,
	cause: null,
	toString: function(){
		var out;
		
		if(this.source){
			out = this.source.type;
			
			if(this.method){
				var ptt = this.source.cls.prototype;
				for(var p in ptt){
					if(ptt[p] == this.method){
						out = out + "." + p + '()';
					}
				}
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