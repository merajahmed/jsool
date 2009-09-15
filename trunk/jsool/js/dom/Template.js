js.dom.Template = $extends(js.core.Object,{
	cons: function(){
		var args = arguments;
		if(Array.isArray(args[0])){
			this.html = args[0].join("");
		}else if(args.length > 1){
			var buffer =[];
			Array.iterate(args,function concatenateTemplate(i,el){
				buffer.push(el);
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
},"js.dom.Template");