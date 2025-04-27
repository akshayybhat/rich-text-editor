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
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 bg-gray-100 p-2 rounded-md overflow-x-auto">
      {toolbarButtons.map((button) => (
        <button
          key={button.id}
          id={button.id}
          onClick={() => handleButtonClick(button)}
          className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-300 flex-shrink-0"
          aria-label={button.id}
          type="button"
        >
          <FontAwesomeIcon icon={button.icon} />
        </button>
      ))}

      {/* Advanced options */}
      <select
        id="formatBlock"
        onChange={handleFormatBlock}
        className="p-1 border rounded text-sm flex-shrink-0"
      >
        <option value="H1">H1</option>
        <option value="H2">H2</option>
        <option value="H3">H3</option>
        <option value="H4">H4</option>
        <option value="H5">H5</option>
        <option value="H6">H6</option>
      </select>

      {/* Font color */}
      <label className="flex items-center gap-1 text-sm flex-shrink-0">
        Font
        <input
          type="color"
          id="foreColor"
          className="h-8 w-8 p-0 border rounded"
          onChange={(e) => execCommand('foreColor', e.target.value)}
          aria-label="Font Color"
        />
      </label>

      {/* Background color */}
      <label className="flex items-center gap-1 text-sm flex-shrink-0">
        Background
        <input
          type="color"
          id="backColor"
          className="h-8 w-8 p-0 border rounded"
          onChange={(e) => execCommand('backColor', e.target.value)}
          aria-label="Background Color"
        />
      </label>
    </div>
  );
};

export default Toolbar;
