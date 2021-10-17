package common.interactive;

import js.html.Element;
import js.Browser;

// Параметры конструктора
typedef ChooseElementConstructorParameters = {
	// Элементы выбора
	select:Array<String>,
	// Обработчик выбора
	onSelect:Int->Void
}

// Элемент выбора
class ChooseElement extends InteractiveElement {
	// Обрабатывает выбор
	final onSelect:Int->Void;

	// Варианты выбора
	final select:Array<String>;

	// Конструктор
	public function new(parameters:ChooseElementConstructorParameters) {
		super();
		this.onSelect = parameters.onSelect;
		this.select = parameters.select;
	}

	// Создаёт элемент
	function render():Element {
		var chooseNode = Browser.document.createDivElement();
		chooseNode.className = "choose-root";

		var i = 1;
		for (variant in select) {
			var node = Browser.document.createDivElement();
			node.innerText = '${i}. ${variant}';
			node.className = "choose-item";
			node.onclick = () -> {
				chooseNode.remove();
				onSelect(select.indexOf(variant));
			};
			chooseNode.appendChild(node);
			i += 1;
		}

		return chooseNode;
	}
}
