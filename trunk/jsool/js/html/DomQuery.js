js.html.DomQuery = (function(){
	return {
		compile: function(string){
			if(String.isString(string)){
				
			}
		},
		execute: function(string, ctx){			
			if(document.querySelectorAll){
				return (ctx || document).querySelectorAll(string);
			}else{
				return (this.compile())();
			}
		}
	};
})();