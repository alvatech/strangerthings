var xCords = [157, 192, 224, 256, 299, 334, 363, 407 /* h*/, 128, 168, 206, 238, 273, 323, 376, 423, 475, 79, 126, 167, 234, 286, 342, 395, 447, 506];
var yCords = [118, 120, 123, 129, 125, 125, 122, 122, 189, 193, 194, 200, 201, 197, 191, 186, 190, 291, 304, 306, 308, 301, 303,  300, 302, 313];

var canvas = document.getElementById('canvas'),
context = canvas.getContext('2d');

var backgroundImg = new Image();
backgroundImg.src = "background.gif";
backgroundImg.crossOrigin = "Anonymous";
backgroundImg.onload = function () {
    context.drawImage(backgroundImg, 0, 0);
}

var backgroundImgLight = new Image();
backgroundImgLight.src = "background2.jpg";
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
        drawLight(xCords[letterIndex], yCords[letterIndex], 30, context);
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
         encoder.finish();
         var binary_gif = encoder.stream().getData();
         data_url = 'data:image/gif;base64,'+encode64(binary_gif); 
         document.getElementById("startbutton").disabled = false;
         document.getElementById("spinnerDiv").style.visibility = 'visible'; 
         window.location.href= data_url;
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
