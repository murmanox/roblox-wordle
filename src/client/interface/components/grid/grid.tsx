import Roact, { Element } from '@rbxts/roact'
import { hooked } from '@rbxts/roact-hooked'
import { IGuess } from 'types/interfaces/guess-types'
import ResizeToParent from '../common/resize-to-parent'
import Row from '../row/row'

const GUESS_AMOUNT = 6

function createRows(amount: number, guesses: IGuess[], current: string, length: number): Element[] {
	// Create rows for previous guesses
	const rows = guesses.map((guess) => {
		return (
			<Row
				word={guess.word}
				matches={guess.matches}
				partials={guess.partials}
				length={length}
				locked={true}
			/>
		)
	})

	// Create rows for current guess
	if (rows.size() < amount) {
		rows.push(<Row word={current} length={length} locked={false} />)
	}

	// Create empty rows
	for (let i = rows.size(); i < amount; i++) {
		rows.push(<Row length={length} locked={false} />)
	}

	return rows
}

interface Props {
	guesses: IGuess[]
	current: string
	length: number
}

const Grid = hooked<Props>((props) => {
	return (
		<frame Size={new UDim2(1, 0, 1, -200)} Transparency={1}>
			<frame
				Transparency={1}
				Size={new UDim2(1, -10, 1, -10)}
				Position={UDim2.fromScale(0.5, 0.5)}
				AnchorPoint={new Vector2(0.5, 0.5)}
			>
				<frame
					Position={UDim2.fromScale(0.5, 0.5)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					AutomaticSize={'XY'}
					BorderSizePixel={0}
					BackgroundColor3={Color3.fromRGB(191, 125, 189)}
					BackgroundTransparency={1}
				>
					<ResizeToParent />
					<uilistlayout
						FillDirection={'Vertical'}
						Padding={new UDim(0, 5)}
						VerticalAlignment={'Center'}
						HorizontalAlignment={'Center'}
					/>
					{createRows(GUESS_AMOUNT, props.guesses, props.current, props.length)}
				</frame>
			</frame>
		</frame>
	)
})

export default Grid
