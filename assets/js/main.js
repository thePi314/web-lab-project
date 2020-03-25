let spa_controller = new SPA('root');

spa_controller.append(new ComponentHome());
spa_controller.append(new ComponentManual());
spa_controller.append(new ComponentAskMe());
spa_controller.append(new ComponentAbout());

spa_controller.init();