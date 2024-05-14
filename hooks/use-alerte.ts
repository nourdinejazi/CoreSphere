import { create } from "zustand";

interface AlertUseProps {
  open: boolean;
  codeBoutique: string;
  id: string;
  description: string | null;
  title: string | null;
  module: "Reglement" | "Cheque" | "Versement" | "Impayé" | null;
  setOpen: () => void;
  setCodeBoutique: (codeBoutique: string) => void;
  setId: (id: string) => void;
  setDescription: (description: string) => void;
  setTitle: (title: string) => void;
  setModule: (
    module: "Reglement" | "Cheque" | "Versement" | "Impayé" | null
  ) => void;
  reset: () => void;
}

export const AlertUse = create<AlertUseProps>((set) => ({
  open: false,
  codeBoutique: "",
  module: null,
  id: "",
  description: null,
  title: null,
  setOpen: () => set((state) => ({ open: !state.open })),
  setCodeBoutique: (codeBoutique: string) =>
    set({ codeBoutique: codeBoutique }),
  setId: (id: string) => set({ id: id }),
  setDescription: (description: string) => set({ description: description }),
  setTitle: (title: string) => set({ title: title }),
  setModule: (module) => set({ module: module }),
  reset: () =>
    set(() => ({
      codeBoutique: "",
      module: null,
      id: "",
      description: null,
      title: null,
    })),
}));
