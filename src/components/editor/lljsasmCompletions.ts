import monaco from "monaco-editor";

const provideCompletionItems: monaco.languages.ProviderResult<monaco.languages.CompletionList> = (
  model: monaco.editor.ITextModel,
  position: monaco.Position,
  context: monaco.languages.CompletionContext,
  token: monaco.CancellationToken,
) => {
  return {
    suggestions: [
      {
        label: "test",
        kind: monaco.languages.CompletionItemKind.Class,
        insertText: "test",
      },
    ],
  };
};

export const completionProvidor: monaco.languages.CompletionItemProvider = {
  provideCompletionItems: provideCompletionItems,
};
