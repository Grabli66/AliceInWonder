package scenes;

import common.interactive.PersonPortraitElement;
import common.Person;
import common.Scene;

// Сцена 1. Пробуждение
class Scene1_Awake extends Scene {
	// Стандартное время ожидания перед выводом речи
	final defaultWait = 1300;

	// Первая неизвестная
	final unknownPerson1 = new Person("НЕИЗВЕСТНАЯ", "doctor-elizabeth.jpg");

	// Вторая неизвестная
	final unknownPerson2 = new Person("НЕИЗВЕСТНАЯ", "agata-portrait.jpg");

	// Доктор Элизабет Томпсон
	final elizabetPerson = new Person("Элизабет", "doctor-elizabeth.jpg", {
		surname: "Томпсон",
		position: "доктор"
	});

	// Медсестра Агата
	final agataPerson = new Person("Агата", "agata-portrait.jpg", {
		surname: "Стоун",
		position: "медсестра"
	});

	// Портрет Элизабет
	var elizabethPortrait:PersonPortraitElement;

	// Портрет Агаты
	var agataPortrait:PersonPortraitElement;

	// Обрабатывает вход в сцену
	public function enter() {
		interactive.setSceneTitle("Часть 1. Пробуждение");
		interactive.addText("Ваше сознание постепенно возвращается из пустоты. Вы слышите приятный женский голос. Голос спокойный и не несёт в себе угрозы.");

		elizabethPortrait = interactive.addPersonPortrait(unknownPerson1);

		interactive.addPersonText({
			person: unknownPerson1,
			text: "Пожалуйста, просыпайся.",
		});

		interactive.addChoose({
			select: ["Кто вы?", "Уходите, я хочу спать", "Промолчать"],
			onSelect: processAnswer,
			onBeforeSelect: (_) -> {
				interactive.addText("Вы пытаетесь открыть глаза. Голова гудит, как от похмелья. Руками Вы пытаетесь дотянутся до глаз, но руки не поддаются. Пробуете пошевелить ногами - без результата. Становится страшно. Спустя несколько минут, Вам всё таки удаётся приоткрыть глаза. Ещё столько же потребовалось, что бы навести фокус на собеседника. Вы разглядели двух женщин. Их одежда очень похожа на больничные халаты. Возможно так и есть.");
				agataPortrait = interactive.addPersonPortrait(unknownPerson2);
			}
		});
	}

	// Действие, когда доктор представляется
	private function actionDoctorHello() {
		interactive.addPersonText({
			person: unknownPerson1,
			text: 'Я ${elizabetPerson.fullNameWithPosition}. Это ${agataPerson.fullNameWithPosition} (показывает на женщину, стоящую рядом). Ты знаешь, где находишься?',
			waitTime: defaultWait,
			onWaitComplete: () -> {
				elizabethPortrait.person = elizabetPerson;
				agataPortrait.person = agataPerson;

				interactive.addChoose({
					select: [
						"[Удивлённо] Доктор? Я что, в больнице?",
						"[Интеллект] Элизабет и Агата? Мы что в Англии? (Усмехнутся)",
						"Дома, дайте отдохнуть",
						"На работе. Я всегда сплю на работе",
						"На луне. А Вы как меня нашли?",
						"Если Вы доктор, то я Папа Римский",
						"[Засмеятся] В дурдоме"
					],
					onSelect: (index) -> {}
				});
			}
		});
	}

	// Обрабатывает ответы
	private function processAnswer(index:Int) {
		switch (index) {
			// "Кто вы?"
			case 0:
				actionDoctorHello();
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
