function emptyFn(){return undefined;}
function LexicalElement(){}
LexicalElement.prototype={found:emptyFn,validate:emptyFn,failure: emptyFn};

function ExpressionElement(regexp){
	if(regexp)this.expression = regexp;
}
ExpressionElement.prototype = new LexicalElement();
ExpressionElement.prototype.expression = /^.*/;
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

function expression(expr){
	if(!expr) throw "Null expression";
	var el = new ExpressionElement(expr);
	return el;
}
function chain(){
	if(arguments.length <= 1) throw Error("Invalid number of elements");
	var arr = [];
	for(var i = 0; i < arguments.length;i++)arr.push(arguments[i]);
	var el = new ElementChain(arr);
	return el;
}

function stack(){
	if(arguments.length <= 1) throw Error("Invalid number of elements");
	var arr = [];
	for(var i = 0; i < arguments.length;i++)arr.push(arguments[i]);
	var el = new ElementStack(arr);
	return el;
}
var compiler;
(function(){
	//GENERAL USE EXPRESSION ELEMENTS
	var IDENTIFIER = expression(/^[_$a-zA-Z][_$a-zA-Z0-9]*/);
	var PACKAGE = expression(/^package/);
	var IMPORT =  expression(/^import/);
	var DOT = expression(/^\./);
	var COMMA = expression(/^,/);
	var BLANK = expression(/^[\s]*/);
	var SEMI_COLON = expression(/^[;]/);
	var NATIVE = expression(/^native/);
	var EXTENDS = expression(/^extends/);
	var STRING_END = expression(/^$/);
	var OPEN_BLOCK = expression(/^{/);
	var CLOSE_BLOCK = expression(/^}/);
	
	/*
	 * identifier.identifier.identifier. ...
	 */
	var fullName = (function(){
		var nameSerie = chain(IDENTIFIER, DOT);
		var nameEnd = stack(nameSerie, IDENTIFIER);
		nameSerie.elements.push(nameEnd);
		return nameEnd;
	})();
	
	/*
	 * Validates The first line wheres the package:
	 * package identifier.identifier. ...;
	 */
	var packageStatement = (function(){
		var packagestmt = chain(PACKAGE, fullName, SEMI_COLON,BLANK);
		packagestmt.failure = function(a){console.error(a);};
		return packagestmt;
	})();
	
	/*
	 * import org.package.Class;
	 * import org.package.Class;
	 * import org.package.Class; ...
	 */	
	var importStatements = (function(){
		var importSeries = chain(chain(IMPORT, fullName,SEMI_COLON),BLANK);
		var imports = stack(importSeries,BLANK);
		importSeries.elements.push(imports);
		return imports;
	})();
	
	/*
	 * [class Name] extends Parent
	 */
	var extendsStatement = (function(){
		var extendsstmt = stack(chain(EXTENDS, IDENTIFIER), BLANK);
		return extendsstmt;
	})();
	
	/*
	 * Elements that may be inside a native class
	 */
	var nativeClassBody = (function(){
		var nativeBody = chain(OPEN_BLOCK,CLOSE_BLOCK);
		return nativeBody;
	})();
	
	/*
	 * Validates a full native class
	 */
	var nativeClass = (function(){
		var nativecls = chain(
				packageStatement, //package definition
				importStatements, //Define imports
				NATIVE, //its a native class
				IDENTIFIER,//the name of the class
				extendsStatement, //Extends a class
				nativeClassBody,
				STRING_END);
		return nativecls;
	})();
	
	var compileNativeClass = function(code){
		return nativeClass.validate(code);
	};
	
	compiler = {
		'native': compileNativeClass	
	};
})();
function emptyFn(){return undefined;}
function LexicalElement(){}
LexicalElement.prototype={found:emptyFn,validate:emptyFn,failure: emptyFn};

function ExpressionElement(regexp){
	if(regexp)this.expression = regexp;
}
ExpressionElement.prototype = new LexicalElement();
ExpressionElement.prototype.expression = /^.*/;
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

function expression(expr){
	if(!expr) throw "Null expression";
	var el = new ExpressionElement(expr);
	return el;
}
function chain(){
	if(arguments.length <= 1) throw Error("Invalid number of elements");
	var arr = [];
	for(var i = 0; i < arguments.length;i++)arr.push(arguments[i]);
	var el = new ElementChain(arr);
	return el;
}

function stack(){
	if(arguments.length <= 1) throw Error("Invalid number of elements");
	var arr = [];
	for(var i = 0; i < arguments.length;i++)arr.push(arguments[i]);
	var el = new ElementStack(arr);
	return el;
}

(function(){
	//GENERAL USE EXPRESSION ELEMENTS
	var IDENTIFIER = expression(/^[_$a-zA-Z][_$a-zA-Z0-9]*/);
	var PACKAGE = expression(/^package/);
	var IMPORT =  expression(/^import/);
	var DOT = expression(/^\./);
	var COMMA = expression(/^,/);
	var BLANK = expression(/^[\s]*/);
	var SEMI_COLON = expression(/^[;]/);
	var NATIVE = expression(/^native/);
	var EXTENDS = expression(/^extends/);
	
	/*
	 * identifier.identifier.identifier. ...
	 */
	var fullName = (function(){
		var nameSerie = chain(IDENTIFIER, DOT);
		var nameEnd = stack(nameSerie, IDENTIFIER);
		nameSerie.elements.push(nameEnd);
		return nameEnd;
	})();
	
	/*
	 * Validates The first line wheres the package:
	 * package identifier.identifier. ...;
	 */
	var packageStatement = (function(){
		var packagestmt = chain(PACKAGE, fullName, SEMI_COLON,BLANK);
		return packagestmt;
	})();
	
	/*
	 * import org.package.Class;
	 * import org.package.Class;
	 * import org.package.Class; ...
	 */	
	var importStatements = (function(){
		var importSeries = chain(chain(IMPORT, fullName,SEMI_COLON),BLANK);
		var imports = stack(importSeries,BLANK);
		importSeries.elements.push(imports);
		return imports;
	})();
	
	/*
	 * [class Name] extends Parent
	 */
	var extendsStatement = (function(){
		return stack(chain(EXTENDS, IDENTIFIER), BLANK);
	})();
	
	/*
	 * Elements that may be inside a native class
	 */
	var nativeClassBody = (function(){
		
	})();
	
	/*
	 * Validates a full native class
	 */
	var nativeClass = (function(){
		var native = chain(
				packageStatement, //package definition
				importStatements, //Define imports
				NATIVE, //its a native class
				IDENTIFIER,//the name of the class
				extendsStatement, //Extends a class
				nativeClassBody);
		return native;
	})();
	
	var compileNativeClass = function(code){
		return nativeClass.validate(code);
	};
	
	window.compiler = {
		native: compileNativeClass	
	};
})();