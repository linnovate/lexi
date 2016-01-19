<?php
/**
 * @ Lamosty.com 2015
 */

wp_footer();

?>
<script>
    BlogInfo = {
        name: "<?php bloginfo('name'); ?>",
        description: "<?php bloginfo('description'); ?>",
    }
</script>
<script src="<?= get_template_directory_uri(); ?>/dist/bundle.js"></script>
</body>
</html>
