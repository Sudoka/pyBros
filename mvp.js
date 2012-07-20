var labelType, useGradients, nativeTextSupport, animate;
var Log = {
		  elem: false,
		  write: function(text){
		    if (!this.elem) 
		      this.elem = document.getElementById('log');
		    this.elem.innerHTML = text;
		    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
		  }
		};


function init(){  
	var json={
			id:"1",
			name:"blackHole",
			data:{
				pokemonPower:"turnYoSwagOn"
			},
			children:[
			    {
				id:"2",
				name:"apple",
				data:{
					value: "200",
					inc: "2",
				},
				children:[
					{
						id:"21",
						name:"wiki",
						data:{
							link: "http://www.wikipedia.com"
						},
						children:[]
					},
					{
						id:"22",
						name:"bloomberg",
						data:{
							link: "http://www.bloomberg.com"
						},
						children:[]
					}	
				]
			    },
			{
				id:"3",
				name:"faecbook",
				data:{
					value: "300",
					inc: "3",
				},
				children:[
					{
						id:"31",
						name:"wiki",
						data:{
							link: "http://www.wikipedia.com"
						},
						children:[]
					}
				]
			},
			{
				id:"4",
				name:"microsoft",
				data:{
					value: "400",
					inc: "4",
				},
				children:[
					{
						id:"41",
						name:"wiki",
						data:{
							link: "http://www.wikipedia.com"
						},
						children:[]
					}
				]
			}]
	}
	
//	var json=[{
//			id:"1",
//			name:"blackHole",
//			data:{
//				pokemonPower:"turnYoSwagOn"
//			},
//			adjacencies:["4"]
//	},
//	{
//		id:"4",
//		name:"microsoft",
//		data:{
//			value: "400",
//			inc: "4",
//		},
//		adjacencies:["4","2"]
//	},
//			
//   	{
//		id:"2",
//		name:"apple",
//		data:{
//			value: "200",
//			inc: "2",
//		}
//   	}
//	]
	
	
	
//	init RGraph
	
    var rgraph = new $jit.RGraph({
        //Where to append the visualization
        injectInto: 'infovis',
        //Add navigation capabilities:
        //zooming by scrolling and panning.
        
        
        Navigation: {
          enable: true,
          panning: true,
          zooming: 40
        },
        //Set Node and Edge styles.
        Node: {
            color: '#ddeeff',
            alpha: .8
        },
        
        
        Edge: {
          color: '#C17878',
          lineWidth:1.5
        },
        
        
        onBeforeCompute: function(node){
            Log.write("centering " + node.name + "...");
            //Add the relation list in the right column.
            //This list is taken from the data property of each JSON node.
            $jit.id('inner-details').innerHTML = node.data.relation;
        },
        
        //Add the name of the node in the correponding label
        //and a click handler to move the graph.
        //This method is called once, on label creation.
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            domElement.onclick = function(){
                rgraph.onClick(node.id, {
                    onComplete: function() {
                        Log.write("done");
                    }
                });
            };
        },
        //Change some label dom properties.
        //This method is called each time a label is plotted.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';

            if (node._depth <= 1) {
                style.fontSize = "0.8em";
                style.color = "#ccc";
            
            } else if(node._depth == 2){
                style.fontSize = "0.7em";
                style.color = "#494949";
            
            } else {
                style.display = 'none';
            }

            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        }
    });
//	End creating the graph object
	
	
//	All the RGraph Animations Happen Here
//	Create an rgraph Object
    rgraph.loadJSON(json);
    //trigger small animation
    rgraph.graph.eachNode(function(n) {
      var pos = n.getPos();
      pos.setc(-200, -200);
    });
    rgraph.compute('end');
    rgraph.fx.animate({
      modes:['polar'],
      duration: 2000
    });
    //end
    //append information about the root relations in the right column
    $jit.id('inner-details').innerHTML = rgraph.graph.getNode(rgraph.root).data.relation;
//
    
	
	
	
}