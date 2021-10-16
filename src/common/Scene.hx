package common;

// Класс сцены
abstract class Scene {
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

	// Обрабатывает выход со сцены
	public abstract function leave():Void;
}
