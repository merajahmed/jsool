jsool.namespace("js.ui");

(function(){
	var EM = js.core.EventManager,
		DH = js.dom.Helper;
	
	
	js.ui.TextField = $extends(js.util.Observable,{
		cons: function(config){
			//Default configuration
			this.config = config || {} ;
			
			jsool.applyIf(config,{
				value:"",
				placeHolder:"",
				width: 230,
				enabled: true
			});
			
			if(this.config.render)this.render(this.config.render);
		},
		events: ['keyup','keydown'],
		render: function(el){
			el = jsool.get(el);
			var c = this.config,
				s = {
				width: (c.width-10) + "px"
			};

			this.input = DH.createDom({
				"className":"js-inp",
				tag:"input",
				type:"text",
				style: s,
				value: c.value,
				parent: el,
				disabled: !c.enabled
			});
			
			EM.on(this.input,'keyup',this.fireEvent,this);
			EM.on(this.input,'keydown',this.fireEvent,this);
			
		},
		setValue: function(val){
			this.input.value = String(val);
		},
		getValue: function(){
			return this.input.value;
		},
		enable: function(){
			this.input.disabled = "";
			try{
				delete this.input.disabled;
			}catch(e){}
		},
		disable: function(){
			this.input.disabled = "disabled";
		}
	},"js.ui.TextField");
})();