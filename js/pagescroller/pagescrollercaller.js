$(document).ready(function(){
	console.log("called");
	$(".main").onepage_scroll({
		sectionContainer:"section",
		easing:"ease-in-out",
		animationTime:1000,
		pagination:true,
		updateURL:true,
		beforeMove: function(index){},
		afterMove:function(index){},
		loop:true,
		responsiveFallback:600
	});
});	