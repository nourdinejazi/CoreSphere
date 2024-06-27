"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CirclePlus, X } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { PointageVersementSchema } from "@/schemas/cheque-schemas";
import { cn } from "@/lib/utils";
import Ld from "@/components/loader";
import { AlertUse } from "@/hooks/use-alerte";
import Reveal from "@/components/reveal";
import { Pointageversementesp } from "@/actions/espece-action/versementesp/pointage-versementesp";

interface DateBanqueFormProps {
  id: string;
  initialData: {
    day: string;
    month: string;
    year: string;
  } | null;
}

export function DateBanqueForm({ id, initialData }: DateBanqueFormProps) {
  const [show, setShow] = useState(false);
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const alr = AlertUse();

  const form = useForm<z.infer<typeof PointageVersementSchema>>({
    resolver: zodResolver(PointageVersementSchema),
    defaultValues: initialData || {
      day: "",
      month: "",
      year: "",
    },
  });

  function onSubmit(values: z.infer<typeof PointageVersementSchema>) {
    startTransition(() => {
      toast.promise(
        () =>
          Pointageversementesp(values, params.boutiqueId as string, id).then(
            (data) => {
              if (data?.error) {
                return Promise.reject(data.error);
              } else {
                return Promise.resolve(data.success);
              }
            }
          ),
        { error: (err) => err, success: (data) => data }
      );
    });

    setShow(false);
  }

  if (!show && !initialData)
    return (
      <div>
        {isPending ? (
          <div className="flex items-center mx-4 justify-start">
            <Ld />
          </div>
        ) : (
          <Reveal>
            <div>
              <Button variant={"ghost"} onClick={() => setShow(true)}>
                <CirclePlus size={17} />
              </Button>
            </div>
          </Reveal>
        )}
      </div>
    );
  else
    return (
      <Reveal>
        <div>
          {initialData && !show && !isPending && (
            <Reveal>
              <div className="flex items-center justify-start gap-2">
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={() => {
                    setShow(true);
                    form.reset(
                      initialData || {
                        day: "",
                        month: "",
                        year: "",
                      }
                    );
                  }}
                >
                  <div className="flex">
                    <span>{initialData.day.padStart(2, "0")}/</span>
                    <span>{initialData.month.padStart(2, "0")}/</span>
                    <span>{initialData.year}</span>
                  </div>
                </Button>
              </div>
            </Reveal>
          )}
          {show && (
            <Reveal>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className={cn(" flex items-center justify-start gap-1  ")}
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
                    {initialData ? "Modifier" : "Ajouter"}
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
            </Reveal>
          )}
          {isPending && (
            <Reveal>
              <div className="flex items-center mx-4 justify-start">
                <Ld />
              </div>
            </Reveal>
          )}
        </div>
      </Reveal>
    );
}
