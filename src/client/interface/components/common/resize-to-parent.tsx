import Maid from '@rbxts/maid'
import Roact from '@rbxts/roact'
import { hooked, useBinding, useEffect, useMutable, useRef } from '@rbxts/roact-hooked'

interface Props {}

const calculateRatio = (scale: number, instance: Vector2, parent: Vector2): number => {
	// Get original size
	instance = instance.div(scale)

	if (instance.Y > parent.Y) {
		return parent.Y / instance.Y
	}

	return 1
}

const ResizeToParent = hooked<Props>(() => {
	const ref = useRef<UIScale>()
	const [scale, setScale] = useBinding(1)
	const maid = useMutable(new Maid()).current

	const updateScale = () => {
		maid.DoCleaning()
		const instance = ref.getValue()?.Parent
		const parent = instance?.Parent
		if (!instance || !instance.IsA('GuiBase2d') || !parent || !parent.IsA('GuiBase2d')) return

		const connection = parent.GetPropertyChangedSignal('AbsoluteSize').Connect(() => {
			const targetSize = instance.AbsoluteSize
			const parentSize = parent.AbsoluteSize
			print(`Size: ${targetSize}, Parent: ${parentSize}`)

			setScale(calculateRatio(scale.getValue(), targetSize, parentSize))
		})

		maid.GiveTask(connection)
	}

	useEffect(() => {
		updateScale()
		return () => maid.DoCleaning()
	})

	return (
		<uiscale
			Ref={ref}
			Scale={scale}
			Event={{
				AncestryChanged: () => {
					updateScale()
				},
			}}
		/>
	)
})

export default ResizeToParent
