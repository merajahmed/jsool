// $ANTLR 3.2 Sep 23, 2009 12:02:23 C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g 2010-06-30 14:48:48

var JavaLexer = function(input, state) {
// alternate constructor @todo
// public JavaLexer(CharStream input)
// public JavaLexer(CharStream input, RecognizerSharedState state) {
    if (!state) {
        state = new org.antlr.runtime.RecognizerSharedState();
    }

    (function(){

        	this.enumIsKeyword = true;

    }).call(this);

    this.dfa19 = new JavaLexer.DFA19(this);
    this.dfa30 = new JavaLexer.DFA30(this);
    JavaLexer.superclass.constructor.call(this, input, state);


};

org.antlr.lang.augmentObject(JavaLexer, {
    T__29: 29,
    T__28: 28,
    T__27: 27,
    T__26: 26,
    FloatTypeSuffix: 15,
    T__25: 25,
    OctalLiteral: 10,
    T__24: 24,
    EOF: -1,
    Identifier: 4,
    T__93: 93,
    T__94: 94,
    T__91: 91,
    T__92: 92,
    T__90: 90,
    COMMENT: 22,
    T__99: 99,
    T__98: 98,
    T__97: 97,
    T__96: 96,
    T__95: 95,
    T__80: 80,
    T__81: 81,
    T__82: 82,
    T__83: 83,
    LINE_COMMENT: 23,
    IntegerTypeSuffix: 13,
    T__85: 85,
    T__84: 84,
    T__87: 87,
    T__86: 86,
    T__89: 89,
    T__88: 88,
    T__71: 71,
    WS: 21,
    T__72: 72,
    T__70: 70,
    FloatingPointLiteral: 6,
    JavaIDDigit: 20,
    T__76: 76,
    T__75: 75,
    T__74: 74,
    Letter: 19,
    EscapeSequence: 16,
    T__73: 73,
    T__79: 79,
    T__78: 78,
    T__77: 77,
    T__68: 68,
    T__69: 69,
    T__66: 66,
    T__67: 67,
    T__64: 64,
    T__65: 65,
    T__62: 62,
    T__63: 63,
    CharacterLiteral: 7,
    Exponent: 14,
    T__61: 61,
    T__60: 60,
    HexDigit: 12,
    T__55: 55,
    T__56: 56,
    T__57: 57,
    T__58: 58,
    T__51: 51,
    T__52: 52,
    T__53: 53,
    T__54: 54,
    T__107: 107,
    T__108: 108,
    T__109: 109,
    T__59: 59,
    T__103: 103,
    T__104: 104,
    T__105: 105,
    T__106: 106,
    T__111: 111,
    T__110: 110,
    T__113: 113,
    T__112: 112,
    T__50: 50,
    T__42: 42,
    HexLiteral: 9,
    T__43: 43,
    T__40: 40,
    T__41: 41,
    T__46: 46,
    T__47: 47,
    T__44: 44,
    T__45: 45,
    T__48: 48,
    T__49: 49,
    T__102: 102,
    T__101: 101,
    T__100: 100,
    DecimalLiteral: 11,
    StringLiteral: 8,
    T__30: 30,
    T__31: 31,
    T__32: 32,
    T__33: 33,
    T__34: 34,
    ENUM: 5,
    T__35: 35,
    T__36: 36,
    T__37: 37,
    T__38: 38,
    T__39: 39,
    UnicodeEscape: 17,
    OctalEscape: 18
});

(function(){
var HIDDEN = org.antlr.runtime.Token.HIDDEN_CHANNEL,
    EOF = org.antlr.runtime.Token.EOF;
org.antlr.lang.extend(JavaLexer, org.antlr.runtime.Lexer, {
    T__29 : 29,
    T__28 : 28,
    T__27 : 27,
    T__26 : 26,
    FloatTypeSuffix : 15,
    T__25 : 25,
    OctalLiteral : 10,
    T__24 : 24,
    EOF : -1,
    Identifier : 4,
    T__93 : 93,
    T__94 : 94,
    T__91 : 91,
    T__92 : 92,
    T__90 : 90,
    COMMENT : 22,
    T__99 : 99,
    T__98 : 98,
    T__97 : 97,
    T__96 : 96,
    T__95 : 95,
    T__80 : 80,
    T__81 : 81,
    T__82 : 82,
    T__83 : 83,
    LINE_COMMENT : 23,
    IntegerTypeSuffix : 13,
    T__85 : 85,
    T__84 : 84,
    T__87 : 87,
    T__86 : 86,
    T__89 : 89,
    T__88 : 88,
    T__71 : 71,
    WS : 21,
    T__72 : 72,
    T__70 : 70,
    FloatingPointLiteral : 6,
    JavaIDDigit : 20,
    T__76 : 76,
    T__75 : 75,
    T__74 : 74,
    Letter : 19,
    EscapeSequence : 16,
    T__73 : 73,
    T__79 : 79,
    T__78 : 78,
    T__77 : 77,
    T__68 : 68,
    T__69 : 69,
    T__66 : 66,
    T__67 : 67,
    T__64 : 64,
    T__65 : 65,
    T__62 : 62,
    T__63 : 63,
    CharacterLiteral : 7,
    Exponent : 14,
    T__61 : 61,
    T__60 : 60,
    HexDigit : 12,
    T__55 : 55,
    T__56 : 56,
    T__57 : 57,
    T__58 : 58,
    T__51 : 51,
    T__52 : 52,
    T__53 : 53,
    T__54 : 54,
    T__107 : 107,
    T__108 : 108,
    T__109 : 109,
    T__59 : 59,
    T__103 : 103,
    T__104 : 104,
    T__105 : 105,
    T__106 : 106,
    T__111 : 111,
    T__110 : 110,
    T__113 : 113,
    T__112 : 112,
    T__50 : 50,
    T__42 : 42,
    HexLiteral : 9,
    T__43 : 43,
    T__40 : 40,
    T__41 : 41,
    T__46 : 46,
    T__47 : 47,
    T__44 : 44,
    T__45 : 45,
    T__48 : 48,
    T__49 : 49,
    T__102 : 102,
    T__101 : 101,
    T__100 : 100,
    DecimalLiteral : 11,
    StringLiteral : 8,
    T__30 : 30,
    T__31 : 31,
    T__32 : 32,
    T__33 : 33,
    T__34 : 34,
    ENUM : 5,
    T__35 : 35,
    T__36 : 36,
    T__37 : 37,
    T__38 : 38,
    T__39 : 39,
    UnicodeEscape : 17,
    OctalEscape : 18,
    getGrammarFileName: function() { return "C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g"; }
});
org.antlr.lang.augmentObject(JavaLexer.prototype, {
    // $ANTLR start T__24
    mT__24: function()  {
        try {
            var _type = this.T__24;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:11:7: ( 'package' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:11:9: 'package'
            this.match("package"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__24",

    // $ANTLR start T__25
    mT__25: function()  {
        try {
            var _type = this.T__25;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:12:7: ( ';' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:12:9: ';'
            this.match(';'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__25",

    // $ANTLR start T__26
    mT__26: function()  {
        try {
            var _type = this.T__26;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:13:7: ( 'import' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:13:9: 'import'
            this.match("import"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__26",

    // $ANTLR start T__27
    mT__27: function()  {
        try {
            var _type = this.T__27;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:14:7: ( 'static' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:14:9: 'static'
            this.match("static"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__27",

    // $ANTLR start T__28
    mT__28: function()  {
        try {
            var _type = this.T__28;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:15:7: ( '.' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:15:9: '.'
            this.match('.'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__28",

    // $ANTLR start T__29
    mT__29: function()  {
        try {
            var _type = this.T__29;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:16:7: ( '*' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:16:9: '*'
            this.match('*'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__29",

    // $ANTLR start T__30
    mT__30: function()  {
        try {
            var _type = this.T__30;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:17:7: ( 'class' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:17:9: 'class'
            this.match("class"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__30",

    // $ANTLR start T__31
    mT__31: function()  {
        try {
            var _type = this.T__31;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:18:7: ( 'extends' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:18:9: 'extends'
            this.match("extends"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__31",

    // $ANTLR start T__32
    mT__32: function()  {
        try {
            var _type = this.T__32;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:19:7: ( 'implements' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:19:9: 'implements'
            this.match("implements"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__32",

    // $ANTLR start T__33
    mT__33: function()  {
        try {
            var _type = this.T__33;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:20:7: ( '<' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:20:9: '<'
            this.match('<'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__33",

    // $ANTLR start T__34
    mT__34: function()  {
        try {
            var _type = this.T__34;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:21:7: ( ',' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:21:9: ','
            this.match(','); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__34",

    // $ANTLR start T__35
    mT__35: function()  {
        try {
            var _type = this.T__35;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:22:7: ( '>' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:22:9: '>'
            this.match('>'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__35",

    // $ANTLR start T__36
    mT__36: function()  {
        try {
            var _type = this.T__36;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:23:7: ( '&' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:23:9: '&'
            this.match('&'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__36",

    // $ANTLR start T__37
    mT__37: function()  {
        try {
            var _type = this.T__37;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:24:7: ( '{' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:24:9: '{'
            this.match('{'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__37",

    // $ANTLR start T__38
    mT__38: function()  {
        try {
            var _type = this.T__38;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:25:7: ( '}' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:25:9: '}'
            this.match('}'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__38",

    // $ANTLR start T__39
    mT__39: function()  {
        try {
            var _type = this.T__39;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:26:7: ( 'interface' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:26:9: 'interface'
            this.match("interface"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__39",

    // $ANTLR start T__40
    mT__40: function()  {
        try {
            var _type = this.T__40;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:27:7: ( 'void' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:27:9: 'void'
            this.match("void"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__40",

    // $ANTLR start T__41
    mT__41: function()  {
        try {
            var _type = this.T__41;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:28:7: ( '[' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:28:9: '['
            this.match('['); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__41",

    // $ANTLR start T__42
    mT__42: function()  {
        try {
            var _type = this.T__42;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:29:7: ( ']' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:29:9: ']'
            this.match(']'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__42",

    // $ANTLR start T__43
    mT__43: function()  {
        try {
            var _type = this.T__43;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:30:7: ( 'throws' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:30:9: 'throws'
            this.match("throws"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__43",

    // $ANTLR start T__44
    mT__44: function()  {
        try {
            var _type = this.T__44;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:31:7: ( '=' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:31:9: '='
            this.match('='); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__44",

    // $ANTLR start T__45
    mT__45: function()  {
        try {
            var _type = this.T__45;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:32:7: ( 'public' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:32:9: 'public'
            this.match("public"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__45",

    // $ANTLR start T__46
    mT__46: function()  {
        try {
            var _type = this.T__46;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:33:7: ( 'protected' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:33:9: 'protected'
            this.match("protected"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__46",

    // $ANTLR start T__47
    mT__47: function()  {
        try {
            var _type = this.T__47;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:34:7: ( 'private' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:34:9: 'private'
            this.match("private"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__47",

    // $ANTLR start T__48
    mT__48: function()  {
        try {
            var _type = this.T__48;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:35:7: ( 'abstract' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:35:9: 'abstract'
            this.match("abstract"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__48",

    // $ANTLR start T__49
    mT__49: function()  {
        try {
            var _type = this.T__49;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:36:7: ( 'final' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:36:9: 'final'
            this.match("final"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__49",

    // $ANTLR start T__50
    mT__50: function()  {
        try {
            var _type = this.T__50;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:37:7: ( 'native' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:37:9: 'native'
            this.match("native"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__50",

    // $ANTLR start T__51
    mT__51: function()  {
        try {
            var _type = this.T__51;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:38:7: ( 'synchronized' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:38:9: 'synchronized'
            this.match("synchronized"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__51",

    // $ANTLR start T__52
    mT__52: function()  {
        try {
            var _type = this.T__52;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:39:7: ( 'transient' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:39:9: 'transient'
            this.match("transient"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__52",

    // $ANTLR start T__53
    mT__53: function()  {
        try {
            var _type = this.T__53;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:40:7: ( 'volatile' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:40:9: 'volatile'
            this.match("volatile"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__53",

    // $ANTLR start T__54
    mT__54: function()  {
        try {
            var _type = this.T__54;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:41:7: ( 'strictfp' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:41:9: 'strictfp'
            this.match("strictfp"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__54",

    // $ANTLR start T__55
    mT__55: function()  {
        try {
            var _type = this.T__55;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:42:7: ( 'boolean' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:42:9: 'boolean'
            this.match("boolean"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__55",

    // $ANTLR start T__56
    mT__56: function()  {
        try {
            var _type = this.T__56;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:43:7: ( 'char' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:43:9: 'char'
            this.match("char"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__56",

    // $ANTLR start T__57
    mT__57: function()  {
        try {
            var _type = this.T__57;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:44:7: ( 'byte' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:44:9: 'byte'
            this.match("byte"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__57",

    // $ANTLR start T__58
    mT__58: function()  {
        try {
            var _type = this.T__58;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:45:7: ( 'short' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:45:9: 'short'
            this.match("short"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__58",

    // $ANTLR start T__59
    mT__59: function()  {
        try {
            var _type = this.T__59;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:46:7: ( 'int' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:46:9: 'int'
            this.match("int"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__59",

    // $ANTLR start T__60
    mT__60: function()  {
        try {
            var _type = this.T__60;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:47:7: ( 'long' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:47:9: 'long'
            this.match("long"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__60",

    // $ANTLR start T__61
    mT__61: function()  {
        try {
            var _type = this.T__61;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:48:7: ( 'float' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:48:9: 'float'
            this.match("float"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__61",

    // $ANTLR start T__62
    mT__62: function()  {
        try {
            var _type = this.T__62;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:49:7: ( 'double' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:49:9: 'double'
            this.match("double"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__62",

    // $ANTLR start T__63
    mT__63: function()  {
        try {
            var _type = this.T__63;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:50:7: ( '?' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:50:9: '?'
            this.match('?'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__63",

    // $ANTLR start T__64
    mT__64: function()  {
        try {
            var _type = this.T__64;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:51:7: ( 'super' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:51:9: 'super'
            this.match("super"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__64",

    // $ANTLR start T__65
    mT__65: function()  {
        try {
            var _type = this.T__65;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:52:7: ( '(' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:52:9: '('
            this.match('('); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__65",

    // $ANTLR start T__66
    mT__66: function()  {
        try {
            var _type = this.T__66;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:53:7: ( ')' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:53:9: ')'
            this.match(')'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__66",

    // $ANTLR start T__67
    mT__67: function()  {
        try {
            var _type = this.T__67;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:54:7: ( '...' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:54:9: '...'
            this.match("..."); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__67",

    // $ANTLR start T__68
    mT__68: function()  {
        try {
            var _type = this.T__68;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:55:7: ( 'null' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:55:9: 'null'
            this.match("null"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__68",

    // $ANTLR start T__69
    mT__69: function()  {
        try {
            var _type = this.T__69;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:56:7: ( 'true' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:56:9: 'true'
            this.match("true"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__69",

    // $ANTLR start T__70
    mT__70: function()  {
        try {
            var _type = this.T__70;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:57:7: ( 'false' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:57:9: 'false'
            this.match("false"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__70",

    // $ANTLR start T__71
    mT__71: function()  {
        try {
            var _type = this.T__71;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:58:7: ( '@' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:58:9: '@'
            this.match('@'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__71",

    // $ANTLR start T__72
    mT__72: function()  {
        try {
            var _type = this.T__72;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:59:7: ( 'default' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:59:9: 'default'
            this.match("default"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__72",

    // $ANTLR start T__73
    mT__73: function()  {
        try {
            var _type = this.T__73;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:60:7: ( 'assert' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:60:9: 'assert'
            this.match("assert"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__73",

    // $ANTLR start T__74
    mT__74: function()  {
        try {
            var _type = this.T__74;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:61:7: ( ':' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:61:9: ':'
            this.match(':'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__74",

    // $ANTLR start T__75
    mT__75: function()  {
        try {
            var _type = this.T__75;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:62:7: ( 'if' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:62:9: 'if'
            this.match("if"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__75",

    // $ANTLR start T__76
    mT__76: function()  {
        try {
            var _type = this.T__76;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:63:7: ( 'else' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:63:9: 'else'
            this.match("else"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__76",

    // $ANTLR start T__77
    mT__77: function()  {
        try {
            var _type = this.T__77;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:64:7: ( 'for' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:64:9: 'for'
            this.match("for"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__77",

    // $ANTLR start T__78
    mT__78: function()  {
        try {
            var _type = this.T__78;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:65:7: ( 'while' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:65:9: 'while'
            this.match("while"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__78",

    // $ANTLR start T__79
    mT__79: function()  {
        try {
            var _type = this.T__79;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:66:7: ( 'do' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:66:9: 'do'
            this.match("do"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__79",

    // $ANTLR start T__80
    mT__80: function()  {
        try {
            var _type = this.T__80;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:67:7: ( 'try' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:67:9: 'try'
            this.match("try"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__80",

    // $ANTLR start T__81
    mT__81: function()  {
        try {
            var _type = this.T__81;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:68:7: ( 'finally' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:68:9: 'finally'
            this.match("finally"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__81",

    // $ANTLR start T__82
    mT__82: function()  {
        try {
            var _type = this.T__82;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:69:7: ( 'switch' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:69:9: 'switch'
            this.match("switch"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__82",

    // $ANTLR start T__83
    mT__83: function()  {
        try {
            var _type = this.T__83;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:70:7: ( 'return' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:70:9: 'return'
            this.match("return"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__83",

    // $ANTLR start T__84
    mT__84: function()  {
        try {
            var _type = this.T__84;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:71:7: ( 'throw' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:71:9: 'throw'
            this.match("throw"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__84",

    // $ANTLR start T__85
    mT__85: function()  {
        try {
            var _type = this.T__85;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:72:7: ( 'break' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:72:9: 'break'
            this.match("break"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__85",

    // $ANTLR start T__86
    mT__86: function()  {
        try {
            var _type = this.T__86;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:73:7: ( 'continue' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:73:9: 'continue'
            this.match("continue"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__86",

    // $ANTLR start T__87
    mT__87: function()  {
        try {
            var _type = this.T__87;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:74:7: ( 'catch' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:74:9: 'catch'
            this.match("catch"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__87",

    // $ANTLR start T__88
    mT__88: function()  {
        try {
            var _type = this.T__88;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:75:7: ( 'case' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:75:9: 'case'
            this.match("case"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__88",

    // $ANTLR start T__89
    mT__89: function()  {
        try {
            var _type = this.T__89;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:76:7: ( '+=' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:76:9: '+='
            this.match("+="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__89",

    // $ANTLR start T__90
    mT__90: function()  {
        try {
            var _type = this.T__90;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:77:7: ( '-=' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:77:9: '-='
            this.match("-="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__90",

    // $ANTLR start T__91
    mT__91: function()  {
        try {
            var _type = this.T__91;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:78:7: ( '*=' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:78:9: '*='
            this.match("*="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__91",

    // $ANTLR start T__92
    mT__92: function()  {
        try {
            var _type = this.T__92;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:79:7: ( '/=' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:79:9: '/='
            this.match("/="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__92",

    // $ANTLR start T__93
    mT__93: function()  {
        try {
            var _type = this.T__93;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:80:7: ( '&=' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:80:9: '&='
            this.match("&="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__93",

    // $ANTLR start T__94
    mT__94: function()  {
        try {
            var _type = this.T__94;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:81:7: ( '|=' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:81:9: '|='
            this.match("|="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__94",

    // $ANTLR start T__95
    mT__95: function()  {
        try {
            var _type = this.T__95;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:82:7: ( '^=' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:82:9: '^='
            this.match("^="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__95",

    // $ANTLR start T__96
    mT__96: function()  {
        try {
            var _type = this.T__96;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:83:7: ( '%=' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:83:9: '%='
            this.match("%="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__96",

    // $ANTLR start T__97
    mT__97: function()  {
        try {
            var _type = this.T__97;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:84:7: ( '||' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:84:9: '||'
            this.match("||"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__97",

    // $ANTLR start T__98
    mT__98: function()  {
        try {
            var _type = this.T__98;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:85:7: ( '&&' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:85:9: '&&'
            this.match("&&"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__98",

    // $ANTLR start T__99
    mT__99: function()  {
        try {
            var _type = this.T__99;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:86:7: ( '|' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:86:9: '|'
            this.match('|'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__99",

    // $ANTLR start T__100
    mT__100: function()  {
        try {
            var _type = this.T__100;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:87:8: ( '^' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:87:10: '^'
            this.match('^'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__100",

    // $ANTLR start T__101
    mT__101: function()  {
        try {
            var _type = this.T__101;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:88:8: ( '==' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:88:10: '=='
            this.match("=="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__101",

    // $ANTLR start T__102
    mT__102: function()  {
        try {
            var _type = this.T__102;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:89:8: ( '!=' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:89:10: '!='
            this.match("!="); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__102",

    // $ANTLR start T__103
    mT__103: function()  {
        try {
            var _type = this.T__103;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:90:8: ( 'instanceof' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:90:10: 'instanceof'
            this.match("instanceof"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__103",

    // $ANTLR start T__104
    mT__104: function()  {
        try {
            var _type = this.T__104;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:91:8: ( '+' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:91:10: '+'
            this.match('+'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__104",

    // $ANTLR start T__105
    mT__105: function()  {
        try {
            var _type = this.T__105;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:92:8: ( '-' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:92:10: '-'
            this.match('-'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__105",

    // $ANTLR start T__106
    mT__106: function()  {
        try {
            var _type = this.T__106;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:93:8: ( '/' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:93:10: '/'
            this.match('/'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__106",

    // $ANTLR start T__107
    mT__107: function()  {
        try {
            var _type = this.T__107;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:94:8: ( '%' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:94:10: '%'
            this.match('%'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__107",

    // $ANTLR start T__108
    mT__108: function()  {
        try {
            var _type = this.T__108;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:95:8: ( '++' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:95:10: '++'
            this.match("++"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__108",

    // $ANTLR start T__109
    mT__109: function()  {
        try {
            var _type = this.T__109;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:96:8: ( '--' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:96:10: '--'
            this.match("--"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__109",

    // $ANTLR start T__110
    mT__110: function()  {
        try {
            var _type = this.T__110;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:97:8: ( '~' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:97:10: '~'
            this.match('~'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__110",

    // $ANTLR start T__111
    mT__111: function()  {
        try {
            var _type = this.T__111;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:98:8: ( '!' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:98:10: '!'
            this.match('!'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__111",

    // $ANTLR start T__112
    mT__112: function()  {
        try {
            var _type = this.T__112;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:99:8: ( 'this' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:99:10: 'this'
            this.match("this"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__112",

    // $ANTLR start T__113
    mT__113: function()  {
        try {
            var _type = this.T__113;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:100:8: ( 'new' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:100:10: 'new'
            this.match("new"); 




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "T__113",

    // $ANTLR start HexLiteral
    mHexLiteral: function()  {
        try {
            var _type = this.HexLiteral;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:775:12: ( '0' ( 'x' | 'X' ) ( HexDigit )+ ( IntegerTypeSuffix )? )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:775:14: '0' ( 'x' | 'X' ) ( HexDigit )+ ( IntegerTypeSuffix )?
            this.match('0'); 
            if ( this.input.LA(1)=='X'||this.input.LA(1)=='x' ) {
                this.input.consume();

            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);
                throw mse;}

            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:775:28: ( HexDigit )+
            var cnt1=0;
            loop1:
            do {
                var alt1=2;
                var LA1_0 = this.input.LA(1);

                if ( ((LA1_0>='0' && LA1_0<='9')||(LA1_0>='A' && LA1_0<='F')||(LA1_0>='a' && LA1_0<='f')) ) {
                    alt1=1;
                }


                switch (alt1) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:775:28: HexDigit
                    this.mHexDigit(); 


                    break;

                default :
                    if ( cnt1 >= 1 ) {
                        break loop1;
                    }
                        var eee = new org.antlr.runtime.EarlyExitException(1, this.input);
                        throw eee;
                }
                cnt1++;
            } while (true);

            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:775:38: ( IntegerTypeSuffix )?
            var alt2=2;
            var LA2_0 = this.input.LA(1);

            if ( (LA2_0=='L'||LA2_0=='l') ) {
                alt2=1;
            }
            switch (alt2) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:775:38: IntegerTypeSuffix
                    this.mIntegerTypeSuffix(); 


                    break;

            }




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "HexLiteral",

    // $ANTLR start DecimalLiteral
    mDecimalLiteral: function()  {
        try {
            var _type = this.DecimalLiteral;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:777:16: ( ( '0' | '1' .. '9' ( '0' .. '9' )* ) ( IntegerTypeSuffix )? )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:777:18: ( '0' | '1' .. '9' ( '0' .. '9' )* ) ( IntegerTypeSuffix )?
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:777:18: ( '0' | '1' .. '9' ( '0' .. '9' )* )
            var alt4=2;
            var LA4_0 = this.input.LA(1);

            if ( (LA4_0=='0') ) {
                alt4=1;
            }
            else if ( ((LA4_0>='1' && LA4_0<='9')) ) {
                alt4=2;
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 4, 0, this.input);

                throw nvae;
            }
            switch (alt4) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:777:19: '0'
                    this.match('0'); 


                    break;
                case 2 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:777:25: '1' .. '9' ( '0' .. '9' )*
                    this.matchRange('1','9'); 
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:777:34: ( '0' .. '9' )*
                    loop3:
                    do {
                        var alt3=2;
                        var LA3_0 = this.input.LA(1);

                        if ( ((LA3_0>='0' && LA3_0<='9')) ) {
                            alt3=1;
                        }


                        switch (alt3) {
                        case 1 :
                            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:777:34: '0' .. '9'
                            this.matchRange('0','9'); 


                            break;

                        default :
                            break loop3;
                        }
                    } while (true);



                    break;

            }

            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:777:45: ( IntegerTypeSuffix )?
            var alt5=2;
            var LA5_0 = this.input.LA(1);

            if ( (LA5_0=='L'||LA5_0=='l') ) {
                alt5=1;
            }
            switch (alt5) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:777:45: IntegerTypeSuffix
                    this.mIntegerTypeSuffix(); 


                    break;

            }




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "DecimalLiteral",

    // $ANTLR start OctalLiteral
    mOctalLiteral: function()  {
        try {
            var _type = this.OctalLiteral;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:779:14: ( '0' ( '0' .. '7' )+ ( IntegerTypeSuffix )? )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:779:16: '0' ( '0' .. '7' )+ ( IntegerTypeSuffix )?
            this.match('0'); 
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:779:20: ( '0' .. '7' )+
            var cnt6=0;
            loop6:
            do {
                var alt6=2;
                var LA6_0 = this.input.LA(1);

                if ( ((LA6_0>='0' && LA6_0<='7')) ) {
                    alt6=1;
                }


                switch (alt6) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:779:21: '0' .. '7'
                    this.matchRange('0','7'); 


                    break;

                default :
                    if ( cnt6 >= 1 ) {
                        break loop6;
                    }
                        var eee = new org.antlr.runtime.EarlyExitException(6, this.input);
                        throw eee;
                }
                cnt6++;
            } while (true);

            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:779:32: ( IntegerTypeSuffix )?
            var alt7=2;
            var LA7_0 = this.input.LA(1);

            if ( (LA7_0=='L'||LA7_0=='l') ) {
                alt7=1;
            }
            switch (alt7) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:779:32: IntegerTypeSuffix
                    this.mIntegerTypeSuffix(); 


                    break;

            }




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "OctalLiteral",

    // $ANTLR start HexDigit
    mHexDigit: function()  {
        try {
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:782:10: ( ( '0' .. '9' | 'a' .. 'f' | 'A' .. 'F' ) )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:782:12: ( '0' .. '9' | 'a' .. 'f' | 'A' .. 'F' )
            if ( (this.input.LA(1)>='0' && this.input.LA(1)<='9')||(this.input.LA(1)>='A' && this.input.LA(1)<='F')||(this.input.LA(1)>='a' && this.input.LA(1)<='f') ) {
                this.input.consume();

            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);
                throw mse;}




        }
        finally {
        }
    },
    // $ANTLR end "HexDigit",

    // $ANTLR start IntegerTypeSuffix
    mIntegerTypeSuffix: function()  {
        try {
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:785:19: ( ( 'l' | 'L' ) )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:785:21: ( 'l' | 'L' )
            if ( this.input.LA(1)=='L'||this.input.LA(1)=='l' ) {
                this.input.consume();

            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);
                throw mse;}




        }
        finally {
        }
    },
    // $ANTLR end "IntegerTypeSuffix",

    // $ANTLR start FloatingPointLiteral
    mFloatingPointLiteral: function()  {
        try {
            var _type = this.FloatingPointLiteral;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:788:5: ( ( '0' .. '9' )+ '.' ( '0' .. '9' )* ( Exponent )? ( FloatTypeSuffix )? | '.' ( '0' .. '9' )+ ( Exponent )? ( FloatTypeSuffix )? | ( '0' .. '9' )+ Exponent ( FloatTypeSuffix )? | ( '0' .. '9' )+ ( Exponent )? FloatTypeSuffix )
            var alt19=4;
            alt19 = this.dfa19.predict(this.input);
            switch (alt19) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:788:9: ( '0' .. '9' )+ '.' ( '0' .. '9' )* ( Exponent )? ( FloatTypeSuffix )?
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:788:9: ( '0' .. '9' )+
                    var cnt8=0;
                    loop8:
                    do {
                        var alt8=2;
                        var LA8_0 = this.input.LA(1);

                        if ( ((LA8_0>='0' && LA8_0<='9')) ) {
                            alt8=1;
                        }


                        switch (alt8) {
                        case 1 :
                            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:788:10: '0' .. '9'
                            this.matchRange('0','9'); 


                            break;

                        default :
                            if ( cnt8 >= 1 ) {
                                break loop8;
                            }
                                var eee = new org.antlr.runtime.EarlyExitException(8, this.input);
                                throw eee;
                        }
                        cnt8++;
                    } while (true);

                    this.match('.'); 
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:788:25: ( '0' .. '9' )*
                    loop9:
                    do {
                        var alt9=2;
                        var LA9_0 = this.input.LA(1);

                        if ( ((LA9_0>='0' && LA9_0<='9')) ) {
                            alt9=1;
                        }


                        switch (alt9) {
                        case 1 :
                            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:788:26: '0' .. '9'
                            this.matchRange('0','9'); 


                            break;

                        default :
                            break loop9;
                        }
                    } while (true);

                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:788:37: ( Exponent )?
                    var alt10=2;
                    var LA10_0 = this.input.LA(1);

                    if ( (LA10_0=='E'||LA10_0=='e') ) {
                        alt10=1;
                    }
                    switch (alt10) {
                        case 1 :
                            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:788:37: Exponent
                            this.mExponent(); 


                            break;

                    }

                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:788:47: ( FloatTypeSuffix )?
                    var alt11=2;
                    var LA11_0 = this.input.LA(1);

                    if ( (LA11_0=='D'||LA11_0=='F'||LA11_0=='d'||LA11_0=='f') ) {
                        alt11=1;
                    }
                    switch (alt11) {
                        case 1 :
                            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:788:47: FloatTypeSuffix
                            this.mFloatTypeSuffix(); 


                            break;

                    }



                    break;
                case 2 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:789:9: '.' ( '0' .. '9' )+ ( Exponent )? ( FloatTypeSuffix )?
                    this.match('.'); 
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:789:13: ( '0' .. '9' )+
                    var cnt12=0;
                    loop12:
                    do {
                        var alt12=2;
                        var LA12_0 = this.input.LA(1);

                        if ( ((LA12_0>='0' && LA12_0<='9')) ) {
                            alt12=1;
                        }


                        switch (alt12) {
                        case 1 :
                            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:789:14: '0' .. '9'
                            this.matchRange('0','9'); 


                            break;

                        default :
                            if ( cnt12 >= 1 ) {
                                break loop12;
                            }
                                var eee = new org.antlr.runtime.EarlyExitException(12, this.input);
                                throw eee;
                        }
                        cnt12++;
                    } while (true);

                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:789:25: ( Exponent )?
                    var alt13=2;
                    var LA13_0 = this.input.LA(1);

                    if ( (LA13_0=='E'||LA13_0=='e') ) {
                        alt13=1;
                    }
                    switch (alt13) {
                        case 1 :
                            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:789:25: Exponent
                            this.mExponent(); 


                            break;

                    }

                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:789:35: ( FloatTypeSuffix )?
                    var alt14=2;
                    var LA14_0 = this.input.LA(1);

                    if ( (LA14_0=='D'||LA14_0=='F'||LA14_0=='d'||LA14_0=='f') ) {
                        alt14=1;
                    }
                    switch (alt14) {
                        case 1 :
                            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:789:35: FloatTypeSuffix
                            this.mFloatTypeSuffix(); 


                            break;

                    }



                    break;
                case 3 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:790:9: ( '0' .. '9' )+ Exponent ( FloatTypeSuffix )?
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:790:9: ( '0' .. '9' )+
                    var cnt15=0;
                    loop15:
                    do {
                        var alt15=2;
                        var LA15_0 = this.input.LA(1);

                        if ( ((LA15_0>='0' && LA15_0<='9')) ) {
                            alt15=1;
                        }


                        switch (alt15) {
                        case 1 :
                            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:790:10: '0' .. '9'
                            this.matchRange('0','9'); 


                            break;

                        default :
                            if ( cnt15 >= 1 ) {
                                break loop15;
                            }
                                var eee = new org.antlr.runtime.EarlyExitException(15, this.input);
                                throw eee;
                        }
                        cnt15++;
                    } while (true);

                    this.mExponent(); 
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:790:30: ( FloatTypeSuffix )?
                    var alt16=2;
                    var LA16_0 = this.input.LA(1);

                    if ( (LA16_0=='D'||LA16_0=='F'||LA16_0=='d'||LA16_0=='f') ) {
                        alt16=1;
                    }
                    switch (alt16) {
                        case 1 :
                            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:790:30: FloatTypeSuffix
                            this.mFloatTypeSuffix(); 


                            break;

                    }



                    break;
                case 4 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:791:9: ( '0' .. '9' )+ ( Exponent )? FloatTypeSuffix
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:791:9: ( '0' .. '9' )+
                    var cnt17=0;
                    loop17:
                    do {
                        var alt17=2;
                        var LA17_0 = this.input.LA(1);

                        if ( ((LA17_0>='0' && LA17_0<='9')) ) {
                            alt17=1;
                        }


                        switch (alt17) {
                        case 1 :
                            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:791:10: '0' .. '9'
                            this.matchRange('0','9'); 


                            break;

                        default :
                            if ( cnt17 >= 1 ) {
                                break loop17;
                            }
                                var eee = new org.antlr.runtime.EarlyExitException(17, this.input);
                                throw eee;
                        }
                        cnt17++;
                    } while (true);

                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:791:21: ( Exponent )?
                    var alt18=2;
                    var LA18_0 = this.input.LA(1);

                    if ( (LA18_0=='E'||LA18_0=='e') ) {
                        alt18=1;
                    }
                    switch (alt18) {
                        case 1 :
                            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:791:21: Exponent
                            this.mExponent(); 


                            break;

                    }

                    this.mFloatTypeSuffix(); 


                    break;

            }
            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "FloatingPointLiteral",

    // $ANTLR start Exponent
    mExponent: function()  {
        try {
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:795:10: ( ( 'e' | 'E' ) ( '+' | '-' )? ( '0' .. '9' )+ )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:795:12: ( 'e' | 'E' ) ( '+' | '-' )? ( '0' .. '9' )+
            if ( this.input.LA(1)=='E'||this.input.LA(1)=='e' ) {
                this.input.consume();

            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);
                throw mse;}

            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:795:22: ( '+' | '-' )?
            var alt20=2;
            var LA20_0 = this.input.LA(1);

            if ( (LA20_0=='+'||LA20_0=='-') ) {
                alt20=1;
            }
            switch (alt20) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:
                    if ( this.input.LA(1)=='+'||this.input.LA(1)=='-' ) {
                        this.input.consume();

                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        this.recover(mse);
                        throw mse;}



                    break;

            }

            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:795:33: ( '0' .. '9' )+
            var cnt21=0;
            loop21:
            do {
                var alt21=2;
                var LA21_0 = this.input.LA(1);

                if ( ((LA21_0>='0' && LA21_0<='9')) ) {
                    alt21=1;
                }


                switch (alt21) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:795:34: '0' .. '9'
                    this.matchRange('0','9'); 


                    break;

                default :
                    if ( cnt21 >= 1 ) {
                        break loop21;
                    }
                        var eee = new org.antlr.runtime.EarlyExitException(21, this.input);
                        throw eee;
                }
                cnt21++;
            } while (true);




        }
        finally {
        }
    },
    // $ANTLR end "Exponent",

    // $ANTLR start FloatTypeSuffix
    mFloatTypeSuffix: function()  {
        try {
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:798:17: ( ( 'f' | 'F' | 'd' | 'D' ) )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:798:19: ( 'f' | 'F' | 'd' | 'D' )
            if ( this.input.LA(1)=='D'||this.input.LA(1)=='F'||this.input.LA(1)=='d'||this.input.LA(1)=='f' ) {
                this.input.consume();

            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);
                throw mse;}




        }
        finally {
        }
    },
    // $ANTLR end "FloatTypeSuffix",

    // $ANTLR start CharacterLiteral
    mCharacterLiteral: function()  {
        try {
            var _type = this.CharacterLiteral;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:801:5: ( '\\'' ( EscapeSequence | ~ ( '\\'' | '\\\\' ) ) '\\'' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:801:9: '\\'' ( EscapeSequence | ~ ( '\\'' | '\\\\' ) ) '\\''
            this.match('\''); 
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:801:14: ( EscapeSequence | ~ ( '\\'' | '\\\\' ) )
            var alt22=2;
            var LA22_0 = this.input.LA(1);

            if ( (LA22_0=='\\') ) {
                alt22=1;
            }
            else if ( ((LA22_0>='\u0000' && LA22_0<='&')||(LA22_0>='(' && LA22_0<='[')||(LA22_0>=']' && LA22_0<='\uFFFF')) ) {
                alt22=2;
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 22, 0, this.input);

                throw nvae;
            }
            switch (alt22) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:801:16: EscapeSequence
                    this.mEscapeSequence(); 


                    break;
                case 2 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:801:33: ~ ( '\\'' | '\\\\' )
                    if ( (this.input.LA(1)>='\u0000' && this.input.LA(1)<='&')||(this.input.LA(1)>='(' && this.input.LA(1)<='[')||(this.input.LA(1)>=']' && this.input.LA(1)<='\uFFFF') ) {
                        this.input.consume();

                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        this.recover(mse);
                        throw mse;}



                    break;

            }

            this.match('\''); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "CharacterLiteral",

    // $ANTLR start StringLiteral
    mStringLiteral: function()  {
        try {
            var _type = this.StringLiteral;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:805:5: ( '\"' ( EscapeSequence | ~ ( '\\\\' | '\"' ) )* '\"' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:805:8: '\"' ( EscapeSequence | ~ ( '\\\\' | '\"' ) )* '\"'
            this.match('\"'); 
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:805:12: ( EscapeSequence | ~ ( '\\\\' | '\"' ) )*
            loop23:
            do {
                var alt23=3;
                var LA23_0 = this.input.LA(1);

                if ( (LA23_0=='\\') ) {
                    alt23=1;
                }
                else if ( ((LA23_0>='\u0000' && LA23_0<='!')||(LA23_0>='#' && LA23_0<='[')||(LA23_0>=']' && LA23_0<='\uFFFF')) ) {
                    alt23=2;
                }


                switch (alt23) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:805:14: EscapeSequence
                    this.mEscapeSequence(); 


                    break;
                case 2 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:805:31: ~ ( '\\\\' | '\"' )
                    if ( (this.input.LA(1)>='\u0000' && this.input.LA(1)<='!')||(this.input.LA(1)>='#' && this.input.LA(1)<='[')||(this.input.LA(1)>=']' && this.input.LA(1)<='\uFFFF') ) {
                        this.input.consume();

                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        this.recover(mse);
                        throw mse;}



                    break;

                default :
                    break loop23;
                }
            } while (true);

            this.match('\"'); 



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "StringLiteral",

    // $ANTLR start EscapeSequence
    mEscapeSequence: function()  {
        try {
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:810:5: ( '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' ) | UnicodeEscape | OctalEscape )
            var alt24=3;
            var LA24_0 = this.input.LA(1);

            if ( (LA24_0=='\\') ) {
                switch ( this.input.LA(2) ) {
                case '\"':
                case '\'':
                case '\\':
                case 'b':
                case 'f':
                case 'n':
                case 'r':
                case 't':
                    alt24=1;
                    break;
                case 'u':
                    alt24=2;
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                    alt24=3;
                    break;
                default:
                    var nvae =
                        new org.antlr.runtime.NoViableAltException("", 24, 1, this.input);

                    throw nvae;
                }

            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 24, 0, this.input);

                throw nvae;
            }
            switch (alt24) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:810:9: '\\\\' ( 'b' | 't' | 'n' | 'f' | 'r' | '\\\"' | '\\'' | '\\\\' )
                    this.match('\\'); 
                    if ( this.input.LA(1)=='\"'||this.input.LA(1)=='\''||this.input.LA(1)=='\\'||this.input.LA(1)=='b'||this.input.LA(1)=='f'||this.input.LA(1)=='n'||this.input.LA(1)=='r'||this.input.LA(1)=='t' ) {
                        this.input.consume();

                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        this.recover(mse);
                        throw mse;}



                    break;
                case 2 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:811:9: UnicodeEscape
                    this.mUnicodeEscape(); 


                    break;
                case 3 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:812:9: OctalEscape
                    this.mOctalEscape(); 


                    break;

            }
        }
        finally {
        }
    },
    // $ANTLR end "EscapeSequence",

    // $ANTLR start OctalEscape
    mOctalEscape: function()  {
        try {
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:817:5: ( '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) ( '0' .. '7' ) | '\\\\' ( '0' .. '7' ) )
            var alt25=3;
            var LA25_0 = this.input.LA(1);

            if ( (LA25_0=='\\') ) {
                var LA25_1 = this.input.LA(2);

                if ( ((LA25_1>='0' && LA25_1<='3')) ) {
                    var LA25_2 = this.input.LA(3);

                    if ( ((LA25_2>='0' && LA25_2<='7')) ) {
                        var LA25_5 = this.input.LA(4);

                        if ( ((LA25_5>='0' && LA25_5<='7')) ) {
                            alt25=1;
                        }
                        else {
                            alt25=2;}
                    }
                    else {
                        alt25=3;}
                }
                else if ( ((LA25_1>='4' && LA25_1<='7')) ) {
                    var LA25_3 = this.input.LA(3);

                    if ( ((LA25_3>='0' && LA25_3<='7')) ) {
                        alt25=2;
                    }
                    else {
                        alt25=3;}
                }
                else {
                    var nvae =
                        new org.antlr.runtime.NoViableAltException("", 25, 1, this.input);

                    throw nvae;
                }
            }
            else {
                var nvae =
                    new org.antlr.runtime.NoViableAltException("", 25, 0, this.input);

                throw nvae;
            }
            switch (alt25) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:817:9: '\\\\' ( '0' .. '3' ) ( '0' .. '7' ) ( '0' .. '7' )
                    this.match('\\'); 
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:817:14: ( '0' .. '3' )
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:817:15: '0' .. '3'
                    this.matchRange('0','3'); 



                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:817:25: ( '0' .. '7' )
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:817:26: '0' .. '7'
                    this.matchRange('0','7'); 



                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:817:36: ( '0' .. '7' )
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:817:37: '0' .. '7'
                    this.matchRange('0','7'); 





                    break;
                case 2 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:818:9: '\\\\' ( '0' .. '7' ) ( '0' .. '7' )
                    this.match('\\'); 
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:818:14: ( '0' .. '7' )
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:818:15: '0' .. '7'
                    this.matchRange('0','7'); 



                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:818:25: ( '0' .. '7' )
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:818:26: '0' .. '7'
                    this.matchRange('0','7'); 





                    break;
                case 3 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:819:9: '\\\\' ( '0' .. '7' )
                    this.match('\\'); 
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:819:14: ( '0' .. '7' )
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:819:15: '0' .. '7'
                    this.matchRange('0','7'); 





                    break;

            }
        }
        finally {
        }
    },
    // $ANTLR end "OctalEscape",

    // $ANTLR start UnicodeEscape
    mUnicodeEscape: function()  {
        try {
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:824:5: ( '\\\\' 'u' HexDigit HexDigit HexDigit HexDigit )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:824:9: '\\\\' 'u' HexDigit HexDigit HexDigit HexDigit
            this.match('\\'); 
            this.match('u'); 
            this.mHexDigit(); 
            this.mHexDigit(); 
            this.mHexDigit(); 
            this.mHexDigit(); 



        }
        finally {
        }
    },
    // $ANTLR end "UnicodeEscape",

    // $ANTLR start ENUM
    mENUM: function()  {
        try {
            var _type = this.ENUM;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:827:5: ( 'enum' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:827:7: 'enum'
            this.match("enum"); 

            if ( !enumIsKeyword ) _type=Identifier;



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "ENUM",

    // $ANTLR start Identifier
    mIdentifier: function()  {
        try {
            var _type = this.Identifier;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:831:5: ( Letter ( Letter | JavaIDDigit )* )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:831:9: Letter ( Letter | JavaIDDigit )*
            this.mLetter(); 
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:831:16: ( Letter | JavaIDDigit )*
            loop26:
            do {
                var alt26=2;
                var LA26_0 = this.input.LA(1);

                if ( (LA26_0=='$'||(LA26_0>='0' && LA26_0<='9')||(LA26_0>='A' && LA26_0<='Z')||LA26_0=='_'||(LA26_0>='a' && LA26_0<='z')||(LA26_0>='\u00C0' && LA26_0<='\u00D6')||(LA26_0>='\u00D8' && LA26_0<='\u00F6')||(LA26_0>='\u00F8' && LA26_0<='\u1FFF')||(LA26_0>='\u3040' && LA26_0<='\u318F')||(LA26_0>='\u3300' && LA26_0<='\u337F')||(LA26_0>='\u3400' && LA26_0<='\u3D2D')||(LA26_0>='\u4E00' && LA26_0<='\u9FFF')||(LA26_0>='\uF900' && LA26_0<='\uFAFF')) ) {
                    alt26=1;
                }


                switch (alt26) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:
                    if ( this.input.LA(1)=='$'||(this.input.LA(1)>='0' && this.input.LA(1)<='9')||(this.input.LA(1)>='A' && this.input.LA(1)<='Z')||this.input.LA(1)=='_'||(this.input.LA(1)>='a' && this.input.LA(1)<='z')||(this.input.LA(1)>='\u00C0' && this.input.LA(1)<='\u00D6')||(this.input.LA(1)>='\u00D8' && this.input.LA(1)<='\u00F6')||(this.input.LA(1)>='\u00F8' && this.input.LA(1)<='\u1FFF')||(this.input.LA(1)>='\u3040' && this.input.LA(1)<='\u318F')||(this.input.LA(1)>='\u3300' && this.input.LA(1)<='\u337F')||(this.input.LA(1)>='\u3400' && this.input.LA(1)<='\u3D2D')||(this.input.LA(1)>='\u4E00' && this.input.LA(1)<='\u9FFF')||(this.input.LA(1)>='\uF900' && this.input.LA(1)<='\uFAFF') ) {
                        this.input.consume();

                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        this.recover(mse);
                        throw mse;}



                    break;

                default :
                    break loop26;
                }
            } while (true);




            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "Identifier",

    // $ANTLR start Letter
    mLetter: function()  {
        try {
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:839:5: ( '\\u0024' | '\\u0041' .. '\\u005a' | '\\u005f' | '\\u0061' .. '\\u007a' | '\\u00c0' .. '\\u00d6' | '\\u00d8' .. '\\u00f6' | '\\u00f8' .. '\\u00ff' | '\\u0100' .. '\\u1fff' | '\\u3040' .. '\\u318f' | '\\u3300' .. '\\u337f' | '\\u3400' .. '\\u3d2d' | '\\u4e00' .. '\\u9fff' | '\\uf900' .. '\\ufaff' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:
            if ( this.input.LA(1)=='$'||(this.input.LA(1)>='A' && this.input.LA(1)<='Z')||this.input.LA(1)=='_'||(this.input.LA(1)>='a' && this.input.LA(1)<='z')||(this.input.LA(1)>='\u00C0' && this.input.LA(1)<='\u00D6')||(this.input.LA(1)>='\u00D8' && this.input.LA(1)<='\u00F6')||(this.input.LA(1)>='\u00F8' && this.input.LA(1)<='\u1FFF')||(this.input.LA(1)>='\u3040' && this.input.LA(1)<='\u318F')||(this.input.LA(1)>='\u3300' && this.input.LA(1)<='\u337F')||(this.input.LA(1)>='\u3400' && this.input.LA(1)<='\u3D2D')||(this.input.LA(1)>='\u4E00' && this.input.LA(1)<='\u9FFF')||(this.input.LA(1)>='\uF900' && this.input.LA(1)<='\uFAFF') ) {
                this.input.consume();

            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);
                throw mse;}




        }
        finally {
        }
    },
    // $ANTLR end "Letter",

    // $ANTLR start JavaIDDigit
    mJavaIDDigit: function()  {
        try {
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:856:5: ( '\\u0030' .. '\\u0039' | '\\u0660' .. '\\u0669' | '\\u06f0' .. '\\u06f9' | '\\u0966' .. '\\u096f' | '\\u09e6' .. '\\u09ef' | '\\u0a66' .. '\\u0a6f' | '\\u0ae6' .. '\\u0aef' | '\\u0b66' .. '\\u0b6f' | '\\u0be7' .. '\\u0bef' | '\\u0c66' .. '\\u0c6f' | '\\u0ce6' .. '\\u0cef' | '\\u0d66' .. '\\u0d6f' | '\\u0e50' .. '\\u0e59' | '\\u0ed0' .. '\\u0ed9' | '\\u1040' .. '\\u1049' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:
            if ( (this.input.LA(1)>='0' && this.input.LA(1)<='9')||(this.input.LA(1)>='\u0660' && this.input.LA(1)<='\u0669')||(this.input.LA(1)>='\u06F0' && this.input.LA(1)<='\u06F9')||(this.input.LA(1)>='\u0966' && this.input.LA(1)<='\u096F')||(this.input.LA(1)>='\u09E6' && this.input.LA(1)<='\u09EF')||(this.input.LA(1)>='\u0A66' && this.input.LA(1)<='\u0A6F')||(this.input.LA(1)>='\u0AE6' && this.input.LA(1)<='\u0AEF')||(this.input.LA(1)>='\u0B66' && this.input.LA(1)<='\u0B6F')||(this.input.LA(1)>='\u0BE7' && this.input.LA(1)<='\u0BEF')||(this.input.LA(1)>='\u0C66' && this.input.LA(1)<='\u0C6F')||(this.input.LA(1)>='\u0CE6' && this.input.LA(1)<='\u0CEF')||(this.input.LA(1)>='\u0D66' && this.input.LA(1)<='\u0D6F')||(this.input.LA(1)>='\u0E50' && this.input.LA(1)<='\u0E59')||(this.input.LA(1)>='\u0ED0' && this.input.LA(1)<='\u0ED9')||(this.input.LA(1)>='\u1040' && this.input.LA(1)<='\u1049') ) {
                this.input.consume();

            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);
                throw mse;}




        }
        finally {
        }
    },
    // $ANTLR end "JavaIDDigit",

    // $ANTLR start WS
    mWS: function()  {
        try {
            var _type = this.WS;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:873:5: ( ( ' ' | '\\r' | '\\t' | '\\u000C' | '\\n' ) )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:873:8: ( ' ' | '\\r' | '\\t' | '\\u000C' | '\\n' )
            if ( (this.input.LA(1)>='\t' && this.input.LA(1)<='\n')||(this.input.LA(1)>='\f' && this.input.LA(1)<='\r')||this.input.LA(1)==' ' ) {
                this.input.consume();

            }
            else {
                var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                this.recover(mse);
                throw mse;}

            _channel=HIDDEN;



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "WS",

    // $ANTLR start COMMENT
    mCOMMENT: function()  {
        try {
            var _type = this.COMMENT;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:877:5: ( '/*' ( options {greedy=false; } : . )* '*/' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:877:9: '/*' ( options {greedy=false; } : . )* '*/'
            this.match("/*"); 

            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:877:14: ( options {greedy=false; } : . )*
            loop27:
            do {
                var alt27=2;
                var LA27_0 = this.input.LA(1);

                if ( (LA27_0=='*') ) {
                    var LA27_1 = this.input.LA(2);

                    if ( (LA27_1=='/') ) {
                        alt27=2;
                    }
                    else if ( ((LA27_1>='\u0000' && LA27_1<='.')||(LA27_1>='0' && LA27_1<='\uFFFF')) ) {
                        alt27=1;
                    }


                }
                else if ( ((LA27_0>='\u0000' && LA27_0<=')')||(LA27_0>='+' && LA27_0<='\uFFFF')) ) {
                    alt27=1;
                }


                switch (alt27) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:877:42: .
                    this.matchAny(); 


                    break;

                default :
                    break loop27;
                }
            } while (true);

            this.match("*/"); 

            _channel=HIDDEN;



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "COMMENT",

    // $ANTLR start LINE_COMMENT
    mLINE_COMMENT: function()  {
        try {
            var _type = this.LINE_COMMENT;
            var _channel = org.antlr.runtime.BaseRecognizer.DEFAULT_TOKEN_CHANNEL;
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:881:5: ( '//' (~ ( '\\n' | '\\r' ) )* ( '\\r' )? '\\n' )
            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:881:7: '//' (~ ( '\\n' | '\\r' ) )* ( '\\r' )? '\\n'
            this.match("//"); 

            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:881:12: (~ ( '\\n' | '\\r' ) )*
            loop28:
            do {
                var alt28=2;
                var LA28_0 = this.input.LA(1);

                if ( ((LA28_0>='\u0000' && LA28_0<='\t')||(LA28_0>='\u000B' && LA28_0<='\f')||(LA28_0>='\u000E' && LA28_0<='\uFFFF')) ) {
                    alt28=1;
                }


                switch (alt28) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:881:12: ~ ( '\\n' | '\\r' )
                    if ( (this.input.LA(1)>='\u0000' && this.input.LA(1)<='\t')||(this.input.LA(1)>='\u000B' && this.input.LA(1)<='\f')||(this.input.LA(1)>='\u000E' && this.input.LA(1)<='\uFFFF') ) {
                        this.input.consume();

                    }
                    else {
                        var mse = new org.antlr.runtime.MismatchedSetException(null,this.input);
                        this.recover(mse);
                        throw mse;}



                    break;

                default :
                    break loop28;
                }
            } while (true);

            // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:881:26: ( '\\r' )?
            var alt29=2;
            var LA29_0 = this.input.LA(1);

            if ( (LA29_0=='\r') ) {
                alt29=1;
            }
            switch (alt29) {
                case 1 :
                    // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:881:26: '\\r'
                    this.match('\r'); 


                    break;

            }

            this.match('\n'); 
            _channel=HIDDEN;



            this.state.type = _type;
            this.state.channel = _channel;
        }
        finally {
        }
    },
    // $ANTLR end "LINE_COMMENT",

    mTokens: function() {
        // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:8: ( T__24 | T__25 | T__26 | T__27 | T__28 | T__29 | T__30 | T__31 | T__32 | T__33 | T__34 | T__35 | T__36 | T__37 | T__38 | T__39 | T__40 | T__41 | T__42 | T__43 | T__44 | T__45 | T__46 | T__47 | T__48 | T__49 | T__50 | T__51 | T__52 | T__53 | T__54 | T__55 | T__56 | T__57 | T__58 | T__59 | T__60 | T__61 | T__62 | T__63 | T__64 | T__65 | T__66 | T__67 | T__68 | T__69 | T__70 | T__71 | T__72 | T__73 | T__74 | T__75 | T__76 | T__77 | T__78 | T__79 | T__80 | T__81 | T__82 | T__83 | T__84 | T__85 | T__86 | T__87 | T__88 | T__89 | T__90 | T__91 | T__92 | T__93 | T__94 | T__95 | T__96 | T__97 | T__98 | T__99 | T__100 | T__101 | T__102 | T__103 | T__104 | T__105 | T__106 | T__107 | T__108 | T__109 | T__110 | T__111 | T__112 | T__113 | HexLiteral | DecimalLiteral | OctalLiteral | FloatingPointLiteral | CharacterLiteral | StringLiteral | ENUM | Identifier | WS | COMMENT | LINE_COMMENT )
        var alt30=101;
        alt30 = this.dfa30.predict(this.input);
        switch (alt30) {
            case 1 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:10: T__24
                this.mT__24(); 


                break;
            case 2 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:16: T__25
                this.mT__25(); 


                break;
            case 3 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:22: T__26
                this.mT__26(); 


                break;
            case 4 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:28: T__27
                this.mT__27(); 


                break;
            case 5 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:34: T__28
                this.mT__28(); 


                break;
            case 6 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:40: T__29
                this.mT__29(); 


                break;
            case 7 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:46: T__30
                this.mT__30(); 


                break;
            case 8 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:52: T__31
                this.mT__31(); 


                break;
            case 9 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:58: T__32
                this.mT__32(); 


                break;
            case 10 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:64: T__33
                this.mT__33(); 


                break;
            case 11 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:70: T__34
                this.mT__34(); 


                break;
            case 12 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:76: T__35
                this.mT__35(); 


                break;
            case 13 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:82: T__36
                this.mT__36(); 


                break;
            case 14 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:88: T__37
                this.mT__37(); 


                break;
            case 15 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:94: T__38
                this.mT__38(); 


                break;
            case 16 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:100: T__39
                this.mT__39(); 


                break;
            case 17 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:106: T__40
                this.mT__40(); 


                break;
            case 18 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:112: T__41
                this.mT__41(); 


                break;
            case 19 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:118: T__42
                this.mT__42(); 


                break;
            case 20 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:124: T__43
                this.mT__43(); 


                break;
            case 21 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:130: T__44
                this.mT__44(); 


                break;
            case 22 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:136: T__45
                this.mT__45(); 


                break;
            case 23 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:142: T__46
                this.mT__46(); 


                break;
            case 24 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:148: T__47
                this.mT__47(); 


                break;
            case 25 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:154: T__48
                this.mT__48(); 


                break;
            case 26 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:160: T__49
                this.mT__49(); 


                break;
            case 27 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:166: T__50
                this.mT__50(); 


                break;
            case 28 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:172: T__51
                this.mT__51(); 


                break;
            case 29 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:178: T__52
                this.mT__52(); 


                break;
            case 30 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:184: T__53
                this.mT__53(); 


                break;
            case 31 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:190: T__54
                this.mT__54(); 


                break;
            case 32 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:196: T__55
                this.mT__55(); 


                break;
            case 33 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:202: T__56
                this.mT__56(); 


                break;
            case 34 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:208: T__57
                this.mT__57(); 


                break;
            case 35 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:214: T__58
                this.mT__58(); 


                break;
            case 36 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:220: T__59
                this.mT__59(); 


                break;
            case 37 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:226: T__60
                this.mT__60(); 


                break;
            case 38 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:232: T__61
                this.mT__61(); 


                break;
            case 39 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:238: T__62
                this.mT__62(); 


                break;
            case 40 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:244: T__63
                this.mT__63(); 


                break;
            case 41 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:250: T__64
                this.mT__64(); 


                break;
            case 42 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:256: T__65
                this.mT__65(); 


                break;
            case 43 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:262: T__66
                this.mT__66(); 


                break;
            case 44 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:268: T__67
                this.mT__67(); 


                break;
            case 45 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:274: T__68
                this.mT__68(); 


                break;
            case 46 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:280: T__69
                this.mT__69(); 


                break;
            case 47 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:286: T__70
                this.mT__70(); 


                break;
            case 48 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:292: T__71
                this.mT__71(); 


                break;
            case 49 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:298: T__72
                this.mT__72(); 


                break;
            case 50 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:304: T__73
                this.mT__73(); 


                break;
            case 51 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:310: T__74
                this.mT__74(); 


                break;
            case 52 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:316: T__75
                this.mT__75(); 


                break;
            case 53 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:322: T__76
                this.mT__76(); 


                break;
            case 54 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:328: T__77
                this.mT__77(); 


                break;
            case 55 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:334: T__78
                this.mT__78(); 


                break;
            case 56 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:340: T__79
                this.mT__79(); 


                break;
            case 57 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:346: T__80
                this.mT__80(); 


                break;
            case 58 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:352: T__81
                this.mT__81(); 


                break;
            case 59 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:358: T__82
                this.mT__82(); 


                break;
            case 60 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:364: T__83
                this.mT__83(); 


                break;
            case 61 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:370: T__84
                this.mT__84(); 


                break;
            case 62 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:376: T__85
                this.mT__85(); 


                break;
            case 63 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:382: T__86
                this.mT__86(); 


                break;
            case 64 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:388: T__87
                this.mT__87(); 


                break;
            case 65 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:394: T__88
                this.mT__88(); 


                break;
            case 66 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:400: T__89
                this.mT__89(); 


                break;
            case 67 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:406: T__90
                this.mT__90(); 


                break;
            case 68 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:412: T__91
                this.mT__91(); 


                break;
            case 69 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:418: T__92
                this.mT__92(); 


                break;
            case 70 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:424: T__93
                this.mT__93(); 


                break;
            case 71 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:430: T__94
                this.mT__94(); 


                break;
            case 72 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:436: T__95
                this.mT__95(); 


                break;
            case 73 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:442: T__96
                this.mT__96(); 


                break;
            case 74 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:448: T__97
                this.mT__97(); 


                break;
            case 75 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:454: T__98
                this.mT__98(); 


                break;
            case 76 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:460: T__99
                this.mT__99(); 


                break;
            case 77 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:466: T__100
                this.mT__100(); 


                break;
            case 78 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:473: T__101
                this.mT__101(); 


                break;
            case 79 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:480: T__102
                this.mT__102(); 


                break;
            case 80 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:487: T__103
                this.mT__103(); 


                break;
            case 81 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:494: T__104
                this.mT__104(); 


                break;
            case 82 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:501: T__105
                this.mT__105(); 


                break;
            case 83 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:508: T__106
                this.mT__106(); 


                break;
            case 84 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:515: T__107
                this.mT__107(); 


                break;
            case 85 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:522: T__108
                this.mT__108(); 


                break;
            case 86 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:529: T__109
                this.mT__109(); 


                break;
            case 87 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:536: T__110
                this.mT__110(); 


                break;
            case 88 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:543: T__111
                this.mT__111(); 


                break;
            case 89 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:550: T__112
                this.mT__112(); 


                break;
            case 90 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:557: T__113
                this.mT__113(); 


                break;
            case 91 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:564: HexLiteral
                this.mHexLiteral(); 


                break;
            case 92 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:575: DecimalLiteral
                this.mDecimalLiteral(); 


                break;
            case 93 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:590: OctalLiteral
                this.mOctalLiteral(); 


                break;
            case 94 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:603: FloatingPointLiteral
                this.mFloatingPointLiteral(); 


                break;
            case 95 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:624: CharacterLiteral
                this.mCharacterLiteral(); 


                break;
            case 96 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:641: StringLiteral
                this.mStringLiteral(); 


                break;
            case 97 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:655: ENUM
                this.mENUM(); 


                break;
            case 98 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:660: Identifier
                this.mIdentifier(); 


                break;
            case 99 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:671: WS
                this.mWS(); 


                break;
            case 100 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:674: COMMENT
                this.mCOMMENT(); 


                break;
            case 101 :
                // C:\\Documents and Settings\\n068815\\Desktop\\ANTLR\\examples-v3\\JavaScript\\Java\\Java.g:1:682: LINE_COMMENT
                this.mLINE_COMMENT(); 


                break;

        }

    }

}, true); // important to pass true to overwrite default implementations

org.antlr.lang.augmentObject(JavaLexer, {
    DFA19_eotS:
        "\u0007\uffff\u0001\u0008\u0002\uffff",
    DFA19_eofS:
        "\u000a\uffff",
    DFA19_minS:
        "\u0002\u002e\u0002\uffff\u0001\u002b\u0001\uffff\u0002\u0030\u0002"+
    "\uffff",
    DFA19_maxS:
        "\u0001\u0039\u0001\u0066\u0002\uffff\u0001\u0039\u0001\uffff\u0001"+
    "\u0039\u0001\u0066\u0002\uffff",
    DFA19_acceptS:
        "\u0002\uffff\u0001\u0002\u0001\u0001\u0001\uffff\u0001\u0004\u0002"+
    "\uffff\u0002\u0003",
    DFA19_specialS:
        "\u000a\uffff}>",
    DFA19_transitionS: [
            "\u0001\u0002\u0001\uffff\u000a\u0001",
            "\u0001\u0003\u0001\uffff\u000a\u0001\u000a\uffff\u0001\u0005"+
            "\u0001\u0004\u0001\u0005\u001d\uffff\u0001\u0005\u0001\u0004"+
            "\u0001\u0005",
            "",
            "",
            "\u0001\u0006\u0001\uffff\u0001\u0006\u0002\uffff\u000a\u0007",
            "",
            "\u000a\u0007",
            "\u000a\u0007\u000a\uffff\u0001\u0009\u0001\uffff\u0001\u0009"+
            "\u001d\uffff\u0001\u0009\u0001\uffff\u0001\u0009",
            "",
            ""
    ]
});

org.antlr.lang.augmentObject(JavaLexer, {
    DFA19_eot:
        org.antlr.runtime.DFA.unpackEncodedString(JavaLexer.DFA19_eotS),
    DFA19_eof:
        org.antlr.runtime.DFA.unpackEncodedString(JavaLexer.DFA19_eofS),
    DFA19_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(JavaLexer.DFA19_minS),
    DFA19_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(JavaLexer.DFA19_maxS),
    DFA19_accept:
        org.antlr.runtime.DFA.unpackEncodedString(JavaLexer.DFA19_acceptS),
    DFA19_special:
        org.antlr.runtime.DFA.unpackEncodedString(JavaLexer.DFA19_specialS),
    DFA19_transition: (function() {
        var a = [],
            i,
            numStates = JavaLexer.DFA19_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(JavaLexer.DFA19_transitionS[i]));
        }
        return a;
    })()
});

JavaLexer.DFA19 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 19;
    this.eot = JavaLexer.DFA19_eot;
    this.eof = JavaLexer.DFA19_eof;
    this.min = JavaLexer.DFA19_min;
    this.max = JavaLexer.DFA19_max;
    this.accept = JavaLexer.DFA19_accept;
    this.special = JavaLexer.DFA19_special;
    this.transition = JavaLexer.DFA19_transition;
};

org.antlr.lang.extend(JavaLexer.DFA19, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "787:1: FloatingPointLiteral : ( ( '0' .. '9' )+ '.' ( '0' .. '9' )* ( Exponent )? ( FloatTypeSuffix )? | '.' ( '0' .. '9' )+ ( Exponent )? ( FloatTypeSuffix )? | ( '0' .. '9' )+ Exponent ( FloatTypeSuffix )? | ( '0' .. '9' )+ ( Exponent )? FloatTypeSuffix );";
    },
    dummy: null
});
org.antlr.lang.augmentObject(JavaLexer, {
    DFA30_eotS:
        "\u0001\uffff\u0001\u002d\u0001\uffff\u0002\u002d\u0001\u003b\u0001"+
    "\u003e\u0002\u002d\u0003\uffff\u0001\u0048\u0002\uffff\u0001\u002d\u0002"+
    "\uffff\u0001\u002d\u0001\u004d\u0006\u002d\u0005\uffff\u0002\u002d\u0001"+
    "\u0061\u0001\u0064\u0001\u0068\u0001\u006b\u0001\u006d\u0001\u006f\u0001"+
    "\u0071\u0001\uffff\u0002\u0074\u0004\uffff\u0005\u002d\u0001\u007d\u0005"+
    "\u002d\u0005\uffff\u0007\u002d\u0003\uffff\u0003\u002d\u0002\uffff\u000d"+
    "\u002d\u0001\u00a1\u0003\u002d\u0014\uffff\u0001\u00a5\u0001\uffff\u0001"+
    "\u0074\u0005\u002d\u0001\u00ad\u0001\u002d\u0001\uffff\u0014\u002d\u0001"+
    "\u00c3\u0005\u002d\u0001\u00c9\u0002\u002d\u0001\u00cc\u0005\u002d\u0001"+
    "\uffff\u0003\u002d\u0001\uffff\u0007\u002d\u0001\uffff\u0008\u002d\u0001"+
    "\u00e4\u0002\u002d\u0001\u00e7\u0001\u002d\u0001\u00e9\u0001\u00ea\u0001"+
    "\u00eb\u0002\u002d\u0001\u00ee\u0001\u002d\u0001\u00f0\u0001\uffff\u0005"+
    "\u002d\u0001\uffff\u0001\u002d\u0001\u00f7\u0001\uffff\u0001\u002d\u0001"+
    "\u00f9\u0001\u002d\u0001\u00fb\u000f\u002d\u0001\u010b\u0001\u010c\u0001"+
    "\u002d\u0001\u010e\u0001\uffff\u0001\u002d\u0001\u0110\u0001\uffff\u0001"+
    "\u002d\u0003\uffff\u0001\u002d\u0001\u0114\u0001\uffff\u0001\u002d\u0001"+
    "\uffff\u0002\u002d\u0001\u0119\u0001\u011a\u0001\u011b\u0001\u002d\u0001"+
    "\uffff\u0001\u002d\u0001\uffff\u0001\u011e\u0001\uffff\u0002\u002d\u0001"+
    "\u0121\u0002\u002d\u0001\u0124\u0002\u002d\u0001\u0127\u0003\u002d\u0001"+
    "\u012b\u0002\u002d\u0002\uffff\u0001\u012e\u0001\uffff\u0001\u002d\u0001"+
    "\uffff\u0002\u002d\u0001\u0132\u0001\uffff\u0002\u002d\u0001\u0135\u0001"+
    "\u002d\u0003\uffff\u0001\u0137\u0001\u002d\u0001\uffff\u0001\u0139\u0001"+
    "\u002d\u0001\uffff\u0001\u013b\u0001\u013c\u0001\uffff\u0001\u002d\u0001"+
    "\u013e\u0001\uffff\u0003\u002d\u0001\uffff\u0002\u002d\u0001\uffff\u0001"+
    "\u002d\u0001\u0145\u0001\u002d\u0001\uffff\u0002\u002d\u0001\uffff\u0001"+
    "\u0149\u0001\uffff\u0001\u014a\u0001\uffff\u0001\u014b\u0002\uffff\u0001"+
    "\u002d\u0001\uffff\u0003\u002d\u0001\u0150\u0001\u002d\u0001\u0152\u0001"+
    "\uffff\u0001\u0153\u0001\u002d\u0001\u0155\u0003\uffff\u0001\u0156\u0001"+
    "\u002d\u0001\u0158\u0001\u002d\u0001\uffff\u0001\u002d\u0002\uffff\u0001"+
    "\u015b\u0002\uffff\u0001\u015c\u0001\uffff\u0001\u015d\u0001\u002d\u0003"+
    "\uffff\u0001\u002d\u0001\u0160\u0001\uffff",
    DFA30_eofS:
        "\u0161\uffff",
    DFA30_minS:
        "\u0001\u0009\u0001\u0061\u0001\uffff\u0001\u0066\u0001\u0068\u0001"+
    "\u002e\u0001\u003d\u0001\u0061\u0001\u006c\u0003\uffff\u0001\u0026\u0002"+
    "\uffff\u0001\u006f\u0002\uffff\u0001\u0068\u0001\u003d\u0001\u0062\u0002"+
    "\u0061\u0002\u006f\u0001\u0065\u0005\uffff\u0001\u0068\u0001\u0065\u0001"+
    "\u002b\u0001\u002d\u0001\u002a\u0004\u003d\u0001\uffff\u0002\u002e\u0004"+
    "\uffff\u0001\u0063\u0001\u0062\u0001\u0069\u0001\u0070\u0001\u0073\u0001"+
    "\u0024\u0001\u0061\u0001\u006e\u0001\u006f\u0001\u0070\u0001\u0069\u0005"+
    "\uffff\u0002\u0061\u0001\u006e\u0001\u0073\u0001\u0074\u0001\u0073\u0001"+
    "\u0075\u0003\uffff\u0002\u0069\u0001\u0061\u0002\uffff\u0002\u0073\u0001"+
    "\u006e\u0001\u006f\u0001\u006c\u0001\u0072\u0001\u0074\u0001\u006c\u0001"+
    "\u0077\u0001\u006f\u0001\u0074\u0001\u0065\u0001\u006e\u0001\u0024\u0001"+
    "\u0066\u0001\u0069\u0001\u0074\u0014\uffff\u0001\u002e\u0001\uffff\u0001"+
    "\u002e\u0001\u006b\u0001\u006c\u0001\u0074\u0001\u0076\u0001\u006c\u0001"+
    "\u0024\u0001\u0074\u0001\uffff\u0001\u0074\u0001\u0069\u0001\u0063\u0001"+
    "\u0072\u0001\u0065\u0001\u0074\u0001\u0073\u0001\u0072\u0001\u0074\u0001"+
    "\u0063\u0003\u0065\u0001\u006d\u0001\u0064\u0001\u0061\u0001\u006f\u0001"+
    "\u0073\u0001\u006e\u0001\u0065\u0001\u0024\u0001\u0074\u0001\u0065\u0002"+
    "\u0061\u0001\u0073\u0001\u0024\u0001\u0069\u0001\u006c\u0001\u0024\u0001"+
    "\u006c\u0001\u0065\u0001\u0061\u0001\u0067\u0001\u0062\u0001\uffff\u0001"+
    "\u0061\u0001\u006c\u0001\u0075\u0001\uffff\u0001\u0061\u0001\u0069\u0001"+
    "\u0065\u0001\u0061\u0001\u0072\u0001\u0065\u0001\u0072\u0001\uffff\u0001"+
    "\u0061\u0001\u0069\u0001\u0063\u0001\u0068\u0001\u0074\u0001\u0072\u0001"+
    "\u0063\u0001\u0073\u0001\u0024\u0001\u0069\u0001\u0068\u0001\u0024\u0001"+
    "\u006e\u0003\u0024\u0001\u0074\u0001\u0077\u0001\u0024\u0001\u0073\u0001"+
    "\u0024\u0001\uffff\u0002\u0072\u0001\u006c\u0001\u0074\u0001\u0065\u0001"+
    "\uffff\u0001\u0076\u0001\u0024\u0001\uffff\u0001\u0065\u0001\u0024\u0001"+
    "\u006b\u0001\u0024\u0001\u006c\u0001\u0075\u0001\u0065\u0001\u0072\u0001"+
    "\u0067\u0002\u0063\u0002\u0074\u0001\u006d\u0001\u0066\u0001\u006e\u0001"+
    "\u0063\u0001\u0074\u0001\u0072\u0002\u0024\u0001\u0068\u0001\u0024\u0001"+
    "\uffff\u0001\u006e\u0001\u0024\u0001\uffff\u0001\u0064\u0003\uffff\u0001"+
    "\u0069\u0001\u0024\u0001\uffff\u0001\u0069\u0001\uffff\u0001\u0061\u0001"+
    "\u0074\u0003\u0024\u0001\u0065\u0001\uffff\u0001\u0061\u0001\uffff\u0001"+
    "\u0024\u0001\uffff\u0001\u0065\u0001\u006c\u0001\u0024\u0001\u006e\u0001"+
    "\u0065\u0001\u0024\u0001\u0074\u0001\u0065\u0001\u0024\u0001\u0065\u0001"+
    "\u0061\u0001\u0063\u0001\u0024\u0001\u0066\u0001\u006f\u0002\uffff\u0001"+
    "\u0024\u0001\uffff\u0001\u0075\u0001\uffff\u0001\u0073\u0001\u006c\u0001"+
    "\u0024\u0001\uffff\u0001\u0065\u0001\u0063\u0001\u0024\u0001\u0079\u0003"+
    "\uffff\u0001\u0024\u0001\u006e\u0001\uffff\u0001\u0024\u0001\u0074\u0001"+
    "\uffff\u0002\u0024\u0001\uffff\u0001\u0065\u0001\u0024\u0001\uffff\u0001"+
    "\u006e\u0001\u0063\u0001\u0065\u0001\uffff\u0001\u0070\u0001\u006e\u0001"+
    "\uffff\u0001\u0065\u0001\u0024\u0001\u0065\u0001\uffff\u0001\u006e\u0001"+
    "\u0074\u0001\uffff\u0001\u0024\u0001\uffff\u0001\u0024\u0001\uffff\u0001"+
    "\u0024\u0002\uffff\u0001\u0064\u0001\uffff\u0001\u0074\u0001\u0065\u0001"+
    "\u006f\u0001\u0024\u0001\u0069\u0001\u0024\u0001\uffff\u0001\u0024\u0001"+
    "\u0074\u0001\u0024\u0003\uffff\u0001\u0024\u0001\u0073\u0001\u0024\u0001"+
    "\u0066\u0001\uffff\u0001\u007a\u0002\uffff\u0001\u0024\u0002\uffff\u0001"+
    "\u0024\u0001\uffff\u0001\u0024\u0001\u0065\u0003\uffff\u0001\u0064\u0001"+
    "\u0024\u0001\uffff",
    DFA30_maxS:
        "\u0001\ufaff\u0001\u0075\u0001\uffff\u0001\u006e\u0001\u0079\u0001"+
    "\u0039\u0001\u003d\u0001\u006f\u0001\u0078\u0003\uffff\u0001\u003d\u0002"+
    "\uffff\u0001\u006f\u0002\uffff\u0001\u0072\u0001\u003d\u0001\u0073\u0001"+
    "\u006f\u0001\u0075\u0001\u0079\u0002\u006f\u0005\uffff\u0001\u0068\u0001"+
    "\u0065\u0003\u003d\u0001\u007c\u0003\u003d\u0001\uffff\u0001\u0078\u0001"+
    "\u0066\u0004\uffff\u0001\u0063\u0001\u0062\u0001\u006f\u0001\u0070\u0001"+
    "\u0074\u0001\ufaff\u0001\u0072\u0001\u006e\u0001\u006f\u0001\u0070\u0001"+
    "\u0069\u0005\uffff\u0002\u0061\u0001\u006e\u0002\u0074\u0001\u0073\u0001"+
    "\u0075\u0003\uffff\u0001\u006c\u0001\u0072\u0001\u0079\u0002\uffff\u0002"+
    "\u0073\u0001\u006e\u0001\u006f\u0001\u006c\u0001\u0072\u0001\u0074\u0001"+
    "\u006c\u0001\u0077\u0001\u006f\u0001\u0074\u0001\u0065\u0001\u006e\u0001"+
    "\ufaff\u0001\u0066\u0001\u0069\u0001\u0074\u0014\uffff\u0001\u0066\u0001"+
    "\uffff\u0001\u0066\u0001\u006b\u0001\u006c\u0001\u0074\u0001\u0076\u0001"+
    "\u006f\u0001\ufaff\u0001\u0074\u0001\uffff\u0001\u0074\u0001\u0069\u0001"+
    "\u0063\u0001\u0072\u0001\u0065\u0001\u0074\u0001\u0073\u0001\u0072\u0001"+
    "\u0074\u0001\u0063\u0003\u0065\u0001\u006d\u0001\u0064\u0001\u0061\u0001"+
    "\u006f\u0001\u0073\u0001\u006e\u0001\u0065\u0001\ufaff\u0001\u0074\u0001"+
    "\u0065\u0002\u0061\u0001\u0073\u0001\ufaff\u0001\u0069\u0001\u006c\u0001"+
    "\ufaff\u0001\u006c\u0001\u0065\u0001\u0061\u0001\u0067\u0001\u0062\u0001"+
    "\uffff\u0001\u0061\u0001\u006c\u0001\u0075\u0001\uffff\u0001\u0061\u0001"+
    "\u0069\u0001\u0065\u0001\u0061\u0001\u0072\u0001\u0065\u0001\u0072\u0001"+
    "\uffff\u0001\u0061\u0001\u0069\u0001\u0063\u0001\u0068\u0001\u0074\u0001"+
    "\u0072\u0001\u0063\u0001\u0073\u0001\ufaff\u0001\u0069\u0001\u0068\u0001"+
    "\ufaff\u0001\u006e\u0003\ufaff\u0001\u0074\u0001\u0077\u0001\ufaff\u0001"+
    "\u0073\u0001\ufaff\u0001\uffff\u0002\u0072\u0001\u006c\u0001\u0074\u0001"+
    "\u0065\u0001\uffff\u0001\u0076\u0001\ufaff\u0001\uffff\u0001\u0065\u0001"+
    "\ufaff\u0001\u006b\u0001\ufaff\u0001\u006c\u0001\u0075\u0001\u0065\u0001"+
    "\u0072\u0001\u0067\u0002\u0063\u0002\u0074\u0001\u006d\u0001\u0066\u0001"+
    "\u006e\u0001\u0063\u0001\u0074\u0001\u0072\u0002\ufaff\u0001\u0068\u0001"+
    "\ufaff\u0001\uffff\u0001\u006e\u0001\ufaff\u0001\uffff\u0001\u0064\u0003"+
    "\uffff\u0001\u0069\u0001\ufaff\u0001\uffff\u0001\u0069\u0001\uffff\u0001"+
    "\u0061\u0001\u0074\u0003\ufaff\u0001\u0065\u0001\uffff\u0001\u0061\u0001"+
    "\uffff\u0001\ufaff\u0001\uffff\u0001\u0065\u0001\u006c\u0001\ufaff\u0001"+
    "\u006e\u0001\u0065\u0001\ufaff\u0001\u0074\u0001\u0065\u0001\ufaff\u0001"+
    "\u0065\u0001\u0061\u0001\u0063\u0001\ufaff\u0001\u0066\u0001\u006f\u0002"+
    "\uffff\u0001\ufaff\u0001\uffff\u0001\u0075\u0001\uffff\u0001\u0073\u0001"+
    "\u006c\u0001\ufaff\u0001\uffff\u0001\u0065\u0001\u0063\u0001\ufaff\u0001"+
    "\u0079\u0003\uffff\u0001\ufaff\u0001\u006e\u0001\uffff\u0001\ufaff\u0001"+
    "\u0074\u0001\uffff\u0002\ufaff\u0001\uffff\u0001\u0065\u0001\ufaff\u0001"+
    "\uffff\u0001\u006e\u0001\u0063\u0001\u0065\u0001\uffff\u0001\u0070\u0001"+
    "\u006e\u0001\uffff\u0001\u0065\u0001\ufaff\u0001\u0065\u0001\uffff\u0001"+
    "\u006e\u0001\u0074\u0001\uffff\u0001\ufaff\u0001\uffff\u0001\ufaff\u0001"+
    "\uffff\u0001\ufaff\u0002\uffff\u0001\u0064\u0001\uffff\u0001\u0074\u0001"+
    "\u0065\u0001\u006f\u0001\ufaff\u0001\u0069\u0001\ufaff\u0001\uffff\u0001"+
    "\ufaff\u0001\u0074\u0001\ufaff\u0003\uffff\u0001\ufaff\u0001\u0073\u0001"+
    "\ufaff\u0001\u0066\u0001\uffff\u0001\u007a\u0002\uffff\u0001\ufaff\u0002"+
    "\uffff\u0001\ufaff\u0001\uffff\u0001\ufaff\u0001\u0065\u0003\uffff\u0001"+
    "\u0064\u0001\ufaff\u0001\uffff",
    DFA30_acceptS:
        "\u0002\uffff\u0001\u0002\u0006\uffff\u0001\u000a\u0001\u000b\u0001"+
    "\u000c\u0001\uffff\u0001\u000e\u0001\u000f\u0001\uffff\u0001\u0012\u0001"+
    "\u0013\u0008\uffff\u0001\u0028\u0001\u002a\u0001\u002b\u0001\u0030\u0001"+
    "\u0033\u0009\uffff\u0001\u0057\u0002\uffff\u0001\u005f\u0001\u0060\u0001"+
    "\u0062\u0001\u0063\u000b\uffff\u0001\u002c\u0001\u0005\u0001\u005e\u0001"+
    "\u0044\u0001\u0006\u0007\uffff\u0001\u0046\u0001\u004b\u0001\u000d\u0003"+
    "\uffff\u0001\u004e\u0001\u0015\u0011\uffff\u0001\u0042\u0001\u0055\u0001"+
    "\u0051\u0001\u0043\u0001\u0056\u0001\u0052\u0001\u0045\u0001\u0064\u0001"+
    "\u0065\u0001\u0053\u0001\u0047\u0001\u004a\u0001\u004c\u0001\u0048\u0001"+
    "\u004d\u0001\u0049\u0001\u0054\u0001\u004f\u0001\u0058\u0001\u005b\u0001"+
    "\uffff\u0001\u005c\u0008\uffff\u0001\u0034\u0023\uffff\u0001\u0038\u0003"+
    "\uffff\u0001\u005d\u0007\uffff\u0001\u0024\u0015\uffff\u0001\u0039\u0005"+
    "\uffff\u0001\u0036\u0002\uffff\u0001\u005a\u0017\uffff\u0001\u0021\u0002"+
    "\uffff\u0001\u0041\u0001\uffff\u0001\u0035\u0001\u0061\u0001\u0011\u0002"+
    "\uffff\u0001\u0059\u0001\uffff\u0001\u002e\u0006\uffff\u0001\u002d\u0001"+
    "\uffff\u0001\u0022\u0001\uffff\u0001\u0025\u000f\uffff\u0001\u0023\u0001"+
    "\u0029\u0001\uffff\u0001\u0007\u0001\uffff\u0001\u0040\u0003\uffff\u0001"+
    "\u003d\u0004\uffff\u0001\u001a\u0001\u0026\u0001\u002f\u0002\uffff\u0001"+
    "\u003e\u0002\uffff\u0001\u0037\u0002\uffff\u0001\u0016\u0002\uffff\u0001"+
    "\u0003\u0003\uffff\u0001\u0004\u0002\uffff\u0001\u003b\u0003\uffff\u0001"+
    "\u0014\u0002\uffff\u0001\u0032\u0001\uffff\u0001\u001b\u0001\uffff\u0001"+
    "\u0027\u0001\uffff\u0001\u003c\u0001\u0001\u0001\uffff\u0001\u0018\u0006"+
    "\uffff\u0001\u0008\u0003\uffff\u0001\u003a\u0001\u0020\u0001\u0031\u0004"+
    "\uffff\u0001\u001f\u0001\uffff\u0001\u003f\u0001\u001e\u0001\uffff\u0001"+
    "\u0019\u0001\u0017\u0001\uffff\u0001\u0010\u0002\uffff\u0001\u001d\u0001"+
    "\u0009\u0001\u0050\u0002\uffff\u0001\u001c",
    DFA30_specialS:
        "\u0161\uffff}>",
    DFA30_transitionS: [
            "\u0002\u002e\u0001\uffff\u0002\u002e\u0012\uffff\u0001\u002e"+
            "\u0001\u0027\u0001\u002c\u0001\uffff\u0001\u002d\u0001\u0026"+
            "\u0001\u000c\u0001\u002b\u0001\u001b\u0001\u001c\u0001\u0006"+
            "\u0001\u0021\u0001\u000a\u0001\u0022\u0001\u0005\u0001\u0023"+
            "\u0001\u0029\u0009\u002a\u0001\u001e\u0001\u0002\u0001\u0009"+
            "\u0001\u0013\u0001\u000b\u0001\u001a\u0001\u001d\u001a\u002d"+
            "\u0001\u0010\u0001\uffff\u0001\u0011\u0001\u0025\u0001\u002d"+
            "\u0001\uffff\u0001\u0014\u0001\u0017\u0001\u0007\u0001\u0019"+
            "\u0001\u0008\u0001\u0015\u0002\u002d\u0001\u0003\u0002\u002d"+
            "\u0001\u0018\u0001\u002d\u0001\u0016\u0001\u002d\u0001\u0001"+
            "\u0001\u002d\u0001\u0020\u0001\u0004\u0001\u0012\u0001\u002d"+
            "\u0001\u000f\u0001\u001f\u0003\u002d\u0001\u000d\u0001\u0024"+
            "\u0001\u000e\u0001\u0028\u0041\uffff\u0017\u002d\u0001\uffff"+
            "\u001f\u002d\u0001\uffff\u1f08\u002d\u1040\uffff\u0150\u002d"+
            "\u0170\uffff\u0080\u002d\u0080\uffff\u092e\u002d\u10d2\uffff"+
            "\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u002f\u0010\uffff\u0001\u0031\u0002\uffff\u0001\u0030",
            "",
            "\u0001\u0034\u0006\uffff\u0001\u0032\u0001\u0033",
            "\u0001\u0037\u000b\uffff\u0001\u0035\u0001\u0038\u0001\uffff"+
            "\u0001\u0039\u0001\uffff\u0001\u0036",
            "\u0001\u003a\u0001\uffff\u000a\u003c",
            "\u0001\u003d",
            "\u0001\u0042\u0006\uffff\u0001\u0040\u0003\uffff\u0001\u003f"+
            "\u0002\uffff\u0001\u0041",
            "\u0001\u0044\u0001\uffff\u0001\u0045\u0009\uffff\u0001\u0043",
            "",
            "",
            "",
            "\u0001\u0047\u0016\uffff\u0001\u0046",
            "",
            "",
            "\u0001\u0049",
            "",
            "",
            "\u0001\u004a\u0009\uffff\u0001\u004b",
            "\u0001\u004c",
            "\u0001\u004e\u0010\uffff\u0001\u004f",
            "\u0001\u0052\u0007\uffff\u0001\u0050\u0002\uffff\u0001\u0051"+
            "\u0002\uffff\u0001\u0053",
            "\u0001\u0054\u0003\uffff\u0001\u0056\u000f\uffff\u0001\u0055",
            "\u0001\u0057\u0002\uffff\u0001\u0059\u0006\uffff\u0001\u0058",
            "\u0001\u005a",
            "\u0001\u005c\u0009\uffff\u0001\u005b",
            "",
            "",
            "",
            "",
            "",
            "\u0001\u005d",
            "\u0001\u005e",
            "\u0001\u0060\u0011\uffff\u0001\u005f",
            "\u0001\u0063\u000f\uffff\u0001\u0062",
            "\u0001\u0066\u0004\uffff\u0001\u0067\u000d\uffff\u0001\u0065",
            "\u0001\u0069\u003e\uffff\u0001\u006a",
            "\u0001\u006c",
            "\u0001\u006e",
            "\u0001\u0070",
            "",
            "\u0001\u003c\u0001\uffff\u0008\u0073\u0002\u003c\u000a\uffff"+
            "\u0003\u003c\u0011\uffff\u0001\u0072\u000b\uffff\u0003\u003c"+
            "\u0011\uffff\u0001\u0072",
            "\u0001\u003c\u0001\uffff\u000a\u0075\u000a\uffff\u0003\u003c"+
            "\u001d\uffff\u0003\u003c",
            "",
            "",
            "",
            "",
            "\u0001\u0076",
            "\u0001\u0077",
            "\u0001\u0079\u0005\uffff\u0001\u0078",
            "\u0001\u007a",
            "\u0001\u007c\u0001\u007b",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u007e\u0010\uffff\u0001\u007f",
            "\u0001\u0080",
            "\u0001\u0081",
            "\u0001\u0082",
            "\u0001\u0083",
            "",
            "",
            "",
            "",
            "",
            "\u0001\u0084",
            "\u0001\u0085",
            "\u0001\u0086",
            "\u0001\u0088\u0001\u0087",
            "\u0001\u0089",
            "\u0001\u008a",
            "\u0001\u008b",
            "",
            "",
            "",
            "\u0001\u008c\u0002\uffff\u0001\u008d",
            "\u0001\u008f\u0008\uffff\u0001\u008e",
            "\u0001\u0090\u0013\uffff\u0001\u0091\u0003\uffff\u0001\u0092",
            "",
            "",
            "\u0001\u0093",
            "\u0001\u0094",
            "\u0001\u0095",
            "\u0001\u0096",
            "\u0001\u0097",
            "\u0001\u0098",
            "\u0001\u0099",
            "\u0001\u009a",
            "\u0001\u009b",
            "\u0001\u009c",
            "\u0001\u009d",
            "\u0001\u009e",
            "\u0001\u009f",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u0014\u002d\u0001\u00a0"+
            "\u0005\u002d\u0045\uffff\u0017\u002d\u0001\uffff\u001f\u002d"+
            "\u0001\uffff\u1f08\u002d\u1040\uffff\u0150\u002d\u0170\uffff"+
            "\u0080\u002d\u0080\uffff\u092e\u002d\u10d2\uffff\u5200\u002d"+
            "\u5900\uffff\u0200\u002d",
            "\u0001\u00a2",
            "\u0001\u00a3",
            "\u0001\u00a4",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "\u0001\u003c\u0001\uffff\u0008\u0073\u0002\u003c\u000a\uffff"+
            "\u0003\u003c\u001d\uffff\u0003\u003c",
            "",
            "\u0001\u003c\u0001\uffff\u000a\u0075\u000a\uffff\u0003\u003c"+
            "\u001d\uffff\u0003\u003c",
            "\u0001\u00a6",
            "\u0001\u00a7",
            "\u0001\u00a8",
            "\u0001\u00a9",
            "\u0001\u00ab\u0002\uffff\u0001\u00aa",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u0004\u002d\u0001\u00ac"+
            "\u0015\u002d\u0045\uffff\u0017\u002d\u0001\uffff\u001f\u002d"+
            "\u0001\uffff\u1f08\u002d\u1040\uffff\u0150\u002d\u0170\uffff"+
            "\u0080\u002d\u0080\uffff\u092e\u002d\u10d2\uffff\u5200\u002d"+
            "\u5900\uffff\u0200\u002d",
            "\u0001\u00ae",
            "",
            "\u0001\u00af",
            "\u0001\u00b0",
            "\u0001\u00b1",
            "\u0001\u00b2",
            "\u0001\u00b3",
            "\u0001\u00b4",
            "\u0001\u00b5",
            "\u0001\u00b6",
            "\u0001\u00b7",
            "\u0001\u00b8",
            "\u0001\u00b9",
            "\u0001\u00ba",
            "\u0001\u00bb",
            "\u0001\u00bc",
            "\u0001\u00bd",
            "\u0001\u00be",
            "\u0001\u00bf",
            "\u0001\u00c0",
            "\u0001\u00c1",
            "\u0001\u00c2",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u00c4",
            "\u0001\u00c5",
            "\u0001\u00c6",
            "\u0001\u00c7",
            "\u0001\u00c8",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u00ca",
            "\u0001\u00cb",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u00cd",
            "\u0001\u00ce",
            "\u0001\u00cf",
            "\u0001\u00d0",
            "\u0001\u00d1",
            "",
            "\u0001\u00d2",
            "\u0001\u00d3",
            "\u0001\u00d4",
            "",
            "\u0001\u00d5",
            "\u0001\u00d6",
            "\u0001\u00d7",
            "\u0001\u00d8",
            "\u0001\u00d9",
            "\u0001\u00da",
            "\u0001\u00db",
            "",
            "\u0001\u00dc",
            "\u0001\u00dd",
            "\u0001\u00de",
            "\u0001\u00df",
            "\u0001\u00e0",
            "\u0001\u00e1",
            "\u0001\u00e2",
            "\u0001\u00e3",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u00e5",
            "\u0001\u00e6",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u00e8",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u00ec",
            "\u0001\u00ed",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u00ef",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "\u0001\u00f1",
            "\u0001\u00f2",
            "\u0001\u00f3",
            "\u0001\u00f4",
            "\u0001\u00f5",
            "",
            "\u0001\u00f6",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "\u0001\u00f8",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u00fa",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u00fc",
            "\u0001\u00fd",
            "\u0001\u00fe",
            "\u0001\u00ff",
            "\u0001\u0100",
            "\u0001\u0101",
            "\u0001\u0102",
            "\u0001\u0103",
            "\u0001\u0104",
            "\u0001\u0105",
            "\u0001\u0106",
            "\u0001\u0107",
            "\u0001\u0108",
            "\u0001\u0109",
            "\u0001\u010a",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u010d",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "\u0001\u010f",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "\u0001\u0111",
            "",
            "",
            "",
            "\u0001\u0112",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u0012\u002d\u0001\u0113"+
            "\u0007\u002d\u0045\uffff\u0017\u002d\u0001\uffff\u001f\u002d"+
            "\u0001\uffff\u1f08\u002d\u1040\uffff\u0150\u002d\u0170\uffff"+
            "\u0080\u002d\u0080\uffff\u092e\u002d\u10d2\uffff\u5200\u002d"+
            "\u5900\uffff\u0200\u002d",
            "",
            "\u0001\u0115",
            "",
            "\u0001\u0116",
            "\u0001\u0117",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u000b\u002d\u0001\u0118"+
            "\u000e\u002d\u0045\uffff\u0017\u002d\u0001\uffff\u001f\u002d"+
            "\u0001\uffff\u1f08\u002d\u1040\uffff\u0150\u002d\u0170\uffff"+
            "\u0080\u002d\u0080\uffff\u092e\u002d\u10d2\uffff\u5200\u002d"+
            "\u5900\uffff\u0200\u002d",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u011c",
            "",
            "\u0001\u011d",
            "",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "\u0001\u011f",
            "\u0001\u0120",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u0122",
            "\u0001\u0123",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u0125",
            "\u0001\u0126",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u0128",
            "\u0001\u0129",
            "\u0001\u012a",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u012c",
            "\u0001\u012d",
            "",
            "",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "\u0001\u012f",
            "",
            "\u0001\u0130",
            "\u0001\u0131",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "\u0001\u0133",
            "\u0001\u0134",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u0136",
            "",
            "",
            "",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u0138",
            "",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u013a",
            "",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "\u0001\u013d",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "\u0001\u013f",
            "\u0001\u0140",
            "\u0001\u0141",
            "",
            "\u0001\u0142",
            "\u0001\u0143",
            "",
            "\u0001\u0144",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u0146",
            "",
            "\u0001\u0147",
            "\u0001\u0148",
            "",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "",
            "\u0001\u014c",
            "",
            "\u0001\u014d",
            "\u0001\u014e",
            "\u0001\u014f",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u0151",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u0154",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "",
            "",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u0157",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u0159",
            "",
            "\u0001\u015a",
            "",
            "",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            "\u0001\u015e",
            "",
            "",
            "",
            "\u0001\u015f",
            "\u0001\u002d\u000b\uffff\u000a\u002d\u0007\uffff\u001a\u002d"+
            "\u0004\uffff\u0001\u002d\u0001\uffff\u001a\u002d\u0045\uffff"+
            "\u0017\u002d\u0001\uffff\u001f\u002d\u0001\uffff\u1f08\u002d"+
            "\u1040\uffff\u0150\u002d\u0170\uffff\u0080\u002d\u0080\uffff"+
            "\u092e\u002d\u10d2\uffff\u5200\u002d\u5900\uffff\u0200\u002d",
            ""
    ]
});

org.antlr.lang.augmentObject(JavaLexer, {
    DFA30_eot:
        org.antlr.runtime.DFA.unpackEncodedString(JavaLexer.DFA30_eotS),
    DFA30_eof:
        org.antlr.runtime.DFA.unpackEncodedString(JavaLexer.DFA30_eofS),
    DFA30_min:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(JavaLexer.DFA30_minS),
    DFA30_max:
        org.antlr.runtime.DFA.unpackEncodedStringToUnsignedChars(JavaLexer.DFA30_maxS),
    DFA30_accept:
        org.antlr.runtime.DFA.unpackEncodedString(JavaLexer.DFA30_acceptS),
    DFA30_special:
        org.antlr.runtime.DFA.unpackEncodedString(JavaLexer.DFA30_specialS),
    DFA30_transition: (function() {
        var a = [],
            i,
            numStates = JavaLexer.DFA30_transitionS.length;
        for (i=0; i<numStates; i++) {
            a.push(org.antlr.runtime.DFA.unpackEncodedString(JavaLexer.DFA30_transitionS[i]));
        }
        return a;
    })()
});

JavaLexer.DFA30 = function(recognizer) {
    this.recognizer = recognizer;
    this.decisionNumber = 30;
    this.eot = JavaLexer.DFA30_eot;
    this.eof = JavaLexer.DFA30_eof;
    this.min = JavaLexer.DFA30_min;
    this.max = JavaLexer.DFA30_max;
    this.accept = JavaLexer.DFA30_accept;
    this.special = JavaLexer.DFA30_special;
    this.transition = JavaLexer.DFA30_transition;
};

org.antlr.lang.extend(JavaLexer.DFA30, org.antlr.runtime.DFA, {
    getDescription: function() {
        return "1:1: Tokens : ( T__24 | T__25 | T__26 | T__27 | T__28 | T__29 | T__30 | T__31 | T__32 | T__33 | T__34 | T__35 | T__36 | T__37 | T__38 | T__39 | T__40 | T__41 | T__42 | T__43 | T__44 | T__45 | T__46 | T__47 | T__48 | T__49 | T__50 | T__51 | T__52 | T__53 | T__54 | T__55 | T__56 | T__57 | T__58 | T__59 | T__60 | T__61 | T__62 | T__63 | T__64 | T__65 | T__66 | T__67 | T__68 | T__69 | T__70 | T__71 | T__72 | T__73 | T__74 | T__75 | T__76 | T__77 | T__78 | T__79 | T__80 | T__81 | T__82 | T__83 | T__84 | T__85 | T__86 | T__87 | T__88 | T__89 | T__90 | T__91 | T__92 | T__93 | T__94 | T__95 | T__96 | T__97 | T__98 | T__99 | T__100 | T__101 | T__102 | T__103 | T__104 | T__105 | T__106 | T__107 | T__108 | T__109 | T__110 | T__111 | T__112 | T__113 | HexLiteral | DecimalLiteral | OctalLiteral | FloatingPointLiteral | CharacterLiteral | StringLiteral | ENUM | Identifier | WS | COMMENT | LINE_COMMENT );";
    },
    dummy: null
});
 
})();