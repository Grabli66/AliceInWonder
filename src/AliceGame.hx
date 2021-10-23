import scenes.Scene1_Awake;
import common.Game;

// Основной класс игры
class AliceGame extends Game {	
	// Конструктор
	public function new() {
		super();
	}

	// Запускает игру
	public function start() {
		final scene1 = new Scene1_Awake();
		setScene(scene1);
	}
}
