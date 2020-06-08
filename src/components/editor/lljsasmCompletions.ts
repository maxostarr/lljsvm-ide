// import { monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

export const provideCompletionItems = (
  model: monaco.editor.ITextModel,
  position: monaco.Position,
  context: monaco.languages.CompletionContext,
  token: monaco.CancellationToken,
): monaco.languages.ProviderResult<monaco.languages.CompletionList> => {
  var word = model.getWordUntilPosition(position);
  var range = {
    startLineNumber: position.lineNumber,
    endLineNumber: position.lineNumber,
    startColumn: word.startColumn,
    endColumn: word.endColumn,
  };
  return {
    suggestions: [
      {
        label: '"mov"',
        kind: monaco.languages.CompletionItemKind.Class,
        documentation: "The base move mnemonic.",
        detail: "The base move mnemonic.",
        insertText: '"mov"',
        range: range,
      },
    ],
  };
};

export const completionProvidor: monaco.languages.CompletionItemProvider = {
  provideCompletionItems,
};
