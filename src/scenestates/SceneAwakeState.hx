package scenestates;

import common.interactive.InteractiveSystem;
import common.scene.XmlSceneState;

// Состояние сцены Пробуждение
class SceneAwakeState extends XmlSceneState {    
    // Конструктор
    public function new() {        
    }

    public function addPersons() {
        final elizabeth = getPersonById("Elizabeth");
        final agata = getPersonById("Agata");

        interactive.addPersonPortrait(elizabeth);
        interactive.addPersonPortrait(agata);
    }
}