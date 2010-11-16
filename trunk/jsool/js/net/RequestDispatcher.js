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
	
	function normalizeParams(objParams){
		if(objParams && Object.isObject(objParams) && !Array.isArray(objParams)){
			var p = [];
			
			function add(param, value){
				p.push(encodeURIComponent(param) + "=" + encodeURIComponent(value));
			}
			
			jsool.iterate(objParams,function(attr,val){
				if(!Object.isObject(val)){
					add(attr,val);
				}else if(Array.isArray(val)){
					Array.iterate(val,function(i,v){
						add(attr,v);
					});
				}
			});
			
			return p.join('&');
		}
		
		return void(0);
	}
	
	function dispatch(c){
		if(!c)return;
		running = true;
		var state = -1,
		requestWatcher,
		start;
		start = jsool.time();
		
		
		if(c.data) c.data = normalizeParams(c.data);
		
		// Announce we are preparing a request
		RD.fireEvent("start");
		
		// Create a dispatcher
		var d = c.request = createDispatcher();
		
		// Apply user configuration
		jsool.applyIf(c,defaultConfig);
		
		// Prepare error handler
		
		this.onfailure = function(err,req){
			window.clearInterval(requestWatcher);
			if(c.callback)c.callback("failure",err,req);
			if(c.failure)c.failure(err,req);
		};
		
		var runningCheck = false;
		
		function checkState(){
			if(runningCheck)return;
			runningCheck = true;
			if(d.readyState != state){
				state = d.readyState;
				if(state == 4){
					
					if(d.status == 200 ){//OK
						if(c.callback)c.callback("success",req);
						if(c.success)c.callback(req);
						RD.fireEvent("success");
					}else{
						if(c.callback)c.callback("failure",req);
						if(c.success)c.failure(req);
						RD.fireEvent("failure");
					}
					
				}
			}
			
			var time = jsool.time();
			
			if(c.timeout > 0 && ((start - time) > c.timeout)){
				d.abort();
				RD.fireEvent("abort");
			}
			
			runningCheck = false;
		}
		
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

		requestWatcher = setInterval(checkState,500);
		
		try{
			d.send(c.method === "POST" || c.method === "PUT" ? c.data : null);
			
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