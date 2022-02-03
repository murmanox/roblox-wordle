import Roact, { Children } from '@rbxts/roact'
import { hooked } from '@rbxts/roact-hooked'

const debugValue = false
export const DebugContext = Roact.createContext(debugValue)

export const DebugProvider = hooked((props) => {
	return <DebugContext.Provider value={debugValue}>{props[Children]}</DebugContext.Provider>
})
