import { createContext, useContext, useRef, useState, useEffect } from 'react';

const EditorContext = createContext();

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState('');

  const LOCAL_STORAGE_KEY = 'editor-content';

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedContent) {
      setContent(savedContent);
      if (editorRef.current) {
        editorRef.current.innerHTML = savedContent;
      }
    }
  }, []);


  const saveToLocalStorage = () => {
    if (!editorRef.current) return;
    localStorage.setItem(LOCAL_STORAGE_KEY, editorRef.current.innerHTML);
  };

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

  return (
    <EditorContext.Provider value={{ editorRef, content, setContent, execCommand, toggleCodeTag, saveToLocalStorage }}>
      {children}
    </EditorContext.Provider>
  );
};
