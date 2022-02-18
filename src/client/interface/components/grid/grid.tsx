import Roact, { Element } from '@rbxts/roact'
import { hooked } from '@rbxts/roact-hooked'
import { IGuess } from 'types/interfaces/guess-types'
import Resize from '../resize'
import Row from './row'

const GUESS_AMOUNT = 6
const length = 5

function createRows(amount: number, guesses: IGuess[], current: string): Element[] {
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
	for (let i = rows.size() - 1; i < length; i++) {
		rows.push(<Row length={length} locked={false} />)
	}

	return rows
}

interface Props {
	guesses: IGuess[]
	current: string
}

const Grid = hooked<Props>((props) => {
	return (
		<frame
			Position={UDim2.fromScale(0.5, 0.5)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			AutomaticSize={'XY'}
			BorderSizePixel={0}
			BackgroundColor3={Color3.fromRGB(191, 125, 189)}
			BackgroundTransparency={1}
		>
			<uilistlayout
				FillDirection={'Vertical'}
				Padding={new UDim(0, 5)}
				VerticalAlignment={'Center'}
				HorizontalAlignment={'Center'}
			/>
			{createRows(GUESS_AMOUNT, props.guesses, props.current)}
		</frame>
	)
})

export default Grid