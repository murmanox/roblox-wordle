import Roact from '@rbxts/roact'
import { Players } from '@rbxts/services'
import remotes from 'shared/remotes'
import App from './interface/components/app/app'

// Get current word from the server
remotes.Client.Get('getWord').CallServerAsync(5)

async function createUI() {
	const playerGui = Players.LocalPlayer.WaitForChild('PlayerGui') as PlayerGui

	const element = (
		<screengui IgnoreGuiInset={false}>
			<App />
		</screengui>
	)

	Roact.mount(element, playerGui)
}

createUI()
