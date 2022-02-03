import Roact from '@rbxts/roact'
import App from './app'

export = (story: GuiBase2d) => {
	const handle = Roact.mount(<App />, story)

	return () => {
		Roact.unmount(handle)
	}
}
