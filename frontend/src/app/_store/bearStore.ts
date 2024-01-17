import { create } from 'zustand';

type State = {
  bears: number;
};

type Action = {
  increaseBear: (by: number) => void;
};

export const bearsStore = create<State & Action>()((set) => ({
  bears: 0,
  increaseBear: (by) => set((state) => ({
    bears: state.bears + by,
  })),
}));
