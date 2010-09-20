jsool.namespace("js.net");

/*
 * Para consulta
 * 
 * http://code.google.com/p/jqueryjs/source/browse/trunk/jquery/src/ajax.js
 * 
 * */

(function creates_RequestDispatcher(){
	js.net.RequestDispatcher = new js.util.Observable();
	
	var RD = js.net.RequestDispatcher,
		running = false;
	
	RD.addEvent("start","send","abort","failure","success");
	
	var defaultConfig = {
		Accept: "*/*",
		method: "GET",
		contentType: "application/x-www-form-urlencoded",
		async: true,
		cache:true,
		timeout: 0,
		url: window.location.href
	};
	
	//Prepares the XMLHttpRequest object
	function createDispatcher(){
		return window.ActiveXObject ?
			new ActiveXObject("Microsoft.XMLHTTP") :
			new XMLHttpRequest();
	}
	
	function readyStateChange(){
		
	}
	
	function dispatch(c){
		if(!c)return;
		running = true;
		
		// Announce we are preparing a request
		RD.fireEvent("start");
		
		// Create a dispatcher
		var d = c.request = createDispatcher();
		
		// Apply user configuration
		jsool.applyIf(c,defaultConfig);
		
		// Prepare error handler
		
		this.onfailure = function(err,req){
			if(c.callback)c.callback("failure",err,req);
			if(c.failure)c.failure("failure",err,req);
		};
		try{
			
			// Opening Socket
			if(c.username){
				d.open(c.method,c.url,c.async,c.username,c.password);
			}else{
				d.open(c.method,c.url,c.async);
			}
			
			d.setRequestHeader("Content-Type", c.contentType);
			d.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			d.setRequestHeader("Accept", c.accept);
			
		}catch(e){
			c.error = e;
			RD.fireEvent("failure",c);
		}
		
		RD.fireEvent("send");

		try{
			d.send(c.method === "POST" || c.method === "PUT" ? c.load : null);
			
			if(!c.async){
				if(c.callback)c.callback("success",c);
			}
		}catch(e){
			c.error = e;
			RD.fireEvent("failure",c);
		}
	}
	
	jsool.apply(RD,{
		type: "js.net.RequestDispatcher",
		dispatch: dispatch
	});
})();