var Dot = function(){
	var dot = this;
	var img = document.createElement("img");
	//img.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/109794/cat_2.png';
	img.src = 'static/dot.png';
	img.style.position = 'absolute';
	img.style.height = '5px';
	img.style.width = '5px';
	img.onload = function(){
		dot.setTransform(
				[
				window.innerWidth/2,
				window.innerHeight/2
				],
				0);
		document.body.appendChild(img);
	}//end of onload

	dot.setTransform = function(position, rotation){
		img.style.left = position[0] - img.width / 2 + 'px';
		img.style.top = position[1] - img.height / 2 + 'px';

	};
}//end of cat var

var dots = {};
var output = $("#output");
var audio = [new Audio('static/a.wav'), new Audio('static/b.wav'), new Audio('static/c.wav'), new Audio('static/d.wav')];

Leap.loop(function(frame){
	frame.hands.forEach(function(hand, index){
		var dot = (dots[index] || (dots[index] = new Dot()) );
		var pos = hand.screenPosition();
		console.log(hand.screenPosition());
		dot.setTransform(hand.screenPosition(),hand.roll());
		
		if(Math.round(pos[0]) >= 400 && Math.round(pos[0]) < 560
				&& Math.round(pos[1]) >= 100 && Math.round(pos[1]) < 250){
			//$("#output").text("ONE");
			audio[0].play();
		}//end of if 
		else if(Math.round(pos[0]) >= 650 && Math.round(pos[0]) < 800
				&& Math.round(pos[1]) >= 350 && Math.round(pos[1]) < 500){
			//$("#output").text("TWO");
			audio[1].play();
		}//end of else 
		else if(Math.round(pos[0]) >= 500 && Math.round(pos[0]) < 800
				&& Math.round(pos[1]) >= 100 && Math.round(pos[1]) < 250){
			
			//$("#output").text("THREE");
			audio[2].play();
		}
		else if(Math.round(pos[0]) >= 450 && Math.round(pos[0]) < 800
				&& Math.round(pos[1]) >= 400 && Math.round(pos[1]) < 550){
			//$("#output").text("FOUR");
			audio[3].play();
		}
		else{
			//$("#output").text("no");
		}


	});//end of frame hands 
}).use('screenPosition', {scale: 0.25});

/**
 * (left, top) ... going to be top left then bottom right 
 *
 * four: bottom left
 * 	(650, 400)
 * 	(800, 550)
 *
 * three; .... the top right
 * 	(550,100)
 * 	(700,250)
 *
 * one: 
 * 	(400,100)
 * 	(550,250)
 *
 * two: 
 * 	(400 + 250 , 100 + 250) = (650,350)
 * 	(800,500)
 *
 */
 
