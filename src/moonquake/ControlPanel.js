'use client';

import { useState, useEffect } from 'react';
import useStore from './Store';
import quakeData from './data/QuakeDB.json';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const years = [...new Set(quakeData.map(item => item.year))];

export const ControlPanel = () => {
  const [days, setDays] = useState([]);

  const selectedYear = useStore(state => state.year);
  const isPlaying = useStore(state => state.isPlaying);
  const handleYearChange = useStore(state => state.handleYearChange);
  const handleDayChangeActual = useStore(state => state.handleDayChange);
  const handlePlaying = useStore(state => state.handlePlaying);

  useEffect(() => {
    if (!selectedYear) {
      setDays([]);
      return;
    }

    const yearData = quakeData.filter(item => item.year === selectedYear);
    const uniqueDays = [...new Set(yearData.map(item => item.day))];

    setDays(uniqueDays);
    if (!uniqueDays.length) {
      handleDayChangeActual(null);
      return;
    }

    handleDayChangeActual(uniqueDays[0]);
  }, [selectedYear, handleDayChangeActual]);

  const handleDayChange = value => {
    handleDayChangeActual(value);
  };

  return (
    <div className="p-2 md:p-4 flex flex-wrap gap-2 items-center">
      <Menu
        anchor="top start"
        options={years.map(e => ({
          label: e,
          onClick: () => handleYearChange(e),
        }))}
      >
        <div className="py-1 px-2 border border-gray-400 rounded-md flex items-center gap-2 text-sm">
          Select The Year
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </Menu>

      <Menu
        anchor="top start"
        options={days.map(e => ({
          label: e,
          onClick: () => handleDayChange(e),
        }))}
      >
        <div className="py-1 px-2 border border-gray-400 rounded-md flex items-center gap-2 text-sm">
          Select Day
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </Menu>

      <Button onClick={handlePlaying}>{!isPlaying ? 'Play Now' : 'Stop Playing'}</Button>
    </div>
  );
};
