package common.interactive;

import motion.Actuate;
import js.Browser;
import js.html.Element;

// Элемент прогресса ожидания ответа персонажа
class WaitPersonElement extends InteractiveElement {
	// Время ожидания  миллисекундах
	final waitTime:Float;

	// Обработчик окончания ожидания
	final onComplete:Void->Void;	

	var tickId = 0;

	// Обновляет
	private function update() {
		switch tickId {
			case 0:
				rootNode.innerText = ":--";
			case 1:
				rootNode.innerText = "-:-";
			case 2:
				rootNode.innerText = "--:";
		}

		tickId += 1;
		if (tickId > 2) 
			tickId = 0;
	}

	// Конструктор
	public function new(waitTime:Float, onComplete:Void->Void) {
		super();
		this.waitTime = waitTime;
		this.onComplete = onComplete;
	}

	// Создаёт элемент и возвращает корневой элемент
	public function render():Element {
		var mainNode = Browser.document.createDivElement();
		mainNode.innerText = "---";
		return mainNode;
	}

	// Запускает ожидание
	public function start() {
		var totalTime = 0.0;
		var intervalId = 0;
		var time = 0.0;
		final tickValue = 100;
		intervalId = Browser.window.setInterval(() -> {
			totalTime += tickValue;
			time += tickValue;
			if (totalTime >= waitTime) {
				Browser.window.clearInterval(intervalId);
				onComplete();
				remove();
			} else if (time >= 300) {
				time = 0;
				update();
			}
		}, tickValue);
	}
}
