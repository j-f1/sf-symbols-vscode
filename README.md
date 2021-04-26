# SF Symbols Icon Theme

This theme uses [Apple’s SF Symbols](https://developer.apple.com/sf-symbols/) icon set to provide many icons for VS Code. I plan to update it as new icons become available, and would appreciate feedback on icon choices!

![screenshot](screenshot.png)

## Installing

Note: for legal reasons, this theme cannot actually package the SF Symbols. Therefore, you need to complete a few extra steps before you can use the theme:

1. [Download the SF Pro font](https://developer.apple.com/fonts/) from Apple’s website and install it. The system fonts that come with macOS do not include the necessary SF Symbols as far as I know.
2. After installing the theme and its monkey patch dependency, you will be prompted to restart VS Code. Do this.
3. You may also need to reload the window once to make sure the code that swaps in the actual SF Pro font gets a chance to run.

Once you’ve followed those steps, open the command pallete, choose “Preferences: Product Icon Theme,” then select “SF Symbol Icons.”
