import { loli } from '@rbxts/loli-tween-animator'
import Roact from '@rbxts/roact'
import { hooked, useBinding, useEffect, useMutable, useRef } from '@rbxts/roact-hooked'
import { dejavuSans } from '../font'

const colours = {
	match: Color3.fromRGB(74, 173, 87),
	partial: Color3.fromRGB(217, 194, 74),
}

interface Props {
	index: number
	letter: string
	match: boolean
	partial: boolean
}

const Tile = hooked<Props>((props) => {
	const maxSize = useMutable(100).current
	const [size, setSize] = useBinding(maxSize)
	const ref = useRef<Frame>()

	useEffect(() => {
		loli
			.to(maxSize, {
				goal: 0,
				duration: 0.3,
				delay: 1 + props.index * 0.3,
				ease: 'power1.in',
				onUpdate: (value) => setSize(value),
			})
			.then(() => {
				const rbx = ref.getValue()
				if (!rbx) return

				if (props.match || props.partial) {
					rbx.BackgroundColor3 = props.match ? colours.match : colours.partial
				}

				return loli
					.to(0, {
						goal: maxSize,
						duration: 0.3,
						ease: 'power1.out',
						onUpdate: (value) => setSize(value),
					})
					.then()
			})
	})

	return (
		<frame
			Ref={ref}
			Size={size.map((v) => UDim2.fromOffset(maxSize, v))}
			Position={UDim2.fromScale(0.5, 0.5)}
			AnchorPoint={new Vector2(0.5, 0.5)}
		>
			<imagebutton
				ScaleType={'Stretch'}
				Image={dejavuSans[props.letter.lower()]}
				BackgroundTransparency={1}
				Size={UDim2.fromScale(0.6, 0.6)}
				Position={UDim2.fromScale(0.5, 0.5)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BorderSizePixel={0}
				Event={{
					Activated: (rbx) => {
						print(rbx.Size)
					},
				}}
			></imagebutton>
		</frame>
	)
})

export default Tile
