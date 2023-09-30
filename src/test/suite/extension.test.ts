import * as assert from 'assert';

import * as vscode from 'vscode';
import { Styles, testSnippetFormat } from '../../formatter';
import './Fakes';
import { SelectionFake, TextEditorFake } from './Fakes';
import { after, before, teardown } from 'mocha';

suite('Formatter Test Suite', () => {
	let fakeSelection: vscode.Selection = new SelectionFake("Hello World");
	const textEditorFake: vscode.TextEditor = new TextEditorFake(fakeSelection);

	before(() => {
		vscode.window.showInformationMessage('Start formatter all tests.');
	});

	after(() => {
		vscode.window.showInformationMessage('All tests done!');
	});

	teardown(() => {
		fakeSelection = new SelectionFake("Hello World");
		textEditorFake.selections = [fakeSelection];
	});

	// Camel Case tests  
	test('camel_case_happy_path', () => {
		testSnippetFormat(textEditorFake, textEditorFake.selections, Styles.camelCase);
		assert.strictEqual("helloWorld", textEditorFake.document.getText(fakeSelection));
	});

	test('camel_case_multiple_selections_happy_path', () => {
		textEditorFake.selections = [fakeSelection, fakeSelection];
		testSnippetFormat(textEditorFake, textEditorFake.selections, Styles.camelCase);
		assert.strictEqual("helloWorld", textEditorFake.document.getText(textEditorFake.selections[0]));
		assert.strictEqual("helloWorld", textEditorFake.document.getText(textEditorFake.selections[1]));
	});

	test('camel_case_multiline_selections_happy_path', () => {
		(fakeSelection as SelectionFake).containedString = "Hello World\
		HelloWorld";
		testSnippetFormat(textEditorFake, textEditorFake.selections, Styles.camelCase);
		assert.strictEqual("helloWorldHelloWorld", textEditorFake.document.getText(fakeSelection));
	});

	// Pascal Case tests  
	test('pascal_case_happy_path', () => {
		testSnippetFormat(textEditorFake, textEditorFake.selections, Styles.pascalCase);
		assert.strictEqual("HelloWorld", textEditorFake.document.getText(fakeSelection));
	});

	test('pascal_case_multiple_selections_happy_path', () => {
		textEditorFake.selections = [fakeSelection, fakeSelection];
		testSnippetFormat(textEditorFake, textEditorFake.selections, Styles.pascalCase);
		assert.strictEqual("HelloWorld", textEditorFake.document.getText(textEditorFake.selections[0]));
		assert.strictEqual("HelloWorld", textEditorFake.document.getText(textEditorFake.selections[1]));
	});

	test('pascal_case_multiline_selections_happy_path', () => {
		(fakeSelection as SelectionFake).containedString = "Hello World\
			HelloWorld";
		testSnippetFormat(textEditorFake, textEditorFake.selections, Styles.pascalCase);
		assert.strictEqual("HelloWorldHelloWorld", textEditorFake.document.getText(fakeSelection));
	});

	// Pascal Case With Spaces tests 
	test('pascal_case_with_spaces_happy_path', () => {
		testSnippetFormat(textEditorFake, textEditorFake.selections, Styles.pascalCaseWithSpace);
		assert.strictEqual("Hello World", textEditorFake.document.getText(fakeSelection));
	});

	test('pascal_case_with_spaces_multiple_selections_happy_path', () => {
		textEditorFake.selections = [fakeSelection, fakeSelection];
		testSnippetFormat(textEditorFake, textEditorFake.selections, Styles.pascalCaseWithSpace);
		assert.strictEqual("Hello World", textEditorFake.document.getText(textEditorFake.selections[0]));
		assert.strictEqual("Hello World", textEditorFake.document.getText(textEditorFake.selections[1]));
	});

	test('pascal_case_with_spaces_multiline_selections_happy_path', () => {
		(fakeSelection as SelectionFake).containedString = "Hello World\
		HelloWorld";
		testSnippetFormat(textEditorFake, textEditorFake.selections, Styles.pascalCaseWithSpace);
		assert.strictEqual("Hello World Hello World", textEditorFake.document.getText(fakeSelection));
	});

	// Snake case tests  
	test('snake_case_happy_path', () => {
		testSnippetFormat(textEditorFake, textEditorFake.selections, Styles.snakeCase);
		assert.strictEqual("hello_world", textEditorFake.document.getText(fakeSelection));
	});

	test('snake_case_multiple_selections_happy_path', () => {
		textEditorFake.selections = [fakeSelection, fakeSelection];
		testSnippetFormat(textEditorFake, textEditorFake.selections, Styles.snakeCase);
		assert.strictEqual("hello_world", textEditorFake.document.getText(textEditorFake.selections[0]));
		assert.strictEqual("hello_world", textEditorFake.document.getText(textEditorFake.selections[1]));
	});

	test('snake_case_multiline_selections_happy_path', () => {
		(fakeSelection as SelectionFake).containedString = "Hello World\
			HelloWorld";
		testSnippetFormat(textEditorFake, textEditorFake.selections, Styles.snakeCase);
		assert.strictEqual("hello_world_hello_world", textEditorFake.document.getText(fakeSelection));
	});


	// Upper case tests  
	test('upper_case_happy_path', () => {
		testSnippetFormat(textEditorFake, textEditorFake.selections, Styles.upperCase);
		assert.strictEqual("HELLOWORLD", textEditorFake.document.getText(fakeSelection));
	});

	test('upper_case_multiple_selections_happy_path', () => {
		textEditorFake.selections = [fakeSelection, fakeSelection];
		testSnippetFormat(textEditorFake, textEditorFake.selections, Styles.upperCase);
		assert.strictEqual("HELLOWORLD", textEditorFake.document.getText(textEditorFake.selections[0]));
		assert.strictEqual("HELLOWORLD", textEditorFake.document.getText(textEditorFake.selections[1]));
	});

	test('upper_case_multiline_selections_happy_path', () => {
		(fakeSelection as SelectionFake).containedString = "Hello World\
				HelloWorld";
		testSnippetFormat(textEditorFake, textEditorFake.selections, Styles.upperCase);
		assert.strictEqual("HELLOWORLDHELLOWORLD", textEditorFake.document.getText(fakeSelection));
	});
});
