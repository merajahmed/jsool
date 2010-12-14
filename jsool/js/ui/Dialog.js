jsool.namespace("js.ui");
(function(){
	var EM = js.core.EventManager,
		DH = js.dom.Helper,
		offset,
		dialog,
		m = {
			x:0,y:0,down:false	
		};
	
	EM.on(window,"mousemove",function(ev){
		m.x = ev.x;
		m.y = ev.y;
		if(dialog && offset && m.down){
			dialog.setPosition(ev.x - offset.x, ev.y - offset.y);
		}
	});
	
	EM.on(window,'mouseup',function(ev){		
		offset = null;
		dialog = null;
		m.down=false;
		m.x = ev.x;
		m.y = ev.y;
	});
	
	js.ui.Dialog = $extends(js.util.Observable,{
		cons: function(config){
			//Default configuration
			config = config || {} ;
			
			jsool.applyIf(config,{
				closeable:true,
				title:"Dialog",
				width: 'auto',
				height: 'auto',
				x:"0px",
				y:"0px",
				show: false
			});
			
			this.body = DH.createDom({
				className:"js-dialog",
				children:[{
					tag:"h1",
					html: config.title,
					className:'no-select'
				},{
					className:"body",
					html: 'Mensagem'
				}],
				style:{
					width:config.width,
					height:config.height,
					top:config.y,
					left:config.x,
					display:config.show?'none':'block'
				},
				parent: js.dom.BODY
			});
			
			this.style = this.body.style;
			EM.on(this.body,'mousedown',function(ev){
				if(ev.source.tagName && ev.source.tagName=="H1"){
					m.down=true;
					m.x = ev.x;
					m.y = ev.y;
					dialog = this;
					var b = jsool.get(this.body).getBox();
					offset = {
						x: ev.x-b.x,
						y: ev.y-b.y
					};
				}
			},this);
		},
		show: function(){
			this.style.display='block';
		},
		hide: function(){
			this.style.display='none';
		},
		setPosition: function(x, y){
			if(jsool.isNumber(y))
			this.style.top = y + 'px';
			if(jsool.isNumber(x))
			this.style.left = x + 'px';
		},
		setSize: function(w,h){
			if(jsool.isNumber(w))
			this.style.width = w + 'px';
			if(jsool.isNumber(h))
			this.style.height = h + 'px';
		}
	},"js.ui.Dilaog");
})();