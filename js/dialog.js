let aboutDialog = document.getElementById("about");



function openAboutDialog() {
    window.getElementById("about").showModal();
}
function closeAboutDialog() {
    window.getElementById("about").close();
}

window.onkeydown =function( event ) {
    // ESCAPE key pressed
    if (event.keyCode == 27) {
        aboutDialog.style.display = "none";
    }
}

