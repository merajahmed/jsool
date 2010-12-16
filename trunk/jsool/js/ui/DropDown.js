jsool.namespace("js.ui");

(function(){
	var EM = js.core.EventManager,
		DH = js.dom.Helper;
	
	
	js.ui.DropDown = $extends(js.util.Observable,{
		cons: function(config){
			//Default configuration
			this.config = config || {} ;
			this.items = config.items || [];
			
			if(config.render)this.render(config.render);
		},
		events:['click'],
		render: function(el){
			this.wrapper = el = jsool.get(el);
			var items = [],c =this.config,html;
			
			Array.iterate(this.items,function(i,el){
				items.push({
					tag:'li',
					html: c.label ? el[c.label] : el,
					index: i
				});
			});
			
			html = DH.createHTML({
				className:'js-dd',
				children:[{
					tag:'input',
					type:'text'
				},{
					tag:'input',
					type:'button',
					value:'V'
				},{
					tag:'ul',
					className:'js-dd no-select',
					children: items
				}]
			});
			
			el.append(html);
			
			el.on('click',this.fireEvent,this);
		},
		onclick: function(ev){
			if(ev.button == 1){//right click
				var t = ev.source.tagName;
				if(t == 'LI'){//selecting element
					this.selected = this.items[ev.source.getAttribute('index')];
				}else if(t == 'INPUT'){
					console.info(ev.source.type);
				}
			}
		}
	},"js.ui.DropDown");
})();