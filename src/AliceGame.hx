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
		final resolvedClass = Type.resolveClass("scenestates.Scene_1_Awake_State");
		trace(resolvedClass);

		XmlScene.load("scenes/scene_0_choose_person.xml", (scene) -> {
			setScene(scene);
		});		

		// XmlScene.load("scenes/scene_0_choose_person.xml", (scene) -> {
		// 	setScene(scene);
		// });
	}
}
