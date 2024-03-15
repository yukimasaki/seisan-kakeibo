import { Toggle } from "@frontend/types/toggle";
import { create } from "zustand";

const definition = (
  set: (
    partial:
      | Toggle
      | Partial<Toggle>
      | ((state: Toggle) => Toggle | Partial<Toggle>),
    replace?: boolean | undefined,
  ) => void,
  get: () => Toggle,
) =>
  ({
    isOpen: false,
    onOpen: () =>
      set({
        isOpen: true,
      }),
    onClose: () =>
      set({
        isOpen: false,
      }),
    toggle: () =>
      set({
        isOpen: !get().isOpen,
      }),
  }) satisfies Toggle;

export const useModalForm = create<Toggle>(definition);
export const useNavMenu = create<Toggle>(definition);
