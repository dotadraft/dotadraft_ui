# ![dotadraft logo](https://raw.githubusercontent.com/dotadraft/dotadraft_ui/master/assets/logo.png "Dotadraft")

- Skill stats for current draft
- AI predicted win rate advantage for the next skill pick (based on the heroes and already picked skills)
- AI predicted team win rate 
- Filter and sort skills by stats
- Show, filter and sort all skills and heroes by stats 

[How it works](https://www.youtube.com/watch?v=hCMO2ZYyIDU)

Need help? Join [Discord](https://discord.gg/ZNPM4AV2gh)

![dotadraft screenshot](https://raw.githubusercontent.com/dotadraft/dotadraft_ui/master/images/screenshot.png "Dotadraft")

## How to use

1. [Download latest release for your OS](https://github.com/dotadraft/dotadraft_ui/releases)
2. Install or unpack release (the windows installer is not signed yet)
3. Run dotadraft
4. Configure Dota 2 folder in settings for game state updates
5. Play Dota 2 Ability Draft
6. Press refresh skill hotkey (default F5) while drafting to show analysis (takes max 30 seconds)
7. Press focus hotkey (default F6) to hide and show the window
8. Profit

## FAQ

### The app is not starting correctly

Try the following steps

1. Quit the app (icon in systray - quit)
2. Delete C:\Users\<your_user>\AppData\Roaming\dotadraft
3. Restart the app

### I do not see all available skills in the draft table

Before refreshing the draft (default by pressing F5), make sure no skill/hero info boxes are obstructing the available skills in the pool and the drafted skills for each hero.

### After refreshing the skills I see an empty draft tabel

Setting Dota 2 to exclusive fullscreen and DX9 might cause issues.
If you encounter issues switch Dota 2 to DX11, Vulkan or OpenGL and use Borderless window or Desktop-friendly Fullscreen mode.

## Disclaimer

- Read about in Dotadraft application
- Use at own risk
- There will be bugs
- Dota 2 is a registered trademark of Valve Corporation
- Contributions and JS hints are welcome

## Funding

- I am funding this project on my own (server and hosting costs)
- To keep everything free, donations need to cover the bills
- [Donate](https://www.paypal.com/donate?hosted_button_id=DM426FKQMXSRA)

## Build

- npm install
- npm run make:win (windows)
- npm run make:linux (linux)
- npm run make:mac (mac - not tested)
