 

		$(document).ready(function(){
			var $lefts = $(".header1");
			$(".page2").scroll(function(){
				var s = $(this).scrollLeft();
				$(".header1 p").css({
					'left': s+550
				});
				$(".header1 .hm").css({
					'left': s+1060
				});
			});
		
		var $header1 = $(".header1");
		var $header2 = $(".header2");
			$(".header1").mouseenter(function(){
				$(".header1").animate({
					"height": "88px"
				},300);
				$(".header2").animate({
					"height": "93px"
				},300);
			});
			
			$(".header1").mouseleave(function(){
				$(".header1").animate({
					"height": "82px"
				},300);
				$(".header2").animate({
					"height": "85px"
				},300);
			});	
		
		    $("#contactonclick").click(function (){
		            $('html, body').animate({
		                scrollTop: $(".page4").offset().top
		            }, 2000);
		            var element1=document.getElementsByTagName('li')[0];
		            var element2=document.getElementsByTagName('li')[2];
		            var	children0=element1.childNodes[0];
		            var	children1=element2.childNodes[0];
		            	children0.setAttribute('class','');
		            	children1.setAttribute('class','active');
		    });
		
		    $("#projectonclick").click(function (){
		            $('html, body').animate({
		                scrollTop: $(".page2").offset().top
		            }, 1000);
		            /*var stateObj= {foo:'bar'};
		            function url()
		            {
		            	history.pushState(stateObj,"page2","page2.html");
		            }
		            var link = document.getElementById('projectonclick');
		            link.addEventListener('projectonclick',url,false);*/
		            var element1=document.getElementsByTagName('li')[0];
		            var element2=document.getElementsByTagName('li')[1];
		            var	children0=element1.childNodes[0];
		            var	children1=element2.childNodes[0];
		            	children0.setAttribute('class','');
		            	children1.setAttribute('class','active');	
		    });
		     $("#blogonclick").click(function (){
		            $('html, body').animate({
		                scrollTop: $(".page3").offset().top
		            }, 2000);
		            var element1=document.getElementsByTagName('li')[0];
		            var element2=document.getElementsByTagName('li')[2];
		            var	children0=element1.childNodes[0];
		            var	children1=element2.childNodes[0];
		            	children0.setAttribute('class','');
		            	children1.setAttribute('class','active');
		    });

		     $("#membersonclick").click(function (){
		            $('html, body').animate({
		                scrollTop: $(".page5").offset().top
		            }, 2000);
		            var element1=document.getElementsByTagName('li')[0];
		            var element2=document.getElementsByTagName('li')[2];
		            var	children0=element1.childNodes[0];
		            var	children1=element2.childNodes[0];
		            	children0.setAttribute('class','');
		            	children1.setAttribute('class','active');
		    });

			    /*$("#pg2home").click(function (){
			            $('html, body').animate({
			                scrollTop:$(".page1").offset().top
			            }, 1000);
			            return false;
			    });*/
        	
				$(".main").onepage_scroll({
					sectionContainer:"section",
					easing: "ease",
					animationTime: 1000,
					updateURL: true,
					loop:true
					/*responsiveFallback:600*/
				});
			$("#page-wrap").wrapInner("<table cellspacing='100'><tr>");
			$(".post").wrap("<td ></td>");
			});