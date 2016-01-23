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

