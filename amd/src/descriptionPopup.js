define([
    'jquery',
    'core/str',
    'core/modal_factory'
], function ($, str, ModalFactory) {

    let title;


    return {
        init: function () {
            var trigger = $('.p_locked');
            var descriptionText = trigger.attr("data-description");

            var titlerequests = [{key: 'activity_is_limited', component: 'format_picturelink'}];
            var titlePromise = str.get_strings(titlerequests)
            .then(function(titles) {
                return M.util.get_string('activity_is_limited', 'format_picturelink');
            })

            ModalFactory
                .create({
                    title: titlePromise,
                    body: descriptionText,
                    footer: '',
                    type: ModalFactory.types.DEFAULT
                }, trigger)
                .done(function (modal) {
                    modal.getRoot().addClass('descriptionPopup');
            });

            function closePopup() {
                $(".modal").removeClass('show');
                $(".modal").addClass('hide');
                $(".modal-backdrop").removeClass('show');
                $(".modal-backdrop").addClass('hide');
                $("body").removeClass('modal-open');
            }
            $(document).keyup(function (e) {
                if (e.keyCode == 27) { // escape key maps to keycode `27`
                    closePopup();
                }
            });

            $(document).click(function (e) {
                let targ = e.target;
                if(targ.classList.contains("modal")){
                    closePopup();
                }
            });
        }
    };
});
