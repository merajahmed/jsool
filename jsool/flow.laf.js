js.flow.laf = {};
js.flow.laf.Soft = {
	WINDOW_FRAME_BODY_COLOR : 'rgba(153,204,255,0.4)',
	WINDOW_FRAME_BORDER_COLOR : 'rgb(119, 170, 221)',
	WINDOW_BORDER_WIDTH: 1,
	WINDOW_BORDER_RADIUS: 7,
	window: function(canvas, x, y, width, height) {
		var deg = (Math.PI / 180);
		var border = this.WINDOW_BORDER_RADIUS;
		
		canvas.saveState();
		canvas.setFillStyle(this.WINDOW_FRAME_BODY_COLOR);
		canvas.setStrokeStyle(this.WINDOW_FRAME_BORDER_COLOR);
		canvas.setLineWidth(this.WINDOW_BORDER_WIDTH);
		
		canvas.setComposition(js.canvas.CompositeOperation.DEFAULT);
		
		canvas.beginPath();
		canvas.arc(x+border,y+border,border, Math.PI, 3*Math.PI/2, false);
		canvas.lineTo(width-border + x, y);
		canvas.arc(x + width - border, y+border, border, deg*270, deg*360, false);
		canvas.lineTo(x+width, y+height - border);
		canvas.arc(x+width - border, y+height - border, border, deg*360, deg*90, false);
		canvas.lineTo(x+border, y+height);
		canvas.arc(x+border,y+height - border,border, deg*90, deg*180, false);
		canvas.lineTo(x, y+border);
		canvas.fill();
		canvas.stroke();
		
		canvas.restoreState();
	},
	LABEL_FONT: 'Tahoma',
	LABEL_FONT_SIZE: 12,
	LABEL_FONT_COLOR: 'black',
	LABEL_SHADOW_COLOR: 'white',
	label: function(canvas, x , y, text, fontFace, fontSize, fontColor){
		canvas.saveState();
		
		var color = fontColor || this.LABEL_FONT_COLOR;
		var font = fontFace || this.LABEL_FONT;
		var size = fontSize || this.LABEL_FONT_SIZE;
		
		canvas.setComposition(js.canvas.CompositeOperation.DEFAULT);
		canvas.setFont(size+"px "+font);
		canvas.setShadowColor(this.LABEL_SHADOW_COLOR);
		canvas.setShadowOffsetX(0);
		canvas.setShadowOffsetY(0);
		canvas.setShadowBlur(20);
		canvas.setFillStyle(color);
		
		canvas.write(text, x, y+size);
		canvas.restoreState();
	},
	CONTAINER_BODY_COLOR: 'white',
	CONTAINER_BORDER_COLOR: 'rgb(119, 170, 221)',
	container: function(canvas, x, y, width, height){
		canvas.saveState();
		
		canvas.setComposition(js.canvas.CompositeOperation.DEFAULT);
		canvas.setFillStyle(this.CONTAINER_BODY_COLOR);
		canvas.setStrokeStyle(this.CONTAINER_BORDER_COLOR);
		
		canvas.fillRect(x,y,width, height);
		canvas.strokeRect(x,y,width, height);
		
		canvas.restoreState();
	},
	CHECKBOX_WIDTH: 13,
	CHECKBOX_HEIGHT: 13,
	CHECKBOX_BORDER_COLOR: 'rgb(119, 170, 221)',
	checkBox: function(canvas, x, y, width, height){
		canvas.saveState();
		
		canvas.setComposition(js.canvas.CompositeOperation.DEFAULT);
		
		canvas.setStrokeStyle(this.CHECKBOX_BORDER_COLOR);
		canvas.setFillStyle(this.CONTAINER_BODY_COLOR);
		
		canvas.fillRect(x,y,this.CHECKBOX_WIDTH, this.CHECKBOX_HEIGHT);
		canvas.strokeRect(x,y,this.CHECKBOX_WIDTH, this.CHECKBOX_HEIGHT);
		
		canvas.restoreState();
	},
	CHECKBOX_CHECK_COLOR: '#99CC00',
	checkBoxCheck: function(canvas, x, y, width, height){
		canvas.saveState();
		
		canvas.setComposition(js.canvas.CompositeOperation.DEFAULT);
		
		canvas.setFillStyle(this.CHECKBOX_CHECK_COLOR);
		
		canvas.fillRect(x+2,y+2,this.CHECKBOX_WIDTH-4, this.CHECKBOX_HEIGHT-4);
		
		canvas.restoreState();
	},
	RADIO_RADIO: 6,
	RADIO_BORDER_COLOR: 'rgb(119, 170, 221)',
	radio: function(canvas, x, y, width, height){
		canvas.saveState();
		
		canvas.setComposition(js.canvas.CompositeOperation.DEFAULT);
		
		canvas.setStrokeStyle(this.CHECKBOX_BORDER_COLOR);
		canvas.setFillStyle(this.CONTAINER_BODY_COLOR);
		
		canvas.beginPath();
		
		canvas.arc(x + this.RADIO_RADIO, y + this.RADIO_RADIO, this.RADIO_RADIO, 0, Math.PI * 2, false);
		
		canvas.fill();
		canvas.stroke();
		
		canvas.restoreState();
	},
	RADIO_CHECK_COLOR: '#99CC00',
	radioCheck: function(canvas, x, y, width, height){
		canvas.saveState();
		
		canvas.setComposition(js.canvas.CompositeOperation.DEFAULT);
		
		canvas.setFillStyle(this.RADIO_CHECK_COLOR);
		
		canvas.beginPath();		
		canvas.arc(x + this.RADIO_RADIO, y + this.RADIO_RADIO, this.RADIO_RADIO-2, 0, Math.PI * 2, false);		
		canvas.fill();
		
		canvas.restoreState();
	},
	TEXT_FIELD_BORDER_COLOR: 'rgb(119, 170, 221)',
	TEXT_FIELD_BACKGROUND_COLOR: '#FFFFFF',
	textField: function(canvas, x, y, width, height){
		canvas.saveState();
		
		canvas.setFillStyle(this.TEXT_FIELD_BACKGROUND_COLOR);
		canvas.setStrokeStyle(this.TEXT_FIELD_BORDER_COLOR);
		
		canvas.fillRect(x, y, width, height);
		canvas.strokeRect(x, y, width, height);
		
		canvas.restoreState();
	},
	textLine: function(canvas, text, x, y){
		canvas.saveState();
		
		var color = this.LABEL_FONT_COLOR;
		var font = this.LABEL_FONT;
		var size = this.LABEL_FONT_SIZE;
		
		canvas.setComposition(js.canvas.CompositeOperation.DEFAULT);
		canvas.setFont(size+"px "+font);
		canvas.setFillStyle(color);
		
		canvas.write(text, x, y);
		
		canvas.restoreState();
	},
	TEXT_CURSOR_COLOR: 'rgb(153,204,0)',
	textCursor: function(canvas, x, y, height){
		canvas.saveState();
		
		canvas.setComposition(js.canvas.CompositeOperation.DEFAULT);
		canvas.setStrokeStyle(this.TEXT_CURSOR_COLOR);
		canvas.setFillStyle(this.TEXT_CURSOR_COLOR);
		canvas.setLineWidth(1);
		
		canvas.beginPath();
		canvas.moveTo(x, y);
		canvas.lineTo(x, y+height);
		canvas.stroke();
		
		canvas.restoreState();
	},
	measureText: function(canvas, text){
		canvas.saveState();
		var font = this.LABEL_FONT;
		var size = this.LABEL_FONT_SIZE;
		canvas.setFont(size+"px "+font);
		var res = canvas.measureText(text);
		canvas.restoreState();
		return res;
	}
};