package scenes;

import common.Scene;

// Сцена 1 - Размышления
class Scene1_Thoughts extends Scene {
	// Обрабатывает вход в сцену
	public function enter() {
		interactive.addText("Доктор и медсестра выходят из палаты. Выключают свет и слишите как они закрывают дверь в палату, как будто Вы можете самостоятельно отвязатся от кровати и убежать. Вы остаётесь лежать на кровати наедине со своими мыслями");
		interactive.setSceneTitle("Часть 1. Мысли");
		interactive.addPersonText({
			personName: "ВАШЕ СОБСТВЕННОЕ Я",
			text: "Что за чертовщина тут творится?"
		});

		interactive.addChoose([
			"Не знаю",
			"Похищение? Хотят выкуп?",
			"Переселение душ?",
			"Научный эксперемент?",
			"Я сошла с ума?"
		], processAnswer);
	}

	// Обрабатывает ответы
	private function processAnswer(index:Int) {
		switch index {
			// "Не знаю"
			case 0:
				interactive.addPersonText({
					personName: "ВАШЕ СОБСТВЕННОЕ Я",
					text: "Попробуй вспомнить что было вчера."
				});
				interactive.addChoose(["Я не помню", "Я была дома, так ведь?",], processAnswer_0);
			// "Похищение? Хотят выкуп?"
			case 1:
				interactive.addPersonText({
					personName: "ВАШЕ СОБСТВЕННОЕ Я",
					text: "Возможно. Но зачем весь этот цирк с больницей, врачами, санитарами?"
				});
			// Переселение душ?
			case 2:
				interactive.addPersonText({
					personName: "ВАШЕ СОБСТВЕННОЕ Я",
					text: "Слишком фантастично."
				});
			// Научный эксперемент?
			case 3:
				interactive.addPersonText({
					personName: "ВАШЕ СОБСТВЕННОЕ Я",
					text: "Похоже на правду. Думаешь они хотят убедить тебя, что ты другой человек?"
				});
			// "Я сошла с ума?"
			case 4:
				interactive.addPersonText({
					personName: "ВАШЕ СОБСТВЕННОЕ Я",
					text: "Это всё бы объяснило. Самое простое объяснение может быть самым верным."
				});
				interactive.addChoose([
					"А если это правда, что мне тогда делать?",
					"Но я не чувствую себя сумасшедшей",
					"Ни за что! Они не заставят меня признать, что я другой человек. Я знаю кто я и буду бится до конца"
				], processAnswer_4);
		}
	}

	// Обрабатывает ответы
	private function processAnswer_0(index:Int) {
		switch index {
			// "Я не помню"
			case 0:
				interactive.addPersonText({
					personName: "ВАШЕ СОБСТВЕННОЕ Я",
					text: "Тогда мы обречены."
				});
				processToEnd();
			// "Я была дома, так ведь?"
			case 1:
				interactive.addPersonText({
					personName: "ВАШЕ СОБСТВЕННОЕ Я",
					text: "Меня не спрашивай, я это ты."
				});
		}
	}

	// Обрабатывает ответы
	private function processAnswer_4(index:Int) {
		switch index {
			// "А если это правда, что мне тогда делать?"
			case 0:
				interactive.addPersonText({
					personName: "ВАШЕ СОБСТВЕННОЕ Я",
					text: "Может лечится? Выйдешь из больницы, выяснишь что произошло. Чем не план?"
				});
			// "Но я не чувствую себя сумасшедшей"
			case 1:
				interactive.addPersonText({
					personName: "ВАШЕ СОБСТВЕННОЕ Я",
					text: "Я тоже не чувствую себя сумасшедшим. Но это не значит, что это не возможно"
				});
			// "Ни за что! Они не заставят меня признать, что я другой человек. Я знаю кто я и буду бится до конца"
			case 2:
				interactive.addPersonText({
					personName: "ВАШЕ СОБСТВЕННОЕ Я",
					text: "В борьбе можно потерять всё что есть."
				});
				interactive.addChoose(["Ты вообще за кого?", "Не потеряю", "[Зло] Заткнись"], processAnswer_4_2);
		}
	}

	// Обрабатывает ответы
	private function processAnswer_4_2(index:Int) {
		switch index {
			// "Ты вообще за кого?"
			case 0:
				interactive.addPersonText({
					personName: "ВАШЕ СОБСТВЕННОЕ Я",
					text: "Конечно за тебя, но ты это я, а я не хочу потерять себя в войне за твою \"правду\"."
				});
			// "Не потеряю"
			case 1:
				interactive.addPersonText({
					personName: "ВАШЕ СОБСТВЕННОЕ Я",
					text: "Хорошо. Может попробуешь вспомнить, что было вчера?"
				});
			// "[Зло] Заткнись"
			case 2:
				interactive.addPersonText({
					personName: "ВАШЕ СОБСТВЕННОЕ Я",
					text: "..."
				});
		}
	}

	// Обрабатывает действия перед концом сцены
	private function processToEnd() {
		// Проверка на то что уже сходили или уже хотели

		interactive.addText("Вы чувствуете, что хотите в туалет.");
		interactive.addPersonText({
			personName: "ВАШЕ СОБСТВЕННОЕ Я",
			text: "Этого ещё не хватало!"
		});

        function piss() {
			interactive.addText("Чувствуете тепло, стекающее по ногам. Это так унизительно.");
			interactive.addPersonText({
				personName: "ВАШЕ СОБСТВЕННОЕ Я",
				text: "Как низко ты пала!"
			});
			interactive.addText("В таком состоянии Вы пытаетесь заснуть, что бы этот кошмар закончился.");
			interactive.addContinue(processEnd);
		}

		function endure() {
			interactive.addText("Чувствуете, что не вытерпите всю ночь");
			interactive.addPersonText({
				personName: "ВАШЕ СОБСТВЕННОЕ Я",
				text: "(Смеётся) Похоже выбора у тебя нет"
			});
			interactive.addChoose(["Помочится под себя"], (_) -> piss());
		}		

		interactive.addChoose(["Закричать", "Терпеть", "Помочится под себя"], (index) -> {
			switch index {
				case 0:
					interactive.addText("Вы кричите, но Вас никто не слышит, или не хотят слышать");
					interactive.addChoose(["Терпеть", "Помочится под себя"], (index2) -> {
						switch index2 {
							case 0:
								endure();
							case 1:
								piss();
						}
					});
				case 1:
					endure();
				case 2:
					piss();
			}
		});
	}

	// Обрабатывает конец сцены
	private function processEnd() {
		var scene2 = new Scene2_DayTwo();
		game.setScene(scene2);
	}

	// Обрабатывает выход со сцены
	public function leave() {}
}
