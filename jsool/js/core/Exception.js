function Exception(msg, reason, method){
    if(msg == null)    	
        throw new Error("An Exception must have a message");
    this.message = msg;
    
    if(reason != null)
        this.cause = reason;
    
    if(method != null || typeof method == 'function')
    	this.method = method.callee;
}
Exception.prototype.cause = null;
Exception.prototype.method = null;
Exception.prototype.message = "";
Exception.prototype.cls = Exception;
Exception.prototype.supercls = js.core.Object;
Exception.prototype.type = 'js.core.Exception';

Exception.prototype.prepareMessage = function(){
	var message;
	var root = this.cause.type;
	var mtd = "";
	
	if(this.method != null){
		for(var p in this.cause.cls.prototype){
			if(this.cause.cls.prototype[p] == this.method){
				mtd = "." + p + "()";
			}
		}
	}
	
	message = [root, mtd,": ", this.message].join("");
	
    return message;
};

Exception.prototype.toString = function(){
	var message;
	
	if(this.cause != null && this.cause.instanceOf(js.core.Exception)){
		message = [this.prepareMessage(),this.cause.toString()].join("\n");
	}else{
		message = this.prepareMessage();
	}
    return message;
};
js.core.Exception = Exception;