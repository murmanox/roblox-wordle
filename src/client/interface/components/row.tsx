import Roact from '@rbxts/roact'
import { hooked } from '@rbxts/roact-hooked'
import Tile from './tile'

interface Props {
	word: string
	matches: number[]
	partials: number[]
}

const Row = hooked<Props>((props) => {
	const chars = [...props.word]

	return (
		<frame Position={UDim2.fromScale(0.5, 0.5)} AnchorPoint={new Vector2(0.5, 0.5)}>
			<uilistlayout
				FillDirection={'Horizontal'}
				Padding={new UDim(0, 5)}
				VerticalAlignment={'Center'}
				HorizontalAlignment={'Center'}
			/>
			{chars.map((char, i) => {
				const match = props.matches.includes(i)
				const partial = props.partials.includes(i)

				return <Tile letter={char} match={match} partial={partial} index={i} />
			})}
		</frame>
	)
})

export default Row
