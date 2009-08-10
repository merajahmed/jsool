js.data.Store = $extends(js.core.Object,{
	cons: function(config){
		this.collection = new js.util.ArrayList();
		this.cache = new js.util.HashMap();
	},
	collection: null,
	cache: null,
	query: function(fieldName, expression){},
	queryBy: function(filterFunction){},
	add: function(record){
		if(!record.instanceOf(js.data.Record)){
			throw new js.core.Exception('Invalid argument type: '+record, this);
		}
		
		this.collection.add(record);
	}
},'js.data.Store');