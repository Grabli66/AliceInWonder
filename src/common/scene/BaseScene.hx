package common.scene;

import common.interactive.InteractiveSystem;

// Базовый класс класс сцены
abstract class BaseScene {
	// Основной класс игры
	@:allow(common.Game)
	private var game:Game;

	// Для взаимодействия с пользователем
	@:allow(common.Game)	
	private var interactive:InteractiveSystem;

	// Конструктор
	public function new() {}

	// Обрабатывает вход в сцену
	public abstract function enter():Void;
}
