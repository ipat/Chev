$(document).ready(function($) {
	$(window).stellar();
	$.stellar({
	  horizontalScrolling: false
	});

	$(window).scroll(function() {
		// console.log($("body").scrollTop());
		if($("body").scrollTop() > 50) {
			$(".navbar").addClass('highlight-nav');
			$(".cart").addClass('left-border');
			$(".cart").addClass('right-border');
		} else {
			$(".navbar").removeClass('highlight-nav');
			$(".cart").removeClass('left-border');
			$(".cart").removeClass('right-border');
		}
	});

	$("#click1").click(function(event) {
		$("#read1").slideToggle("slow");
		$(this).text(function(i, text){
			return text === "More Info v" ? "Less ^" : "More Info v";
		})
	});

	$("#click2").click(function(event) {
		$("#read2").slideToggle("slow");
		$(this).text(function(i, text){
			return text === "More Info v" ? "Less ^" : "More Info v";
		})
	});

	$("#click3").click(function(event) {
		$("#read3").slideToggle("slow");
		$(this).text(function(i, text){
			return text === "More Info v" ? "Less ^" : "More Info v";
		})
	});

	$("#click4").click(function(event) {
		$("#read4").slideToggle("slow");
		$(this).text(function(i, text){
			return text === "More Info v" ? "Less ^" : "More Info v";
		})
	});

	
});
