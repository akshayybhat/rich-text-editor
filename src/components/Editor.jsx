import { useState } from 'react';
import { useEditor } from '../context/EditorContext';

const Editor = () => {
  const { editorRef, setContent, execCommand } = useEditor();
  const [slashCommand, setSlashCommand] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleInput = (e) => {
    setContent(e.target.innerHTML);
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === '8') {
      e.preventDefault();
      execCommand('insertUnorderedList');
      return;
    }

    if (e.key === '/') {
      setIsTracking(true);
      setSlashCommand('');
    } else if (isTracking) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSlashCommand();
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        setSlashCommand((prev) => prev + e.key);
      }
    }

    // When pressing Space, end formatting
    if (e.key === ' ') {
      execCommand('bold'); // toggle off bold
    }
  };

  const handleSlashCommand = () => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    // Move 1 character extra for "/"
    range.setStart(range.endContainer, range.endOffset - (slashCommand.length + 1));
    range.deleteContents();

    if (slashCommand.toLowerCase() === 'dark') {
      // Insert bold text manually
      const boldElement = document.createElement('b');
      boldElement.textContent = 'dark';
      range.insertNode(boldElement);

      // Move cursor after the bold element
      range.setStartAfter(boldElement);
      range.setEndAfter(boldElement);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    setIsTracking(false);
    setSlashCommand('');
  };

  return (
    <div
      id="text-input"
      ref={editorRef}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      contentEditable
      role="textbox"
      aria-multiline="true"
      className="mt-4 p-4 min-h-[50vh] border rounded bg-white focus:outline-none"
      suppressContentEditableWarning={true}
      spellCheck={true}
    />
  );
};

export default Editor;
