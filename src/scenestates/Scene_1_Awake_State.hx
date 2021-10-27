package scenestates;

import common.scene.XmlSceneState;

// Состояние сцены Пробуждение
class Scene_1_Awake_State extends XmlSceneState {
	// Конструктор
	public function new() {}

	public function addFirstUnknown() {
		final unknown1 = getPersonById("Unknown1");
		interactive.addPersonPortrait(unknown1);
	}

	public function addSecondUnknown() {
		final unknown2 = getPersonById("Unknown2");
		interactive.addPersonPortrait(unknown2);
	}

    public function updateUnknownPersons() {
        final unknown1 = getPersonById("Unknown1");
        final unknown2 = getPersonById("Unknown2");

        final elizabeth = getPersonById("Elizabeth");
        final agata = getPersonById("Agata");

        interactive.setPersonPortrait(unknown1, elizabeth);
        interactive.setPersonPortrait(unknown2, agata);
    }
}
