package scenestates;

import common.scene.XmlSceneState;

// Состояние сцены Пролога с Софией
class Scene_0_Sofia_Prologue_State extends XmlSceneState {
	// Конструктор
	public function new() {}

	public function addClient() {
		final client = getPersonById("Client");
		interactive.addPersonPortrait(client);
	}

	public function addAdministrator() {
		final administrator = getPersonById("Administrator");
		interactive.addPersonPortrait(administrator);
	}
}
