import Roact from '@rbxts/roact'
import { hooked, useBinding } from '@rbxts/roact-hooked'
import { formatText } from 'shared/utility/format'

const padding = new UDim(0, 5)
const defaultPlaceholder = 'Enter text here'

interface Props {
	length?: number
	text?: string
	placeholder?: string
	onChange?: (text: string) => void
	onComplete?: (text: string) => void
	native?: Partial<InstanceProperties<TextBox>>
}

const TextInput = hooked<Props>((props) => {
	const { length } = props
	const format = formatText(length)

	const [placeholder, setPlaceholder] = useBinding(props.placeholder ?? defaultPlaceholder)
	const [text, setText] = useBinding(props.text ?? '')

	if (props.text !== undefined && props.text !== text.getValue()) {
		setText(props.text)
	}

	return (
		<textbox
			{...props.native}
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
					const newText = format(rbx.Text)
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
						props.onComplete && props.onComplete(message)
						rbx.Text = ''
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
