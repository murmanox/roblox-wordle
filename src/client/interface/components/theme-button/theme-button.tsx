import Roact from '@rbxts/roact'
import { hooked, Reducer, useReducer } from '@rbxts/roact-hooked'
import { useSelector, useStore } from '@rbxts/roact-rodux-hooked'
import { IClientStore } from 'client/interface/store/rodux'

type Action =
	| { type: 'MouseDown' }
	| { type: 'MouseUp' }
	| { type: 'MouseEnter' }
	| { type: 'MouseLeave' }

type State = { color: Color3; transparency: number }

const reducer: Reducer<State, Action> = (state, action) => {
	switch (action.type) {
		case 'MouseUp':
		case 'MouseEnter':
			return { color: new Color3(1, 1, 1), transparency: 0.9 }
		case 'MouseDown':
			return { color: new Color3(), transparency: 0.7 }
		case 'MouseLeave':
		default:
			return { color: new Color3(), transparency: 1 }
	}
}

const initialState = { color: new Color3(), transparency: 1 }

interface Props {}

const ThemeButton = hooked<Props>((props) => {
	const store = useStore<IClientStore>()
	const theme = useSelector((state: IClientStore) => state.theme)

	const text = theme === 'dark' ? '🌛' : '☀️'
	const [{ color, transparency }, dispatch] = useReducer(reducer, initialState)

	return (
		<textbutton
			Text=""
			Size={UDim2.fromOffset(32, 32)}
			Position={UDim2.fromOffset(104, 0)}
			AnchorPoint={new Vector2(0, 1)}
			BorderSizePixel={0}
			BackgroundTransparency={0.5}
			BackgroundColor3={new Color3()}
			AutoButtonColor={false}
			Event={{
				MouseEnter: () => dispatch({ type: 'MouseEnter' }),
				MouseLeave: () => dispatch({ type: 'MouseLeave' }),
				MouseButton1Down: () => dispatch({ type: 'MouseDown' }),
				MouseButton1Up: () => dispatch({ type: 'MouseUp' }),
				Activated: () => {
					store.dispatch({
						type: 'setTheme',
						theme: theme === 'light' ? 'dark' : 'light',
					})
				},
			}}
		>
			<textlabel
				FontSize={'Size18'}
				Text={text}
				Size={UDim2.fromScale(1, 1)}
				BackgroundTransparency={1}
			>
				<uipadding PaddingTop={new UDim(0, 2)} PaddingRight={new UDim(0, 1)} />
			</textlabel>
			<frame
				Size={UDim2.fromScale(1, 1)}
				BackgroundColor3={color}
				BackgroundTransparency={transparency}
			>
				<uicorner CornerRadius={new UDim(0.24, 0)} />
			</frame>
			<uicorner CornerRadius={new UDim(0.24, 0)} />
		</textbutton>
	)
})

export default ThemeButton
