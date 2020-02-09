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

  var playersRef = database.ref("/players");
  var playerOneRef = database.ref("/players/PlayerOne");
  var playerTwoRef = database.ref("/players/PlayerTwo");




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


    // initialize firebase with each players initial values
    playerOneRef.set({
        choice: playerOneChoice,
        winCounter: wins1,
        lossesCounter: losses1,
        tiesCounter: ties1
    });
    
    playerTwoRef.set({
        choice: playerTwoChoice,
        winCounter: wins2,
        lossesCounter: losses2,
        tiesCounter: ties2
    });


    // disables all options for each player so they can't be clicked again after a choice is selected
    // enables all options for all players 
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

    var enableAll = function() {
        $("#rock").attr("disabled", false);
        $("#paper").attr("disabled", false);
        $("#scissors").attr("disabled", false); 
        $("#rock2").attr("disabled", false);
        $("#paper2").attr("disabled", false);
        $("#scissors2").attr("disabled", false);
    };
    

    playerOneRef.on("value", function(snapshot) {
        playerOneChoice = snapshot.child("choice").val();
    });
    playerTwoRef.on("value", function(snapshot) {
        playerTwoChoice = snapshot.child("choice").val();
    });
    

    playerOneRef.on("value", function(snapshot) {
        wins1 = snapshot.child("winCounter").val();
    });
    playerTwoRef.on("value", function(snapshot) {
        wins2 = snapshot.child("winCounter").val();
    });
    playerOneRef.on("value", function(snapshot) {
        losses1 = snapshot.child("lossesCounter").val();
    });
    playerTwoRef.on("value", function(snapshot) {
        losses2 = snapshot.child("lossesCounter").val();
    });
    playerOneRef.on("value", function(snapshot) {
        ties1 = snapshot.child("tiesCounter").val();
    });
    playerTwoRef.on("value", function(snapshot) {
        ties2 = snapshot.child("tiesCounter").val();
    });

    // function to see who wins each match
    var checkWinner = function() {
    // if statement confirms that each player has chosen a valid choice before running
        if ((playerOneChoice != "none") && (playerTwoChoice != "none")) {
            // if player 1 is the winner
            if ((playerOneChoice === "rock" && playerTwoChoice === "scissors") ||
            (playerOneChoice === "scissors" && playerTwoChoice === "paper") ||
            (playerOneChoice === "paper" && playerTwoChoice === "rock")) {
                wins1++;
                console.log("Player 1 Wins: " + wins1);
                losses2++;
                console.log("Player 2 Losses: " + losses2);
                enableAll();
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
                ties1++;
                console.log("Player 1 Ties: " + ties1);
                ties2++;
                console.log("Player 2 Ties: " + ties2);
                enableAll();
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
                losses1++;
                console.log("Player 1 Losses: " + losses1);
                wins2++;
                console.log("Player 2 Wins: " + wins2);
                enableAll();
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

    // var notPicked = function() {
    //     if ((playerOneChoice != "none") && (playerTwoChoice == "none")) {
    //         playerOneNotEnabled();
    //         console.log(playerOneChoice);
    //         playerTwoRef.on("value", function(snapshot) {
    //             playerTwoChoice = snapshot.child("choice").val();
    //         });
    //         checkWinner();
    //     } else if ((playerOneChoice == "none") && (playerTwoChoice != "none")) {
    //         playerTwoNotEnabled();
    //         console.log(playerTwoChoice);
    //     } else {
    //         checkWinner();
    //     }
    // }; 



    // when player 1 clicks a button, their choice is logged by grabbing the id of the button
    // after something is clicked, all other buttons for that player are disabled
    $("#rock").on("click", function() {
        playerOneChoice = $(this).attr("id");
        playerOneRef.update({
            choice: playerOneChoice
        });
        // notPicked();
        checkWinner();
    });
    $("#paper").on("click", function() {
        playerOneChoice = $(this).attr("id");
        playerOneRef.update({
            choice: playerOneChoice
        });
        checkWinner();
        // notPicked();
    });
    $("#scissors").on("click", function() {
        playerOneChoice = $(this).attr("id");
        playerOneRef.update({
            choice: playerOneChoice
        });
        checkWinner();
        // notPicked();
    });

    // when player 2 clicks a button, their choice is logged by grabbing the data-value of the button
    // after something is clicked, all other buttons for that player are disabled
    $("#rock2").on("click", function() {
        playerTwoChoice = $(this).attr("data-value");
        playerTwoRef.update({
            choice: playerTwoChoice
        });
        checkWinner();
        // notPicked();
    });
    $("#paper2").on("click", function() {
        playerTwoChoice = $(this).attr("data-value");
        playerTwoRef.update({
            choice: playerTwoChoice
        });
        checkWinner();
        // notPicked();
    });
    $("#scissors2").on("click", function() {
        playerTwoChoice = $(this).attr("data-value");
        playerTwoRef.update({
            choice: playerTwoChoice
        });
        checkWinner();
        // notPicked();
    });



});