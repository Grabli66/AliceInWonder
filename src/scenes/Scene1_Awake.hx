package scenes;

import common.interactive.PersonPortraitElement;
import common.Person;
import common.Scene;

// Сцена 1. Пробуждение
class Scene1_Awake extends Scene {
	// Стандартное время ожидания перед выводом речи
	final defaultWait = 2000;

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
			waitTime: defaultWait,
			onWaitComplete: () -> {
				interactive.addWait(defaultWait, () -> {
					interactive.addText("Вы пытаетесь открыть глаза. Голова гудит, как от похмелья. Руками Вы пытаетесь дотянутся до глаз, но руки не поддаются. Пробуете пошевелить ногами - без результата. Становится страшно. Спустя несколько минут, Вам всё таки удаётся приоткрыть глаза. Ещё столько же потребовалось, что бы навести фокус на собеседника. Вы разглядели двух женщин. Их одежда очень похожа на больничные халаты. Возможно так и есть.");

					interactive.addWait(10000, () -> {
						agataPortrait = interactive.addPersonPortrait(unknownPerson2);
						interactive.addChoose({
							select: [
								"Кто вы?",
								"Уходите, я хочу спать",
								"[Раздражённо] Проваливайте, что Вы делаете у меня дома?"
							],
							onSelect: processAnswer,
						});
					});
				});
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
						"[Засмеятся] В дурдоме"
					],
					onSelect: (_, index) -> {}
				});
			}
		});
	}

	// Обрабатывает ответы
	private function processAnswer(select:Array<String>, index:Int) {
		switch (index) {
			// "Кто вы?"
			case 0:
				interactive.addPlayerText(select[index]);
				actionDoctorHello();
			// "Уходите, я хочу спать"
			case 1:
				interactive.addPlayerText(select[index]);
				interactive.addPersonText({
					person: unknownPerson1,
					text: "Не переживай, мы не надолго. Узнаем как ты себя чувствуешь и уйдём.",
					waitTime: 1300,
					onWaitComplete: () -> {
						interactive.addChoose({
							select: ["Кто Вы?"],
							onSelect: (_, index) -> {}
						});
					}
				});
			// "[Раздражённо] Проваливайте, что Вы делаете у меня дома?"
			case 2:
		}
	}
}
