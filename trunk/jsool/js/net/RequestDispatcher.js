//REFERENCE http://code.google.com/p/mikhas/source/browse/trunk/mikhas/mikhas-script/net/Request.js?r=133
js.net.RequestDispatcher = Extends(js.util.Observable,{
	constructor: function(){
		js.util.Observable.apply(this, arguments);
		this.addEvent(['success','failure','start','stop']);
	},
	dispatcher: null,
	dispatch: function(request){
		if(!request){
			throw new js.core.Exception('Null request', this, arguments);
		}
		
		if(!request.instanceOf(js.net.Request)){
			throw new js.core.Exception('Invalid argument type: '+ request.type, this, arguments);
		}
		
		if(!this.dispatcher){
			try{
				this.prepareDispatcher();
			}catch(e){
				throw new js.core.Exception('Could not prepare the dispatcher object.', e, arguments);
			}
		}
		
		if(request.method == 'GET'){
			if(request.async)
				this.doAsyncGet(request);
			else
				this.doSyncGet(request);
		}else if(request.method == 'POST'){
			if(request.async)
				this.doAsyncPost(request);
			else
				this.doSyncPost(request);
		}
	},
	prepareDispatcher: function(){
		if(window.XMLHttpRequest){
			try{
				this.dispatcher = new XMLHttpRequest();
			}catch(e){
				throw new js.core.Exception(e.toString(),this, arguments);
			}
		}
	},
	doAsyncGet: function(request){
		
	}
},'js.net.RequestDispatcher');