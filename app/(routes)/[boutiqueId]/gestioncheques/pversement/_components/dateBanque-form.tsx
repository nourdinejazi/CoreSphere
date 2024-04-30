"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalendarPlus, Check, X } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { PointageVersement } from "@/actions/bourd-actions/pointage-versement";
import { useParams } from "next/navigation";
import { PointageVersementSchema } from "@/schemas/cheque-schemas";
import SmallSpinner from "@/components/small-spinner";
import { cn } from "@/lib/utils";

interface DateBanqueFormProps {
  id: string;
}

export function DateBanqueForm({ id }: DateBanqueFormProps) {
  const [show, setShow] = useState(false);
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const form = useForm<z.infer<typeof PointageVersementSchema>>({
    resolver: zodResolver(PointageVersementSchema),
    defaultValues: {
      day: "",
      month: "",
      year: "",
    },
  });

  function onSubmit(values: z.infer<typeof PointageVersementSchema>) {
    startTransition(() => {
      toast.promise(
        () =>
          PointageVersement(values, params.boutiqueId as string, id).then(
            (data) => {
              if (data?.error) {
                return Promise.reject(data.error);
              } else {
                return Promise.resolve(data.success);
              }
            }
          ),
        {
          loading: "Ajout en cours...",
          error: (err) => err,
          success: (data) => data,
        }
      );
    });
    form.reset();
    setShow(false);
  }

  if (!show)
    return (
      <Button onClick={() => setShow(true)}>
        {isPending ? <SmallSpinner /> : <CalendarPlus size={17} />}
      </Button>
    );
  else
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            " flex items-center justify-start gap-1  w-full  opacity-0    ",
            show && " opacity-100 transition-all duration-1000 "
          )}
        >
          <FormField
            control={form.control}
            name="day"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    className="w-12 "
                    maxLength={2}
                    onBlur={(e) => {
                      if (e.target.value.length == 1) {
                        field.onChange(e.target.value.padStart(2, "0"));
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <span>/</span>
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    className="w-12 "
                    maxLength={2}
                    onBlur={(e) => {
                      if (e.target.value.length == 1) {
                        field.onChange(e.target.value.padStart(2, "0"));
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <span>/</span>
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    maxLength={2}
                    onBlur={(e) => {
                      if (
                        e.target.value.length < 4 &&
                        e.target.value.length > 1
                      ) {
                        field.onChange("20" + e.target.value);
                      }
                    }}
                    className="w-[60px] "
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button disabled={isPending} size={"sm"} type="submit">
            <Check size={15} />
          </Button>
          {!isPending && (
            <Button
              onClick={() => setShow(false)}
              variant={"ghost"}
              size={"sm"}
              type="button"
            >
              <X size={15} />
            </Button>
          )}
        </form>
      </Form>
    );
}
