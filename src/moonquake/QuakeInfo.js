'use client';

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
    <div className="px-2 pt-2 md:p-0">
      <div className="bg-secondaryDark p-2 md:p-4 rounded-md md:z-10 md:absolute md:right-4 md:top-4">
        <div className="flex justify-center">
          <p className="flex self-center md:text-lg">Quake Info</p>
        </div>

        <div className="text-sm pl-2">
          Time of Quake(HH:MM:SS): {quake.hour}:{quake.minute}:{quake.seconds}
          <br />
          Lunar Coordinates(Lat,Lng.): {quake.latitude}, {quake.longitude}
        </div>

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
