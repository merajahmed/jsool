jsool.namespace("js.ui");

(function(){
	var EM = js.core.EventManager,
		DH = js.dom.Helper;
	
	
	js.ui.DropDown = $extends(js.util.Observable,{
		cons: function(config){
			//Default configuration
			config = config || {} ;
			
			var s = {
				width: (config.width-10) + "px"
			};
			
			
			
			this.wrapper = DH.createDom({
				
			});
			
			if(config.render)this.render(config.render);
			
			this.style = this.input.style;
		},
		render: function(el){
			jsool.get(el).append(this.wrapper);
		}
	},"js.ui.DropDown");
})();