package scenes;

import common.Person;
import haxe.Template;
import motion.easing.Linear;
import motion.Actuate;
import common.interactive.TextElement;
import common.Scene;

// Сцена 1. Пробуждение
class Scene1_Awake extends Scene {
	// Первая неизвестная
	final unknownPerson1 = new Person("ДОКТОР ЭЛИЗАБЕТ ТОМПСОН", "doctor-elizabeth.jpg");

	// Вторая неизвестная
	final unknownPerson2 = new Person("МЕДСЕСТРА АГАТА СВИФТ", "agata-portrait.jpg");

	// Обрабатывает вход в сцену
	public function enter() {
		interactive.setSceneTitle("Часть 1. Пробуждение");
		interactive.addText("Ваше сознание постепенно возвращается из пустоты. Вы слышите приятный женский голос. Он спокойный и не несёт в себе угрозы.");

		interactive.addPersonPortrait(unknownPerson1);
		interactive.addPersonPortrait(unknownPerson2);

		interactive.addPersonText({
			person: unknownPerson1,
			text: "Пожалуйста, просыпайся.",
		});

		interactive.addChoose({
			select: ["Кто вы?", "Уходите, я хочу спать", "Промолчать"],
			onSelect: processAnswer,
			onBeforeSelect: (_) -> {
				interactive.addText("Вы с трудом открываете глаза. Сонными глазами пытаетесь разглядеть своего собеседника. Перед Вами стоят две женщины. Их одежда очень похожа на больничные халаты. Возможно это они и есть.");
			}
		});
	}

	// Обрабатывает ответы
	private function processAnswer(index:Int) {
		switch (index) {
			// "Кто вы?"
			case 0:
			// actionDoctorHello();
			// "Уходите, я хочу спать"
			case 1:
				interactive.addPersonText({
					person: unknownPerson1,
					text: "Извини, но тебе придётся проснутся.",
					waitTime: 1300,
					onWaitComplete: () -> {
						interactive.addChoose({
							select: ["Кто Вы?", "Не хочу, уходите.", "[Зло] Отвалите от меня."],
							onSelect: (index) -> {}
						});
					}
				});
			// "Промолчать"
			case 2:
				interactive.addText("Вы слышите как женщины переговариваются между собой.");
				interactive.addPersonText({
					person: unknownPerson1,
					text: "Вы уверены, что пациентка в сознании?"
				});
				interactive.addPersonText({
					person: unknownPerson2,
					text: "Да. Думаю она притворяется."
				});
				interactive.addText("Вы чуствуете как чья-то рука ложится Вам на плечё и пытается Вас разбудить.");
				interactive.addChoose({
					select: ["Ну ладно, я не сплю. Кто Вы?", "[Раздражённо] Отстаньте, я сплю", "Промолчать"],
					onSelect: (index) -> {}
				});
		}
	}
}
