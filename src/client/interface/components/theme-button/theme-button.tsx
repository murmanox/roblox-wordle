import Roact from '@rbxts/roact'
import { hooked } from '@rbxts/roact-hooked'
import { useSelector, useStore } from '@rbxts/roact-rodux-hooked'
import { GuiService } from '@rbxts/services'
import { IClientStore } from 'client/interface/store/rodux'

const inset = GuiService.GetGuiInset()[0]

interface Props {}

const ThemeButton = hooked<Props>((props) => {
	const store = useStore<IClientStore>()
	const state = useSelector((state: IClientStore) => state.theme)

	const text = state === 'dark' ? '🌛' : '☀️'

	return (
		<textbutton
			Text={text}
			Size={UDim2.fromOffset(32, 32)}
			Position={UDim2.fromOffset(104, 36 - inset.Y)}
			BorderSizePixel={0}
			FontSize={'Size18'}
			AnchorPoint={new Vector2(0, 1)}
			BackgroundTransparency={0.5}
			BackgroundColor3={new Color3()}
			AutoButtonColor={true}
			Event={{
				Activated: (rbx) => {
					store.dispatch({
						type: 'setTheme',
						theme: store.getState().theme === 'light' ? 'dark' : 'light',
					})
				},
			}}
		>
			<uipadding PaddingTop={new UDim(0, 2)} PaddingRight={new UDim(0, 1)} />
			<uicorner CornerRadius={new UDim(0.24, 0)} />
		</textbutton>
	)
})

export default ThemeButton
