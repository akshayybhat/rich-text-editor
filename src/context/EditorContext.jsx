import { createContext, useContext, useRef, useState } from 'react';

const EditorContext = createContext();
export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState('');
  const [slashCommand, setSlashCommand] = useState('');
  const [isCapturingSlash, setIsCapturingSlash] = useState(false);

  const execCommand = (command, value = null) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, value);
  };

  const toggleCodeTag = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const container = selection.anchorNode?.parentNode;
    if (!container) return;

    if (container.closest('code')) {
      const codeNode = container.closest('code');
      if (codeNode) {
        unwrapNode(codeNode);
      }
    } else {
      const code = document.createElement('code');
      try {
        range.surroundContents(code);
      } catch {
        document.execCommand('insertHTML', false, `<code>${selection.toString()}</code>`);
      }
    }
  };

  const unwrapNode = (node) => {
    const parent = node.parentNode;
    if (!parent) return;
    while (node.firstChild) {
      parent.insertBefore(node.firstChild, node);
    }
    parent.removeChild(node);
  };

  const startSlashCapture = () => {
    setIsCapturingSlash(true);
    setSlashCommand('');
  };

  const stopSlashCapture = () => {
    setIsCapturingSlash(false);
    setSlashCommand('');
  };

  const runSlashCommand = () => {
    const command = slashCommand.toLowerCase().trim();
    if (command === 'bold') {
      execCommand('bold');
    } else if (command === 'italic') {
      execCommand('italic');
    } else if (command === 'ul') {
      execCommand('insertUnorderedList');
    }
    stopSlashCapture();
  };

  return (
    <EditorContext.Provider value={{
      editorRef, content, setContent, execCommand, toggleCodeTag,
      startSlashCapture, isCapturingSlash, setSlashCommand, runSlashCommand
    }}>
      {children}
    </EditorContext.Provider>
  );
};
