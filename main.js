/* To do:

	-Styling:
		-but a border around selected input fields
		-add a bullet point in front of each saved event

*/

// create a new date to use as a reference for future dates
var currentDate = new Date();

// counter to increase everytime getNewDate is called to increment the day by 1
var dayCounter = 0;

var createNewDate = function() {
	return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + dayCounter);
}

// returns a string for each new date as it is increased and added to the body
var formatedDate = function(arg) {
	
	var newDate = createNewDate();
	var dayChoice = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday"};
	var monthChoice = {0: "January", 1: "Febuary", 2: "March", 3: "April", 4: "May", 5: "June", 6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"} ;

	var nthString;

	if (newDate.getDate() % 10 === 1 && newDate.getDate() !== 11) {
		nthStr = "st";
	}
	else if (newDate.getDate() % 10 === 2 && newDate.getDate() !== 12) {
		nthStr = "nd";
	}
	else if (newDate.getDate() % 10 === 3 && newDate.getDate() !== 13) {
		nthStr = "rd";
	}
	else {
		nthStr = "th";
	}

	if(arg === "day") {
		dayCounter++;
		return dayChoice[newDate.getDay()] + " the " + newDate.getDate() + nthStr
	}
	else {
		return "The week of " + monthChoice[newDate.getMonth()] + " the " + newDate.getDate() + nthStr + ", " + newDate.getFullYear();
	}
	
}

var checkForSunday = function() {
	if (createNewDate().getDay() === 0) {
		return "<div class = 'week-header'>" + formatedDate('header') + "</div>";
	}
	else { 
		return ''; 
	}
}

// function to add an entire week to body. Calls 
var addWeek = function(){
	$(".main-wrapper").append(
		"<div class = 'day-block editable'>" + formatedDate('day') + "</div>" + checkForSunday() +
		"<div class = 'day-block editable'>" + formatedDate('day') + "</div>" + checkForSunday() + 
		"<div class = 'day-block editable'>" + formatedDate('day') + "</div>" + checkForSunday() + 
		"<div class = 'day-block editable'>" + formatedDate('day') + "</div>" + checkForSunday() +
		"<div class = 'day-block editable'>" + formatedDate('day') + "</div>" + checkForSunday() +
		"<div class = 'day-block editable'>" + formatedDate('day') + "</div>" + checkForSunday() +
		"<div class = 'day-block editable'>" + formatedDate('day') + "</div>" + checkForSunday() 
		);		
}

// add input event listener for newly created input fields
var attachInputEvents = function () {
	$(".event-input").bind("enterKey", function(e) {
		$(this).prev(".day-block").addClass("editable");
		var eventText = $(this).val()
		$(this).replaceWith("<div class = 'editableEvent'>" + eventText + "</div>")
	})

	$(".event-input").keyup(function(e) {
		if(e.keyCode == 13) {
    		$(this).trigger("enterKey");
		}
	});
}

addWeek();

$(document).on('ready', function() {
	// Check if initial week takes up entire window length & append a new week if not.
	if($("body").height() < $(window).height()) {
		addWeek();
	}

	$(document).on('scroll', function() {
		// check if the bottom of the window is within 200px of the body & append a week if it is.
		if($("body").height() - 200 < $(window).height() + $("body").scrollTop()) {
			addWeek();
		}
		
	})

	// check for clicks on .day-block and checks if it has .editable class. This prevents adding multiple events before entering text on the first. Creates a new input field if there isn't an existing one. 
	$(document).on('click', ".day-block", function() {
		if($(this).hasClass("editable")) {
			$(this).after("<input class = 'event-input' placeholder = 'Enter event details'>");
		}	
		$(this).removeClass('editable');

		// Register "enter key" press while in input field & replace with a div with selected text.
		attachInputEvents();
		$(this).next().focus();
	})

	// make events editable 
	$(document).on('click', ".editableEvent", function(e) {
		var eventText = $(this).text();
		$(this).replaceWith("<input class = 'event-input' value= '" + eventText + "'>")
		attachInputEvents();
	})
	
});