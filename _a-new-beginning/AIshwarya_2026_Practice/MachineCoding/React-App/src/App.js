import FileFolder from './file-folder/FileFolder';
import GridLights from './grid-lights/GridLights';
import PollingContainer from './polling/PollingContainer';
import ProgressBarContainer from './progress-bars/ProgressBarContainer';
import './styles.css';

export default function App() {
  return (
    <div className='App'>
      {/* <PollingContainer /> */}
      {/* <ProgressBarContainer /> */}
      {/* <GridLights /> */}
      <FileFolder />
    </div>
  );
}
