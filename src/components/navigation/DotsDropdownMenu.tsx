"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ComplainFormSchema, zComplainForm } from "@/types/other.schema";
import { cn } from "@/lib/utils";
import { ThreeDots } from "@/components/icons";

const DotsDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-fit px-2 py-1">
            <ThreeDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="-translate-x-4 translate-y-2">
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            Пожаловаться
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ComplainModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

const reasonList = [
  {
    id: 1,
    name: "Это спам",
    value: "spam",
  },
  {
    id: 2,
    name: "Объявление неактуально",
    value: "closed",
  },
  {
    id: 3,
    name: "Запрещенный товар",
    value: "prohibited",
  },
  {
    id: 4,
    name: "Дубликат",
    value: "dublicate",
  },
  {
    id: 5,
    name: "Неверная категория",
    value: "wrong_category",
  },
  {
    id: 6,
    name: "Мошенничество",
    value: "fraud",
  },
  {
    id: 7,
    name: "Другое",
    value: "other",
  },
];

const ComplainModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const form = useForm<zComplainForm>({
    resolver: zodResolver(ComplainFormSchema),
  });

  function onSubmit(data: zComplainForm) {
    toast({
      description: "Спасибо! Ваша жалоба будет рассмотрена.",
      duration: 3000,
    });
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-900/20 px-2.5 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg cursor-default overflow-hidden rounded-lg bg-gray-100 px-4 py-6 shadow-xl"
          >
            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-lg">Пожаловаться</h4>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-fit"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="size-7" onClick={() => setIsOpen(false)} />
                </Button>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex w-full flex-col space-y-12"
                >
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-5 rounded-lg bg-white p-5">
                        <FormLabel className="mb-5 text-lg">
                          Выберите причину
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col gap-8"
                          >
                            {reasonList.map((reason) => (
                              <FormItem
                                key={reason.id}
                                className="flex items-center justify-between space-y-0"
                              >
                                <FormLabel className="w-full cursor-pointer font-light">
                                  {reason.name}
                                </FormLabel>
                                <FormControl>
                                  <RadioGroupItem value={reason.value} />
                                </FormControl>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    variant="contact-chat"
                    size="col-2"
                    type="submit"
                    className={cn(
                      "mx-auto",
                      form.formState.isValid
                        ? "bg-fuchsia-500 hover:bg-fuchsia-600"
                        : "cursor-not-allowed bg-gray-400 hover:bg-gray-500",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    Отправить
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DotsDropdownMenu;
