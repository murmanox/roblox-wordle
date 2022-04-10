import Roact from '@rbxts/roact'
import { ValueOrBinding } from 'types/util/roact-types'

interface PaddingImageProps {
	color: ValueOrBinding<Color3>
	size: ValueOrBinding<UDim2>
	visible: boolean
}

const PaddingImage = ({ color, size, visible }: PaddingImageProps) => {
	return (
		<imagelabel
			Size={size}
			BackgroundTransparency={1}
			Image={'http://www.roblox.com/asset/?id=8700433277'}
			ImageColor3={color}
			Position={UDim2.fromScale(0.5, 0.5)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BorderSizePixel={0}
			ImageTransparency={visible ? 1 : 0}
		/>
	)
}

export default PaddingImage
