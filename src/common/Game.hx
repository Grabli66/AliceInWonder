package common;

// Базовый класс игры
abstract class Game {
	// Система для взаимодействия с игроком
	final interactive:InteractiveSystem;

	// Текущая сцена
	private var currentScene:Scene;

	// Конструктор
	public function new() {
		interactive = new InteractiveSystem();
	}

	// Запускает игру
	public abstract function start():Void;

	// Устанавливает сцену
	public function setScene(scene:Scene) {     
		scene.interactive = interactive;
		scene.game = this;
		
		if (currentScene != null)
			currentScene.leave();

		// Очищает
		scene.interactive.clear();		

		currentScene = scene;
		currentScene.enter();
	}
}
