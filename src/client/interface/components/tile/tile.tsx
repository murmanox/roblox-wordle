import { loli } from '@rbxts/loli-tween-animator'
import Roact from '@rbxts/roact'
import { pure, useBinding, useContext, useEffect, useMutable, useState } from '@rbxts/roact-hooked'
import { ThemeContext } from 'client/interface/context/theme-context'
import { fonts } from 'client/interface/font'
import { ITheme } from 'types/interfaces/theme-types'
import PaddingImage from './border-image'
import LetterImage from './letter-image'

const useLockTile = (locked: boolean, index: number, length: number, onLocked?: Callback) => {
	const [tileSize, setTileSize] = useBinding(1)
	const [flipped, setFlipped] = useState(false)
	const initial = useMutable(locked).current

	// Spin tile animation
	useEffect(() => {
		if (!locked) return

		const tween = loli.to(1, {
			goal: 0,
			duration: 0.25,
			delay: index * 0.3,
			ease: 'power1.in',
			onUpdate: setTileSize,
			onComplete: () => setFlipped(true),
		})

		const tween2 = loli.to(0, {
			goal: 1,
			duration: 0.25,
			delay: 0.25 + index * 0.3,
			ease: 'power1.out',
			onUpdate: setTileSize,
			onComplete: () => {
				if (locked === initial) return
				if (index !== length - 1) return
				if (!onLocked) return
				onLocked()
			},
		})

		const tweens = [tween, tween2]
		return () => tweens.forEach((tween) => tween.destroy())
	}, [locked])

	return { tileSize, flipped }
}

const useNewLetter = (locked: boolean, letter: string) => {
	const [borderSize, setBorderSize] = useBinding(UDim2.fromScale(1, 1))
	const [borderColor, setBorderColor] = useBinding(0)
	const [letterTransparency, setLetterTransparency] = useBinding(0)

	// New letter animation
	useEffect(() => {
		if (locked || letter === '') return

		// Tween letter transparency
		loli.to(1, {
			duration: 0.15,
			goal: 0,
			onUpdate: setLetterTransparency,
		})

		// Tween border colour
		loli.to(0, {
			duration: 0.15,
			goal: 1,
			onUpdate: setBorderColor,
		})

		// Tween size of border
		loli.to(0, {
			duration: 0.15,
			delay: -0.05,
			ease: 'back.out(1.7)',
			goal: 1,
			onUpdate: (v) => {
				const size = UDim2.fromScale().Lerp(UDim2.fromScale(1, 1), math.max(v, 1))
				setBorderSize(size)
			},
		})
	}, [letter])

	return { borderSize, borderColor, letterTransparency }
}

const getColour = (theme: ITheme, flipped: boolean, match: boolean, partial: boolean) => {
	if (flipped) {
		return match ? theme.match : partial ? theme.partial : theme.none
	} else {
		return theme.default
	}
}

interface Props {
	index: number
	length: number
	letter: string
	match: boolean
	partial: boolean
	locked: boolean
	onLocked?: Callback
}

const Tile = pure<Props>((props) => {
	const { index, letter, locked = false, match = false, partial = false, length, onLocked } = props

	const minSize = useMutable(UDim2.fromOffset(62, 0)).current
	const maxSize = useMutable(UDim2.fromOffset(62, 62)).current
	const theme = useContext(ThemeContext)

	const { borderSize, borderColor, letterTransparency } = useNewLetter(locked, letter)
	const { tileSize, flipped } = useLockTile(locked, index, length, onLocked)

	return (
		<imagelabel
			Size={tileSize.map((alpha) => minSize.Lerp(maxSize, alpha))}
			Position={UDim2.fromScale(0.5, 0.5)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BorderSizePixel={0}
			BackgroundColor3={getColour(theme, flipped, match, partial)}
		>
			<PaddingImage
				visible={flipped}
				color={borderColor.map((v) => theme.emptyBorder.Lerp(theme.filledBorder, v))}
				size={borderSize}
			/>
			<LetterImage
				letter={letter}
				color={flipped ? theme.lockedFont : theme.unlockedFont}
				transparency={letterTransparency}
				font={fonts[theme.font]}
			/>
		</imagelabel>
	)
})

export default Tile
