import Roact from '@rbxts/roact'
import TextInput from './input'

export = (story: GuiBase2d) => {
	const handle = Roact.mount(<TextInput />, story)

	return () => {
		Roact.unmount(handle)
	}
}
