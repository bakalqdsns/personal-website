import { create } from 'zustand';
import { projects } from './projects';

interface ModalState {
  open: boolean;
  index: number;
  openAt: (i: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  open: false,
  index: 0,
  openAt: (i) => set({ open: true, index: i }),
  close: () => set({ open: false }),
  next: () =>
    set((s) => ({
      index: (s.index + 1) % projects.length,
    })),
  prev: () =>
    set((s) => ({
      index: (s.index - 1 + projects.length) % projects.length,
    })),
}));