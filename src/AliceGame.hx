import scenestates.SceneAwakeState;
import common.scene.XmlScene;
import common.Game;

// Основной класс игры
class AliceGame extends Game {
	// Конструктор
	public function new() {
		super();
	}

	// Запускает игру
	public function start() {		
		XmlScene.load("scenes/scene_1.xml", (scene) -> {
			scene.setState(new SceneAwakeState());
			setScene(scene);
		});				
	}
}
