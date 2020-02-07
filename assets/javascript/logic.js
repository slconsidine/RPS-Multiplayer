$(document).ready(function() {
    // variables to hold each players choice
    var playerOneChoice;
    var playerTwoChoice;

    // disables al options so they can't be clicked again after a choice is selected
    var playerOneNotEnabled = function() {
        $("#rock").attr("disabled", true);
        $("#paper").attr("disabled", true);
        $("#scissors").attr("disabled", true);
    };

    var playerTwoNotEnabled = function() {
        $("#rock2").attr("disabled", true);
        $("#paper2").attr("disabled", true);
        $("#scissors2").attr("disabled", true);
    };

    // when player 1 clicks a button, their choice is logged by grabbing the id of the button
    // after something is clicked, all other buttons are disabled
    $("#rock").on("click", function() {
        playerOneChoice = $(this).attr("id");
        playerOneNotEnabled();
        console.log("Player 1:" + playerOneChoice);
    });
    $("#paper").on("click", function() {
        playerOneChoice = $(this).attr("id");
        playerOneNotEnabled();
        console.log("Player 1:" + playerOneChoice);
    });
    $("#scissors").on("click", function() {
        playerOneChoice = $(this).attr("id");
        playerOneNotEnabled();
        console.log("Player 1:" + playerOneChoice);
    });

    $("#rock2").on("click", function() {
        playerTwoChoice = $(this).attr("data-value");
        playerTwoNotEnabled();
        console.log("Player 2:" + playerTwoChoice);
    });
    $("#paper2").on("click", function() {
        playerTwoChoice = $(this).attr("data-value");
        playerTwoNotEnabled();
        console.log("Player 2:" + playerTwoChoice);
    });
    $("#scissors2").on("click", function() {
        playerTwoChoice = $(this).attr("data-value");
        playerTwoNotEnabled();
        console.log("Player 2:" + playerTwoChoice);
    });




})