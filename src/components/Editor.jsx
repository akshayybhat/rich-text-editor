import { useEditor } from '../context/EditorContext';

const Editor = () => {
  const { editorRef, setContent } = useEditor();

  const handleInput = (e) => {
    setContent(e.target.innerHTML);
  };

  return (
    <div
      id="text-input"
      ref={editorRef}
      onInput={handleInput}
      contentEditable
      role="textbox"
      aria-multiline="true"
      className="mt-4 p-4 min-h-[50vh] border rounded bg-white focus:outline-none
                space-y-4"
      suppressContentEditableWarning={true}
      spellCheck={true}
    >
    </div>
  );
};

export default Editor;
