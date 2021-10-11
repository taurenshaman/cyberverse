
function showImageOnMouseOver(e, id) {
    var p = window.event ? [event.clientX, event.clientY] : [e.pageX, e.pageY];
    with (document.getElementById(id).style) {
        display = "block";
        left = p[0] + 10 + "px";
        top = p[1] - 150 + "px";
    }
    if (window.event) {
        window.event.cancelBubble = true;
    } else {
        if (e) {
            e.preventDefault();
        }
    }
}

function hideImageOnMouseLeave(e, id) {
    with (document.getElementById(id).style) {
        display = "none";
    }
    if (window.event) {
        window.event.cancelBubble = true;
    } else {
        if (e) {
            e.preventDefault();
        }
    }
}