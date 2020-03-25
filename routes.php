<?php
    /*
     * This file conteins all routes for the project
     */

    // Warnings
    Flight::map('notFound', function(){
        // Display custom 404 page
        include VIEW_DIR.'skechy.html';
    });
    
    // Assets
    Flight::route('/js/*', function(){
        header('Content-Type: application/javascript');
        include JS_DIR.substr($_SERVER['REQUEST_URI'],4).'.js';
    });
    Flight::route('/font/*', function(){
        header('Content-Type: application/font-ttf');
        include FONT_DIR.substr($_SERVER['REQUEST_URI'],4).'.ttf';
    });
    Flight::route('/css/*', function(){
        header('Content-Type: text/css');
        include STYLE_DIR.substr($_SERVER['REQUEST_URI'],5).'.css';
    });
    Flight::route('/img/*', function(){
        header("Content-Type: image/png");
        include IMAGES_DIR.substr($_SERVER['REQUEST_URI'],5).'.png';
    });

    require_once './view-routes.php';
?>