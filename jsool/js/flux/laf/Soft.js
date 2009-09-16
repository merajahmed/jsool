jsool.namespace("js.flux.laf");

js.flux.laf.Soft = (function(){
	var FLUX_PACK = js.flux;
	
	var DEGREE = (Math.PI / 180);
	
	var FONT_COLOR = 'rgb(0,0,0)';
	var FONT_FACE = 'Tahoma';
	var FONT_SIZE = 12;
	
	var FONT_FOCUS_COLOR = 'rgb(68,90,189)';
	
	var BODY_COLOR = 'rgb(223,234,248)';
	
	var BORDER_COLOR = 'rgb(223,234,248)';
	var BORDER_RADIUS = 5;
	var BORDER_WIDTH = 2;
	
	var BORDER_FOCUS_COLOR = 'rgb(197,205,226)';
	
	
	return{
		drawButton: function(ctx, x, y, w, h, text){
			ctx.saveState();
			
			ctx.setFillStyle(BODY_COLOR);
			ctx.setStrokeStyle(BORDER_COLOR);
			ctx.setLineWidth(BORDER_WIDTH);
			ctx.fillRoundRect(x,y,w,h,BORDER_RADIUS);
			ctx.strokeRoundRect(x,y,w,h,BORDER_RADIUS);
			
			var textW = ctx.measureText(text);
			
			var xCenter = Math.max(0, (w-textW)/2);
			var yCenter = Math.max(0, (h-FONT_SIZE)/2);
			
			ctx.setTextBaseline(js.canvas.TextBaseline.TOP);
			ctx.setFont(FONT_SIZE+'px '+FONT_FACE);
			ctx.setFillStyle(FONT_COLOR);
			ctx.write(text,x+xCenter,y+yCenter,w);
			
			ctx.restoreState();
		}
	};
})();