import { create } from 'zustand';

const useStore = create(set => ({
  view: true,
  changeView: () => set(state => ({ view: !state.view })),
  year: '1971',
  handleYearChange: (event, data) => set(state => ({ year: data.value })),
  day: '107',
  handleDayChange: (event, data) => set(state => ({ day: data.value })),
  isPlaying: 'false',
  handlePlaying: () => set(state => ({ isPlaying: !state.isPlaying })),
}));

export default useStore;
