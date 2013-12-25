
var Renderer = function(canvas){
	var canvas = $(canvas).get(0);
	var ctx    = canvas.getContext("2d");
	var ps;

	canvas.width = window.innerWidth;
	canvas.height= window.innerHeight;

	var gfx = arbor.Graphics(canvas);

	return {
		init:function(system){
			ps = system;
			ps.screen({size:{width : canvas.width, height:canvas.height}, padding:[36,80,30,26]});
			ps.screenPadding(80);

			this.initMouseHandling();	
		},

		redraw:function(){
			gfx.clear();
			var color = "white";
			ps.eachEdge(function(line, sp, tp){
				if(line.source.data.alpha * line.target.data.alpha == 0) return
				gfx.line(sp, tp, {stroke:"#b2b19d", width:2 });
			});

			ps.eachNode(function(node, pt){
				var w = Math.max(30, 100+gfx.textWidth(node.name));
				if(node.data.alpha == 0) return;

				if(node.data.shape == "dot"){	
					gfx.oval(pt.x-w/2, pt.y-w/2, w, w, {fill:node.data.color});	
					gfx.text(node.name, pt.x, pt.y+7, {color:color, align:"center", font:"Arial", size:22});
				}else{
					gfx.rect(pt.x - w/2, pt.y - w/8, w, 20, 4,{fill:node.data.color});
					gfx.text(node.name, pt.x, pt.y+7, {color:color, align:"center", font:"Arial", size:22});
				}
			});

		},

		initMouseHandling:function(){
			var dragged = null;

			var handler = {
				moved:function(e){
					var pos = $(canvas).offset();
					_mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top);

					var nearest = ps.nearest(_mouseP).distance > 50 ? ps.nearest(_mouseP) : null;
					if(!nearest.node) return ;
						//console.log(nearest.node.name);
						
						var parent = ps.getEdgesFrom(nearest.node.name)[0].source;
						var children = $.map(ps.getEdgesFrom(nearest.node.name), function(edge){
						return edge.target;

					});

					ps.eachNode(function(node){
						if(node.data.shape == "dot") return;

						var nowvis = ($.inArray(node, children)>=0);
						var newAlpha = nowvis ? 1 : 0;
						var dt = nowvis ? .5: .5;

						ps.tweenNo3de(node, dt, {alpha:newAlpha});


						if (newAlpha==1){
	            			node.p.x = parent.p.x + .05*Math.random() - .025;
	            			node.p.y = parent.p.y + .05*Math.random() - .025;
	          				node.tempMass = .001;
	          			}					
					});


				},

				clicked:function(e){
					var pos = $(canvas).offset();
					_mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top);

					var node = ps.nearest(_mouseP).distance < 50 ? ps.nearest(_mouseP) : null;

					dragged = ps.nearest(_mouseP);

					if(dragged && dragged.node !== null){
						dragged.node.fixed = true;
					}

					
					if(node.node && node.node.data.link != undefined){
						window.location = node.node.data.link;
					}

					$(canvas).unbind('mousemove', handler.moved);

					$(canvas).bind('mousemove', handler.dragged);
					$(canvas).bind('mouseup', handler.dropped);
				},

				dragged:function(e){
					var pos = $(canvas).offset();
					var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top);				
					
					if(dragged && dragged.node !== null){
						var p = ps.fromScreen(s);
						dragged.node.p = p;
					}					

					return false;
				},

				dropped: function(e){
					if(dragged==null || dragged.node === undefined) return;
					if(dragged.node !== null) dragged.node.fixed = false;
					dragged.node.tempMass = 1000;
					dragged = null;
					$(canvas).unbind('mousemove', handler.dragged);
					$(canvas).unbind('mouseup', handler.dropped);
					$(canvas).bind('mousemove', handler.moved);

					_mouseP = null;
					return false;
				}
			};

			$(canvas).mousedown(handler.clicked);
			$(canvas).bind('mousemove', handler.moved);
		
		}
	};
};




$(document).ready(function(){
	var sys = arbor.ParticleSystem({stiffness:900, repulsion:2000, dt: 0.015});
		sys.parameters({gravity:true});
		sys.renderer = Renderer('#canvas');

	var ui = {
		nodes:{
			"delta":{
				color:"red", shape:"dot", alpha:1
			},

			about:{
				color:"green",
				shape:"dot",
				alpha:1
			},

			blog:{
				color:"cyan",
				shape:"dot",
				alpha:1

			},

			projects:{
				color: "brown",
				shape:"dot",
				alpha:1
			},

			contact:{
				color:"gold",
				shape:"dot",
				alpha:1
			},

			
			alink:{color:"black", shape:"rect", alpha:1, link:"http://google.com/"},
			blink:{color:"black", shape:"rect", alpha:1},
			plink:{color:"black", shape:"rect", alpha:1},
			clink:{color:"black", shape:"rect", alpha:1}
		},

		edges:{
			"delta":{
				about:{},
				blog:{},
				projects:{},
				contact:{},
			},
			about:{
				about:{},
				blog:{},
				projects:{},
				contact:{},
			    alink:{}
			},
			blog:{
				about:{},
				blog:{},
				projects:{},
				contact:{},
				blink:{}
			},
			projects:{
				about:{},
				blog:{},
				projects:{},
				contact:{},
				plink:{}
			},
			contact:{
				about:{},
				blog:{},
				projects:{},
				contact:{},
				"clink":{}
			}
		}
	};

	sys.graft(ui);
}); 
