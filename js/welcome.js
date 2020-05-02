$("#menuWelcome").click(function() {

    hidefunc();
    $('#welcome').show();
});

$("#login_btn, #menuLogin").click(function() {

    hidefunc();
    document.getElementById('login_user_name').value = '';
    document.getElementById('login_password').value = '';
    $('#login').show();
});


$("#register_btn, #menuRegister").click(function() {

    hidefunc();
    document.getElementById('first_name').value = '';
    document.getElementById('last_name').value = '';
    document.getElementById('user_name').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirm_password').value = '';
    document.getElementById('email').value = '';
    document.getElementById('birthday').value = '';
    $('#register').show();
});

function hidefunc(){
    $('#container').hide();
    $('#welcome').hide();
    $('#login').hide();
    $('#register').hide();
    $('#about').hide();
    $('#contact').hide();
    $('#game').hide();
    $('#settings').hide();
    $('#gameBoard').hide();
    $('#gameOver').hide();
};
