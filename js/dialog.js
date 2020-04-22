var aboutDialog = document.getElementById("about");

function openAboutDialog() {
    document.getElementById("about").showModal();
}
function closeAboutDialog() {
    document.getElementById("about").close();
}
/*window.onclick = function(event) {
    if (event.target == aboutDialog) {
        aboutDialog.style.display = "none";
    }
}*/
window.onkeydown =function( event ) {
    // ESCAPE key pressed
    if (event.keyCode == 27) {
        aboutDialog.style.display = "none";
    }
}

