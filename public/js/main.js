$(document).ready(function($) {
	$(window).stellar();
	$.stellar({
	  horizontalScrolling: false
	});

	$(window).scroll(function() {
		// console.log($("body").scrollTop());
		if($("body").scrollTop() > 50) {
			$(".navbar").addClass('highlight-nav');
		} else {
			$(".navbar").removeClass('highlight-nav');
		}
	});

	

	
});
