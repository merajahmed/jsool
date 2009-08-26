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
	if(arguments.length <= 1) throw Error("Invalid number of elements");
	var arr = [];
	for(var i = 0; i < arguments.length;i++)arr.push(arguments[i]);
	var el = new ElementChain(arr);
	return el;
}

/**
 * short hand to create a {@link ElementStack}
 */
function stack(){
	if(arguments.length <= 1) throw Error("Invalid number of elements");
	var arr = [];
	for(var i = 0; i < arguments.length;i++)arr.push(arguments[i]);
	var el = new ElementStack(arr);
	return el;
}





var NativeClassBuilder = (function(){
	var pack = new String();
	var clsName = new String();
	var parent = new String();
	var methods = {};
	
	return {
		'package': function(string){
			var pkname = string.trim();
			pkname = pkname.substring('package '.length,pkname.length - 1);
			pack = pkname;
		},
		'class': function(string){
			var cname = string.trim().substring('native '.length);
			clsName = cname;
		},
		'method': function(string){
			var signature = string.trim().replace(/\s+/,' ');
			console.info(methods);
			if(methods[signature]){
				throw new Error('Illegal method signature: '+signature);
			}else{
				signature = signature.substring('function '.length);
				var args = signature.match(/\((.+)\)/);
				splited = signature.split(/\s/);
				var name = splited[1];
				var type = splited[0];
				
				var arguments = [];
				if(args){
					args = args[1].split(',');
					
					for(var i = 0, arg;arg = args[i++];){
						parts = arg.split(' ');
						arguments.push({
							type: parts[0],
							name: parts[1]
						});
					}
				}
				
				methods[signature]={
					name:name,
					type:type,
					arguments:arguments
				};
			}
		},
		'extends': function(string){
			var p = string.trim().substring('extends '.length);
			parent = p;
		},
		getClass: function(){
			return {
				pack:pack,
				name:clsName,
				parent:parent,
				methods:methods
			};
		}
	};
})();
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
	var PUBLIC = expression(/^public/);
	var FUNCTION = expression(/^function/);
	var STRING_END = expression(/^$/);
	var OPEN_BLOCK = expression(/^{/);
	var CLOSE_BLOCK = expression(/^}/);
	var OPEN_ARGS = expression(/^\(/);
	var CLOSE_ARGS = expression(/^\)/);
	
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
		packagestmt.found = NativeClassBuilder['package'];
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
		extendsstmt.found = NativeClassBuilder['extends'];
		return extendsstmt;
	})();
	
	var nativeClassMethods = (function(){
		var argsSerie = chain(IDENTIFIER,IDENTIFIER,COMMA);
		var argsNames = stack(argsSerie, chain(IDENTIFIER, IDENTIFIER));
		argsSerie.elements.push(argsNames);
		
		var methodName = IDENTIFIER.clone();
		var methodType = IDENTIFIER.clone();
		var methodSignature = chain(FUNCTION,methodType,methodName,OPEN_ARGS,argsNames,CLOSE_ARGS,SEMI_COLON);
		methodSignature.found = NativeClassBuilder['method'];
		
		var methodsSerie = chain(methodSignature,BLANK);
		var methodsNames = stack(methodsSerie,BLANK);
		methodsSerie.elements.push(methodsNames);
		
		return methodsNames; 
	})();
	
	/*
	 * Elements that may be inside a native class
	 */
	var nativeClassBody = (function(){
		var nativeBody = chain(OPEN_BLOCK,nativeClassMethods,CLOSE_BLOCK);
		return nativeBody;
	})();
	
	var nativeClassName = (function(){
		var className = chain(NATIVE, IDENTIFIER);
		className.found = NativeClassBuilder['class'];
		return className;
	})();
	
	/*
	 * Validates a full native class
	 */
	var nativeClass = (function(){
		var nativecls = chain(
				packageStatement, //package definition
				importStatements, //Define imports
				nativeClassName,//the name of the class
				extendsStatement, //Extends a class
				nativeClassBody,
				STRING_END);
		return nativecls;
	})();
	
	var compileNativeClass = function(code){
		code = code.replace(/\n/g,"");
		return nativeClass.validate(code);
	};
	
	compiler = {
		'native': compileNativeClass	
	};
})();