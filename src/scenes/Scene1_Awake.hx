package scenes;

import common.interactive.PersonPortraitElement;
import common.Person;
import common.Scene;

// Сцена 1. Пробуждение
class Scene1_Awake extends Scene {
	// Стандартное время ожидания перед выводом речи
	// static inline final PERSON_WAIT = 2000;
	// // Стандартное долгое ожидание
	// static inline final LONG_WAIT = 10000;
	// Для оладки
	static inline final PERSON_WAIT = 100;
	static inline final LONG_WAIT = 100;

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

	// Действие когда доктор объясняет почему ноги и руки не двигаются
	private function actionWhatAboutMyArmsAndLegs() {
		interactive.addPersonText({
			person: unknownPerson1,
			text: "Элис, ты не помнишь что было вчера? Нам пришлось привязать тебя к больничной койке и вколоть транквилизаторы, что бы ты успокоилась.",
			waitTime: PERSON_WAIT,
			onWaitComplete: () -> {
				interactive.addChoose({
					select: [
						"Кто Вы?",
						"[Испугано] Привязать? Транквилизаторы? Где я? Это похищение?",
						"[Удивлённо] Кто такая Элис?",
						"[Кричать] Отвяжите меня немедленно!"
					],
					onSelect: processAnswer_1
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
				actionWhatAboutMyArmsAndLegs();
			// "Уходите, я хочу спать"
			case 2:
				interactive.addPersonText({
					person: unknownPerson1,
					text: "Не переживай, мы не надолго. Узнаем как ты себя чувствуешь и уйдём.",
					waitTime: PERSON_WAIT,
					onWaitComplete: () -> {
						interactive.addChoose({
							select: [
								"Кто Вы?",
								"Что с моими руками и ногами? Они не двигаются.",
								"[Кричать] Убирайтесь из моего дома!"
							],
							onSelect: processAnswer_2
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
									select: [
										"Кто Вы?",
										"Что с моими руками и ногами? Они не двигаются.",
										"[Раздражённо] Конечно я дома, где же мне ещё быть?"
									],
									onSelect: processAnswer_3
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

		switch index {
			// "[Удивлённо] Доктор? Я что, в больнице?"
			case 0:
				interactive.addPersonText({
					person: elizabetPerson,
					text: "Элис, ты в психиатрической больнице, в отделении интенсивной терапии. Я твой лечащий врач.",
					waitTime: PERSON_WAIT,
					onWaitComplete: () -> {
						interactive.addChoose({
							select: [
								"Кто такая Элис?",
								"Что я делаю в психиатрической больнице?",
								"Почему я не могу пошевелится?",
								"[Раздражённо] Что тут, мать вашу, происходит?"
							],
							onSelect: processDoctorHello_0
						});
					}
				});
			// "[Интеллект] Элизабет и Агата? Мы что в Англии? (Усмехнутся)"
			case 1:
			// "Дома, дайте отдохнуть."
			case 3:
			// "[Засмеятся] В дурдоме."
			case 4:
		}
	}

	// Обрабатывает ответы
	private function processDoctorHello_0(select:Array<String>, index:Int) {
		interactive.addPlayerText(select[index]);

		switch index {
			// "Кто такая Элис?"
			case 0:
				interactive.addPersonText({
					person: agataPerson,
					text: "Ты не помнишь как тебя зовут?",
					waitTime: PERSON_WAIT,
					onWaitComplete: () -> {
						interactive.addText("Доктор некоторое время в замешательстве смотрит на медсестру, потом её взгляд возвращается к Вам. В руках доктора планшет, видимо в нём информация с Вашей медицинской картой.");
						interactive.addWait(PERSON_WAIT, () -> {
							interactive.addPersonText({
								person: elizabetPerson,
								text: 'Элис Вайт. 23 года. Родилась в Саттон-Колфилд в 1998 году. Родители...',
								waitTime: PERSON_WAIT,
								onWaitComplete: () -> {
									interactive.addChoose({
										select: [],
										onSelect: processDoctorHello_0
									});
								}
							});
						});
					}
				});
			// "Что я делаю в психиатрической больнице?"
			case 1:
				interactive.addPersonText({
					person: elizabetPerson,
					text: "Прохожие нашли тебя стоящую на краю моста. Ты кричала, что \"дьявол хочет забрать твою душу\". Бригада скорой помощи сняла тебя с моста и привезла к нам в отделение.",
					waitTime: PERSON_WAIT,
					onWaitComplete: () -> {
						interactive.addPersonText({
							person: agataPerson,
							text: "Когда тебя доставили к нам в состоянии психоза, ты пыталась ударить меня ногой.",
							waitTime: PERSON_WAIT,
							onWaitComplete: () -> {
								interactive.addPersonText({
									person: elizabetPerson,
									text: '${agataPerson.name}, не надо пока об этом. Это мы обсудим на сеансах терапии.',
									waitTime: PERSON_WAIT,
									onWaitComplete: () -> {
										interactive.addChoose({
											select: [
												"Кто такая Элис?",
												"Но я не больна.",
												"Почему я не могу пошевелится?",
												"[Раздражённо] Что тут, мать вашу, происходит?"
											],
											onSelect: (_,_) -> {}
										});
									}
								});
							}
						});
					}
				});
			// "Почему я не могу пошевелится?"
			case 2:
			// "[Раздражённо] Что тут, мать вашу, происходит?"
			case 3:
		}
	}

	// Обрабатывает ответы
	private function processAnswer_1(select:Array<String>, index:Int) {
		interactive.addPlayerText(select[index]);

		switch index {
			// Кто Вы?
			case 0:
				actionDoctorHello();
			// "[Испугано] Привязать? Транквилизаторы? Где я? Это похищение?"
			case 1:
				interactive.addPersonText({
					person: elizabetPerson,
					text: 'Нет, что ты. Элис, ты в психиатрической больнице, в отделении интенсивной терапии. Я твой лечащий врач, ${elizabetPerson.fullName}. (Показывает на женщину рядом с собой) Это ${agataPerson.fullNameWithPosition}. Ты представляла опасность себе и окружающим. Нам пришлось тебя обездвижить.',
					waitTime: PERSON_WAIT,
					onWaitComplete: () -> {
						elizabethPortrait.person = elizabetPerson;
						agataPortrait.person = agataPerson;

						interactive.addPersonText({
							person: agataPerson,
							text: "Не волнуйся, если будешь вести себя спокойно, то завтра мы тебя отвяжем.",
							waitTime: PERSON_WAIT,
							onWaitComplete: () -> {
								interactive.addChoose({
									select: [
										"Кто такая Элис?",
										"Я спокойна, пожалуйста, отвяжите меня!",
										"[Раздражённо] Я спокойна, вашу мать! Отвяжите меня."
									],
									onSelect: (_, index) -> {}
								});
							}
						});
					}
				});
			case 2:
			case 3:
		}
	}

	// Обрабатывает ответы
	private function processAnswer_2(select:Array<String>, index:Int) {
		interactive.addPlayerText(select[index]);

		switch index {
			// "Кто Вы?"
			case 0:
				actionDoctorHello();
			// "Что с моими руками и ногами? Они не двигаются."
			case 1:
				actionWhatAboutMyArmsAndLegs();
			// "[Кричать] Убирайтесь из моего дома!"
			case 2:
				interactive.addPersonText({
					person: agataPerson,
					text: "[Сердито] Элис, перестань. Или мне придётся тебя успокоить.",
					waitTime: PERSON_WAIT,
					onWaitComplete: () -> {
						interactive.addChoose({
							select: ["Кто Вы?", "Кто такая Элис?", "[Кричать] Вон из моего дома!"],
							onSelect: (_, index) -> {}
						});
					}
				});
		}
	}

	// Обрабатывает ответы
	private function processAnswer_3(select:Array<String>, index:Int) {
		interactive.addPlayerText(select[index]);

		switch index {
			// "Кто Вы?"
			case 0:
				actionDoctorHello();
			// "Что с моими руками и ногами? Они не двигаются."
			case 1:
				actionWhatAboutMyArmsAndLegs();
			// "[Раздражённо] Конечно я дома, где же мне ещё быть?"
			case 2:
				interactive.addPersonText({
					person: unknownPerson2,
					text: "Ты не помнишь что было вчера?",
					waitTime: PERSON_WAIT,
					onWaitComplete: () -> {
						interactive.addPersonText({
							person: unknownPerson1,
							text: 'К сожалению ты не дома. Я ${elizabetPerson.fullNameWithPosition}. Это ${agataPerson.fullNameWithPosition} (показывает на женщину, стоящую рядом). Ты находишься в психиатрической больнице.',
							waitTime: PERSON_WAIT,
							onWaitComplete: () -> {
								elizabethPortrait.person = elizabetPerson;
								agataPortrait.person = agataPerson;
								interactive.addChoose({
									select: ["Почему я в психиатрической больнице?"],
									onSelect: (_, index) -> {}
								});
							}
						});
					}
				});
		}
	}
}
