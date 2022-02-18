import Roact from '@rbxts/roact'
import { hooked } from '@rbxts/roact-hooked'
import { Provider, useDispatch, useSelector, useStore } from '@rbxts/roact-rodux-hooked'
import { ThemeController } from 'client/interface/context/theme-context'
import { ClientStore, IClientStore } from 'client/interface/store/rodux'
import Grid from '../grid/grid'
import Keyboard from '../keyboard/keyboard'

const Guess = hooked(() => {
	const guesses = useSelector((state: IClientStore) => state.guesses)
	const word = useSelector((state: IClientStore) => state.word)

	return (
		<ThemeController>
			<frame Size={UDim2.fromScale(1, 1)} Transparency={1}>
				<uilistlayout HorizontalAlignment={'Center'} />
				<Grid guesses={guesses} current={word} />
				<Keyboard />
			</frame>
		</ThemeController>
	)
})

const App = hooked((props) => (
	<Provider store={ClientStore}>
		<Guess />
	</Provider>
))

export = App
