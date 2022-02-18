import Roact from '@rbxts/roact'
import { hooked, useContext } from '@rbxts/roact-hooked'
import { ThemeContext } from 'client/interface/context/theme-context'

const layout = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']

interface Props {}

interface KeyProps {
	button: string
	onClick?: (letter: string) => void
}

const Key = hooked<KeyProps>(({ button, onClick }) => {
	const theme = useContext(ThemeContext)

	return (
		<textbutton
			Size={UDim2.fromOffset(43, 58)}
			Text={button.upper()}
			Font={'ArialBold'}
			FontSize={'Size14'}
			BackgroundColor3={theme.keyboard}
			TextColor3={theme.unlockedFont}
			// AutoButtonColor={false}
			Event={{
				Activated: (rbx, input) => {
					onClick && onClick(button)
				},
			}}
		>
			<uicorner CornerRadius={new UDim(0.12, 0)} />
		</textbutton>
	)
})

interface CommandKeyProps {
	name: 'enter' | 'backspace'
	onClick?: Callback
}

const CommandKey = hooked<CommandKeyProps>(({ name, onClick }) => {
	const theme = useContext(ThemeContext)

	return (
		<textbutton
			Size={UDim2.fromOffset(66, 58)}
			Text={name === 'enter' ? name.upper() : ''}
			Font={'ArialBold'}
			FontSize={'Size14'}
			BackgroundColor3={theme.keyboard}
			TextColor3={theme.unlockedFont}
			// AutoButtonColor={false}
			Event={{
				Activated: (rbx, input) => {
					onClick && onClick()
				},
			}}
		>
			<uicorner CornerRadius={new UDim(0.12, 0)} />
			<imagelabel
				BackgroundTransparency={1}
				Size={UDim2.fromScale(0.45, 0.45)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={UDim2.fromScale(0.5, 0.5)}
				Image={name === 'backspace' ? 'http://www.roblox.com/asset/?id=8754356964' : ''}
				ScaleType={'Fit'}
			/>
		</textbutton>
	)
})

interface RowProps {
	letters: string[]
	enter?: boolean
	backspace?: boolean
}

const Row = hooked<RowProps>(({ letters, enter, backspace }) => {
	return (
		<frame AutomaticSize={'XY'} Transparency={1}>
			<uilistlayout
				FillDirection={'Horizontal'}
				Padding={new UDim(0, 6)}
				SortOrder={'LayoutOrder'}
			/>
			{enter && <CommandKey name={'enter'} />}
			{letters.map((v) => (
				<Key button={v} onClick={print} />
			))}
			{backspace && <CommandKey name={'backspace'} />}
		</frame>
	)
})

const Keyboard = hooked<Props>((props) => {
	return (
		<frame
			Transparency={0.5}
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
				Transparency={1}
				Position={UDim2.fromScale(0.5, 0.5)}
				AutomaticSize={'XY'}
				AnchorPoint={new Vector2(0.5, 0.5)}
			>
				<uilistlayout
					FillDirection={'Vertical'}
					VerticalAlignment={'Bottom'}
					HorizontalAlignment={'Center'}
					Padding={new UDim(0, 8)}
				/>
				<Row letters={[...layout[0]]} />
				<Row letters={[...layout[1]]} />
				<Row letters={[...layout[2]]} enter={true} backspace={true} />
			</frame>
		</frame>
	)
})

export default Keyboard
