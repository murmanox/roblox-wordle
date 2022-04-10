import Roact from '@rbxts/roact'
import { hooked } from '@rbxts/roact-hooked'
import { useStore, useDispatch } from '@rbxts/roact-rodux-hooked'
import { guessWord } from 'client/guess-word'
import { IClientStore, ClientStore } from 'client/interface/store/rodux'
import Row from './keyboard-row'

const layout = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']

interface Props {}

const Keyboard = hooked<Props>(() => {
	const store = useStore<IClientStore>()
	const dispatch = useDispatch<typeof ClientStore>()

	const onKeyPressed = (letter: string) => {
		dispatch({ type: 'addLetter', letter })
	}

	const onBackspacePressed = () => {
		dispatch({ type: 'backspace' })
	}

	return (
		<frame
			Transparency={1}
			BorderSizePixel={0}
			Position={UDim2.fromScale(0.5, 1)}
			Size={UDim2.fromScale(1, 1)}
			AnchorPoint={new Vector2(0.5, 1)}
		>
			<uipadding
				PaddingLeft={new UDim(0, 8)}
				PaddingRight={new UDim(0, 8)}
				PaddingBottom={new UDim(0, 8)}
			/>
			<uisizeconstraint MinSize={new Vector2(0, 200)} MaxSize={new Vector2(500, 200)} />
			<frame
				Position={UDim2.fromScale(0.5, 0.5)}
				AutomaticSize={'XY'}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Transparency={1}
			>
				<uilistlayout
					FillDirection={'Vertical'}
					VerticalAlignment={'Bottom'}
					HorizontalAlignment={'Center'}
					Padding={new UDim(0, 8)}
				/>
				<Row letters={[...layout[0]]} onKeyPressed={onKeyPressed} />
				<Row letters={[...layout[1]]} onKeyPressed={onKeyPressed} />
				<Row
					letters={[...layout[2]]}
					enter={true}
					backspace={true}
					onKeyPressed={onKeyPressed}
					onEnterPressed={guessWord}
					onBackspacePressed={onBackspacePressed}
				/>
			</frame>
		</frame>
	)
})

export default Keyboard
