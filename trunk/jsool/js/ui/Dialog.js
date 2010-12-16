jsool.namespace("js.ui");
(function(){
	var EM = js.core.EventManager,
		DH = js.dom.Helper,
		target = window.document,
		offset,
		dialog,
		m = {
			x:0,y:0,down:false	
		};
	
	function moveHandler(ev){
		m.x = ev.x;
		m.y = ev.y;
		if(dialog && offset && m.down){
			dialog.setPosition(ev.x - offset.x, ev.y - offset.y);
		}
	}
	
	function upHandler(ev){
		offset = null;
		dialog = null;
		m.down=false;
		m.x = ev.x;
		m.y = ev.y;
		EM.un(target,"mousemove",moveHandler);
		EM.un(target,"mouseup",upHandler);
	}
	
	js.ui.Dialog = $extends(js.util.Observable,{
		cons: function(config){
			var dom;
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
			
			dom = DH.createDom({
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
			
			this.style = dom.style;
			EM.on(dom,'mousedown',function(ev){
				
				if(ev.source.tagName && ev.source.tagName=="H1"){					
					m.down=true;
					m.x = ev.x;
					m.y = ev.y;
					dialog = this;
					var b = this.body.getPosition();
					offset = {
						x: ev.x-b.x,
						y: ev.y-b.y
					};
					
					EM.on(target,"mousemove",moveHandler);
					EM.on(target,"mouseup",upHandler);
				}
				
			},this);
			
			this.body = jsool.get(dom);
		},
		show: function(){
			this.style.display='block';
		},
		hide: function(){
			this.style.display='none';
		},
		setPosition: function(x, y){
			this.style.top = y + 'px';
			this.style.left = x + 'px';
		},
		setSize: function(w,h){
			this.style.width = w + 'px';
			this.style.height = h + 'px';
		},
		isVisible: function(){
			return this.style.display != 'block';
		}
	},"js.ui.Dilaog");
})();