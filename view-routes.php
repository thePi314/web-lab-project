<?php
    // View Routes
    Flight::route('/', function(){
        include VIEW_DIR.'index.html';
    });

    // Components Routes
    Flight::route('/components/*', function(){
        include VIEW_DIR.substr($_SERVER['REQUEST_URI'],1).'.html';
    });
?>