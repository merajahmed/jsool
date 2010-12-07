jsool.namespace("js.ui");

js.ui.Dilaog = $extends(js.util.Observable,{
	cons: function(config){
		//Default configuration
		jsool.applyIf(config,{
			closeable:true,
			title:"Dialog"
		});
		
		this.body = js.dom.Helper.createDom({
			className:"dialog",
			children:[{
				tag:"h1",
				html: config.title
			},{
				className:"body"
			}]
		});
	}
},"js.ui.Dilaog");