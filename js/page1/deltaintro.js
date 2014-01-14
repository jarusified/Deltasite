$(document).ready(function(){

	var gun=$('#gun').splitText({
		'type':'sentences',
		'animation':'machinegun'
	});
	var splitOnlyWords = $("#splitOnlyWords").splitText({
		'type':'words',
		'justSplit':true
	});
	
	var splitOnlyLetters = $("#splitOnlyLetters").splitText({
		'type':'letters',
		'justSplit':true
	});
	
	var splitOnlyLines = $("#splitOnlyLines").splitText({
		'type':'lines',
		'justSplit':true
	});
	gun.animate();

});