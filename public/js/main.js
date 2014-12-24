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

	

	
});
