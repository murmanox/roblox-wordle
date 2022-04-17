import Roact from '@rbxts/roact'
import { hooked, useBinding } from '@rbxts/roact-hooked'
import { TextService } from '@rbxts/services'
import { fontSizeToNumber } from 'shared/utility/font/font-size-map'
import { RequireOptionalPropertiesOf } from 'types/util/partial'

interface Props {
	font?: Enum.Font
	fontSize?: Enum.FontSize
	fontColor?: Color3
	message: string
}

const DEFAULT_PROPS: RequireOptionalPropertiesOf<Props> = {
	font: Enum.Font.Arial,
	fontSize: Enum.FontSize.Size14,
	fontColor: new Color3(),
}

const VerticalResizingText = hooked<Props>((props) => {
	const { message, font, fontSize, fontColor } = { ...DEFAULT_PROPS, ...props }

	const [height, setHeight] = useBinding(fontSizeToNumber(fontSize))

	const getTextHeight = (instance: GuiBase2d) => {
		const width = instance.AbsoluteSize.X
		const fontSizeAsNumber = fontSizeToNumber(fontSize)
		const textLimits = new Vector2(width, math.huge)

		return TextService.GetTextSize(message, fontSizeAsNumber, font, textLimits).Y
	}

	return (
		<textlabel
			RichText={true}
			FontSize={fontSize}
			Font={font}
			TextColor3={fontColor}
			Size={height.map((v) => new UDim2(1, 0, 0, v))}
			TextXAlignment={'Left'}
			BackgroundTransparency={1}
			Text={message}
			TextWrapped={true}
			Change={{ AbsoluteSize: (rbx) => setHeight(getTextHeight(rbx)) }}
		/>
	)
})

export default VerticalResizingText
