// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCxkO8Bafmy7YQZNGBNYLfg73qxFDeYd1U",
    authDomain: "training-day-13ca7.firebaseapp.com",
    databaseURL: "https://training-day-13ca7.firebaseio.com",
    projectId: "training-day-13ca7",
    storageBucket: "training-day-13ca7.appspot.com",
    messagingSenderId: "197932357333"
  };
  firebase.initializeApp(config);

  $(document).ready(function(){
  	// 1. Link to Firebase
  	var trainData = new Firebase("https://training-day-13ca7.firebaseio.com");

  	// 2. Button for adding Trains
  	$("#submit").on("click", function(){

  		// Grabs user input and assign to variables
  		var trainName = $("#trainName").val().trim();
  		var destination = $("#destination").val().trim();
  		var trainTime = moment($("#firstTrainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");;
  		var frequency = $("#frequency").val().trim();

  		// Test for variables entered
  		console.log(trainName);
  		console.log(destination);
  		console.log(trainTime);
  		console.log(frequency);

  		// Creates local "temporary" object for holding train data
  		// Will push this to firebase
  		var newTrain = {
  			trainName: trainName,
  			destination: destination,
  			trainTime: trainTime,
  			frequency: frequency,
  		}

  		// pushing trainInfo to Firebase
  		trainData.push(newTrain);

  		// clear text-boxes
  		$("#trainName").val("");
  		$("#destination").val("");
  		$("#trainTime").val("");
  		$("#frequency").val("");

  		// Prevents page from refreshing
  		return false;
  	});

  	trainData.on("child_added", function(childSnapshot, prevChildKey){

  		console.log(childSnapshot.val());

  		// assign firebase variables to snapshots.
  		var firebaseName = childSnapshot.val().name;
  		var firebaseDestination = childSnapshot.val().destination;
  		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
  		var firebaseFrequency = childSnapshot.val().frequency;

  		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
  		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
  		var minutes = firebaseFrequency - timeRemainder;

  		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

  		// Test for correct times and info
  		console.log(minutes);
  		console.log(nextTrainArrival);
  		console.log(moment().format("hh:mm A"));
  		console.log(nextTrainArrival);
  		console.log(moment().format("X"));

  		// Append train info to table on page
  		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

  	});
  });
