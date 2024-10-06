import { create } from 'zustand';

const useStore = create(set => ({
  view: true,
  changeView: () => set(state => ({ view: !state.view })),
  year: '1971',
  handleYearChange: value => set(() => ({ year: value })),
  day: '107',
  handleDayChange: value => set(() => ({ day: value })),
  isPlaying: 'false',
  handlePlaying: () => set(state => ({ isPlaying: !state.isPlaying })),
}));

export default useStore;
