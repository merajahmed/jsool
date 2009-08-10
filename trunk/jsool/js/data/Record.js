js.data.Record = $extends(js.core.Object,{
	cons: function(data, id){
		this.id = id;
		this.data = data;
	},
	modified: false,
	fields: null
},'js.data.Record');

js.data.Record.MODEL_ID = 0;

js.data.Record.create = function(config){
	var newRec = $extends(js.data.Record,config,'js.data.Record$'+(js.data.Record.MODEL_ID++));
};