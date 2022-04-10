import Roact, { Element } from '@rbxts/roact'
import { hooked } from '@rbxts/roact-hooked'
import Tile from '../tile'

interface Props {
	word?: string
	matches?: number[]
	partials?: number[]
	length: number
	locked: boolean
}

const Row = hooked<Props>(({ length, locked = false, matches = [], partials = [], word = '' }) => {
	const letters: string[] = word !== undefined ? [...word] : []

	const elements: Element[] = []
	for (let i = 0; i < length; i++) {
		const match = (locked && matches && matches.includes(i)) || false
		const partial = (locked && partials && partials.includes(i)) || false

		elements.push(
			<Tile
				Key={i}
				letter={letters[i] ?? ''}
				match={match}
				partial={partial}
				locked={locked}
				index={i}
				length={length}
			/>
		)
	}

	return (
		<frame
			Position={UDim2.fromScale(0.5, 0.5)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			AutomaticSize={'X'}
			Size={UDim2.fromOffset(62, 62)}
			BorderSizePixel={0}
			BackgroundColor3={Color3.fromRGB(255, 112, 112)}
			BackgroundTransparency={1}
		>
			<uilistlayout
				FillDirection={'Horizontal'}
				Padding={new UDim(0, 5)}
				VerticalAlignment={'Center'}
				HorizontalAlignment={'Center'}
			/>
			{elements}
		</frame>
	)
})

export default Row
