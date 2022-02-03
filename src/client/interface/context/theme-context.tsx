import Roact, { Children } from '@rbxts/roact'
import { hooked } from '@rbxts/roact-hooked'
import { useSelector } from '@rbxts/roact-rodux-hooked'
import { IClientStore } from '../store/rodux'

const randomColor3 = (): Color3 => new Color3(math.random(), math.random(), math.random())

const themeDark = {
	match: Color3.fromRGB(83, 141, 78),
	partial: Color3.fromRGB(181, 159, 59),
	none: Color3.fromRGB(58, 58, 60),
	default: Color3.fromRGB(18, 18, 19),
	filledBorder: Color3.fromRGB(86, 87, 88),
	emptyBorder: Color3.fromRGB(58, 58, 60),
	lockedFont: Color3.fromRGB(215, 218, 220),
	unlockedFont: Color3.fromRGB(255, 255, 255),
}

const themeRandom = {
	match: randomColor3(),
	partial: randomColor3(),
	none: randomColor3(),
	default: randomColor3(),
	filledBorder: randomColor3(),
	emptyBorder: randomColor3(),
	lockedFont: randomColor3(),
	unlockedFont: randomColor3(),
}

const themeLight = {
	match: Color3.fromRGB(106, 170, 100),
	partial: Color3.fromRGB(201, 180, 88),
	none: Color3.fromRGB(120, 124, 126),
	default: Color3.fromRGB(255, 255, 255),
	filledBorder: Color3.fromRGB(135, 138, 140),
	emptyBorder: Color3.fromRGB(211, 214, 218),
	lockedFont: Color3.fromRGB(255, 255, 255),
	unlockedFont: Color3.fromRGB(26, 26, 27),
}

export const themes = {
	dark: themeDark,
	light: themeLight,
	random: themeRandom,
}

export const ThemeContext = Roact.createContext(themeDark)

export const ThemeController = hooked((props) => {
	const theme = useSelector((state: IClientStore) => state.theme)

	return <ThemeContext.Provider value={themes[theme]}>{props[Children]}</ThemeContext.Provider>
})
