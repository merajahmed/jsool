js.html.Template = $extends(js.core.Object,{
	cons: function(){
		var args = arguments;
		if(Array.isArray(args[0])){
			this.html = args[0].join("");
		}else if(args.length > 1){
			var buffer =[];
			jsool.iterate(args,function(e){
				buffer.push(e);
			});
			this.html = buffer.join("");
		}else if(String.isString(args[0])){
			this.html = args[0]; 
		}
	},
	propertyRe: /\{([\w-]+)\}/g,
	html: null,
	compile: function(values){
		return this.html.replace(this.propertyRe,function(match,name){
			return jsool.isDefined(values[name]) ? values[name] : "";
		});
	}
},"js.html.Template");