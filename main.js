/* Ideas:
-Start with 2 weeks?
-on scroll down create the divs and scroll?
	-or add when the bottom of the window is close to the bottom of the document!
*/
var addWeek = function(){
	$(".main-wrapper").append("<div class = 'day-block'>Figure it out</div><div class = 'day-block'>Figure it out</div><div class = 'day-block'>Figure it out</div><div class = 'day-block'>Figure it out</div><div class = 'day-block'>Figure it out</div><div class = 'day-block'>Figure it out</div><div class = 'day-block'>Figure it out</div>");
}

$(document).on('ready', function() {
	if($("body").height() < $(window).height()) {
		addWeek();
	}

	$(document).on('scroll', function() {

		// var appendTrigger = $(window).height() + $("body").scrollTop() - 200;

		if($("body").height() - 200 < $(window).height() + $("body").scrollTop()) {
			console.log("Seriously, WTF?")
			$(".main-wrapper").append("<div></div>")
			addWeek();
		}
		
	})
});