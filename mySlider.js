/**
 * https://github.com/unlike777/mySlider
 * jQuery Slider Plugin v0.1
 */

(function( $ ) {
	
	$.fn.mySlider = function( settings ) {

		var options = $.extend( {
			wr: 'ul',
			elem: 'li',
			btnPrev: '.prev',
			btnNext: '.next',
			speed: 400,
			easing: 'easeInOutCubic',
			circular: true,
			scroll: 1,
			visible: 3
		}, settings);
		
		var init = function() {
			var $this = $(this),
				$elems = $this.find(options.elem),
				count = $elems.length,
				$btnL = $(options.btnPrev),
				$btnR = $(options.btnNext),
				$wr = $this.find(options.wr),
				width = $elems.first().outerWidth(true),
				animate = true;
			
			if (count <= options.visible) {
				$btnL.hide();
				$btnR.hide();
			}
			
			$wr.css({width: width*count*2});
			
			$btnL.on('click', function(e) {
				e.preventDefault();

				if (animate) {
					animate = false;
					
					var tmp = $this.find(options.elem).slice(-options.scroll),
						shift = options.scroll*width;
					
					tmp.clone(true).prependTo($wr);
					$wr.css({marginLeft: -shift});
					
					$wr.animate({marginLeft: 0}, options.speed, options.easing, function() {
						animate = true;
						tmp.remove();
					});
				}
			});

			$btnR.on('click', function(e) {
				e.preventDefault();

				if (animate) {
					animate = false;

					var tmp = $this.find(options.elem).slice(0, options.scroll),
						shift = options.scroll*width;
					
					tmp.clone(true).appendTo($wr);

					$wr.animate({marginLeft: -shift}, options.speed, options.easing, function() {
						animate = true;
						tmp.remove();
						$wr.css({marginLeft: 0});
					});
				}
			});
			
		};
		
		return this.each(init);
	};
	
})(jQuery);