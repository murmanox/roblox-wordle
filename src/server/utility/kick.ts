export enum KickCode {
	profileLoadFailure,
	profileReleased,
}

export namespace kickPlayer {
	export function profileError(player: Player, code: KickCode): void {
		player.Kick(
			"You've been kicked from the game due to an error with your profile data." +
				`Error Code: ${code}`
		)
	}
}
