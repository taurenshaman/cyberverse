function launchFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
} 

//function exitFullscreen() {
//    if (document.exitFullscreen) {
//        document.exitFullscreen();
//    } else if (document.mozExitFullScreen) {
//        document.mozExitFullScreen();
//    } else if (document.webkitExitFullscreen) {
//        document.webkitExitFullscreen();
//    }
//}