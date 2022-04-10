import Roact from '@rbxts/roact'
import { hooked, useContext, useEffect, useMutable, useState } from '@rbxts/roact-hooked'
import { ThemeContext } from 'client/interface/context/theme-context'
import { useBindAction } from 'client/interface/hooks/use-bind-action'
import { toKeyCode } from '../../../../../shared/utility/toKeyCode'

interface Props {
	button: string
	used?: { match?: boolean; partial?: boolean }
	onClick?: (letter: string) => void
}

const KeyboardKey = hooked<Props>(({ button, onClick, used }) => {
	const theme = useContext(ThemeContext)

	const initial = useMutable(used).current
	const [state, setState] = useState(used)

	const name = `key_${button}`
	const keys = [toKeyCode(button.upper())]
	useBindAction(name, keys, Enum.ContextActionPriority.High.Value, {
		Begin: () => {
			onClick && onClick(button)
			// Sink input so the player doesn't move or zoom camera when typing
			return Enum.ContextActionResult.Sink
		},
	})

	useEffect(() => {
		if (!used || initial) return
		task.delay(1.5, () => {
			setState(used)
		})
	}, [used])

	const backgroundColor = state
		? state.match
			? theme.match
			: state.partial
			? theme.partial
			: theme.none
		: theme.keyboard

	return (
		<textbutton
			Size={UDim2.fromOffset(43, 58)}
			Text={button.upper()}
			Font={'ArialBold'}
			FontSize={'Size14'}
			BackgroundColor3={backgroundColor}
			TextColor3={state ? theme.lockedFont : theme.unlockedFont}
			Event={{
				Activated: () => onClick && onClick(button),
			}}
		>
			<uicorner CornerRadius={new UDim(0.12, 0)} />
		</textbutton>
	)
})

export default KeyboardKey
