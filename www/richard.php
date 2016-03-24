<?php

require_once( dirname(__FILE__) . '/wp-load.php' );

/**
 * Print shortcode in readable mode
 *
 * @global array $shortcode_tags List of shortcode tags and their callback hooks.
 *
 * @param string $content Content to search for shortcodes.
 */
function print_s( $content ) {
	$html = do_shortcode( $content );
	echo htmlspecialchars( $html );
}

function test_func( $atts ) {
	return '<div>Test</div>';
}
add_shortcode( 'test', 'test_func' );

print_s( '[test]' );
