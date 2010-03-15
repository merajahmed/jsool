js.flux.SpringContraint = $extends(js.core.Object,{
	x:null,
	y:null,
	width:null,
	height:null,
	east:null,
	south:null,
	horizontalCenter:null,
	verticalCenter:null,
	baseline:null,
	horizontalHistory: null,
	verticalHistory: null,
	component: null,
	ALL_HORIZONTAL: ["WEST", "WIDTH", "EAST", "HORIZONTAL_CENTER"],
	ALL_VERTICAL: ["NORTH", "HEIGHT", "SOUTH", "VERTICAL_CENTER", "BASELINE"],
	cons: function(x, y, w, h){
		this.horizontalHistory = [];
		this.verticalHistory = [];
		
		if(x){
			this.component = x;
			if(x && y){
				this.setX(x);
				this.setY(y);
				
				if(w && h){
					this.setHeight(h);
					this.setWidth(w);
				}
			}
		}
	},
	pushConstraint: function(name, value, horizontal){
		var valid = true,
			history = horizontal ? this.horizontalHistory : this.verticalHistory;
		
		if(history.contains(name)){
			history.remove(name);
			valid = false;
		}else if(history.length == 2 && value != null){
			history.splice(0,1);
			valid = false;
		}
		
		if(value != null){
			history.push(name);
		}
		
		if(!valid){
			var all  = horizontal ? this.horizontalHistory : this.verticalHistory;
			
			for(var i=0,s;s=all[i++];){
				if(!history.contains(s)){
					this.setConstraint(s,null);
				}
			}
		}
	},
	sum: function(s1, s2){
		return (s1 && s2) ? js.flux.Spring.sum(s1,s2) : null;
	},
	difference: function(s1, s2){
		return (s1 && s2) ? js.flux.Spring.difference(s1,s2) : null;
	},
	scale: function(s1, f){
		return (s1) ? js.flux.Spring.scale(s1,f) : null;
	},
	getBaselineFromHeight: function(height){
		if(height < 0){
			return -this.component.getBaseline(c.getPreferredSize().width,-height);
		}
		return this.component.getBaseline(c.getPreferredSize().width,height);
	},
	defined: function(history, string1, string2){
		return history.contains(string1) && history.contains(string2); 
	},
	setX: function(springX){
		this.x = springX;
		pushConstraint("WEST",springX,true);
	},
	getX: function(){
		if(!this.x){
			if(this.defined(this.horizontalHistory,"EAST","WIDTH")){
				this.x = this.difference(this.east, this.width);
			}else if(this.defined(this.horizontalHistory,"HORIZONTAL_CENTER","WIDTH")){
				this.x = this.difference(this.horizontalCenter, this.scale(this.width, 0.5));
			}else if(this.defined(this.horizontalHistory,"HORIZONTAL_CENTER","EAST")){
				this.x = this.difference(this.scale(this.horizontalCenter,2),this.east);
			}
		}
		return this.x;
	},
	setY: function(springY){
		this.y = springY;
		pushConstraint("NORTH",springY,false);
	},
	getY: function(){
		if(!this.y){
			if(this.defined(this.verticalHistory,"SOUTH","HEIGHT")){
				this.y = this.difference(this.south, this.height);
			}else if(this.defined(this.verticalHistory,"VERTICAL_CENTER","HEIGHT")){
				this.y = this.difference(this.verticalCenter, this.scale(this.height, 0.5));
			}else if(this.defined(this.verticalHistory,"VERTICAL_CENTER","SOUTH")){
				this.y = this.difference(this.scale(this.verticalCenter,2),this.south);
			}
		}
		return this.y;
	},
	setWidth: function(spring){
		this.width = spring;
		this.pushConstraint("WIDTH", spring, true);
	},
	getWidth: function(){
		if(!this.width){
			if(this.horizontalHistory.contains("EAST")){
				this.width = this.difference(this.east, this.getX());
			}else if(this.horizontalHistory.contains("HORIZONTAL_CENTER")){
				this.width = this.scale(this.difference(this.horizontalCenter, this.getX()), 2);
			}
		}
		return this.width;
	},
	setHeight: function(spring){
		this.height = spring;
		this.pushConstraint("HEIGHT", spring, false);
	},
	getHeight: function(){
		if(!this.height){
			if(this.verticalHistory.contains("SOUTH")){
				this.height = this.difference(this.south, this.getY());
			}else if(this.verticalHistory.contains("VERTICAL_CENTER")){
				this.height = this.scale(this.difference(this.verticalCenter, this.getY()), 2);
			}
		}
		return this.height;
	},
	setEast: function(spring){
		this.east = spring;
		this.pushConstraint("EAST", spring, true);
	},
	getEast: function(){
		if(!this.east){
			this.east = this.sum(this.getX(), this.getWidth());
		}
		return this.east;
	},
	setSouth: function(spring){
		this.south = spring;
		this.pushConstraint("SOUTH", spring, false);
	},
	getSouth: function(){
		if(!this.south){
			this.south = this.sum(this.getY(), this.getHeight());
		}
		return this.south;
	},
	getHorizontalCenter: function() {
        if (this.horizontalCenter == null) { 
            this.horizontalCenter = this.sum(this.getX(), this.scale(this.getWidth(), 0.5)); 
        }
        return this.horizontalCenter; 
    },
    setHorizontalCenter: function(spring) {
        this.horizontalCenter = spring;
        this.pushConstraint("HORIZONTAL_CENTER", spring, true);
    },
    getVerticalCenter: function() {
        if (this.verticalCenter == null) { 
            this.verticalCenter = this.sum(this.getY(), this.scale(this.getHeight(), 0.5)); 
        }
        return this.verticalCenter;
    },
    setVerticalCenter: function(spring) {
        this.verticalCenter = spring;
        this.pushConstraint("VERTICAL_CENTER", spring, false);
    },
    setConstraint: function(name, spring){
    	switch(name){
    	case "WEST":
    		this.setX(spring);
    		break;
    	case "NORTH":
    		this.setY(spring);
    		break;
    	case "EAST":
    		this.setEast(spring);
    		break;
    	case "SOUTH":
    		this.setSouth(spring);
    		break;
    	case "HORIZONTAL_CENTER":
    		this.setHorizontalCenter(spring);
    		break;
    	case "WIDTH":
    		this.setWidth(spring);
    		break;
    	case "HEIGHT":
    		this.setHeight(spring);
    		break;
    	case "VERTICAL_CENTER":
    		this.setVerticalCenter(spring);
    	}
    },
    getConstraint: function(edgeName){
    	 return	(edgeName == "WEST") ? this.getX() :
    		 (edgeName == "NORTH") ? this.getY() :
             (edgeName == "EAST")  ? this.getEast() :
             (edgeName == "SOUTH") ? this.getSouth() :
             (edgeName == "WIDTH")  ? this.getWidth() :
             (edgeName == "HEIGHT") ? this.getHeight() :
             (edgeName == "HORIZONTAL_CENTER") ? this.getHorizontalCenter() :
             (edgeName == "VERTICAL_CENTER") ? this.getVerticalCenter() :
            	 null;
    },
    reset: function(){
    	var all = [this.x,this.y,this.width,this.height,this.east,this.south,this.horizontalHistory,this.verticalHistory];
    	
    	for(var i=0,s;s=all[i++];){
    		if(s)
    			s.setValue(Number.MIN_VALUE);
    	}
    }
},"js.flux.SpringContraint");