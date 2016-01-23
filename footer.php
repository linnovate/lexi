<?php
/**
 * @ Lamosty.com 2015
 */

wp_footer();

?>
<script>
    BlogInfo = {
        WP_BLOG_NAME: "<?php bloginfo('name'); ?>",
        WP_BLOG_DESCRIPTION: "<?php bloginfo('description'); ?>",
        WP_HOME_URL: "<?= site_url() ?>",
        ABOUT_BLOCK_CONTENT: "<?=get_theme_mod('about_content') ?>"
    }
</script>
<script src="<?= get_template_directory_uri(); ?>/dist/bundle.js"></script>
</body>
</html>