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

    // connectionsRef references a specific location in our database.
    // All of our connections will be stored in this directory.
    var connectionsRef = database.ref("/connections");

    // '.info/connected' is a special location provided by Firebase that is updated
    // every time the client's connection state changes.
    // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
    var connectedRef = database.ref(".info/connected");

    // When the client's connection state changes...
    connectedRef.on("value", function(snap) {

    // If they are connected..
        if (snap.val()) {
            // Add user to the connections list.
            var con = connectionsRef.push(true);
            // Remove user from the connection list when they disconnect.
            con.onDisconnect().remove();
        }
    });

    // When first loaded or when the connections list changes...
    connectionsRef.on("value", function(snap) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#connected-viewers").text(snap.numChildren());
  });
    
    // variables to hold each players choice
    var playerOneChoice;
    var playerTwoChoice;

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
    
    var checkWinner = function() {
    // if statement confirms that each player has chosen a valid choice before running
        if ((playerOneChoice != null) && (playerTwoChoice != null)) {
            // if player 1 is the winner
            if ((playerOneChoice === "rock" && playerTwoChoice === "scissors") ||
            (playerOneChoice === "scissors" && playerTwoChoice === "paper") ||
            (playerOneChoice === "paper" && playerTwoChoice === "rock")) {
                wins1++;
                console.log("Player 1 Wins: " + wins1);
                $("#wins1").text(wins1);
                losses2++;
                console.log("Player 2 Losses: " + losses2);
                $("#losses2").text(losses2);
                enableAll();
                // clears users' choices
                playerOneChoice = null;
                playerTwoChoice = null;
            // if players are tied
            } else if (playerOneChoice == playerTwoChoice) {
                ties1++;
                console.log("Player 1 Ties: " + ties1);
                $("#ties1").text(ties1);
                ties2++;
                console.log("Player 2 Ties: " + ties2);
                $("#ties2").text(ties2);
                enableAll();
                // clears users' choices
                playerOneChoice = null;
                playerTwoChoice = null;
            // if player 2 is the winner
            } else {
                losses1++;
                console.log("Player 1 Losses: " + losses1);
                $("#losses1").text(losses1);
                wins2++;
                console.log("Player 2 Wins: " + wins2);
                $("#wins2").text(wins2);
                enableAll();
                // clears users' choices
                playerOneChoice = null;
                playerTwoChoice = null;
            }
        }
    };


    // when player 1 clicks a button, their choice is logged by grabbing the id of the button
    // after something is clicked, all other buttons for that player are disabled
    $("#rock").on("click", function() {
        playerOneChoice = $(this).attr("id");
        playerOneNotEnabled();
        console.log("Player 1:" + playerOneChoice);
        checkWinner();
    });
    $("#paper").on("click", function() {
        playerOneChoice = $(this).attr("id");
        playerOneNotEnabled();
        console.log("Player 1:" + playerOneChoice);
        checkWinner();
    });
    $("#scissors").on("click", function() {
        playerOneChoice = $(this).attr("id");
        playerOneNotEnabled();
        console.log("Player 1:" + playerOneChoice);
        checkWinner();
    });

    // when player 2 clicks a button, their choice is logged by grabbing the data-value of the button
    // after something is clicked, all other buttons for that player are disabled
    $("#rock2").on("click", function() {
        playerTwoChoice = $(this).attr("data-value");
        playerTwoNotEnabled();
        console.log("Player 2:" + playerTwoChoice);
        checkWinner();
    });
    $("#paper2").on("click", function() {
        playerTwoChoice = $(this).attr("data-value");
        playerTwoNotEnabled();
        console.log("Player 2:" + playerTwoChoice);
        checkWinner();
    });
    $("#scissors2").on("click", function() {
        playerTwoChoice = $(this).attr("data-value");
        playerTwoNotEnabled();
        console.log("Player 2:" + playerTwoChoice);
        checkWinner();
    });








});