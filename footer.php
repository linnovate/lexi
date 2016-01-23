<?php
/**
 * @ Lamosty.com 2015
 */

wp_footer();

?>
<script>
    BlogData = {
        blogName: "<?php bloginfo('name'); ?>",
        blogDescription: "<?php bloginfo('description'); ?>",
        homeUrl: "<?= site_url() ?>",
        aboutContent: "<?= get_theme_mod('about_content') ?>",
        primaryMenuItems: <?= json_encode(get_theme_menu_data(THEME_PRIMARY_MENU_NAME)) ?>
    }
</script>
<script src="<?= get_template_directory_uri(); ?>/dist/bundle.js"></script>
</body>
</html>