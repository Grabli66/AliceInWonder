package scenestates;

import common.scene.XmlSceneState;

// Состояние сцены Выбора персонажа
class Scene_0_Choose_Person_State extends XmlSceneState {
	// Конструктор
	public function new() {}

	public function addUnknown() {
		final unknown = getPersonById("Unknown");
		interactive.addPersonPortrait(unknown);
	}

	public function addPersons() {
		final sofia = getPersonById("Sofia");
		interactive.addPersonPortrait(sofia, false);
	}
}
