define([ 'jquery', 'core/str' ], function($, str) {

	return {
		init: function() {
			var titlerequests = [
				{
					key: 'activity_is_limited',
					component: 'format_picturelink'
				}
			];
			var titlePromise = str.get_strings(titlerequests).done(function(titles) {
				return M.util.get_string('activity_is_limited', 'format_picturelink');
			});
			//TODO set translation
			titlePromise = `הפעילות מוגבלת`;
			function handlerIn () {
				let description = $(this).attr('data-description');
				let x = $(this).position();
				let modal = $(`<div class = "tooltipmodal" style = "top: ${x.top + 40}px; left: ${x.left-120}px"><div class = "header">${titlePromise}</div><div class = "content">${description}</div></div>`);
				$('div.picturelink').append(modal);
				console.dir(titlePromise);
			}

			function handlerOut () {
				$('div.tooltipmodal').remove();
			}

			$('.p_locked').hover(handlerIn, handlerOut);

		}
	};
});
