import Roact from '@rbxts/roact'
import { hooked } from '@rbxts/roact-hooked'
import { Provider, useDispatch, useSelector, useStore } from '@rbxts/roact-rodux-hooked'
import { ThemeController } from 'client/interface/context/theme-context'
import { ClientStore, IClientStore } from 'client/interface/store/rodux'
import Grid from '../grid'
import TextInput from '../input'

const Guess = hooked(() => {
	const guesses = useSelector((state: IClientStore) => state.guesses)
	const word = useSelector((state: IClientStore) => state.word)

	return (
		<ThemeController>
			<Grid guesses={guesses} current={word} />
			<TextInput />
		</ThemeController>
	)
})

const App = hooked((props) => (
	<Provider store={ClientStore}>
		<Guess />
	</Provider>
))

export = App
