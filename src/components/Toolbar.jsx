import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEditor } from '../context/EditorContext';
import { toolbarButtons } from '../utils/toolbarConfig';

const Toolbar = () => {
  const { execCommand, toggleCodeTag, activeFormats } = useEditor();

  const handleButtonClick = (button) => {
    if (button.custom) {
      toggleCodeTag();
    } else {
      execCommand(button.command);
    }
  };

  const isActive = (id) => activeFormats.includes(id);

  return (
    <div className="flex flex-wrap items-center gap-3 bg-gray-100 p-2 rounded-md">
      {toolbarButtons.map((button) => (
        <button
          key={button.id}
          id={button.id}
          onClick={() => handleButtonClick(button)}
          className={`h-8 w-8 flex items-center justify-center rounded hover:bg-gray-300
            ${isActive(button.id) ? 'border-2 border-blue-500 bg-blue-100' : ''}`}
          aria-label={button.id}
          type="button"
        >
          <FontAwesomeIcon icon={button.icon} />
        </button>
      ))}

      {/* Headings */}
      <select
        id="formatBlock"
        onChange={(e) => execCommand('formatBlock', e.target.value)}
        className="p-1 border rounded text-sm"
      >
        <option value="H1">H1</option>
        <option value="H2">H2</option>
        <option value="H3">H3</option>
        <option value="H4">H4</option>
        <option value="H5">H5</option>
        <option value="H6">H6</option>
      </select>

      {/* Font color */}
      <div className="flex items-center gap-1">
        <label htmlFor="foreColor" className="text-xs">Font Color</label>
        <input
          type="color"
          id="foreColor"
          className="h-8 w-8 p-0 border rounded"
          onChange={(e) => execCommand('foreColor', e.target.value)}
          aria-label="Font Color"
        />
      </div>

      {/* Background color */}
      <div className="flex items-center gap-1">
        <label htmlFor="backColor" className="text-xs">Background</label>
        <input
          type="color"
          id="backColor"
          className="h-8 w-8 p-0 border rounded"
          onChange={(e) => execCommand('backColor', e.target.value)}
          aria-label="Background Color"
        />
      </div>
    </div>
  );
};

export default Toolbar;
