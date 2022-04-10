import Roact from '@rbxts/roact'
import { hooked, useContext } from '@rbxts/roact-hooked'
import { Provider, useSelector } from '@rbxts/roact-rodux-hooked'
import { ThemeContext, ThemeController } from 'client/interface/context/theme-context'
import { ClientStore, IClientStore } from 'client/interface/store/rodux'
import Keyboard from './keyboard'

const Background = hooked(() => {
	const theme = useContext(ThemeContext)
	return <frame Size={UDim2.fromScale(1, 1)} BackgroundColor3={theme.default} />
})

const KeyboardStoreWrapper = hooked(() => {
	return <Keyboard />
})

export = (story: GuiBase2d) => {
	const element = (
		<Provider store={ClientStore}>
			<ThemeController>
				<Background />
				<KeyboardStoreWrapper />
				<textbutton
					Position={UDim2.fromScale(0, 1)}
					AnchorPoint={new Vector2(0, 1)}
					Size={UDim2.fromOffset(50, 20)}
					Text="Theme"
					Event={{
						Activated: () =>
							ClientStore.dispatch({
								type: 'setTheme',
								theme: ClientStore.getState().theme === 'light' ? 'dark' : 'light',
							}),
					}}
				/>
			</ThemeController>
		</Provider>
	)
	const handle = Roact.mount(element, story)

	return () => {
		Roact.unmount(handle)
	}
}
