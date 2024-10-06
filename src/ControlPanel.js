import { useState, useEffect } from 'react';
import useStore from './Store';
import quakeData from './data/QuakeDB.json';
import classNames from 'classnames';
import { Menu } from './components/Menu';
import { Button } from './components/Button';

export const ControlPanel = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [days, setDays] = useState([]);

  // const view = useStore(state => state.view);
  // const changeView = useStore(state => state.changeView);

  const selectedYear = useStore(state => state.year);
  const selectedDDay = useStore(state => state.day);

  const isPlaying = useStore(state => state.isPlaying);

  const quake = quakeData.find(item => item.year === selectedYear && item.day === selectedDDay);

  const years = [...new Set(quakeData.map(item => item.year))];

  const handleYearChange = useStore(state => state.handleYearChange);
  const handleDayChangeActual = useStore(state => state.handleDayChange);
  const handlePlaying = useStore(state => state.handlePlaying);

  useEffect(() => {
    if (!selectedYear) {
      setDays([]);
      setSelectedDay(null);
      return;
    }

    const yearData = quakeData.filter(item => item.year === selectedYear);
    const uniqueDays = [...new Set(yearData.map(item => item.day))];

    setDays(uniqueDays);
    if (!uniqueDays.length) {
      setSelectedDay(null);
      handleDayChangeActual(null);
      return;
    }

    setSelectedDay(uniqueDays[0]);
    handleDayChangeActual(uniqueDays[0]);
  }, [selectedYear, handleDayChangeActual]);

  const handleDayChange = value => {
    setSelectedDay(value);
    handleDayChangeActual(value);
  };

  return (
    <div className="h-24 flex items-center">
      <div className="pl-10 flex">
        <Menu
          className="h-8"
          anchor="top start"
          options={years.map(e => ({
            label: e,
            onClick: () => handleYearChange(e),
          }))}
        >
          <div className="px-4 py-1 border">Select The Year</div>
        </Menu>

        <Menu
          className="h-8"
          anchor="top start"
          options={days.map(e => ({
            label: e,
            onClick: () => handleDayChange(e),
          }))}
        >
          <div className="px-4 py-1 border">Select Day</div>
        </Menu>

        <Button onClick={handlePlaying}>{!isPlaying ? 'Play Now' : 'Stop Playing'}</Button>
      </div>
      {isPlaying && <QuakeInfoBar quake={quake} isPlaying={isPlaying} />}
    </div>
  );
};

const QuakeInfoBar = ({ quake, isPlaying }) => {
  if (!quake) {
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
