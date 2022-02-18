export interface ITheme {
	match: Color3
	partial: Color3
	none: Color3
	default: Color3
	filledBorder: Color3
	emptyBorder: Color3
	lockedFont: Color3
	unlockedFont: Color3
	keyboard: Color3
	font: Font
}

type Font = 'arialBold' | 'adelleSans'
interface IFontData {
	letter: string
	x: number
	y: number
	width: number
	height: number
}

type IFont = IFontData[]
