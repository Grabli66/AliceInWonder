package common;

import common.scene.BaseScene;
import common.interactive.InteractiveSystem;

// Базовый класс игры
abstract class Game {
	// Система для взаимодействия с игроком
	final interactive:InteractiveSystem;

	// Текущая сцена
	private var currentScene:BaseScene;

	// Конструктор
	public function new() {
		interactive = new InteractiveSystem();
	}

	// Запускает игру
	public abstract function start():Void;

	// Устанавливает сцену
	public function setScene(scene:BaseScene) {     
		scene.interactive = interactive;
		scene.game = this;

		// Очищает
		scene.interactive.clear();		

		currentScene = scene;
		currentScene.enter();
	}
}
