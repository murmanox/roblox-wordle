import Roact from '@rbxts/roact'
import { hooked, useContext } from '@rbxts/roact-hooked'
import { Provider, useDispatch, useSelector, useStore } from '@rbxts/roact-rodux-hooked'
import { GuiService, RunService } from '@rbxts/services'
import { ThemeContext, ThemeController } from 'client/interface/context/theme-context'
import { ClientStore, IClientStore } from 'client/interface/store/rodux'
import Grid from '../grid/grid'
import { guessWord } from '../../../client-guess-word'
import Keyboard from '../keyboard/keyboard'
import TextInput from '../text-input'
import ThemeButton from '../theme-button/theme-button'

const isStudio = RunService.IsStudio()
const inset = GuiService.GetGuiInset()[0]

const Guess = hooked(() => {
	const guesses = useSelector((state: IClientStore) => state.guesses)
	const word = useSelector((state: IClientStore) => state.word)
	const length = useSelector((state: IClientStore) => state.length)

	return (
		<frame Size={UDim2.fromScale(1, 1)} Transparency={1}>
			<uilistlayout HorizontalAlignment={'Center'} />
			<Grid guesses={guesses} current={word} length={length} />
			<Keyboard />
		</frame>
	)
})

/**
 * Ugly code that will display a Textbox over the keyboard in studio mode.
 * This is because some keys won't work properly with ContextActionService in studio.
 */
const StudioUI = hooked(() => {
	const { word, length } = useSelector((state: IClientStore) => ({
		word: state.word,
		length: state.length,
	}))

	const dispatch = useDispatch<typeof ClientStore>()

	return (
		<>
			{isStudio && (
				<TextInput
					text={word}
					length={length}
					native={{
						Position: UDim2.fromScale(0.5, 1),
						AnchorPoint: new Vector2(0.5, 1),
						Size: UDim2.fromOffset(200, 35),
					}}
					onChange={(text) => {
						dispatch({ type: 'setWord', word: text })
					}}
					onComplete={guessWord}
				/>
			)}
		</>
	)
})

const Background = hooked(() => {
	const theme = useContext(ThemeContext)
	return (
		<frame
			Size={new UDim2(2, 0, 2, inset.Y)}
			BackgroundColor3={theme.default}
			Position={UDim2.fromScale(0.5, 0.5)}
			AnchorPoint={new Vector2(0.5, 0.5)}
		/>
	)
})

const App = hooked((props) => (
	<Provider store={ClientStore}>
		<ThemeController>
			<Background />
			<ThemeButton />
			<Guess />
			<StudioUI />
		</ThemeController>
	</Provider>
))

export = App
