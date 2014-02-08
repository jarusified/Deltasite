var w=$(window).width(),
	h=$(window).height(), 
	sc_r=w/30, 
	posX,
	posY,
	itr=0;

function defsty(elem,top,left,width,height,opacity){
	$(elem).css({
		'top':top,
		'left':left,
		'width':width,
		'height':height,
		'opacity':opacity
	});
}

function move(elem,x,y,itr){
	if(itr>1){
		itr--;
		move(elem,x,y,itr);
	}
	$(elem).animate({"left":x,"top":y },500);
	if(itr===0){
		return false;
	}
}

function start(){
	defsty('.mainlist',h/2-w/16,w/2-w/16,w/8,w/8,1);
}

function animation_one(){
	setTimeout(function(){
		defsty('.list1',h/2,w/2,w/15,w/15,1);
		move('.list1',w/2-sc_r,h/4-sc_r,1);
	},4);
	
	animation_two();
}

function animation_two(){
	setTimeout(function(){
		defsty('.list3',h/4-sc_r,w/2-sc_r,w/15,w/15,1);
		move('.list3',5*w/8-sc_r,5*h/8-sc_r,1);
	},500);
	animation_three();
}

function animation_three(){
	setTimeout(function(){
		defsty('.list4',5*h/8-sc_r/2,5*w/8-sc_r/2,w/15,w/15,1);
		move('.list4',3*w/8-sc_r,5*h/8-sc_r,1);
	},1000);
}

function animation_four(){
	setTimeout(function(){
		move('.mainlist',10,h/2-w/16,1);
		move('.list3',w-w/15,h/2-w/30,2);
		move('.list4',w-w/15,h/2-w/12-w/30,3);
		move('.list1',w-w/15,h/2+w/12-w/30,4);
		//$('.ch-item').remove();
	},4);
	setTimeout(function(){
		defsty('.background',h/5,w/3,2*h/3,w/3,0.5);
	},500);
	
}

function execute(){
	setTimeout(function(){
		start();
		animation_one();
	},4);
	setTimeout(function(){
		$('.mainlist').bind('click',function(){
			animation_four();
		});
	},1000);
	
}
execute();

function revert(){
	setTimeout(function(){
		defsty('.mainlist',h/2-w/16,w/2-w/16,w/8,w/8,1);
		defsty('.list1',h/2,w/2,w/15,w/15,1);
		move('.list1',w/2-sc_r,h/4-sc_r,1);
		defsty('.list3',h/4-sc_r,w/2-sc_r,w/15,w/15,1);
		move('.list3',5*w/8-sc_r,5*h/8-sc_r,1);
		defsty('.list4',5*h/8-sc_r/2,5*w/8-sc_r/2,w/15,w/15,1);
		move('.list4',3*w/8-sc_r,5*h/8-sc_r,1);
	},4);
}