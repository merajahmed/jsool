js.net.ScriptTagProxy = $extends(js.net.Proxy,{
	scriptTag: null,
	doRequest: function(request){
		if(request.instanceOf(js.net.Request)){
			try{
				this.dispatch(request);
			}catch(e){
				throw new js.core.Exception('Error while dispatching request'+request, this, arguments, e);
			}
		}else{
			throw new js.core.Exception('Invalid argument type: '+request, this, arguments);
		}
	},
	dispatch: function(request){
		this.scriptTag = new js.html.Element('script');
		this.scriptTag.setAttribute('src', request.url);
		var that = this;
		this.scriptTag.addListener('load',function(){
			that.processRequest(request);
			that.fireEvent({type:'complete'});
		});
		
		this.scriptTag.addListener('error',function(error){
			that.fireEvent({type:'failure',error:error});
			that.fireEvent({type:'error',error:error});
			that.fireEvent({type:'complete'});
		});
		
		this.fireEvent({type:'start'});
		js.html.Element.BODY.append(this.scriptTag);
	},
	processRequest: function(request){
		try{
			request.callback(this.scriptTag.getText());
		}catch(e){
			this.fireEvent({type:'error',error:e});
		}
		
		this.killProxy();
	},
	killProxy: function(){
		var dom = this.scriptTag.getDom();
		
		for(var p in dom){
			delete dom[p];
		}
		
		this.scriptTag.destroy();
	}
},'js.net.ScriptTagProxy');