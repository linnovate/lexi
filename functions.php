<?php
add_action('customize_register','lexi_customize_register');

function lexi_customize_register( $wp_customize ) {

    $wp_customize->add_section(
        'lexi_display_options',
        array(
            'title'     => 'Display Options',
            'priority'  => 200
        )
    );

    $wp_customize->add_setting(
        'about_content',
        array(
            'type' => 'theme_mod',
            'capability' => 'edit_theme_options',
            'default'   => 'Some about content here...',
            'transport' => 'postMessage'
        )
    );

    $wp_customize->add_control( 'about_content', array(
        'type' => 'textarea',
        'section' => 'lexi_display_options',
        'label' => __( 'About content' ),
        'description' => __( 'This is the content displaying in About block' ),
    ) );

}

define('THEME_PRIMARY_MENU_NAME', 'primary');

add_action( 'after_setup_theme', function() {
    register_nav_menu( THEME_PRIMARY_MENU_NAME, __( 'Primary Menu') );
});


function get_theme_menu_data($name) {
    $menu_data = false;
    if (($locations = get_nav_menu_locations()) && isset($locations[$name])) {
        $menu = wp_get_nav_menu_object($locations[$name]);
        $menu_items = wp_get_nav_menu_items($menu->term_id);
        $base_url = site_url();
        if ($menu_items) {
            $menu_data = array_map(function ($val) use ($base_url) {
                return ['url' => preg_replace("~^$base_url~", "", $val->url) ?: '/', 'title' => $val->title];
            }, $menu_items);
        }
    }
    return $menu_data;
}