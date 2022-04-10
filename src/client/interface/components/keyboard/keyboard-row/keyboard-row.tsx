import Roact from '@rbxts/roact'
import { hooked } from '@rbxts/roact-hooked'
import { useSelector } from '@rbxts/roact-rodux-hooked'
import { IClientStore } from 'client/interface/store/rodux'
import CommandKey from '../command-key'
import KeyboardKey from '../keyboard-key'

interface RowProps {
	letters: string[]
	enter?: boolean
	backspace?: boolean
	onKeyPressed?: (key: string) => void
	onEnterPressed?: () => void
	onBackspacePressed?: () => void
}

const KeyboardRow = hooked<RowProps>(
	({ letters, enter, backspace, onKeyPressed, onEnterPressed, onBackspacePressed }) => {
		const usedLetters = useSelector((state: IClientStore) => state.usedLetters)

		return (
			<frame AutomaticSize={'XY'} Transparency={1}>
				<uilistlayout
					FillDirection={'Horizontal'}
					Padding={new UDim(0, 6)}
					SortOrder={'LayoutOrder'}
				/>
				{enter && <CommandKey name={'enter'} onClick={() => onEnterPressed?.()} />}
				{letters.map((v) => {
					const used = usedLetters.find((letter) => letter.letter === v)
					return <KeyboardKey button={v} onClick={(v) => onKeyPressed?.(v)} used={used} />
				})}
				{backspace && <CommandKey name={'backspace'} onClick={() => onBackspacePressed?.()} />}
			</frame>
		)
	}
)

export default KeyboardRow
