package common.interactive;

import common.interactive.Color.ColorHelper;
import js.Browser;
import js.html.Element;

// Параметры конструктора
typedef PersonTextElementConstructorParameters = {
	nameColor:Color,
	name:String,
	text:String
}

// Прямая речь персонажа
class PersonTextElement extends InteractiveElement {
	// Параметры элемента
	final parameters:PersonTextElementConstructorParameters;

	// Конструктор
	public function new(parameters:PersonTextElementConstructorParameters) {
		super();
		this.parameters = parameters;
	}

	// Создаёт элемент и возвращает корневой элемент
	public function render():Element {
		var mainNode = Browser.document.createDivElement();
		var nameNode = Browser.document.createSpanElement();
		var textNode = Browser.document.createSpanElement();
		var sepNode = Browser.document.createSpanElement();

		mainNode.className = "person-text";
		final color = ColorHelper.getColorCss(parameters.nameColor);
		nameNode.innerText = parameters.name.toUpperCase();
		nameNode.className = 'name ${color}';

		sepNode.className = "separator";
		sepNode.innerText = "-";

		textNode.innerText = '"' + parameters.text + '"';
		textNode.className = "text";

		mainNode.appendChild(nameNode);
		mainNode.appendChild(sepNode);
		mainNode.appendChild(textNode);

		return mainNode;
	}
}
