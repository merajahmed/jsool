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
	
	function Register(){this.value = '0000';}
	Register.prototype = new Object();
	Register.prototype.get = function(){return this.value;};
	Register.prototype.set = function(val){this.value = val;};
	
	function ProgramStackRegister(){}
	ProgramStackRegister.prototype = new Register();
	ProgramStackRegister.prototype.step = function(){this.value = numToHexa[hexaToNum[this.value] + 1];};
	
	function LowerRegister(parent){this.parent = parent;}
	LowerRegister.prototype = new Register();
	LowerRegister.prototype.get = function(){return this.parent.value.substring(0,2);};
	LowerRegister.prototype.set = function(val){this.parent.value = val + this.parent.value.substring(2,4);};
	
	function HigherRegister(parent){this.parent = parent;}
	HigherRegister.prototype = new Register();
	HigherRegister.prototype.get = function(){return this.parent.value.substring(2,4);};
	HigherRegister.prototype.set = function(val){this.parent.value = this.parent.value.substring(0,2) + val;};
	
	var registers = (function(){
		AX = new Register();
		BX = new Register();
		CX = new Register();
		DX = new Register();
		PS = new ProgramStackRegister();//Program stack
		AL = new LowerRegister(AX);
		AH = new HigherRegister(AX);
		BL = new LowerRegister(BX);
		BH = new HigherRegister(BX);
		CL = new LowerRegister(CX);
		CH = new HigherRegister(CX);
		DL = new LowerRegister(DX);
		DH = new HigherRegister(DX);
		return {
			AX:AX,BX:BX,CX:CX,DX:DX,
			AL:AL,AH:AH,BL:BL,BH:BH,
			CL:CL,CH:CH,DL:DL,DH:DH,
			PS:PS
		};
	})();
	
	/**
	 * Speed up convertions between numbers and hexas
	 */
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
	
	/**
	 * Checks if an expression is a pure hexa value
	 */
	function isValue(expression){
		return expression.length == 4 && expression.match(/^[0-9ABCEDF]{4}$/) != null;
	}
	/**
	 * Checks if an expression is a memory adress
	 */
	function isMemory(expression){
		return expression.length == 6 && expression.match(/^\[([0-9ABCDEF]{4})]$/) != null;
	}
	/**
	 * Checks if an expression is a register
	 */
	function isRegister(expression){
		return expression.length == 2 && (expression in registers);
	}
	/**
	 * Removes from a memory adress pattern [AAAA] the square brackets
	 */
	function getMemoryAdress(expression){
		return expression.replace(/^\[([0-9ABCDEF]{4})]$/,'$1');
	}
	//Main compile function
	function load(code, offset){
		code = code.trim().toUpperCase();
		if(code.length == 0) return;
		console.profile('Compile');
		try{
			var memoryIndex = offset == null ? 0 : offset;
			var lines = code.split('\n');
			var line, compiled, cmd;
			for(var index = 0; index < lines.length; index++){
				line = ajustCodeLine(lines[index]);
				cmd = line.split(' ')[0];
				compiled = compilers[cmd](line);
				for(var i = 0; i < compiled.length; i++, memoryIndex++){
					memory[memoryIndex] = compiled[i];
				}
			}
		}catch(e){
			console.profileEnd('Compile');
			throw new Error("Compilation Error (line:"+index+")\n"+e);
		}
		console.profileEnd('Compile');
	}
	//Main run function
	function run(){
		console.profile("Run");
		var PS = registers.PS;
		var instruction;
		PS.set(numToHexa[0]);
		try{
			while(true){
				instruction = memory[hexaToNum[PS.get()]];
				instructions[instruction]();
				PS.step();
			}
		}catch(e){
			
		}
		console.profileEnd("Run");
		console.info("FINISHED AX:%s BX:%s CX:%s DX:%s", registers.AX.get(),registers.BX.get(),registers.CX.get(),registers.DX.get());
	}
	
	function ajustCodeLine(expression){
		return expression.trim().replace(/[\s]{0,1}[,][\s]{0,1}/,',').replace(/[\s]+/,' ');
	}

	self.reset = function(){memory = [];};
	
	/**
	 * All registered commands with all its informations
	 */
	var cmdCounter = 0;
	commands = {
		MOV_VAL_TO_MEM:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION: function (){
				registers.PS.step();
				var to = memory[hexaToNum[registers.PS.get()]];
				registers.PS.step();
				var from = memory[hexaToNum[registers.PS.get()]];
				memory[hexaToNum[to]] = from;
			}
		},
		MOV_REG_TO_MEM:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION:function (){
				registers.PS.step();
				var to = memory[hexaToNum[registers.PS.get()]];
				registers.PS.step();
				var from = memory[hexaToNum[registers.PS.get()]];
				memory[hexaToNum[to]] = registers[from];
			}
		},
		MOV_MEM_TO_MEM:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION:function MOV_MEM_TO_MEM(){
				registers.PS.step();
				var to = memory[hexaToNum[registers.PS.get()]];
				registers.PS.step();
				var from = memory[hexaToNum[registers.PS.get()]];
				memory[hexaToNum[to]] = memory[hexaToNum[from]];
			}
		},
		MOV_VAL_TO_REG: {
			CODE:numToHexa[cmdCounter++],
			FUNCTION:function (){
				registers.PS.step();
				var to = memory[hexaToNum[registers.PS.get()]];
				registers.PS.step();
				var from = memory[hexaToNum[registers.PS.get()]];
				registers[to].set(from);
			}
		},
		MOV_REG_TO_REG:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION:function (){
				registers.PS.step();
				var to = memory[hexaToNum[registers.PS.get()]];
				registers.PS.step();
				var from = memory[hexaToNum[registers.PS.get()]];
				registers[to].set(registers[from].get());
			} 
		},
		MOV_MEM_TO_REG:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION:function (){
				registers.PS.step();
				var to = memory[hexaToNum[registers.PS.get()]];
				registers.PS.step();
				var from = memory[hexaToNum[registers.PS.get()]];
				registers[to].set(memory[hexaToNum[from]]);
			} 
		},
		XCHG_MEM_TO_MEM:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION: function(){
				var temp;
				registers.PS.step();
				var to = memory[hexaToNum[registers.PS.get()]];
				registers.PS.step();
				var from = memory[hexaToNum[registers.PS.get()]];
				temp = memory[hexaToNum[to]]; 
				memory[hexaToNum[to]] = memory[hexaToNum[from]];
				memory[hexaToNum[from]] = temp;
			}
		},
		XCHG_MEM_TO_REG:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION: function(){
				var temp;
				registers.PS.step();
				var to = memory[hexaToNum[registers.PS.get()]];
				registers.PS.step();
				var from = memory[hexaToNum[registers.PS.get()]];				
				temp = registers[from].get();
				registers[from].set(memory[hexaToNum[to]]);
				memory[hexaToNum[to]] = temp;
			}
		},
		XCHG_REG_TO_MEM:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION: function(){
				var temp;
				registers.PS.step();
				var to = memory[hexaToNum[registers.PS.get()]];
				registers.PS.step();
				var from = memory[hexaToNum[registers.PS.get()]];
				temp = registers[to].get();
				registers[to].set(memory[hexaToNum[from]]);
				memory[hexaToNum[from]] = temp;
			}
		},
		XCHG_REG_TO_REG:{
			CODE:numToHexa[cmdCounter++],
			FUNCTION: function(){
				var temp;
				registers.PS.step();
				var to = memory[hexaToNum[registers.PS.get()]];
				registers.PS.step();
				var from = memory[hexaToNum[registers.PS.get()]];
				temp = registers[to].get(); 
				registers[to].set(registers[from].get());
				registers[from].set(temp);
			}
		}
	};
	
	/**
	 * Translates The commands into an instructions array
	 */
	for(var cmd in commands){instructions[commands[cmd].CODE] = commands[cmd].FUNCTION;}
	
	/**
	 * Compiler for MOV instruction
	 */
	compilers.MOV = function(expression){
		//split arguments
		var splited = expression.split(' ')[1].split(',');
		var arg1 = splited[0].trim();
		var arg2 = splited[1].trim();
		var to, from;
		if(isMemory(arg1)){
			to = 'MEM';
			arg1 = getMemoryAdress(arg1);
		}else if(isRegister(arg1)) to = 'REG';
		if(!to) throw new Error("Invalid argument: "+arg1);
		if(isMemory(arg2)){
			from = 'MEM';
			arg2 = getMemoryAdress(arg2);
		}else if(isRegister(arg2)) from = 'REG';
		else if(isValue(arg2)) from = 'VAL';
		if(!from) throw new Error("Invalid argument: "+arg2);
		var instruction = commands['MOV_'+from+'_TO_'+to].CODE;
		return [instruction, arg1, arg2];
	};
	
	/**
	 * Compiler for XCHG instruction
	 */
	compilers.XCHG = function(expression){
		var splited = expression.split(' ')[1].split(',');
		var arg1 = splited[0].trim();
		var arg2 = splited[1].trim();
		var op1, op2;
		if(isMemory(arg1)){
			op1 = 'MEM';
			arg1 = getMemoryAdress(arg1);
		}else if(isRegister(arg1)) op1 = 'REG';
		if(!op1) throw new Error("Invalid argument: "+ arg1);
		if(isMemory(arg2)){
			op2 = 'MEM';
			arg2 = getMemoryAdress(arg2);
		}else if(isRegister(arg2)) op2 = 'REG';
		if(!op2) throw new Error("Invalid argument: "+ arg2);
		var instruction = commands['XCHG_'+op1+'_TO_'+op2].CODE;
		return [instruction, arg1, arg2];
	};
	
	/**
	 * Setting functions to be accessed outside
	 */
	self.load = load;
	self.run = run;
})();