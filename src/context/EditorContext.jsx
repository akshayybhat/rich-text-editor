import { createContext, useContext, useRef, useState, useEffect } from 'react';

const EditorContext = createContext();

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState('');
  const [activeFormats, setActiveFormats] = useState([]);

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
    if (codeNode) unwrapNode(codeNode);
  } else {
    const code = document.createElement('code');

    if (selection.isCollapsed) {
      // No text selected: insert empty <code> and move cursor inside
      code.innerHTML = '\u200B'; // Zero-width space (acts like an invisible placeholder)

      range.insertNode(code);
      range.setStart(code.firstChild, 1);
      range.setEnd(code.firstChild, 1);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      // Text selected: surround normally
      if (range.canSurroundContents) {
        try {
          range.surroundContents(code);
        } catch {
          document.execCommand('insertHTML', false, `<code>${selection.toString()}</code>`);
        }
      } else {
        document.execCommand('insertHTML', false, `<code>${selection.toString()}</code>`);
      }
    }
  }

  refreshFormats();
};


  const unwrapNode = (node) => {
    const parent = node.parentNode;
    if (!parent) return;
    while (node.firstChild) {
      parent.insertBefore(node.firstChild, node);
    }
    parent.removeChild(node);
  };

  const refreshFormats = () => {
    if (!editorRef.current) return;
    const formats = [];

    if (document.queryCommandState('bold')) formats.push('bold');
    if (document.queryCommandState('italic')) formats.push('italic');
    if (document.queryCommandState('underline')) formats.push('underline');
    if (document.queryCommandState('strikeThrough')) formats.push('strikethrough');

    const selection = window.getSelection();
    if (selection?.anchorNode?.parentNode?.closest('code')) {
      formats.push('code');
    }

    setActiveFormats(formats);
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      refreshFormats();
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  return (
    <EditorContext.Provider value={{ editorRef, content, setContent, execCommand, toggleCodeTag, activeFormats }}>
      {children}
    </EditorContext.Provider>
  );
};
