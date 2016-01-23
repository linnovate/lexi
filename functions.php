<?php
add_action('customize_register', 'lexi_customize_register');
add_action("admin_menu", "setup_theme_admin_page");

function lexi_customize_register($wp_customize)
{

    $wp_customize->add_section(
        'lexi_display_options',
        array(
            'title' => 'Display Options',
            'priority' => 200
        )
    );

    $wp_customize->add_setting(
        'about_content',
        array(
            'type' => 'theme_mod',
            'capability' => 'edit_theme_options',
            'default' => 'Some about content here...',
            'transport' => 'postMessage'
        )
    );

    $wp_customize->add_control('about_content', array(
        'type' => 'textarea',
        'section' => 'lexi_display_options',
        'label' => __('About content'),
        'description' => __('This is the content displaying in About block'),
    ));

}

define('THEME_PRIMARY_MENU_NAME', 'primary');

add_action('after_setup_theme', function () {
    register_nav_menu(THEME_PRIMARY_MENU_NAME, __('Primary Menu'));
});


function get_theme_menu_data($name)
{
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

function setup_theme_admin_page()
{
    add_submenu_page('options-general.php',
        'Theme admin options', 'Theme options', 'manage_options',
        'theme-admin-options', 'theme_admin_options_page');
}

function theme_admin_options_page()
{
    if (isset($_POST["update_settings"])) {
        $sample_option_value = esc_attr($_POST["sample_option"]);
        $updated = update_option("lexi_theme_sample_option", $sample_option_value);
        ?>
        <div class="<?=$updated ? 'updated' : 'error'?> notice is-dismissible">
            <p><strong><?=$updated ? 'Settings saved' : 'Settings has not been saved'?></strong></p>
            <button type="button" class="notice-dismiss">
                <span class="screen-reader-text">Dismiss this notice.</span>
            </button>
        </div>
        <?php
    }
    $sample_option_value = get_option("lexi_theme_sample_option");
    ?>
    <div class="wrap">
        <h2>Theme admin options</h2>
        <form method="POST" action="">
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">
                        <label for="num_elements">
                            Sample theme option:
                        </label>
                    </th>
                    <td>
                        <input type="text" name="sample_option" value="<?= $sample_option_value ?>" size="25"/>
                    </td>
                </tr>
            </table>
            <input type="submit" class="button button-primary" name="update_settings" value="Save"/>
        </form>
    </div>
    <?php
}
