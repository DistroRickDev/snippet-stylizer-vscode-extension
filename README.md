# snippet-stylizer vscode extension

This vscode extension was created as a an utility extension to easily replace your current snippet (example variable name, function name) with a different style equivalent, without having to manually to do it, for example:

convert this function name to camelCase: 
```
    get_value_from_data_base
```
to:
```
    getValueFromDataBase
```

Other styles are also supported please check which ones bellow.

## Features

This vscode extension allows to stylelize snippets (single selection, multiline selection or multiple selections), with you prefered style, the covered styles are:

 1. camelCase
 2. PascalCase
 3. Pascal Case With Spaces
 4. snake_case
 5. UPPERCASE

## Install

## Extension Settings

To use this extension you need to have an editor open and text selected, then you can either use keybinds or the Run Commands bar:

### Keybinds

| Keybind    | Style |
| -------- | ------- |
| ctrl+alt+c | camelCase   |
| ctrl+alt+p | PascalCase   |
| ctrl+alt+i | Pascal Case With Spaces    |
| ctrl+alt+s | snake_case |
| ctrl+alt+u  | UPPERCASE |

### Run Commands

Unix/Windows : ctrl+shift+p
Unix/Windows : cmd+shift+p

| Command    | Style |
| -------- | ------- |
| Stylize Camel Case | camelCase   |
| Stylize Pascal Case | PascalCase   |
| Stylize Pascal Case With Spaces | Pascal Case With Spaces    |
| Stylize Snake Case | snake_case |
| Stylize Upper Case | UPPERCASE |

## Known Issues

_**NOTE: This extension uses a simple regex form to detect the words selected in the editor this function won't properly work if you use non ASCII characters or you use full caps word without any other separator (as it will be detected as one single word).**_ 

## Release Notes

### 1.0.0

Initial release of snippet-stylizer
First publish of snippet-stylizer extension

## Author
[@DistroRickDev](https://github.com/DistroRickDev)

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE.md)