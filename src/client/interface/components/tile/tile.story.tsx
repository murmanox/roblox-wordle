import Roact from '@rbxts/roact'
import { ThemeContext, themes } from 'client/interface/context/theme-context'
import Tile from './tile'

const makeElement = (letter = '', locked = false) => {
	return (
		<ThemeContext.Provider value={themes.light}>
			<Tile letter={letter} match={true} partial={false} index={0} locked={locked} length={1} />
		</ThemeContext.Provider>
	)
}

export = (story: GuiBase2d) => {
	const element = makeElement()
	const handle = Roact.mount(element, story)

	let mounted = true
	task.delay(1.5, () => {
		if (mounted) Roact.update(handle, makeElement('a'))
		task.wait(1.5)
		if (mounted) Roact.update(handle, makeElement('a', true))
	})

	return () => {
		mounted = false
		Roact.unmount(handle)
	}
}
