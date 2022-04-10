import Roact, { Element } from '@rbxts/roact'
import { ThemeContext, themes } from 'client/interface/context/theme-context'
import Row from './row'

const makeElement = (
	word: string,
	matches: number[],
	partials: number[],
	length: number,
	locked: boolean
) => {
	return (
		<ThemeContext.Provider value={themes.light}>
			<Row length={length} partials={partials} locked={locked} matches={matches} word={word} />
		</ThemeContext.Provider>
	)
}

const makeElements = (words: string[], locked: boolean) => {
	const elems: Element[] = []
	for (const word of words) {
		elems.push(makeElement(word, [1, 2], [0], 5, locked))
	}
	elems.push(makeElement('testy', [], [], 5, true))
	return elems
}

const P = (props: { elems: Element[] }) => {
	return (
		<frame Size={UDim2.fromScale(1, 1)} Transparency={1}>
			<uilistlayout
				HorizontalAlignment={'Center'}
				VerticalAlignment={'Center'}
				Padding={new UDim(0, 5)}
			/>
			{...props.elems}
		</frame>
	)
}

export = (story: GuiBase2d) => {
	const handle = Roact.mount(<P elems={makeElements(['', '', ''], false)} />, story)

	let mounted = true
	task.delay(1.5, () => {
		for (let i = 1; i <= 5; i++) {
			task.wait(0.3)
			if (mounted)
				Roact.update(
					handle,
					<P
						elems={makeElements(['hello'.sub(0, i), 'atone'.sub(0, i), 'wordle'.sub(0, i)], false)}
					/>
				)
		}
		task.wait(0.5)
		if (mounted)
			Roact.update(handle, <P elems={makeElements(['hello', 'atone', 'wordle'], true)} />)
	})

	return () => {
		mounted = false
		Roact.unmount(handle)
	}
}
