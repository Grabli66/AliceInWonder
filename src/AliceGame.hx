import scenestates.Scene_1_Awake_State;
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
		XmlScene.load("scenes/scene_1_awake.xml", (scene) -> {
			scene.setState(new Scene_1_Awake_State());
			setScene(scene);
		});				
	}
}
