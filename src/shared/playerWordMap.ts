import { IPlayerGuessData } from 'types/interfaces/guess-types'

/** A map of players to the current words they have to guess */
export const playerWordMap = new Map<Player, IPlayerGuessData>() // TODO: use a global state for this
