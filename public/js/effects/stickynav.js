/* Initialize sticky outside the event listener as a cached selector.
 * Also, initialize any needed variables outside the listener for 
 * performance reasons - no variable instantiation is happening inside the listener.
 */

var sticky = $('#sticky'),
    stickyClone,
    stickyTop = sticky.offset().top,
    scrollTop,
    scrolled = false,
    $window = $(window);

/* Bind the scroll Event */
$window.on('scroll', function (e) {
    scrollTop = $window.scrollTop();

    if (scrollTop >= stickyTop && !stickyClone) {
        /* Attach a clone to replace the "missing" body height */
        stickyClone = sticky.clone().prop('id', sticky.prop('id') + '-clone')
        stickyClone = stickyClone.insertBefore(sticky);
        sticky.addClass('fixed');
    } else if (scrollTop < stickyTop && stickyClone) {
        /* Since sticky is in the viewport again, we can remove the clone and the class */
        stickyClone.remove();
        stickyClone = null;
        sticky.removeClass('fixed');
    }
});