import { useState } from 'react';
import { useEditor } from '../context/EditorContext';

const Editor = () => {
  const { editorRef, setContent, execCommand } = useEditor();
  const [slashCommand, setSlashCommand] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleInput = (e) => {
    setContent(e.target.innerHTML);
  };
  const handleBlur = () => {
    saveToLocalStorage();
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === '*') {
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
  };

  const handleSlashCommand = () => {
  if (!editorRef.current) return;

  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);

  // Move back to include '/' and command text
  range.setStart(range.endContainer, range.endOffset - (slashCommand.length + 1));
  range.deleteContents();

  // Insert bold text using whatever was typed after '/'
  const boldElement = document.createElement('b');
  boldElement.textContent = slashCommand;
  range.insertNode(boldElement);

  // Insert a normal text node (space)
  const space = document.createTextNode(' ');
  boldElement.after(space);

  // Very important: Insert an empty normal span to "break" out of bold
  const normalSpan = document.createElement('span');
  normalSpan.innerHTML = '&#8203;'; // invisible zero-width space character
  space.after(normalSpan);

  // Move cursor after normal span
  const newRange = document.createRange();
  newRange.setStart(normalSpan, 1);
  newRange.setEnd(normalSpan, 1);

  selection.removeAllRanges();
  selection.addRange(newRange);

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
      onBlur={handleBlur}
      role="textbox"
      aria-multiline="true"
      className="mt-4 p-4 min-h-[50vh] border rounded bg-white focus:outline-none"
      suppressContentEditableWarning={true}
      spellCheck={true}
    />
  );
};

export default Editor;
