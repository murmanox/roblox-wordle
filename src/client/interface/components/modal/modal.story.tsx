import Roact, { Portal } from '@rbxts/roact'
import { hooked, useState } from '@rbxts/roact-hooked'

let parent: GuiBase2d

interface Props {
	open: boolean
	onClose: Callback
}

const Modal = hooked<Props>(({ open, onClose }) => {
	if (!open) {
		return <></>
	}

	return (
		<Portal target={parent}>
			<frame Size={UDim2.fromScale(1, 1)} BackgroundColor3={new Color3()} Transparency={0.5} />
			<textbutton
				Text={'Close Modal'}
				Size={UDim2.fromOffset(75, 30)}
				Position={UDim2.fromOffset(20, 20)}
				Event={{ Activated: () => onClose() }}
			/>
		</Portal>
	)
})

const Button = hooked((props) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<textbutton
			Text={'Open Modal'}
			Size={UDim2.fromOffset(200, 75)}
			Position={UDim2.fromScale(0.5, 0.5)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Event={{ Activated: () => setIsOpen(true) }}
		>
			<Modal open={isOpen} onClose={() => setIsOpen(false)} />
		</textbutton>
	)
})

export = (story: GuiBase2d) => {
	parent = story
	const handle = Roact.mount(<Button />, story)

	return () => {
		Roact.unmount(handle)
	}
}
