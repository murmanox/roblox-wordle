import { useEffect } from '@rbxts/roact-hooked'
import { ContextActionService } from '@rbxts/services'

const toCallback = (callback: ContextObject): ContextCallback => {
	return (name, state, input) => {
		const cbfn = callback[state.Name]
		cbfn && cbfn(name, state, input)
	}
}

type t = Exclude<keyof typeof Enum.UserInputState, 'GetEnumItems'>
type ContextObject = Partial<Record<t, ContextCallback>>
type ContextCallback = (
	name: string,
	state: Enum.UserInputState,
	input: InputObject
) => Enum.ContextActionResult | void

export function useBindAction(
	name: string,
	keys: Enum.KeyCode[],
	priority: number,
	callback: ContextCallback | ContextObject
) {
	const contextCallback = typeIs(callback, 'function') ? callback : toCallback(callback)

	useEffect(() => {
		ContextActionService.BindActionAtPriority(name, contextCallback, false, priority, ...keys)
		return () => {
			ContextActionService.UnbindAction(name)
		}
	}, [])
}
