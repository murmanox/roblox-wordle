import Roact from '@rbxts/roact'
import { FontSpritesheet } from 'client/interface/font/font-spritesheet'
import { ValueOrBinding } from 'types/util/roact-types'

interface LetterImageProps {
	letter: string
	color: ValueOrBinding<Color3>
	transparency: ValueOrBinding<number>
	font: FontSpritesheet
}

const LetterImage = ({ letter, color, transparency, font }: LetterImageProps) => {
	const letterData = font.get(letter.upper())

	return (
		<frame
			Size={UDim2.fromScale(0.6, 0.6)}
			Position={UDim2.fromScale(0.5, 0.5)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Transparency={1}
		>
			<imagelabel
				BackgroundTransparency={1}
				Position={UDim2.fromScale(0.5, 0.5)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				ImageColor3={color}
				ImageTransparency={transparency}
				{...letterData}
			/>
		</frame>
	)
}

export default LetterImage
