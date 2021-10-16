package scenes;

import common.Scene;

// Сцена 2 - День второй
class Scene2_DayTwo extends Scene {
	// Обрабатывает вход в сцену
	public function enter() {
		interactive.setSceneTitle("Часть 2. День второй");
        interactive.addText("В разработке.");
	}

	public function leave() {}
}
