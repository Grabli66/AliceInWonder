package scenes;

import haxe.Template;
import motion.easing.Linear;
import motion.Actuate;
import common.interactive.TextElement;
import common.Scene;

// Сцена 1. Пробуждение
class Scene1_Awake extends Scene {
	// Обрабатывает вход в сцену
	public function enter() {
		interactive.setSceneTitle("Часть 1. Пробуждение");
		interactive.addText("Привет. Что тут?");

		interactive.addChoose({
			select: ["Кто Вы?", "Где я?"],
			onSelect: (index) -> {},
			onBeforeSelect: (index) -> {
				interactive.addText("Отлично. Всё прекрасно");
			}
		});
	}
}
