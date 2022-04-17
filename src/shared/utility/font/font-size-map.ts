export function fontSizeToNumber<T extends Enum.FontSize>(fontSize: T | T['Name']): number {
	const fontString = typeIs(fontSize, 'EnumItem') ? fontSize.Name : fontSize
	const fontNumber = tonumber(fontString.match('%d+$')[0])

	if (fontNumber === undefined) {
		error(`Unable to get FontSize from ${fontSize}`)
	}

	return fontNumber
}
