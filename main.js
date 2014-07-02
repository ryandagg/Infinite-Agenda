/* To do:
-move cursor into newly created input fields



Styling:
-add a header for each week and give month & year there. Take them out of each day
-but a border around selected input fields

*/

// create a new date to use as a reference for future dates
var currentDate = new Date();

// counter to increase everytime getNewDate is called to increment the day by 1
var dayCounter = 0;

// returns a string for each new date as it is increased and added to the body
var getNewDate = function() {
	
	var newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + dayCounter);
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
	
	dayCounter++;

	return dayChoice[newDate.getDay()] + ", " + monthChoice[newDate.getMonth()] + " the " + newDate.getDate() + nthStr + " , " + newDate.getFullYear();
}

var addWeek = function(){
	$(".day-block").off();
	$(".main-wrapper").append(
		"<div class = 'day-block editable'>" + getNewDate() + "</div>" + 
		"<div class = 'day-block editable'>" + getNewDate() + "</div>" + 
		"<div class = 'day-block editable'>" + getNewDate() + "</div>" + 
		"<div class = 'day-block editable'>" + getNewDate() + "</div>" +
		"<div class = 'day-block editable'>" + getNewDate() + "</div>" +
		"<div class = 'day-block editable'>" + getNewDate() + "</div>" +
		"<div class = 'day-block editable'>" + getNewDate() + "</div>"
		);		
}

addWeek();

$(document).on('ready', function() {
	if($("body").height() < $(window).height()) {
		addWeek();
	}

	$(document).on('scroll', function() {

		// var appendTrigger = $(window).height() + $("body").scrollTop() - 200;

		if($("body").height() - 200 < $(window).height() + $("body").scrollTop()) {
			addWeek();
		}
		
	})

// This currently only works on elements created by "ready"
	$(document).on('click', ".day-block", function() {
		if($(this).hasClass("editable")) {
			$(this).after("<input class = 'event-input'>");
		}	
		$(this).removeClass('editable');

		// Register "enter key" press while in input field & replace with a div with selected text.
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
	})

	// make events editable | NOT CURRENTLY WORKING
		$(document).on('click', ".editableEvent", function(e) {
			var eventText = $(this).text();
			$(this).replaceWith("<input class = 'event-input' value= '" + eventText + "'>")
		})
		
});