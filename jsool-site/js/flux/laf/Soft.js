jsool.namespace("js.flux.laf");

js.flux.laf.Soft = (function(){
	//COLORS
	var WHITE = "#FFF",
		BLUE_1 = "#75A3DC",
		BLUE_2 = "#5082C8",
		BLUE_3 = "#3267B8",
		GREEN_1 = "#99CC00",
		GRAY_1 = "#D0D0D0",
	//FONTS	
		TAHOMA = "Tahoma";

	var button = {
		body:{
			color:BLUE_1,
			pressed:BLUE_2
		},
		font:{
			face: TAHOMA,
			size: 12,
			color: WHITE
		},
		border:{
			color: BLUE_3,
			over: BLUE_3,
			focus: BLUE_3
		}
	},
	
	checkbox = {
		body:{
			color: WHITE,
			checked: GREEN_1
		},
		border:{
			color: BLUE_3
		}
	},
	
	container = {
		body:{
			color: WHITE
		},
		border:{
			color: GRAY_1
		}
	};
	
	
	
	return {
		button: button,
		checkbox: checkbox,
		container: container
	};
})();