import Roact from '@rbxts/roact'
import { hooked, useContext } from '@rbxts/roact-hooked'
import { ThemeContext } from 'client/interface/context/theme-context'
import { useBindAction } from 'client/interface/hooks/use-bind-action'

const keyToKeyCodeMap = {
	backspace: Enum.KeyCode.Backspace,
	enter: Enum.KeyCode.Return,
}

interface Props {
	name: 'enter' | 'backspace'
	onClick?: Callback
}

const CommandKey = hooked<Props>(({ name: button, onClick }) => {
	const theme = useContext(ThemeContext)

	const name = `key_${button}`
	const keys = [keyToKeyCodeMap[button]]
	useBindAction(name, keys, Enum.ContextActionPriority.High.Value, {
		Begin: () => {
			onClick && onClick(button)
			// Sink input so the player doesn't move or zoom camera when typing
			return Enum.ContextActionResult.Sink
		},
	})

	return (
		<textbutton
			Size={UDim2.fromOffset(66, 58)}
			Text={button === 'enter' ? button.upper() : ''}
			Font={'ArialBold'}
			FontSize={'Size14'}
			BackgroundColor3={theme.keyboard}
			TextColor3={theme.unlockedFont}
			Event={{
				Activated: () => onClick && onClick(),
			}}
		>
			<uicorner CornerRadius={new UDim(0.12, 0)} />
			<imagelabel
				BackgroundTransparency={1}
				Size={UDim2.fromScale(0.45, 0.45)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={UDim2.fromScale(0.5, 0.5)}
				Image={button === 'backspace' ? 'http://www.roblox.com/asset/?id=8754356964' : ''}
				ScaleType={'Fit'}
			/>
		</textbutton>
	)
})

export default CommandKey
