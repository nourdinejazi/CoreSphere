"use client";
import { DeleteBourd } from "@/actions/bourd-actions/delete-bourd";
import { ImpVersement } from "@/actions/bourd-actions/imp-versement";
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
import { AlertUse } from "@/hooks/use-alerte";
import { startTransition } from "react";
import { toast } from "sonner";
import { buttonVariants } from "./ui/button";

const Alerte = () => {
  const alr = AlertUse();

  const handleWho = () => {
    if (alr.module === "Cheque") {
      return DeleteCheque(alr.codeBoutique, alr.id);
    } else if (alr.module === "Reglement") {
      return DeleteReglement(alr.codeBoutique, alr.id);
    } else if (alr.module === "Versement") {
      return DeleteBourd(alr.id, alr.codeBoutique);
    } else if (alr.module === "Impayé") {
      return ImpVersement(alr.id, alr.codeBoutique);
    } else {
      return Promise.reject("Module not found");
    }
  };

  return (
    <AlertDialog open={alr.open} onOpenChange={() => alr.setOpen()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {!alr.title ? " Êtes-vous absolument sûr ?" : alr.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {!alr.description
              ? "Cette action ne peut pas être annulée. Cela supprimera définitivement les données de la base."
              : alr.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({
              variant: alr.module === "Impayé" ? "default" : "destructive",
            })}
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
                alr.reset();
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
