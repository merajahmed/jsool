// http://java.sun.com/docs/books/jls/second_edition/html/jTOC.doc.html
// http://www.regular-expressions.info/reference.html

//var JavaLexer = (function(){
	var BLANK = expression(/^[\s]+/);

	// http://java.sun.com/docs/books/jls/second_edition/html/lexical.doc.html#48089
	var UNICODE_INPUT_CHARACTER = expression(/^(\\u[0-9a-zA-Z]{4})|(.)/);
	
	// http://java.sun.com/docs/books/jls/second_edition/html/lexical.doc.html#22634
	var LINE_TERMINATOR = expression(/^\n|\r|\n\r/);
	var INPUT_CHARACTER = UNICODE_INPUT_CHARACTER;
	
	// http://java.sun.com/docs/books/jls/second_edition/html/lexical.doc.html#48121
	var WHITE_SPACE = stack(BLANK,LINE_TERMINATOR);
	
	//9724
	var COMMENT = expression(/^\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+/);
	
	//229286
	var IDENTIFIER = expression(/^[_$a-zA-Z][_$a-zA-Z0-9]*/);
	
	//229309
	var KEYWORD = expression(/^[abstract|default|if|private|this|boolean|do|implements|protected|throw|break|double|import|public|throws|byte|else|instanceof|return|transient|case|extends|int|short|try|catch|final|interface|static|void|char|finally|long|strictfp|volatile|class|float|native|super|while|const|for|new|switch|continue|goto|package|synchronized]/);
	
	//46750
	var INTEGER_LITERAL = expression(/^([0-9]+[lL]{0,1})|(0[xX][0-9a-fA-F])/);
	
	var FLOATING_POINT_LITERAL = expression(/^[0-9]+(\.[0-9]+)?([Ee][+-]{0,1})?([fFdD])?/);
	
	var BOOLEAN_LITERAL = expression(/^(true|false)/);
	
	var CHARACTER_LITERAL = expression(/^'.'/);
	
	var STRING_LITERAL = expression(/^".*"/);
	
	var NULL_LITERAL = expression(/^null/);
	
	//228794
	var LITERAL = stack(INTEGER_LITERAL,FLOATING_POINT_LITERAL,BOOLEAN_LITERAL,CHARACTER_LITERAL,STRING_LITERAL,NULL_LITERAL);
	
	var SEPARATOR = expression(/^[(){}[];,.]/);
	
	var OPERATOR = expression(/^([~?:])|([&+|-]{2})|([>]{2,3}[=]{0,1}|[<]{2}[=]{0,1}|[=+!><*\/&|^%-][=]{0,1})/);
	
	// http://java.sun.com/docs/books/jls/second_edition/html/lexical.doc.html#25688
	var SUB = expression(/^\cZ/);
	var TOLKEN = stack(LITERAL, IDENTIFIER, KEYWORD, SEPARATOR, OPERATOR);	
	var INPUT_ELEMENT = stack(TOLKEN, WHITE_SPACE);
	
	//ERRO AQUI
	var $INPUT_ELEMENT_SERIE = chain(INPUT_ELEMENT,BLANK);
	var INPUT_ELEMENTS = stack($INPUT_ELEMENT_SERIE,BLANK);
	$INPUT_ELEMENT_SERIE.push(INPUT_ELEMENTS); 
	
	var INPUT = chain(stack(INPUT_ELEMENTS,BLANK),chain(SUB,BLANK),BLANK);
//})();