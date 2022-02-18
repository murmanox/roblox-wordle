import Roact from '@rbxts/roact'
import Tile from './tile'

export = (story: GuiBase2d) => {
	const handle = Roact.mount(
		<Tile letter="a" match={true} partial={false} index={0} locked={true} />,
		story
	)

	return () => {
		Roact.unmount(handle)
	}
}
