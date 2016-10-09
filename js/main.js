// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


jQuery(document).ready(function($) {

    $('.portfolio-item').each(function(i){
        setTimeout(function(){
            $('.portfolio-item').eq(i).addClass('is-visible');
            console.log(i);
        }, 200 * i);
    });

    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.menu-button'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });
      

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.menu-button').on('click', function(event) {
        event.preventDefault();
        $('.navigation').toggleClass('active');
        $('.menuImg').toggleClass('active');
        if ($('.navigation').hasClass('active')) {
                $('body').css('overflow', 'hidden');
                 $('.portfolio').css({
                    height: '100%'
                });
                $(this).removeClass('default').addClass('active');
            } else {
                $('body').css('overflow', 'auto');
                $('.portfolio').css({
                    height: 'auto'
                });
                $(this).removeClass('active').addClass('default');
                setTimeout(function() {
                   $('.menu-button').removeClass('default');
               }, 800);
            }
    });



    /*---------------------------
                                  Magnific popup
    ---------------------------*/
    $('.magnific').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',
        modal: false,

        closeBtnInside: true,
        preloader: false,
        
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });


    /*----------------------------
                              Slick slider
    -------------------------*/
    $('.column--slider').slick({
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true,
        arrows: false
    });

    /*----------------------------
                              Mix
    -------------------------*/
    if ( $('.mix-container').length > 0 ) {
        $('.mix-container').mixItUp({
            animation: {
                duration: 400,
                effects: 'fade translateZ(-360px) stagger(34ms)',
                easing: 'ease',
            },
            callbacks: {
                onMixEnd: function(state){
                    $('.scroll').perfectScrollbar('update'); 
                    console.log('end');
                }
            }
        });    
    }
    

    /*----------------------------
                              Scroll
    -------------------------*/
    if ( $('.scroll').length > 0 ) {
        $('.scroll').perfectScrollbar(); 
    }
    

    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.magnificPopup.open({
            items: {
              src: popup
            },
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            modal: false,
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        }, 0);
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        /* Act on the event */
        var data = $(this).serialize();
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            success: function(result){
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        })
        .always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
            });
        });
        
    });

}); // end file