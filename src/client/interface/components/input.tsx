import Roact from '@rbxts/roact'
import { hooked, useBinding } from '@rbxts/roact-hooked'
import remotes from 'shared/remotes'

const WORD_LENGTH = 5

const padding = new UDim(0, 5)
const placeholderMessage = 'Type Your Guess Here'

const formatArray = (arr: defined[]) => `[${arr.join(', ')}]`
const formatText = (str: string) => str.sub(1, WORD_LENGTH).lower().gsub(' ', '')[0]

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

interface Props {}

const TextInput = hooked<Props>((props) => {
	const [message, setMessage] = useBinding(placeholderMessage)

	return (
		<textbox
			Position={UDim2.fromScale(0.5, 0.75)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Size={UDim2.fromOffset(200, 35)}
			Font={'Cartoon'}
			TextScaled={true}
			BackgroundColor3={Color3.fromRGB(240, 240, 240)}
			PlaceholderColor3={Color3.fromRGB(130, 130, 130)}
			PlaceholderText={message}
			Text={''}
			Change={{
				Text: (rbx) => {
					rbx.Text = formatText(rbx.Text)
				},
			}}
			Event={{
				Focused: () => setMessage(''),
				FocusLost: (rbx, enterPressed) => {
					const text = rbx.Text
					setMessage(placeholderMessage)

					if (enterPressed) {
						rbx.Text = ''
						guessWord(text)
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
