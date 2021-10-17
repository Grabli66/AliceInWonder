package common.interactive;

import motion.Actuate;
import motion.easing.Linear;
import common.interactive.InteractiveElement;
import js.Browser;

// Параметры добавления текста персонажа
typedef AddPersonTextParameters = {
	text:String,
	?isYou:Bool,
	?personName:String,
	// Время ожидания перед выводом текста
	?waitTime:Float,
	// Обработчик после завершения ожидания
	?onWaitComplete:Void->Void
}

// Параметры для метода добавления элемента выбора
typedef ChooseMethodParameters = {
	// Варианты выбора
	select:Array<String>,
	// Обработчик выбора
	onSelect:Int->Void,
	// Обработчик перед добавлением выбора
	?onBeforeSelect:Int->Void
}

// Взаимодействия с игроком
class InteractiveSystem {
	// Заголовок сцены
	final sceneTitle:js.html.Element;

	// Главный контент
	final sceneContent:js.html.Element;

	// Список новых элементов
	var newElements = new Array<InteractiveElement>();

	// Обнавляет скроллинг что бы читалось
	private function updateScroll() {
		sceneContent.scrollTop = sceneContent.scrollHeight;
	}

	// Добавляет элемент
	private function addElement(element:InteractiveElement) {
		final node = element.renderInternal();
		sceneContent.appendChild(node);
		newElements.push(element);
		updateScroll();
	}

	// Делает элементы старыми, что бы новые
	private function makeElementsOld() {
		for (element in newElements) {
			Actuate.tween(element, 0.3, {opacity: 0.6}).ease(Linear.easeNone);
		}

		newElements = new Array<InteractiveElement>();
	}

	// Конструктор
	public function new() {
		sceneTitle = Browser.document.querySelector("#scene-title");
		sceneContent = Browser.document.querySelector("#scene-content");
	}

	// Очищает
	public function clear() {
		sceneContent.innerHTML = "";
		setSceneTitle("");
	}

	// Устанавливает заголовок сцены
	public function setSceneTitle(title:String) {
		sceneTitle.innerText = title;
	}

	// Добавляет текст
	public function addText(text:String):TextElement {
		var element = new TextElement(text);
		addElement(element);
		element.opacity = 0;
		Actuate.tween(element, 0.5, {opacity: 1.0}).ease(Linear.easeNone);
		return element;
	}

	// Добавляет прямую речь персонажа
	public function addPersonText(parameters:AddPersonTextParameters) {
		function add() {
			final element = new PersonTextElement({
				nameColor: parameters.isYou ? Color.Orange : Color.Blue,
				name: parameters.isYou ? "ВЫ" : parameters.personName,
				text: parameters.text
			});

			addElement(element);
			element.opacity = 0;
			Actuate.tween(element, 0.5, {opacity: 1.0}).ease(Linear.easeNone);
			updateScroll();
		}

		if (parameters.waitTime != null) {
			addWaitPerson(parameters.waitTime, () -> {
				add();
				if (parameters.onWaitComplete != null)
					parameters.onWaitComplete();
			});
		} else {
			add();
		}
	}

	// Добавляет выбор
	public function addChoose(parameters:ChooseMethodParameters):ChooseElement {
		final choose = new ChooseElement({
			select: parameters.select,
			onSelect: (index) -> {
				makeElementsOld();

				if (parameters.onBeforeSelect != null)
					parameters.onBeforeSelect(index);

				addPersonText({
					isYou: true,
					text: parameters.select[index]
				});
				parameters.onSelect(index);
			}
		});

		addElement(choose);
		return choose;
	}

	// Добавляет ожидание действия персонажа
	public function addWaitPerson(waitTime:Float, onComplete:Void->Void):WaitPersonElement {
		final node = new WaitPersonElement(waitTime, () -> {
			onComplete();
			updateScroll();
		});
		addElement(node);
		node.start();
		return node;
	}

	// Добавляет кнопку "Продолжить"
	public function addContinue(onClick:Void->Void) {
		var continueNode = Browser.document.createDivElement();
		continueNode.innerText = "<< ПРОДОЛЖИТЬ >>";
		continueNode.className = "continue-click";
		continueNode.onclick = () -> {
			onClick();
		};

		sceneContent.appendChild(continueNode);
		updateScroll();
	}
}
