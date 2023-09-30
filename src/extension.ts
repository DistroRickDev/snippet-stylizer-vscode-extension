import * as vscode from 'vscode';
import * as formatter from './formatter';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "snippet-stylizer" is now active!');

	let camelCase = vscode.commands.registerCommand('snippet-stylizer.stylize_camel_case', () => {
		formatter.formatSnippet(formatter.Styles.camelCase);
	});

	let pascalCase = vscode.commands.registerCommand('snippet-stylizer.stylize_pascal_case', () => {
		formatter.formatSnippet(formatter.Styles.pascalCase);
	});

	let pascalCaseWithSpaces = vscode.commands.registerCommand('snippet-stylizer.stylize_pascal_case_with_spaces', () =>{
		formatter.formatSnippet(formatter.Styles.pascalCaseWithSpace);
	});

	let snakeCase = vscode.commands.registerCommand('snippet-stylizer.stylize_snake_case', () =>{
		formatter.formatSnippet(formatter.Styles.snakeCase);
	});

	let upperCase = vscode.commands.registerCommand('snippet-stylizer.stylize_upper_case', () =>{
		formatter.formatSnippet(formatter.Styles.upperCase);
	});

	context.subscriptions.push(camelCase);
	context.subscriptions.push(pascalCase);
	context.subscriptions.push(pascalCaseWithSpaces);
	context.subscriptions.push(upperCase);
}

export function deactivate() { }
