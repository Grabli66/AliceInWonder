package common.interactive;

// Допустимые цвета
enum Color {
	Red;
	Orange;
	Blue;
	Grey;
}

class ColorHelper {
	// Возвращает CSS класс для цвета
	public static function getColorCss(color:Color):String {
		return color.getName().toLowerCase() + "-color";
	}
}
