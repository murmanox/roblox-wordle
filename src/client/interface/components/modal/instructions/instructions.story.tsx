import Roact from '@rbxts/roact'
import { ThemeContext, themes } from 'client/interface/context/theme-context'
import InstructionsModal from './instructions'

export = (story: GuiBase2d) => {
	const handle = Roact.mount(
		<ThemeContext.Provider value={themes.light}>
			<InstructionsModal />
		</ThemeContext.Provider>,
		story
	)

	return () => {
		Roact.unmount(handle)
	}
}
