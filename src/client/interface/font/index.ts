import adelleSans from './fonts/adelle-sans'
import arialBold from './fonts/arial-bold'
import { FontSpritesheet } from './font-spritesheet'
import { Font } from 'types/interfaces/theme-types'

export const fonts: Record<Font, FontSpritesheet> = {
	adelleSans: new FontSpritesheet('rbxassetid://8737373918', adelleSans),
	arialBold: new FontSpritesheet('rbxassetid://8738855060', arialBold),
}
