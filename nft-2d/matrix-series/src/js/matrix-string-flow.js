var canvasElement;
var ctx; // canvas context
var width, height;

var FrameRateInMilliseconds = 99;

var yPositions;

var FontSize = 10;
var factor = 12;
var secretSymbols = "";

function initialize(canvas_element, frame_rate_in_milliseconds, pont_size_of_font, secret_symbols = "") {
    canvasElement = canvas_element;
    width = canvasElement.clientWidth;
    height = canvasElement.clientHeight;
    ctx = canvasElement.getContext("2d");

    var devicePixelRatio = window.devicePixelRatio || 1,
        backingStoreRatio = ctx.webkitBackingStorePixelRatio || 1,
        ratio = devicePixelRatio / backingStoreRatio;
    console.log("devicePixelRatio: " + devicePixelRatio);
    console.log("backingStoreRatio: " + backingStoreRatio);
    console.log("ratio: " + ratio);
    canvasElement.width = width * ratio;
    canvasElement.height = height * ratio;
    canvasElement.style.width = width + "px";
    canvasElement.style.height = height + "px";
    
    //然后将画布缩放，将图像放大ratio倍画到画布上
    ctx.scale(ratio, ratio);

    FrameRateInMilliseconds = frame_rate_in_milliseconds;

    FontSize = pont_size_of_font;

    yPositions = Array(512).join(0).split('');
    if(secret_symbols && secret_symbols.length > 0){ //if(Array.isArray(secret_symbols) && secret_symbols.length > 0){
        secretSymbols = secret_symbols;
        factor = secret_symbols.length % factor;
    }
    else{
        secretSymbols = "";
    }
}

function getRandomInt(min,max){
    let r = Math.random() * (max - min) + min;
	return Math.round(r);
}

function getRandomChar(x){
    //let charCode = 1e2 + Math.random() * 33;
    let charCode = 48 + Math.random() * 207; // 255-48 = 207
    //let charCode = getRandomInt(33, 255);
    charCode = Math.round(charCode);
    if(secretSymbols.length > 0 && charCode % factor === 0){
        const index = getRandomInt(0, secretSymbols.length - 1);
        return secretSymbols[index];
    }
    //const r = String.fromCharCode(1e2 + Math.random() * 31);
    const r = String.fromCharCode(charCode);
    return r;
}

var draw = function () {
    ctx.fillStyle = 'rgba(0,0,0,.05)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#0F0';
    ctx.font = FontSize + 'pt Georgia 宋体';
    yPositions.map(function (y, index) {
        x = (index * FontSize) + FontSize;
        text = getRandomChar(x);
        canvasElement.getContext('2d').fillText(text, x, y);
        if (y > 100 + Math.random() * 1e4) {
            yPositions[index] = 0;
        }
        else {
            yPositions[index] = y + FontSize;
        }
    });
};

function runMatrix() {
    if (typeof Game_Interval != "undefined") clearInterval(Game_Interval);
    Game_Interval = setInterval(draw, FrameRateInMilliseconds);
}

function stopMatrix() {
    clearInterval(Game_Interval);
}

function loadSecretCode(num = 1, codesItems = []){
    //if(num > codesItems.length) { num = num % codesItems.length; }
    if(num < 1 || num > codesItems.length) {
        return "";
    }
    
    let index = num - 1;
    return codesItems[index].code;
}

function exportPng(num = 0){
    let filename = num + ".png";
    try {
        let imgData = canvasElement.toDataURL('image/png');
        /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
        imgData = imgData.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

        /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
        imgData = imgData.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=' + filename);

        
        let link = document.createElement('a');
        link.setAttribute('href', imgData);
        link.setAttribute('target', '_blank');
        link.setAttribute('download', filename);
        link.click();
        document.removeChild(link);
    } 
    catch(e) {
        console.log("Browser does not support taking screenshot of 3d context");
        return;
    }
}