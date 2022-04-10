import { TypeChecks } from '@rbxts/gamejoy/out/Util'

export function toKeyCode(key: string): Enum.KeyCode {
	const result = opcall(() => {
		return (Enum.KeyCode as unknown as Record<string, Enum.KeyCode>)[key]
	})

	// Error when getting converting to KeyCode
	if (!result.success) {
		error(result.error)
	}

	// Result could be GetEnumItems instead of KeyCode
	if (!TypeChecks.isKeyCode(result.value)) {
		error(`${key} is not of type KeyCode`)
	}

	// Value is KeyCode
	return result.value
}
