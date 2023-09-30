import { assert } from 'console';
import { EOL } from 'os';
import {DecorationOptions, EndOfLine, Position, Range, Selection, SnippetString, TextDocument, TextEditor, TextEditorDecorationType, TextEditorEdit, TextEditorOptions, TextEditorRevealType, TextLine, Uri, ViewColumn} from 'vscode';

export class SelectionFake implements Selection, Range {
    anchor: Position = new Position(0, 0);
    active: Position = new Position(0, 0);
    isReversed: boolean = false;
    start: Position = new Position(0, 0);;
    end: Position = new Position(0, 0);;
    isEmpty: boolean = false;
    isSingleLine: boolean = false;

    containedString: string;

    constructor(containedString : string) {
        this.containedString = containedString;
    }

    contains(positionOrRange: Position | Range): boolean {
        throw new Error('Method not implemented.');
    }
    isEqual(other: Range): boolean {
        throw new Error('Method not implemented.');
    }
    intersection(range: Range): Range | undefined {
        throw new Error('Method not implemented.');
    }
    union(other: Range): Range {
        throw new Error('Method not implemented.');
    }
    with(start?: Position | undefined, end?: Position | undefined): Range;
    with(change: { start?: Position | undefined; end?: Position | undefined; }): Range;
    with(start?: unknown, end?: unknown): Range {
        throw new Error('Method not implemented.');
    }
    
}

export class TextDocumentFake implements TextDocument{
    uri: Uri = Uri.from({scheme: "scheme", authority: "authority", path: "/tmp", query: "query",  fragment: "fragment"});
    fileName: string = "TestFileName";
    isUntitled: boolean = true;
    languageId: string = "Typescript";
    version: number = 1;
    isDirty: boolean = false;
    isClosed: boolean = false;
    save(): Thenable<boolean> {
        throw new Error('Method not implemented.');
    }
    eol: EndOfLine = 1;
    lineCount: number = 0;
    lineAt(line: number): TextLine;
    lineAt(position: Position): TextLine;
    lineAt(position: unknown): import("vscode").TextLine {
        throw new Error('Method not implemented.');
    }
    offsetAt(position: Position): number {
        throw new Error('Method not implemented.');
    }
    positionAt(offset: number): Position {
        throw new Error('Method not implemented.');
    }
    getText(range?: Range | undefined): string {
        if(!range) {
            throw new Error('Invalid range');
        }
        return (range as SelectionFake).containedString;
    }

    getWordRangeAtPosition(position: Position, regex?: RegExp | undefined): Range | undefined {
        throw new Error('Method not implemented.');
    }
    validateRange(range: Range): Range {
        throw new Error('Method not implemented.');
    }
    validatePosition(position: Position): Position {
        throw new Error('Method not implemented.');
    }
}
class TextEditorOptionsFake implements TextEditorOptions {}
class TextEditorEditFake implements TextEditorEdit {
    replace(location: Position | Range | Selection, value: string): void {
        (location as SelectionFake).containedString = value;
    }
    insert(location: Position, value: string): void {
        throw new Error('Method not implemented.');
    }
    delete(location: Range | Selection): void {
        (location as SelectionFake).containedString = "";
    }
    setEndOfLine(endOfLine: EndOfLine): void {
        throw new Error('Method not implemented.');
    }
    
}

export class TextEditorFake implements TextEditor{
    document: TextDocument = new TextDocumentFake;
    selection: Selection;
    selections: readonly Selection[];
    visibleRanges: readonly Range[];
    options : TextEditorOptions = new TextEditorOptionsFake;
    viewColumn: ViewColumn | undefined;
    
    constructor(fakeSelection: Selection) {
        this.selections = [fakeSelection];
        this.selection = this.selections[0];
        this.visibleRanges = this.selections;
    }

    edit(callback: (editBuilder: TextEditorEdit) => void, options?: { readonly undoStopBefore: boolean; readonly undoStopAfter: boolean; } | undefined): Thenable<boolean> {
        callback(new TextEditorEditFake());
        const dummyReturn = async function() : Promise<Boolean> {return true;};
        return dummyReturn().then(() => {return true;}).catch(() => {return true;});
    }
    insertSnippet(snippet: SnippetString, location?: Range | Position | readonly Range[] | readonly Position[] | undefined, options?: { readonly undoStopBefore: boolean; readonly undoStopAfter: boolean; } | undefined): Thenable<boolean> {
        throw new Error('Method not implemented.');
    }
    setDecorations(decorationType: TextEditorDecorationType, rangesOrOptions: readonly Range[] | readonly DecorationOptions[]): void {
        throw new Error('Method not implemented.');
    }
    revealRange(range: Range, revealType?: TextEditorRevealType | undefined): void {
        throw new Error('Method not implemented.');
    }
    show(column?: ViewColumn | undefined): void {
        throw new Error('Method not implemented.');
    }
    hide(): void {
        throw new Error('Method not implemented.');
    }
    
}