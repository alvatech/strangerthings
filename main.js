var xCords = [157, 192, 224, 256, 299, 334, 363, 407 /* h*/, 128, 168, 206, 238, 273, 323, 376, 423, 475, 79, 126, 167, 234, 286, 342, 395, 447, 506];
var yCords = [118, 120, 123, 129, 125, 125, 122, 122, 189, 193, 194, 200, 201, 197, 191, 186, 190, 291, 304, 306, 308, 301, 303,  300, 302, 313];

var canvas = document.getElementById('canvas'),
context = canvas.getContext('2d');

var backgroundImg = new Image();
backgroundImg.src = "background.gif";
backgroundImg.onload = function () {
    context.drawImage(backgroundImg, 0, 0);
}

var backgroundImgLight = new Image();
backgroundImgLight.src = "background2.jpg";