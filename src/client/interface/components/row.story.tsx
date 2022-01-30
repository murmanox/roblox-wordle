import Roact from '@rbxts/roact'
import Row from './row'

export = (story: GuiBase2d) => {
	const handle = Roact.mount(<Row word="atone" matches={[1, 2]} partials={[0]} />, story)

	return () => {
		Roact.unmount(handle)
	}
}
