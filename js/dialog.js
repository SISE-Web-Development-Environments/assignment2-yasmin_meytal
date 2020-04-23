var aboutDialog = document.getElementById("about");
var aboutBtn = document.getElementById("menuAbout");
var closeBtn = document.getElementsByClassName("close")[0];

aboutBtn.onclick = function () {
    aboutDialog.style.display = "block";
}

closeBtn.onclick = function () {
    aboutDialog.style.display = "none";
}

window.onclick =function( event ) {
    // ESCAPE key pressed
    if (event.keyCode == 27) {
        aboutDialog.style.display = "none";
    }
}

// clicks outside of the modal
window.onclick = function (event) {
    if (event.target == aboutDialog) {
        aboutDialog.style.display = "none";
    }
}

