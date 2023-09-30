import { assert, log } from 'console';
import * as vscode from 'vscode';

export enum Styles {
    camelCase,
    pascalCase,
    pascalCaseWithSpace,
    snakeCase,
    upperCase
}

function getTextFromSelection(editor: vscode.TextEditor, selection: vscode.Selection): string {
    return editor.document.getText(selection);
}


function splitSelection(selectionText: string) : string[] {
    const separator: RegExp = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
    let result : string[] = [];
    selectionText.match(separator)?.forEach((value: string) => {
        result.push(value);
    });
    return result;
};

function snippetToCamelCase(editor: vscode.TextEditor, selections: readonly vscode.Selection[]) {
    vscode.window.showInformationMessage("Current selection size " + selections.length);
    editor.edit(builder => {
        for (const selection of selections) {
            const selectionText = getTextFromSelection(editor, selection);
            let stringArray = splitSelection(selectionText);
            stringArray[0] = stringArray[0].replace(stringArray[0].charAt(0), stringArray[0].charAt(0).toLowerCase());
            stringArray.forEach((str: string, index: number) => {
                if(index === 0){
                    return;
                }
                const newString = str.replace(str.charAt(0), str.charAt(0).toUpperCase());
                stringArray[index] = newString;
            });
            builder.replace(selection, stringArray.join(""));
        }
    });
}

function snippetToPascalCase(editor: vscode.TextEditor, selections: readonly vscode.Selection[], withSpace: boolean) {
    editor.edit(builder => {
        for (const selection of selections) {
            const selectionText = getTextFromSelection(editor, selection);
            const stringArray = splitSelection(selectionText);
            stringArray.forEach((str: string, index: number) => {
                const newString = str.replace(str.charAt(0), str.charAt(0).toUpperCase());
                stringArray[index] = newString;
            });
            if(withSpace){
                builder.replace(selection, stringArray.join(" "));
                return;
            }
            builder.replace(selection, stringArray.join(""));
        }
    });
}

function snippetToSnakeCase(editor: vscode.TextEditor, selections: readonly vscode.Selection[]) {
    editor.edit(builder => {
        for (const selection of selections) {
            const selectionText = getTextFromSelection(editor, selection);
            const stringArray = splitSelection(selectionText);
            stringArray.forEach((str: string, index: number) => {
                stringArray[index] = stringArray[index].toLowerCase();
            });
            builder.replace(selection, stringArray.join("_"));
        }
    });
}

function snippetToUpperCase(editor: vscode.TextEditor, selections: readonly vscode.Selection[]) {
    editor.edit(builder => {
        for (const selection of selections) {
            const selectionText = getTextFromSelection(editor, selection);
            const stringArray = splitSelection(selectionText);
            stringArray.forEach((str: string, index: number) => {
                stringArray[index] = stringArray[index].toUpperCase();
            });
            builder.replace(selection, stringArray.join(""));
        }
    });
}

export function formatSnippet(style: Styles) {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage("No editor is open");
        return;
    }
    const selections = editor.selections;
    switch (style) {
        case Styles.camelCase:
            snippetToCamelCase(editor, selections);
            break;
        case Styles.pascalCase:
            snippetToPascalCase(editor, selections, false);
            break;
        case Styles.pascalCaseWithSpace:
            snippetToPascalCase(editor, selections, true);
            break;
        case Styles.snakeCase:
        default:
            snippetToSnakeCase(editor, selections);
            break;
        case Styles.upperCase:
            snippetToUpperCase(editor, selections);
            break;
    }
}

export function testSnippetFormat(editor : vscode.TextEditor, selections: readonly vscode.Selection[], style: Styles){
    if (!editor) {
        vscode.window.showErrorMessage("No editor is open");
        return;
    }
    switch (style) {
        case Styles.camelCase:
            snippetToCamelCase(editor, selections);
            break;
        case Styles.pascalCase:
            snippetToPascalCase(editor, selections, false);
            break;
        case Styles.pascalCaseWithSpace:
            snippetToPascalCase(editor, selections, true);
            break;
        case Styles.snakeCase:
        default:
            snippetToSnakeCase(editor, selections);
            break;
        case Styles.upperCase:
            snippetToUpperCase(editor, selections);
            break;
    }
}