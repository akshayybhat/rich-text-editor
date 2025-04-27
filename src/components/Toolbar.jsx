import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEditor } from '../context/EditorContext';
import { toolbarButtons } from '../utils/toolbarConfig';

const Toolbar = () => {
  const { execCommand, toggleCodeTag } = useEditor();

  const handleButtonClick = (button) => {
    if (button.custom) {
      toggleCodeTag();
    } else {
      execCommand(button.command);
    }
    setTimeout(() => {
      if (document.activeElement !== document.getElementById('text-input')) {
        document.getElementById('text-input')?.focus();
      }
    }, 0);
  };

  const handleFormatBlock = (e) => {
    execCommand('formatBlock', e.target.value);
    setTimeout(() => {
      if (document.activeElement !== document.getElementById('text-input')) {
        document.getElementById('text-input')?.focus();
      }
    }, 0);
  };

  return (
    <div
      className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 bg-gray-100 p-2 rounded-md overflow-x-auto"
      role="toolbar"
      aria-label="Editor Toolbar">
      {toolbarButtons.map((button) => (
        <button
          key={button.id}
          id={button.id}
          onClick={() => handleButtonClick(button)}
          className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-300 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={button.label || button.id}
          aria-pressed="false"
          type="button"
        >
          <FontAwesomeIcon icon={button.icon} />
        </button>
      ))}

      
      <select
        id="formatBlock"
        onChange={handleFormatBlock}
        className="p-1 border rounded text-sm flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Heading Level">
        <option value="H1">Header 1</option>
        <option value="H2">Header 2</option>
        <option value="H3">Header 3</option>
        <option value="H4">Header 4</option>
        <option value="H5">Header 5</option>
        <option value="H6">Header 6</option>
      </select>

     
      <label className="flex items-center gap-1 text-sm flex-shrink-0">
        Font
        <input
          type="color"
          id="foreColor"
          className="h-8 w-8 p-0 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => execCommand('foreColor', e.target.value)}
          aria-label="Font Color"/>
      </label>

      
      <label className="flex items-center gap-1 text-sm flex-shrink-0">
        Background
        <input
          type="color"
          id="backColor"
          className="h-8 w-8 p-0 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => execCommand('backColor', e.target.value)}
          aria-label="Background Color"
        />
      </label>
    </div>
  );
};

export default Toolbar;
