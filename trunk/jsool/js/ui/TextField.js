jsool.namespace("js.ui");

(function(){
	var EM = js.core.EventManager,
		DH = js.dom.Helper;
	
	
	js.ui.TextField = $extends(js.util.Observable,{
		cons: function(config){
			//Default configuration
			//this.config = config || {} ;
			/*
			jsool.applyIf(config,{
				value:"",
				placeHolder:"",
				width: 230
			});
			*/
			//if(this.config.render)this.render(this.config.render);
		},
		render: function(el){
			el = jsool.get(el);
			var c = this.config,
				s = {
				width: (c.width-10) + "px"
			};
			console.info(DH);
			//this.input = DH.createDom({
				//"class":"js-inp",
				//tag:"input",
				//type:"text",
				//style: s,
				//value: c.value,
				//parent: el
			//});
			
		}
	},"js.ui.TextField");
})();