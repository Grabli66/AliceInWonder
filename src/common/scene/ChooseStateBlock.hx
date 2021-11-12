package common.scene;

// Блок с выбором ответов/действий
class ChooseStateBlock {
	// Действия Идентификатор -> Текст
	final actions:Map<String, String>;

	// Конструктор
	public function new(actions:Map<String, String>) {
		this.actions = actions;
	}

	// Удаляет действие по идентификатору
	public function removeAction(id:String) {
		actions.remove(id);
	}

	// Возвращает оставшиеся действия
	public function getActions():Map<String, String> {
		return actions;
	}
}
