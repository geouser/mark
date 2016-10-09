<?php
    /**
     *
     * Add theme support
     *
    */
    function template_settings() {
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'menus' );
        register_nav_menu('headerMenu', 'header navigation');

        //register_nav_menu( 'name', 'desc' );

        add_image_size( 'media_thumbnail', 650, 340, true ); // name, width, height, crop
        add_image_size( 'media_slide_thumbnail', 510, 320, true ); // name, width, height, crop
    }
    add_action( 'init', 'template_settings' ); // after_theme_setup

    function my_image_sizes($sizes) {
        $addsizes = array(
            "media_thumbnail" => __( "Media thumbnail" ),
            "media_slide_thumbnail" => __( "Media slide thumbnail" )
        );
        $newsizes = array_merge( $sizes, $addsizes );
        return $newsizes;
    }


    /**
     *
     * Initialization of scripts and stylesheets
     *
    */
    function custom_links() {
        wp_enqueue_style( 'general-css', get_template_directory_uri() . '/css/general.css'  );

        wp_enqueue_script( 'jquery-js', 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js', array(), '1.0.0', true  );
        wp_enqueue_script( 'jquery-ui', 'https://code.jquery.com/ui/1.12.1/jquery-ui.js', array(), '1.0.0', true  );
        wp_enqueue_script( 'magnific-js', 'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.0.0/jquery.magnific-popup.min.js', array(), '1.0.0', true  );
        wp_enqueue_script( 'slick-js', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.5.9/slick.min.js', array(), '1.0.0', true  );
        wp_enqueue_script( 'main-js', get_template_directory_uri() . '/js/main.js', array(), '1.0.0', true  );

        wp_localize_script('main-js', 'theme',
            array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'url' => get_template_directory_uri()
            )
        );

    }
    add_action( 'wp_enqueue_scripts', 'custom_links' );


    /**
     *
     * Adding google maps API key
     *
    */
    function my_acf_google_map_api( $api ){
        $api['key'] = 'AIzaSyB8OI63bD1KAI4MAo0yz7p0Fj-RiPEZYPk';
        return $api;
    }
    add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');



    /**
     *
     * Creates custom post type
     *
    */
    function create_vacancy() {
        register_post_type('vacancy', array(
          'labels' => array(
            'name'            => __( 'Vacancies', 'theme-domain' ),
            'singular_name'   => __( 'Vacancy', 'theme-domain'  ),
            'add_new'         => __( 'Add vacancy', 'theme-domain'  ),
            'add_new_item'    => __( 'Add vacancy', 'theme-domain'  ),
            'edit'            => __( 'Edit vacancy', 'theme-domain'  ),
            'edit_item'       => __( 'Edit vacancy', 'theme-domain'  ),
            'new_item'        => __( 'New vacancy', 'theme-domain'  ),
            'all_items'       => __( 'All vacancies', 'theme-domain'  ),
            'view'            => __( 'View vacancy', 'theme-domain'  ),
            'view_item'       => __( 'View vacancy', 'theme-domain'  ),
            'search_items'    => __( 'Search vacancies', 'theme-domain'  ),
            'not_found'       => __( 'Vacancies not found', 'theme-domain'  ),
        ),
        'public' => true, // show in admin panel?
        'menu_position' => 0,
        'supports' => array( 'title', 'editor'),
        'taxonomies' => array( '' ),
        'has_archive' => true,
        'capability_type' => 'post',
        'menu_icon'   => 'dashicons-megaphone',
        'rewrite' => array('slug' => 'vacancy'),
        ));
    }
    add_action( 'init', 'create_vacancy' );



    /**
     *
     * Adds Ajax suport on site
     *
    */
    function my_func_name() {
        global $post;

        /* do staff here... */

        // выход нужен для того, чтобы в ответе не было ничего лишнего, только то что возвращает функция
        wp_die();
    }
    add_action('wp_ajax_name', 'my_func_name');
    add_action('wp_ajax_nopriv_name', 'my_func_name');


    /**
     *
     * Adds capability to translate theme
     *
    */
    function my_theme_setup(){
        load_theme_textdomain( 'theme-domain', get_template_directory() . '/languages' );
    }
    add_action( 'after_setup_theme', 'my_theme_setup' );

?>
