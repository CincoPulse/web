import quakeData from './data/QuakeDB.json';
import useStore from './Store';
import classNames from 'classnames';

export const QuakeInfo = () => {
  const isPlaying = useStore(state => state.isPlaying);
  const selectedYear = useStore(state => state.year);
  const selectedDDay = useStore(state => state.day);

  const quake = quakeData.find(item => item.year === selectedYear && item.day === selectedDDay);

  if (!quake || !isPlaying) {
    return null;
  }

  return (
    <div className="flex">
      <div className="flex">
        <p>Quake Info |</p>

        <div className={classNames('text-sm pl-2', isPlaying ? 'block' : 'none')}>
          Time of Quake(HH:MM:SS): {quake.hour}: {quake.minute}: {quake.seconds}
          <br />
          Lunar Coordinates(Lat.,Long.): {quake.latitude}, {quake.longitude}
        </div>
      </div>

      <div className="flex px-2">
        <h2>|</h2>
        <div className={classNames('text-sm pl-2', isPlaying ? 'block' : 'none')}>
          Magnitude: {quake.magnitude}
          <br />
          Year: {quake.year}
          <br />
          Day: {quake.day}th Earth Day
        </div>
      </div>
    </div>
  );
};
