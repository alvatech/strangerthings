var xCords = [110 ,134 ,157 ,179 ,209 ,234 ,254 ,285 ,90 ,118 ,144 ,167 ,191 ,226 ,263 ,296 ,333 ,55 ,88 ,117 ,164 ,200 ,239 ,277 ,313 ,354];
var yCords = [83 ,84 ,86 ,90 ,88 ,88 ,85 ,85 ,132 ,135 ,136 ,140 ,141 ,138 ,134 ,130 ,133 ,204 ,213 ,214 ,216 ,211 ,212 ,210 ,211 ,219];

var canvas = document.getElementById('canvas'),
context = canvas.getContext('2d');

var backgroundImg = new Image();
backgroundImg.src = "images/background.jpg";
backgroundImg.crossOrigin = "Anonymous";
backgroundImg.onload = function () {
    context.drawImage(backgroundImg, 0, 0);
}

var backgroundImgLight = new Image();
backgroundImgLight.src = "images/background2.jpg";
backgroundImgLight.crossOrigin = "Anonymous";

var nextCharIndex = 0;
var userText = '';
var pendingFrames = 0;
var data_url;

// Intialize GIF encoder
var encoder = new GIFEncoder();
encoder.setRepeat(0);//0  -> loop forever
encoder.setDelay(500); //go to next frame every n milliseconds



/* Handles the start button click*/
function onStartClick(){
	document.getElementById("downloadContainer").style.display  = "none";
    userText = document.getElementById('inputlg').value;
    if (userText != null){
         if (userText == ''){
             userText = "RUN";
         }

         userText = userText.replace(/[^a-zA-Z]+/g, '');
         userText = userText.toLowerCase();
         pendingFrames = userText.length * 2;
         nextCharIndex = 0;

         // start the rendering
         if (pendingFrames > 0){
             document.getElementById("startbutton").disabled = true;

             // start encoding and animation
             encoder.start();
             animate();
         }
    }
}

function animate(){
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (pendingFrames % 2 == 0){
        context.drawImage(backgroundImgLight, 0, 0);

        var letterIndex = userText.charCodeAt(nextCharIndex) - 97 /* ASCII value of letter A */; 
        drawLight(xCords[letterIndex], yCords[letterIndex], 21, context);
        nextCharIndex ++;
    }else{
        context.drawImage(backgroundImg, 0, 0); 
    }

    pendingFrames--;

    encoder.addFrame(context);
    
    if (pendingFrames > 0){
        // request new frame
        setTimeout(function() {
            animate();
        }, 400);
    }else{
         document.getElementById("spinnerDiv").style.visibility = 'visible'; 
         encoder.finish();
         var binary_gif = encoder.stream().getData();
         data_url = 'data:image/gif;base64,'+encode64(binary_gif); 
         document.getElementById("startbutton").disabled = false;
		 downloadGIF();
    }
}

function drawLight(x, y, radius, ctx) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    radialGradient.addColorStop(0.0, '#BB9');
    radialGradient.addColorStop(0.2 , '#AA8');
    radialGradient.addColorStop(0.7 , '#330');
    radialGradient.addColorStop(0.90, '#110');
    radialGradient.addColorStop(1, '#000');
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
} 

function downloadGIF(){
	document.getElementById("downloadContainer").style.display  = "block";
	Downloadify.create('downloadbutton',{
					filename: userText + ".gif",
					data: data_url,
					dataType : "base64",
					swf: 'media/downloadify.swf',
					downloadImage: 'images/download.png',
					width: 150,
					height: 34,
					transparent: true,
					append: false
				});
}