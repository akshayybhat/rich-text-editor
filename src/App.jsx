import { EditorProvider } from './context/EditorContext';
import Toolbar from './components/Toolbar';
import Editor from './components/Editor';

const App = () => {
  return (
    <EditorProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4">
        <div className="bg-white w-full max-w-3xl p-6 sm:p-8 rounded-md shadow-2xl">
          <Toolbar />
          <Editor />
        </div>
      </div>
    </EditorProvider>
  );
};

export default App;
