import { IFont, IFontData } from 'types/interfaces/theme-types'

type FontResult = {
	Image: string
	Size: UDim2
	ImageRectSize: Vector2
	ImageRectOffset: Vector2
}

export class FontSpritesheet {
	private map = new Map<string, IFontData>()
	public image: string

	constructor(image: string, font: IFont) {
		this.image = image

		for (const letter of font) {
			this.map.set(letter.letter, letter)
		}
	}

	get(letter: string): FontResult {
		const font = this.map.get(letter)

		if (!font) {
			return {
				Image: '',
				Size: new UDim2(),
				ImageRectOffset: new Vector2(),
				ImageRectSize: new Vector2(),
			}
		}

		const width = font.width,
			height = font.height

		return {
			Image: this.image,
			Size: UDim2.fromScale(width / height, 1),
			ImageRectOffset: new Vector2(font.x, font.y),
			ImageRectSize: new Vector2(font.width, font.height),
		}
	}
}
