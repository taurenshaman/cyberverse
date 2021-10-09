
function onSelectBgColor(color) {
    $("#container").css("background", color.toHexString());
    $("#body").css("background", color.toHexString());
}

// element is a input
function onSelectImage(element) {
    if (element.files && element.files[0]) {
        var file = element.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#container").css("background", "transparent");
            $("#body").css("background", "url(" + e.target.result + ") no-repeat");
            $("#body").css("background-size", "cover");
        };
        reader.readAsDataURL(file);
    }
}


//$(document).on('keypress', null, '!', function () {
//    Metro.charms.toggle("#panelCharm");
//});

//$(document).on('keypress', null, '#', function () {
//    launchFullScreen(document.documentElement);
//});

//$(document).hotkey("1", function () {
//    Metro.charms.toggle("#panelCharm");
//    return false;
//})

//$(document).hotkey("3", function () {
//    launchFullScreen(document.documentElement);
//    return false;
//})

$(document).keypress(function (event) {
    var e = event || window.event;
    var k = e.keyCode || e.which || event.charCode;
    switch (k) {
        case 49: // 1/!
            Metro.charms.toggle("#panelCharm");
            break;
        case 51: // 3/#
            launchFullScreen(document.documentElement);
            break;
        ////
        // case 73: // i
        // case 187: // +
        //     case 107: // pad:+
        //     case 38: // arrow-up
        //     case 39: // arrow-right
        //         increaseAngle();
        //         break;
        //     case 68: // d
        //     case 189: // -
        //     case 109: // pad:-
        //     case 40: // arrow-down
        //     case 37: // arrow-left
        //         decreaseAngle();
        //         break;
        //     case 13: // enter
        //     case 108: // pad:enter
        //         exportPng();
        //         break;
    }
    return false;
});




if ($("#colorpicker")) {
    $("#colorpicker").spectrum({
        color: "#000",
        showAlpha: true,
        showInput: true,
        chooseText: "OK",
        cancelText: "Cancel",
        change: onSelectBgColor
    });
}