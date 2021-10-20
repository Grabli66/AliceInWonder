package scenes;

import common.interactive.PersonPortraitElement;
import common.Person;
import common.Scene;

// Сцена 1. Пробуждение
class Scene1_Awake extends Scene {
	// Стандартное время ожидания перед выводом речи
	static inline final PERSON_WAIT = 0; // = 2000;

	// Стандартное долгое ожидание
	static inline final LONG_WAIT = 0; // = 10000;

	// Первая неизвестная
	final unknownPerson1 = new Person("ПЕРВАЯ НЕИЗВЕСТНАЯ", "doctor-elizabeth.jpg");

	// Вторая неизвестная
	final unknownPerson2 = new Person("ВТОРАЯ НЕИЗВЕСТНАЯ", "agata-portrait.jpg");

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
			waitTime: PERSON_WAIT,
			onWaitComplete: () -> {
				interactive.addWait(PERSON_WAIT, () -> {
					interactive.addText("Вы пытаетесь открыть глаза. Голова гудит, как от похмелья. Руками Вы пытаетесь дотянутся до глаз, но руки не поддаются. Пробуете пошевелить ногами - без результата. Становится страшно. Спустя несколько минут, Вам всё таки удаётся приоткрыть глаза. Ещё столько же потребовалось, что бы навести фокус на собеседника. Вы разглядели двух женщин. Их одежда очень похожа на больничные халаты. Возможно так и есть.");

					interactive.addWait(LONG_WAIT, () -> {
						agataPortrait = interactive.addPersonPortrait(unknownPerson2);
						interactive.addChoose({
							select: [
								"Кто вы?",
								"Что с моими руками и ногами? Они не двигаются.",
								"Уходите, я хочу спать",
								"[Раздражённо] Проваливайте! Что Вы делаете у меня дома?"
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
			waitTime: PERSON_WAIT,
			onWaitComplete: () -> {
				elizabethPortrait.person = elizabetPerson;
				agataPortrait.person = agataPerson;

				interactive.addChoose({
					select: [
						"[Удивлённо] Доктор? Я что, в больнице?",
						"[Интеллект] Элизабет и Агата? Мы что в Англии? (Усмехнутся)",
						"Дома, дайте отдохнуть.",
						"[Засмеятся] В дурдоме."
					],
					onSelect: processDoctorHello
				});
			}
		});
	}

	// Обрабатывает ответы
	private function processAnswer(select:Array<String>, index:Int) {
		interactive.addPlayerText(select[index]);

		switch (index) {
			// "Кто вы?"
			case 0:
				actionDoctorHello();
			// "Что с моими руками и ногами? Они не двигаются.",
			case 1:
				interactive.addPersonText({
					person: unknownPerson1,
					text: "Элис, ты не помнишь что было вчера? Нам пришлось привязать тебя к больничной койке и вколоть транквилизаторы, что бы ты успокоилась.",
					waitTime: PERSON_WAIT,
					onWaitComplete: () -> {
						interactive.addChoose({
							select: ["Кто Вы?", "Привязать? Транквилизаторы? Где я? Это похищение?", "Кто такая Элис?", "[Кричать] Отвяжите меня немедленно!"],
							onSelect: (_, index) -> {}
						});
					}
				});
			// "Уходите, я хочу спать"
			case 2:
				interactive.addPersonText({
					person: unknownPerson1,
					text: "Не переживай, мы не надолго. Узнаем как ты себя чувствуешь и уйдём.",
					waitTime: PERSON_WAIT,
					onWaitComplete: () -> {
						interactive.addChoose({
							select: ["Кто Вы?", "Что с моими руками и ногами? Они не двигаются."],
							onSelect: (_, index) -> {}
						});
					}
				});
			// "[Раздражённо] Проваливайте, что Вы делаете у меня дома?"
			case 3:
				interactive.addPersonText({
					person: unknownPerson1,
					text: "Пожалуйста, не нервничай. Мы зададим несколько вопросов и уйдём.",
					waitTime: PERSON_WAIT,
					onWaitComplete: () -> {
						interactive.addPersonText({
							person: unknownPerson2,
							text: "Ты действительно думаешь что находишься дома?.",
							waitTime: PERSON_WAIT,
							onWaitComplete: () -> {
								interactive.addChoose({
									select: ["Кто Вы?", "Что с моими руками и ногами? Они не двигаются."],
									onSelect: (_, index) -> {}
								});
							}
						});
					}
				});
		}
	}

	// Обрабатывает ответы
	private function processDoctorHello(select:Array<String>, index:Int) {
		interactive.addPlayerText(select[index]);
	}
}
