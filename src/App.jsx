import { EditorProvider } from './context/EditorContext';
import Toolbar from './components/Toolbar';
import Editor from './components/Editor';

const App = () => {
  return (
    <EditorProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-400">
        <div className="bg-white w-[90vmin] p-8 rounded-md shadow-xl">
          <Toolbar />
          <Editor />
        </div>
      </div>
    </EditorProvider>
  );
};

export default App;
