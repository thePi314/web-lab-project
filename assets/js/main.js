/* Define SPA Eomponents */
let spa_controller = new SPA('root');

spa_controller.append(new ComponentHome());
spa_controller.append(new ComponentManual());
spa_controller.append(new ComponentAskMe());
spa_controller.append(new ComponentAbout());

spa_controller.init();

/* Load Main Events */
init_loadingLayer();
init_scroll_button();