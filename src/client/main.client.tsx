import Roact from '@rbxts/roact'
import { Players } from '@rbxts/services'
import remotes from 'shared/remotes'
import TextInput from './interface/components/input'

// Get current word from the server
remotes.Client.Get('getWord').CallServerAsync(5)

async function createUI() {
	const playerGui = Players.LocalPlayer.WaitForChild('PlayerGui') as PlayerGui

	const element = (
		<screengui>
			<TextInput />
		</screengui>
	)

	Roact.mount(element, playerGui)
}

createUI()
