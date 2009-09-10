function emptyFn(){return undefined;}
function LexicalElement(){}
LexicalElement.prototype={found:emptyFn,validate:emptyFn,failure: emptyFn};

/**
 * ExpressionElement
 * 
 * Validates a string using a {@link RegExp}
 */
function ExpressionElement(regexp){
	if(regexp)this.expression = regexp;
}
ExpressionElement.prototype = new LexicalElement();
ExpressionElement.prototype.expression = /^.*/;
ExpressionElement.prototype.clone = function(){
	return new ExpressionElement(this.expression);
};
ExpressionElement.prototype.validate = function(expression, offset){
	offset = offset || 0;
    while(expression.charAt(offset) == ' ') offset++;
    var fragment = expression.substring(offset);
    var match = fragment.match(this.expression);
    if(!match){
    	this.failure(expression.substring(offset), offset);
    	return -1;
    }
    this.found(expression.substring(offset, offset + match[0].length));
    return offset + match[0].length;
};


/**
 * ElementChain
 * 
 * Validates a string using a collection of {@link LexicalElement} disposed as a chain
 */
function ElementChain(els){
	this.elements = [];
	if(!els)els = arguments;
	if(els.length > 0){		
		for(var i=0,el;i < els.length;i++)
			this.elements.push(els[i]);
	}
	return this;
}
ElementChain.prototype = new LexicalElement();
ElementChain.prototype.elements = [];
ElementChain.prototype.clone = function(){
	var els = [];
	for(var i = 0,item;item = this.elements[i++];)
		els.push(item);
	return new ElementChain(els);
};
ElementChain.prototype.validate = function(expression, offset){
        offset = offset || 0;
        var currentOffset = offset;
        var valid;
        for(var i = 0, el; el = this.elements[i++];){
                valid = el.validate(expression, currentOffset);
                if(valid <= 0){
                	this.failure(expression.substring(offset, currentOffset), currentOffset);
                	return -1;                	
                }
                currentOffset = valid;
        }
        this.found(expression.substring(offset, currentOffset));
        return currentOffset;
};
ElementChain.prototype.push = function(validator){
	this.elements.push(validator);
};

/**
 * ElementStack
 * 
 * Validates a string using a collection of {@link LexicalElement} disposet as s stack
 */
function ElementStack(els){
	this.elements = [];
	if(!els)els = arguments;
	if(els.length > 0){
		for(var i=0,el;i < els.length;i++)
			this.elements.push(els[i]);
	}
}

ElementStack.prototype = new LexicalElement();
ElementStack.prototype.elements = [];
ElementStack.prototype.clone = function(){
	var els = [];
	for(var i = 0,item;item = this.elements[i++];)
		els.push(item);
	return new ElementStack(els);
};
ElementStack.prototype.validate = function(expression, offset){
        offset = offset || 0;
        var valid;
        for(var i = 0, el; el = this.elements[i++];){
                valid = el.validate(expression, offset);
                if(valid >= 0){
                        this.found(expression.substring(offset, valid));
                        return valid;
                }
        }
        this.failure(expression.substring(offset, valid), offset);
        return -1;
};
ElementStack.prototype.push = function(validator){
	this.elements.push(validator);
};
/**
 * short hand to create a {@link ExpressionElement}
 */
function expression(expr){
	if(!expr) throw "Null expression";
	var el = new ExpressionElement(expr);
	return el;
}
/**
 * short hand to create a {@link ElementChain}
 */
function chain(){
	var arr = [];
	for(var i = 0; i < arguments.length;i++)arr.push(arguments[i]);
	var el = new ElementChain(arr);
	return el;
}

/**
 * short hand to create a {@link ElementStack}
 */
function stack(){
	var arr = [];
	for(var i = 0; i < arguments.length;i++)arr.push(arguments[i]);
	var el = new ElementStack(arr);
	return el;
}