import { loli } from '@rbxts/loli-tween-animator'
import Roact from '@rbxts/roact'
import {
	pure,
	useBinding,
	useContext,
	useEffect,
	useMutable,
	useRef,
	useState,
} from '@rbxts/roact-hooked'
import { ThemeContext } from 'client/interface/context/theme-context'
import { fonts } from 'client/interface/font'
import { ITheme } from 'types/interfaces/theme-types'

const getColour = (theme: ITheme, flipped: boolean, match: boolean, partial: boolean) => {
	if (flipped) {
		return match ? theme.match : partial ? theme.partial : theme.none
	} else {
		return theme.default
	}
}

interface Props {
	index: number
	letter: string
	match: boolean
	partial: boolean
	locked: boolean
}

const Tile = pure<Props>(({ index, letter, locked = false, match = false, partial = false }) => {
	const maxSize = useMutable(62).current
	const theme = useContext(ThemeContext)
	const [size, setSize] = useBinding(maxSize)

	const tileRef = useRef<ImageLabel>()
	const textRef = useRef<ImageLabel>()
	const borderRef = useRef<ImageLabel>()

	const [flipped, setFlipped] = useState(false)
	const [borderSize, setBorderSize] = useBinding(1)

	// Spin tile animation
	useEffect(() => {
		if (!locked) return

		const tween = loli.to(maxSize, {
			goal: 0,
			duration: 0.25,
			delay: index * 0.3,
			ease: 'power1.in',
			onUpdate: setSize,
			onComplete: () => setFlipped(true),
		})

		const tween2 = loli.to(0, {
			goal: maxSize,
			duration: 0.25,
			delay: 0.25 + index * 0.3,
			ease: 'power1.out',
			onUpdate: setSize,
		})

		const tweens = [tween, tween2]
		return () => tweens.forEach((tween) => tween.destroy())
	}, [locked])

	// New letter animation
	useEffect(() => {
		if (!locked && letter) {
			const text = textRef.getValue()!
			text.ImageTransparency = 1
			setBorderSize(1)

			loli.to(textRef.getValue()!, {
				duration: 0.15,
				goal: { ImageTransparency: 0 },
			})
			loli.to(0, {
				duration: 0.15,
				goal: 1,
				onUpdate: (value) => {
					const border = borderRef.getValue()
					if (border) {
						border.ImageColor3 = theme.emptyBorder.Lerp(theme.filledBorder, value)
					}
				},
			})
			loli.to(0, {
				duration: 0.15,
				delay: -0.05,
				ease: 'back.out(1.7)',
				goal: 1,
				onUpdate: (v) => {
					setBorderSize(math.max(v, 1))
				},
			})
		}
	}, [letter])

	const font = fonts[theme.font]
	const letterData = font.get(letter.upper())

	return (
		<imagelabel
			Ref={tileRef}
			Size={size.map((v) => UDim2.fromOffset(maxSize, v))}
			Position={UDim2.fromScale(0.5, 0.5)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BorderSizePixel={0}
			BackgroundColor3={getColour(theme, flipped, match, partial)}
		>
			<imagelabel
				Ref={borderRef}
				Size={UDim2.fromScale(1, 1)}
				BackgroundTransparency={1}
				Image={flipped ? '' : 'http://www.roblox.com/asset/?id=8700433277'}
				ImageColor3={letter !== '' ? theme.filledBorder : theme.emptyBorder}
				Position={UDim2.fromScale(0.5, 0.5)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BorderSizePixel={0}
			>
				<uiscale Scale={borderSize} />
			</imagelabel>
			<frame
				Size={UDim2.fromScale(0.6, 0.6)}
				Position={UDim2.fromScale(0.5, 0.5)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Transparency={1}
			>
				<imagelabel
					Ref={textRef}
					BackgroundTransparency={1}
					Position={UDim2.fromScale(0.5, 0.5)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BorderSizePixel={0}
					ImageColor3={flipped ? theme.lockedFont : theme.unlockedFont}
					{...letterData}
				></imagelabel>
			</frame>
		</imagelabel>
	)
})

export default Tile
