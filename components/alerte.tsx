"use client";

import { DeleteCheque } from "@/actions/cheque-actions/delete-cheque";
import { DeleteReglement } from "@/actions/cheque-actions/reglement-actions/delete-reglement";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAlert } from "@/hooks/use-alerte";
import { startTransition } from "react";
import { toast } from "sonner";

const Alerte = () => {
  const alr = useAlert();

  const handleWho = () => {
    if (alr.module === "Cheque") {
      return DeleteCheque(alr.codeBoutique, alr.id);
    } else {
      return DeleteReglement(alr.codeBoutique, alr.id);
    }
  };

  return (
    <AlertDialog open={alr.open} onOpenChange={() => alr.setOpen()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action ne peut pas être annulée. Cela supprimera
            définitivement les données de la base.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              startTransition(() => {
                toast.promise(
                  () =>
                    handleWho().then((data) => {
                      if (data?.error) {
                        return Promise.reject(data.error);
                      } else {
                        return Promise.resolve(data.success);
                      }
                    }),
                  {
                    loading: "Operation en cours...",
                    error: (err) => err,
                    success: (data) => data,
                  }
                );
              })
            }
          >
            Continuer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alerte;
