js.data.Field = $extends(js.core.Object,{
	cons: function(configuration){
		if(configuration){
			jsool.apply(this, configuration);
		}
	},
	dataType: null,
	sorter: null,
	convert: null,
	defaultValue: null,
	defaultFormat: null,
	allowBlank: true
},'js.data.Field');