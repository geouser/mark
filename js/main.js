// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};

function typing(){
    if ( $(".typing").length > 0 ) {
        var text = 'Hello^1000, \n';
        text = text+'I’m Mark Velmiskin.^1000 \n';
        text = text+'<span>UI^200/^200UX Designer.</span>';
        $(".typing").typed({
            strings: [text],
            typeSpeed: 40,
            startDelay: 2000,
        });    
    }
}
typing();

jQuery(document).ready(function($) {

    $('.portfolio-item').each(function(i){
        setTimeout(function(){
            $('.portfolio-item').eq(i).addClass('is-visible');
        }, 200 * i);
    });


    $( "body" ).delay( 500 ).queue(function(next) {
        $(this).css({
            opacity: '1',
            visibility: 'visible'
        });
        next(); 
    })

    if ( !$('body').hasClass('scroll') ) {
        $('html').css('overflow', 'hidden');
    }

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
                $('body').addClass('menu-open');
                $('body').css('overflow', 'hidden');
                $('.portfolio').css({
                    height: '100%'
                });
                if ( $('.scroll').length > 0 ) {
                    $('.scroll').perfectScrollbar('update'); 
                }
                $(this).removeClass('default').addClass('active');
            } else {
                $('body').removeClass('menu-open');
                $('body').css('overflow', 'auto');
                $('.portfolio').css({
                    height: 'auto'
                });
                if ( $('.scroll').length > 0 ) {
                    $('.scroll').perfectScrollbar('update'); 
                }
                $(this).removeClass('active').addClass('default');
                setTimeout(function() {
                   $('.menu-button').removeClass('default');
               }, 800);
            }
    });




    /*----------------------------
                              Slick slider
    -------------------------*/
    $('.column--slider').slick({
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000,
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
                }
            }
        });    
    }
    

    /*----------------------------
                              Scroll
    -------------------------*/
    if ( $('.scroll').length > 0 && !window.params.isMobile ) {
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