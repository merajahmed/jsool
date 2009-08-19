//TODO closure it after devlopment
//Manual intel: http://www.intel.com/products/processor/manuals/index.htm
(function(){
	window.assembly = {};
	var self = window.assembly; 
	// Some speedups
	var string = 'string', number = 'number', object = 'object';
	
	var compilers = {};
	var instructions = {};
	var commands = {};
	var hexaToNum = {};
	var numToHexa = [];
	var memory = [];
	var interruptions = {};
	self.memory = memory;
	
	//Basic register
	function Register(){this.value = '0000';}
	Register.prototype = new Object();
	Register.prototype.get = function(){return this.value;};
	Register.prototype.set = function(val){this.value = val;};
	//Segment register
	function SegmentRegister(){}
	SegmentRegister.prototype = new Register();
	SegmentRegister.prototype.step = function(){this.value = numToHexa[hexaToNum[this.value] + 1];};
	SegmentRegister.prototype.stepBack = function(){this.value = numToHexa[hexaToNum[this.value] - 1];};
	//Lower part register
	function LowerRegister(parent){this.parent = parent;}
	LowerRegister.prototype = new Register();
	LowerRegister.prototype.get = function(){return '00'+this.parent.value.substring(2,4);};
	LowerRegister.prototype.set = function(val){this.parent.value = this.parent.value.substring(0,2) + val.substring(2,4);};
	//Higher part register
	function HigherRegister(parent){this.parent = parent;}
	HigherRegister.prototype = new Register();
	HigherRegister.prototype.get = function(){return this.parent.value.substring(0,2)+'00';};
	HigherRegister.prototype.set = function(val){this.parent.value = val.substring(0,2) + this.parent.value.substring(2,4);};
	
	//Processor flags
	var flags = {
		CF: false, //Carry Flag - becomes one if an +, -, AND, OR, results in a value larger than a register
		PF: false, //Parity Flag - becomes 1 if the lower 8-bits of an operation contains an even number of 1 bits
		AF: false, //Auxiliary Flag - Set on a carry or borrow to the value of the loer order 4 bits
		ZF: false, //Zero Flag - becomes 1 if an operation results in a 0 writeback, or 0 register
		SF: false, //Sign Flag - is 1 if the value saved is negative, 0 for positive
		TF: false, //Trap Flag - allows for the stopping of code within a segment
		IF: false, //Interrupt Flag - when this flag is set, the processor begins ‘listening’ for external interupts
		DF: false, //Direction Flag - determines the direction to move through the code
		OF: false  //Overflow Flag - becomes 1 if the operation is larger than available space to write
	};
	
	//Create the registers
	var registers = (function(){
		var AX = new Register();//Accumulator: aritimetica e I/O
		var BX = new Register();//Base: base ou ponteiro
		var CX = new Register();//Counter: contador
		var DX = new Register();//Displacement: uso geral
		
		var AL = new LowerRegister(AX);
		var AH = new HigherRegister(AX);
		var BL = new LowerRegister(BX);
		var BH = new HigherRegister(BX);
		var CL = new LowerRegister(CX);
		var CH = new HigherRegister(CX);
		var DL = new LowerRegister(DX);
		var DH = new HigherRegister(DX);
		
		var CS = new SegmentRegister();//Code Segment: codigo sendo executado
		var DS = new SegmentRegister();//Data Segment: endereco dos dados do programa
		var ES = new SegmentRegister();//Extra Segment: para utilização do programador
		var SS = new SegmentRegister();//Stack Segment: endereço da pilha
		
		var SI = new Register();//Source Index: utilizado para mover dados
		var DI = new Register();//Destiny Index: utilizado para mover dados
		
		var BP = new Register();//Base Pointer: argumentos de funcoes
		var SP = new Register();//Stack Pointer: topo da pilha
		
		return {
			AX:AX,BX:BX,CX:CX,DX:DX,
			AL:AL,AH:AH,BL:BL,BH:BH,
			CL:CL,CH:CH,DL:DL,DH:DH,
			CS:CS,DS:DS,ES:ES,SS:SS,
			SI:SI,DI:DI,BP:BP,SP:SP
		};
	})();
	function printRegisters(){
		var b = [''];
		var c = 0;
		for(var r in registers){
			c++;
			b.push(r+':'+registers[r].get()+(c%4 == 0?'\n':''));
		}
		console.debug(b.join(' '));
	};
	//Speed up convertions between numbers and hexas
	(function speedUpConvertions(){
		var hexaNumbers = [];
		for(var i = 0; i < 16; i++){
			hexaNumbers.push(i.toString(16).toUpperCase());
		}
		var hexa = null;
		var num = 0;
		for(var a = 0; a < 16; a++)for(var b = 0; b < 16; b++)
			for(var c = 0; c < 16; c++)for(var d = 0; d < 16; d++){
				hexa = hexaNumbers[a]+hexaNumbers[b]+hexaNumbers[c]+hexaNumbers[d];
				numToHexa.push(hexa);
				hexaToNum[hexa] = numToHexa.length - 1;
			}
	})();
	
	
	//Checks if an expression is a pure hexa value
	function isValue(expression){return expression.length == 4 && expression.match(/^[0-9ABCEDF]{4}$/) != null;}	
	//Checks if an expression is a memory adress
	function isMemory(expression){return expression.length == 6 && expression.match(/^\[([0-9ABCDEF]{4})]$/) != null;}
	//Checks if an expression is a register
	function isRegister(expression){return expression.length == 2 && (expression in registers);}
	//Checks if an expression is a flag
	function isFlag(expression){return expression.length == 2 && (expression in flags);}
	//Checks if an expression is a Reference
	function isReference(expression){
		if(!expression.match(/^\[([A-Z]{2})]$/)){
			return false;
		}
		var ref = expression.replace(/^\[([A-Z]{2})]$/,'$1');
		return (ref in registers) || (ref in flags);
	}
	//Removes from a memory adress pattern [AAAA] the square brackets
	function getMemoryAdress(expression){return expression.replace(/^\[([0-9ABCDEF]{4})]$/,'$1');}
	// Remover extra spaces on command line
	function ajustCodeLine(expression){return expression.trim().replace(/[\s]{0,1}[,][\s]{0,1}/,',').replace(/[\s]+/,' ');}
	
	function getTypeOf(expression){
		if(isMemory(expression)) return 'MEM';
		if(isValue(expression)) return 'VAL';
		if(isRegister(expression)) return 'REG';
		if(isFlag(expression)) return 'FLA';
		if(isReference(expression)) return 'REF';
		return null;
	}
	//Better version of the compiler
	function load(code, offset){
		code = code.trim().toUpperCase();
		if(code.length == 0) return;
		try{
			var memoryIndex = offset == null ? 0 : offset;
			var lines = code.split('\n');
			var line, compiled, cmd;
			
			for(var index = 0; index < lines.length; index++){
				line = ajustCodeLine(lines[index]);
				var splited = line.split(' ');
				var args = splited[1].split(',');
				
				var inst = splited[0];
				var arg;
				
				for(var a = 0; a < args.length; a++){
					arg = args[a];
					var type = getTypeOf(arg);
					if(type == null) throw new Error('Invalid argument: '+arg);
					if(type == 'MEM') args[a] = getMemoryAdress(arg);
					inst = inst + '_' + type;
				}
				cmd = commands[inst];
				
				if(!cmd) throw Error("Unknown command: "+inst);
				
				memory[memoryIndex++] = cmd.CODE;
				for(var i = 0; i < args.length; i++, memoryIndex++){
					memory[memoryIndex] = args[i];
				}
			}
			
		}catch(e){
			throw new Error("Compilation Error (line:"+index+":\""+line+"\")\n"+e);
		}
	}
	
	//System bootstrap
	function run(offset){
		offset = offset || 0;
		var CS = registers.CS;
		CS.set(numToHexa[offset]);
		var instruction = memory[hexaToNum[CS.get()]];
		if(!instruction) throw 1;
		instructions[instruction]();
	}
	
	//Run next instruction on segment
	function runNextInstruction(){
		var CS = registers.CS;
		CS.step();
		var instruction = memory[hexaToNum[CS.get()]];
		if(!instruction) throw 1;
		instructions[instruction]();
	}

	self.reset = function(){memory = [];};
	
	//All registered commands with all its informations
	var cmdCounter = 0;
	//Returns the next value on the Code Segment
	function getNextCommand(){
		registers.CS.step();
		return memory[hexaToNum[registers.CS.get()]];
	}
	commands = {
		//INT instruction
		INT_VAL:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION: function(){
				var interruption = getNextCommand();
				interruptions[interruption]();
			}
		},
		//MOV [XXXX], XXXX
		MOV_MEM_VAL:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION: function (){				
				var to = getNextCommand();
				var from = getNextCommand();
				memory[hexaToNum[to]] = from;
				runNextInstruction();
			}
		},
		//MOV [XXXX], AX
		MOV_MEM_REG:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION:function (){
				var to = getNextCommand();
				var from = getNextCommand();
				memory[hexaToNum[to]] = registers[from].get();
				runNextInstruction();
			}
		},
		//MOV [XXXX], [XXXX]
		MOV_MEM_MEM:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION:function MOV_MEM_MEM(){
				var to = getNextCommand();
				var from = getNextCommand();
				memory[hexaToNum[to]] = memory[hexaToNum[from]];
				runNextInstruction();
			}
		},
		//MOV AX, XXXX
		MOV_REG_VAL: {
			CODE:numToHexa[cmdCounter++],
			FUNCTION:function (){
				var to = getNextCommand();
				var from = getNextCommand();
				registers[to].set(from);
				runNextInstruction();
			}
		},
		//MOV AX, AX
		MOV_REG_REG:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION:function (){
				var to = getNextCommand();
				var from = getNextCommand();
				registers[to].set(registers[from].get());
				runNextInstruction();
			} 
		},
		//MOV AX, [XXXX]
		MOV_REG_MEM:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION:function (){
				var to = getNextCommand();
				var from = getNextCommand();
				registers[to].set(memory[hexaToNum[from]]);
				runNextInstruction();
			} 
		},
		//XCHG [XXXX], [XXXX]
		XCHG_MEM_MEM:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION: function(){
				var temp;
				var to = getNextCommand();
				var from = getNextCommand();
				temp = memory[hexaToNum[to]]; 
				memory[hexaToNum[to]] = memory[hexaToNum[from]];
				memory[hexaToNum[from]] = temp;
				runNextInstruction();
			}
		},
		//XCHG AX, [XXXX]
		XCHG_REG_MEM:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION: function(){
				var temp;
				var to = getNextCommand();
				var from = getNextCommand();				
				temp = registers[from].get();
				registers[from].set(memory[hexaToNum[to]]);
				memory[hexaToNum[to]] = temp;
				runNextInstruction();
			}
		},
		//XCHG [XXXX], AX
		XCHG_MEM_REG:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION: function(){
				var temp;
				var to = getNextCommand();
				var from = getNextCommand();
				temp = memory[hexaToNum[to]];
				memory[hexaToNum[to]] = registers[from].get();
				registers[from].set(temp);
				runNextInstruction();
			}
		},
		//XCHG AX, AX
		XCHG_REG_REG:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION: function(){
				var temp;
				var to = getNextCommand();
				var from = getNextCommand();
				temp = registers[to].get(); 
				registers[to].set(registers[from].get());
				registers[from].set(temp);
				runNextInstruction();
			}
		},
		//ADD AX, XXXX
		ADD_REG_VAL:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION: function(){
				var temp;
				var to = getNextCommand();
				var from = getNextCommand();
				var regVal = registers[to].get(); 
				var val = from;
				var sum = hexaToNum[regVal]+hexaToNum[val];
				if(sum > hexaToNum['FFFF']){
					flags.CF = true;
					sum = sum - hexaToNum['FFFF'];
				}
				registers[to].set(numToHexa[sum]);
				runNextInstruction();
			}
		},
		//ADD AX, AX
		ADD_REG_REG:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION: function(){
				var temp;
				var to = getNextCommand();
				var from = getNextCommand();
				var regVal = registers[to].get(); 
				var val = registers[from].get();
				var sum = hexaToNum[regVal]+hexaToNum[val];
				if(sum > hexaToNum['FFFF']){
					flags.CF = true;
					sum = sum - hexaToNum['FFFF'];
				}
				registers[to].set(numToHexa[sum]);
				runNextInstruction();
			}
		},
		//ADC AX, XXXX
		ADC_REG_VAL:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION: function(){
				var temp;
				var to = getNextCommand();
				var from = getNextCommand();
				var regVal = registers[to].get(); 
				var val = from;
				var sum = hexaToNum[regVal]+hexaToNum[val] + (flags.CF?1:0);
				if(sum > hexaToNum['FFFF']){
					flags.CF = true;
					sum = sum - hexaToNum['FFFF'];
				}
				registers[to].set(numToHexa[sum]);
				runNextInstruction();
			}
		},
		//ADC AX, AX
		ADC_REG_REG:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION: function(){
				var temp;
				var to = getNextCommand();
				var from = getNextCommand();
				var regVal = registers[to].get(); 
				var val = registers[from].get();
				var sum = hexaToNum[regVal]+hexaToNum[val] + (flags.CF?1:0);
				if(sum > hexaToNum['FFFF']){
					flags.CF = true;
					sum = sum - hexaToNum['FFFF'];
				}
				registers[to].set(numToHexa[sum]);
				runNextInstruction();
			}
		}
	};
	
	// Processor interruptions
	//http://www.ctyme.com/intr/int.htm
	interruptions = {
		//DOS Interruptions
		'0021':function(){
			var al = registers.AL.get();
			//http://spike.scu.edu.au/~barry/interrupts.html
			var AH = {
				//Terminate program
				'0000':function(){throw 0;},
				//Read char from std in and put it on AL
				'0001':function(){
					var c = getChar();
					if(c == null){
						registers.CS.stepBack();
						registers.CS.stepBack();
						window.setTimeout(function(){
							runNextInstruction();
						},10);
					}else{
						registers.AL.set(c.toString(16));
						runNextInstruction();						
					}
				},
				//Write char in DL on std out and copy it into AL
				'0002':function(){
					
				}
			};
			AH[al]();
		}
	};
	// Translates The commands into an instructions array for speed up
	for(var cmd in commands){instructions[commands[cmd].CODE] = commands[cmd].FUNCTION;}
	
	//Setting functions to be accessed outside
	self.load = load;
	self.run = run;
	self.printRegisters = printRegisters;
	window.onerror = function(e){
		if(assembly.finish)assembly.finish(e);
		assembly.printRegisters();
	};
})();