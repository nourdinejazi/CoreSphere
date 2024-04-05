import { create } from "zustand";

interface AlertUseProps {
  open: boolean;
  codeBoutique: string;
  id: string;
  module: "Reglement" | "Cheque" | null;
  setOpen: () => void;
  setCodeBoutique: (codeBoutique: string) => void;
  setId: (id: string) => void;
  setModule: (module: "Reglement" | "Cheque" | null) => void;
}

export const AlertUse = create<AlertUseProps>((set) => ({
  open: false,
  codeBoutique: "",
  module: null,
  id: "",
  setOpen: () => set((state) => ({ open: !state.open })),
  setCodeBoutique: (codeBoutique: string) =>
    set({ codeBoutique: codeBoutique }),
  setId: (id: string) => set({ id: id }),
  setModule: (module) => set({ module: module }),
}));
