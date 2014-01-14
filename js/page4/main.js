(function($){
var Renderer = function(canvas){
	var canvas = $(canvas).get(0);
	var ctx    = canvas.getContext("2d");
	var ps;				
	var nearest=null;	


	canvas.width = window.innerWidth;
	canvas.height= window.innerHeight;

	var gfx = arbor.Graphics(canvas);

	var that={
		init:function(system){
			ps = system;
			ps.screen({size:{width : canvas.width, height:canvas.height}, padding:[36,80,30,26]});
			ps.screenPadding(80);
			that.resize();						
			that.initMouseHandling();	

		},
		 resize:function(){
        canvas.width = $(window).width()
        canvas.height = .75* $(window).height()
        ps.screen({size:{width:canvas.width, height:canvas.height}})
        that.redraw()
      },

		redraw:function(){
			//console.log('rfv');
			gfx.clear();
			var color = "white";
			ps.eachEdge(function(line, sp, tp){
				if(line.source.data.alpha * line.target.data.alpha == 0) return
				gfx.line(sp, tp, {stroke:"#b2b19d", width:2 });
				//console.log(line);
			});

			ps.eachNode(function(node, pt){
				var w = Math.max(30, 100+gfx.textWidth(node.name));
				if(node.data.alpha == 0) return;

				if(node.data.shape == "dot"){	
					gfx.oval(pt.x-w/2, pt.y-w/2, w, w, {fill:node.data.color, alpha:node.data.alpha});	
					gfx.text(node.name, pt.x, pt.y+7, {color:color, align:"center", font:"Arial", size:22});
				}else{
					gfx.rect(pt.x - w/2, pt.y - w/8, w, 20, 4,{fill:node.data.color, alpha:node.data.alpha});
					gfx.text(node.name, pt.x, pt.y+7, {color:color, align:"center", font:"Arial", size:22});
				}
			});

		},

		switchsection:function(newsec){
			var parent = ps.getEdgesFrom(nearest.node.name)[0].source;
			var children = $.map(ps.getEdgesFrom(nearest.node.name), function(edge){
			return edge.target;
				});
			
			ps.eachNode(function(node){
				if(node.data.shape=='dot') return 
				var nowVisible=($.inArray(node, children)>=0);
				var newAlpha= (nowVisible) ? 1 :0;
				var dt=(nowVisible) ? 0.5 :0.5;
				ps.tweenNode(node,dt,{alpha:newAlpha});

				if(newAlpha==1){
					node.p.x= parent.p.x +.05*Math.random() -0.025;
					node.p.y= parent.p.y +0.5*Math.random() -0.025;
					node.tempMass=.001;
 				}
			});

		},	

		initMouseHandling:function(){
			var dragged = null;
			    nearest = null;
			    selected=null;
			var handler = {
				moved:function(e){
					 section = null;
					var pos = $(canvas).offset();
					_mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top);
					nearest	 = ps.nearest(_mouseP);
					if(!nearest.node) return ;
					
					if(nearest.node.name!='hoverme'){
						console.log(nearest);
						selected=(nearest.distance<10)? nearest :null;		
						}	
					else if(nearest.node.name=='hoverme'){
						if(nearest.node.name!=section){
								section=nearest.node.name;
								that.switchsection(section);
						}	
					}
				},

				clicked:function(e){
					var pos = $(canvas).offset();
					_mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top);
					nearest=dragged=ps.nearest(_mouseP);

					if(nearest && selected && nearest.node==selected.node){
						var link=selected.node.data.link;
						return false;
					}

					if(dragged && dragged.node !== null){
						dragged.node.fixed=true;
					}

					$(canvas).unbind('mousemove', handler.moved);
					$(canvas).bind('mousemove', handler.dragged);
					$(canvas).bind('mouseup', handler.dropped);
				},

				dragged:function(e){
					var old_nearest=nearest&& nearest.node._id;
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
	return that;
}




$(document).ready(function(){
	var ui = {
		nodes:{
			hoverme:{
				color:"red", shape:"dot", alpha:1
			},

			'1':{
				color:"brown",
				
				alpha:0,
				
			},

			'2':{
				color:"brown",
			
				alpha:0,
				
			},

			'3':{
				color:"brown",
		
				alpha:0,
				
			},

			'4':{
				color:"brown",

				alpha:0,
				
			},

			'5':{
				color:"brown",
				
				alpha:0,
				
			},

			'6':{
				color:"brown",
				
				alpha:0,
				
			},

			'7':{
				color:"brown",
				
				alpha:0,
				
			},

			'8':{
				color:"brown",
				
				alpha:0,
				
			},

			'9':{
				color:"brown",
				alpha:0,
				
			},

			'10':{
				color:"brown",
				alpha:0,
			}
		},

		edges:{
			hoverme:{
				'1':{},
				'2':{},
				'3':{},
				'4':{},
				'5':{},
				'6':{},
				'7':{},
				'8':{},
				'9':{},
				'10':{}
			}
		}
	};
	var sys = arbor.ParticleSystem({stiffness:900, repulsion:2000, dt: 0.015});
		sys.parameters({gravity:true});
		sys.renderer = Renderer('#canvas');
		sys.graft(ui);
});
})(this.jQuery);