package common.interactive;

import js.html.Element;
import js.Browser;

// Параметры конструктора
typedef ChooseElementConstructorParameters = {
	// Элементы выбора
	select:Map<String, String>,
	// Обработчик выбора
	onSelect:String->Void
}

// Элемент выбора
class ChooseElement extends InteractiveElement {
	// Обрабатывает выбор
	final onSelect:String->Void;

	// Варианты выбора
	final select:Map<String, String>;

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
		for (item in select.keyValueIterator()) {
			var node = Browser.document.createDivElement();
			node.innerText = '${i}. ${item.value}';
			node.className = "choose-item";
			node.onclick = () -> {
				chooseNode.remove();
				onSelect(item.key);
			};
			chooseNode.appendChild(node);
			i += 1;
		}

		return chooseNode;
	}
}
