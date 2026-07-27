import { create } from 'zustand';

interface WaitingListState {
  waitingListIds: number[];
  updateWaitingListIds: (ids: number[]) => void;
}

export const useWaitingListStore = create<WaitingListState>((set) => ({
  waitingListIds: [],
  updateWaitingListIds: (ids: number[]) => set({ waitingListIds: ids }),
}));