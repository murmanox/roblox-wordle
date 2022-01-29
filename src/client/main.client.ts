import remotes from 'shared/remotes'

// Wrapper for remote to print error
const guess = (str: string) => {
	return remotes.Client.Get('guessWord')
		.CallServerAsync(str, 777)
		.then((response) => {
			if (!response.success) {
				print(response.error)
			}
		})
}

remotes.Client.Get('getRandomWord')
	.CallServerAsync(5)
	.then(() => guess('pickle'))
	.then(() => guess('white'))
	.then(() => guess('white'))
