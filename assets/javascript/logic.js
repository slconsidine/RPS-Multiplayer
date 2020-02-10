$(document).ready(function() {

var firebaseConfig = {
    apiKey: "AIzaSyCDdFeSXitEqhtOg7hF41gonyk_gHD3HKU",
    authDomain: "homework-7-36be5.firebaseapp.com",
    databaseURL: "https://homework-7-36be5.firebaseio.com",
    projectId: "homework-7-36be5",
    storageBucket: "homework-7-36be5.appspot.com",
    messagingSenderId: "1049536031769",
    appId: "1:1049536031769:web:1c35ae6ce1b752eaa48e88"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();


    // track connections on app
    var connectionsRef = database.ref("/connections");
    var connectedRef = database.ref(".info/connected");

    // event listener for value change, get snap at value change
    connectedRef.on("value", function(snap) {
        if (snap.val()) {
            var con = connectionsRef.push(true);
            con.onDisconnect().remove();

        // assign players when they are connected, assign var player-number
        }
    });

    // display connected users
    connectionsRef.on("value", function(snap) {
        $("#connected-viewers").text(snap.numChildren());
    });

    var player1 = false;
    var player2 = false;
    var whosTurn = 0; 

    var playersRef = database.ref("/players");
    var playerOneRef = database.ref("/players/PlayerOne");
    var playerTwoRef = database.ref("/players/PlayerTwo");
    // var playerOneWinRef = database.ref("/players/PlayerOne/winCounter") //**
    // var playerTwoWinRef = database.ref("/players/PlayerTwo/winCounter") //**
    // var playerOneLoseRef = database.ref("/players/PlayerOne/lossesCounter") //**
    // var playerTwoLoseRef = database.ref("/players/PlayerTwo/lossesCounter") //**
    // var playerOneTieRef = database.ref("/players/PlayerOne/tiesCounter") //**
    // var playerTwoTieRef = database.ref("/players/PlayerTwo/tiesCounter") //**

    playerOneRef.remove(); //**
    playerTwoRef.remove(); //**

    playersRef.set({
        turn: whosTurn
    });

    // chat - array of objects, each object has name and content 
      

    // variables to hold each players choice
    var playerOneChoice = "none";
    var playerTwoChoice = "none";

    // counters for each players
    // show the initial counters in the HTML
    var wins1 = 0;
    var losses1 = 0;
    var ties1 = 0;
    $("#wins1").text(wins1);
    $("#losses1").text(losses1);
    $("#ties1").text(ties1);

    var wins2 = 0;
    var losses2 = 0;
    var ties2 = 0;
    $("#wins2").text(wins2);
    $("#losses2").text(losses2);
    $("#ties2").text(ties2);


    // disables/enables all options for each player so they can't be clicked again after a choice is selected
    var playerOneNotEnabled = function() {
        $("#rock").attr("disabled", true);
        $("#paper").attr("disabled", true);
        $("#scissors").attr("disabled", true);
    };

    var playerOneEnable = function() {
        $("#rock").attr("disabled", false);
        $("#paper").attr("disabled", false);
        $("#scissors").attr("disabled", false);
    };

    var playerTwoNotEnabled = function() {
        $("#rock2").attr("disabled", true);
        $("#paper2").attr("disabled", true);
        $("#scissors2").attr("disabled", true);
    };

    var playerTwoEnable = function() {
        $("#rock2").attr("disabled", false);
        $("#paper2").attr("disabled", false);
        $("#scissors2").attr("disabled", false);
    };

    var enableAll = function() {
        $("#rock").attr("disabled", false);
        $("#paper").attr("disabled", false);
        $("#scissors").attr("disabled", false); 
        $("#rock2").attr("disabled", false);
        $("#paper2").attr("disabled", false);
        $("#scissors2").attr("disabled", false);
    };


    // if Player 1 button is clicked, make the variable true and set the player's choice and each counter
    playersRef.on("value", function(snapshot) {
        if (snapshot.child("PlayerOne").exists()) {
            player1 = true;
            console.log("Player1 is ready to play");
        } else {
            playerOneNotEnabled();
            console.log("Player1 is not ready to play");
        }
    });

    // if Player 2 button is clicked, make the variable true and set the player's choice and each counter
    playersRef.on("value", function(snapshot) {
        if (snapshot.child("PlayerTwo").exists()) {
            player2 = true;
            console.log("Player2 is ready to play");
        } else {
            playerTwoNotEnabled();
            console.log("Player2 is not ready to play");
        }
    });

    // when player's choice is changed, log this as the new choice in the database
    playerOneRef.on("value", function(snapshot) {
        playerOneChoice = snapshot.child("choice").val();
    });
    playerTwoRef.on("value", function(snapshot) {
        playerTwoChoice = snapshot.child("choice").val();
    });

    // function to see who wins each match
    var checkWinner = function() {
    // if statement confirms that each player has chosen a valid choice before running
        if ((playerOneChoice != "none") && (playerTwoChoice != "none")) {
            // if player 1 is the winner
            if ((playerOneChoice === "rock" && playerTwoChoice === "scissors") ||
            (playerOneChoice === "scissors" && playerTwoChoice === "paper") ||
            (playerOneChoice === "paper" && playerTwoChoice === "rock")) {
                // updates counters for each player
                wins1++;
                console.log("Player 1 Wins: " + wins1);
                losses2++;
                console.log("Player 2 Losses: " + losses2);
                // enables all buttons again
                enableAll();
                // updates each player in the database
                playerOneRef.update({
                    choice: playerOneChoice,
                    winCounter: wins1,
                    lossesCounter: losses1,
                    tiesCounter: ties1
                });
                playerTwoRef.update({
                    choice: playerTwoChoice,
                    winCounter: wins2,
                    lossesCounter: losses2,
                    tiesCounter: ties2
                });
                // counters are updated on the HTML page
                $("#wins1").text(wins1);
                $("#losses2").text(losses2);
                // clears users' choices
                playerOneChoice = "none";
                playerOneRef.update({
                    choice: playerOneChoice
                });
                playerTwoChoice = "none";
                playerTwoRef.update({
                    choice: playerTwoChoice
                });
            // if players are tied
            } else if (playerOneChoice == playerTwoChoice) {
                // updates counters for each player
                ties1++;
                console.log("Player 1 Ties: " + ties1);
                ties2++;
                console.log("Player 2 Ties: " + ties2);
                // enables all buttons again
                enableAll();
                // updates each player in the database
                playerOneRef.update({
                    choice: playerOneChoice,
                    winCounter: wins1,
                    lossesCounter: losses1,
                    tiesCounter: ties1
                });
                playerTwoRef.update({
                    choice: playerTwoChoice,
                    winCounter: wins2,
                    lossesCounter: losses2,
                    tiesCounter: ties2
                });
                // counters are updated on the HTML page
                $("#ties1").text(ties1);
                $("#ties2").text(ties2);
                // clears users' choices
                playerOneChoice = "none";
                playerOneRef.update({
                    choice: playerOneChoice
                });
                playerTwoChoice = "none";
                playerTwoRef.update({
                    choice: playerTwoChoice
                });
            // if player 2 is the winner
            } else {
                // updates counters for each player
                losses1++;
                console.log("Player 1 Losses: " + losses1);
                wins2++;
                console.log("Player 2 Wins: " + wins2);
                // enables all buttons again
                enableAll();
                // updates each player in the database
                playerOneRef.update({
                    choice: playerOneChoice,
                    winCounter: wins1,
                    lossesCounter: losses1,
                    tiesCounter: ties1
                });
                playerTwoRef.update({
                    choice: playerTwoChoice,
                    winCounter: wins2,
                    lossesCounter: losses2,
                    tiesCounter: ties2
                });
                // counters are updated on the HTML page
                $("#losses1").text(losses1);
                $("#wins2").text(wins2);
                // clears users' choices
                playerOneChoice = "none";
                playerOneRef.update({
                    choice: playerOneChoice
                });
                playerTwoChoice = "none";
                playerTwoRef.update({
                    choice: playerTwoChoice
                });
            }
       }
    };

    var update = function() {
        if((playerOneChoice != "none") && (playerTwoChoice == "none")) {
            $("#wins1").text(wins1);
            $("#losses2").text(losses2);
            $("#ties1").text(ties1);
            $("#ties2").text(ties2);
            $("#losses1").text(losses1);
            $("#wins2").text(wins2);
        }
    };

    // player 1 buttons are clicked
    $("#rock").on("click", function() {
        // when player 1 clicks a button, their choice is logged by grabbing the id of the button
        playerOneChoice = $(this).attr("id");
        playerOneRef.update({
            choice: playerOneChoice
        });
        // the turn number is updated in the database
        whosTurn=2;
        playersRef.update({
            turn: whosTurn
        });
        checkWinner();
        update();
    });
    $("#paper").on("click", function() {
        // when player 1 clicks a button, their choice is logged by grabbing the id of the button
        playerOneChoice = $(this).attr("id");
        playerOneRef.update({
            choice: playerOneChoice
        });
        // the turn number is updated in the database
        whosTurn=2;
        playersRef.update({
            turn: whosTurn
        });
        checkWinner();
        update();
    });
    $("#scissors").on("click", function() {
        // when player 1 clicks a button, their choice is logged by grabbing the id of the button
        playerOneChoice = $(this).attr("id");
        playerOneRef.update({
            choice: playerOneChoice
        });
        // the turn number is updated in the database
        whosTurn=2;
        playersRef.update({
            turn: whosTurn
        });
        checkWinner();
        update();
    });

    // player 2 buttons are clicked
    $("#rock2").on("click", function() {
        // when player 2 clicks a button, their choice is logged by grabbing the data-value of the button
        playerTwoChoice = $(this).attr("data-value");
        playerTwoRef.update({
            choice: playerTwoChoice
        });
        // the turn number is updated in the database
        whosTurn=1;
        playersRef.update({
            turn: whosTurn
        });
        checkWinner();
    });
    $("#paper2").on("click", function() {
        // when player 2 clicks a button, their choice is logged by grabbing the data-value of the button
        playerTwoChoice = $(this).attr("data-value");
        playerTwoRef.update({
            choice: playerTwoChoice
        });
        // the turn number is updated in the database
        whosTurn=1;
        playersRef.update({
            turn: whosTurn
        });
        checkWinner();
    });
    $("#scissors2").on("click", function() {
        // when player 2 clicks a button, their choice is logged by grabbing the data-value of the button
        playerTwoChoice = $(this).attr("data-value");
        playerTwoRef.update({
            choice: playerTwoChoice
        });
        // the turn number is updated in the database
        whosTurn=1;
        playersRef.update({
            turn: whosTurn
        });
        checkWinner();
    });

    // each player button is selected to initialize game
    $("#player1").on("click", function() {
        playerOneEnable();
        playerOneRef.set({
            choice: "none",
            winCounter: 0,
            lossesCounter: 0,
            tiesCounter: 0
        });
        whosTurn = 1;
        playersRef.update({
            turn: whosTurn
        });
    });
    $("#player2").on("click", function() {
        playerTwoEnable();
        playerTwoRef.set({
            choice: "none",
            winCounter: 0,
            lossesCounter: 0,
            tiesCounter: 0
        });
        whosTurn = 1;
        playersRef.update({
            turn: whosTurn
        });
    });

});



// needs to update both browsers after check winner runs so that all counters are correct, not just player 2
    // this is not updated because it is in the checkWinner function 
    // checkWinner function is not running on the player1 page because both players have not picked