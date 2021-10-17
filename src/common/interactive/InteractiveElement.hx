package common.interactive;

import js.html.Element;

// Базовый интерактивный элемент
abstract class InteractiveElement {
	// Корневой элемент
	private var rootNode:Element;

	// Прозрачность
	var _opacity:Float = 1.0;

	public var opacity(get, set):Float;

	public function set_opacity(value:Float):Float {		
		_opacity = value;
		rootNode.style.opacity = Std.string(_opacity);
		return _opacity;
	}

	public function get_opacity():Float {
		return _opacity;
	}

	// Для внутреннего использования

	@:allow(common.interactive.InteractiveSystem)
	private function renderInternal():Element {
		rootNode = render();
		return rootNode;
	}

	// Конструктор
	public function new() {}

	// Создаёт элемент и возвращает корневой элемент
	public abstract function render():Element;

	// Удаляет
	public function remove() {
		rootNode.remove();
	}

	// Добавляет подчинённый элемент
	public function appendChild(child:InteractiveElement) {
		child.render();
		rootNode.appendChild(child.rootNode);
	}
}
