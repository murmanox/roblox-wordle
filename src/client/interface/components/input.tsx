import Roact from '@rbxts/roact'
import { hooked, useBinding } from '@rbxts/roact-hooked'
import { formatArray, formatText } from 'shared/utility/format'
import remotes from 'shared/remotes'

const padding = new UDim(0, 5)
const defaultPlaceholder = 'Enter text here'

async function guessWord(word: string) {
	const response = await remotes.Client.Get('guessWord').CallServerAsync(word)

	if (!response.success) {
		warn(response.error)
		return
	}

	if (response.win) {
		print(`${word} is correct!`)
		return
	}

	print(`Correct values in position(s) ${formatArray(response.matches)}`)
	print(`Partial values in position(s) ${formatArray(response.partials)}`)
}

interface Props {
	placeholder?: string
	onChange?: (text: string) => void
	onComplete?: (text: string) => void
}

const TextInput = hooked<Props>((props) => {
	const [placeholder, setPlaceholder] = useBinding(props.placeholder ?? defaultPlaceholder)
	const [text, setText] = useBinding('')

	return (
		<textbox
			Position={UDim2.fromScale(0.5, 0.75)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Size={UDim2.fromOffset(200, 35)}
			Font={'Cartoon'}
			TextScaled={true}
			BackgroundColor3={Color3.fromRGB(240, 240, 240)}
			PlaceholderColor3={Color3.fromRGB(130, 130, 130)}
			ClearTextOnFocus={false}
			PlaceholderText={placeholder}
			Text={text}
			Change={{
				Text: (rbx) => {
					const oldText = text.getValue()
					const newText = formatText(rbx.Text)
					setText(newText)

					// Has the text changed
					if (oldText !== newText) {
						// Fire onChange callback
						props.onChange && props.onChange(newText)
					}
				},
			}}
			Event={{
				Focused: () => setPlaceholder(''),
				FocusLost: (rbx, enterPressed) => {
					const message = text.getValue()
					setPlaceholder(props.placeholder ?? defaultPlaceholder)

					if (enterPressed) {
						rbx.Text = ''
						props.onComplete && props.onComplete(message)
					}
				},
			}}
		>
			<uipadding PaddingLeft={padding} />
			<uipadding PaddingRight={padding} />
		</textbox>
	)
})

export default TextInput
