"use client";

import { createCommerialInvoice } from "@/actions/commercial-actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import {
  zInvoiceCreate,
  InvoiceCreateSchema,
  zPaymentMethodRead,
} from "@/types/payment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { CameraPlus } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";

type Props = {
  banks?: zPaymentMethodRead[];
};

const CommercialForm: React.FC<Props> = ({ banks }) => {
  const t = useTranslations("CommercialForm");
  const { promoId } = useParams();

  const [days, setDays] = useState(14);
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<zInvoiceCreate>({
    resolver: zodResolver(InvoiceCreateSchema),
    defaultValues: {
      product_id: parseInt(promoId as string) || 0,
      days: 14,
      payment_method: "bank",
      bank_id: 3,
    },
  });

  const [selectedBankId, setSelectedBankId] = useState<number>(
    form.getValues("bank_id"),
  );

  const onSubmit = async (data: zInvoiceCreate) => {
    const formData = new FormData();
    (Object.keys(data) as Array<keyof zInvoiceCreate>).forEach((key) => {
      let value = data[key];

      if (value === undefined || value === null) {
        return;
      }
      formData.append(key, value instanceof File ? value : value.toString());
    });

    await createCommerialInvoice(formData);

    toast({
      description: t("payment-sent"),
      duration: 5000,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto my-10 max-w-[575px] space-y-9 text-gray-800"
      >
        {/* Slider */}
        <div className="space-y-10 md:rounded-[10px] md:px-[50px] md:py-[40px] md:shadow-[0px_0px_4px_0px_#9090904D]">
          <div className="space-y-5">
            <h4 className="text-center text-lg font-semibold">
              {t("form-title")}
            </h4>
            <p className="text-pretty text-gray-500">
              {t("form-description")} 1 KGS
            </p>
          </div>
          <FormField
            control={form.control}
            name="days"
            render={({ field }) => (
              <FormItem className="space-y-5">
                <FormLabel className="mb-5 text-lg font-semibold">
                  {t("day")}{" "}
                  <span className="text-base font-normal">
                    ({days} {t("days")})
                  </span>
                </FormLabel>
                <FormControl>
                  <Slider
                    defaultValue={[field.value]}
                    min={1}
                    max={31}
                    step={1}
                    aria-label="Days"
                    onValueChange={(value) => {
                      setDays(value[0]);
                      field.onChange(value[0]);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="mx-auto w-fit text-3xl font-bold leading-10 text-gray-900">
            {days * 1} KGS
          </div>
        </div>

        <Separator className="md:opacity-0" />

        {/* Radio Group */}
        <FormField
          control={form.control}
          name="bank_id"
          render={({ field }) => (
            <FormItem className="space-y-5 md:rounded-[10px] md:p-[30px] md:shadow-[0px_0px_4px_0px_#9090904D]">
              <FormLabel className="text-lg font-semibold">
                {t("choose-payment-method")}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setSelectedBankId(parseInt(value, 10));
                    field.onChange(value);
                  }}
                  defaultValue={field.value.toString()}
                  className="flex flex-col gap-2.5"
                >
                  {banks?.map((bank) => (
                    <FormItem
                      key={bank.id}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={bank.id.toString()} />
                      </FormControl>
                      <FormLabel className="flex items-center gap-4 font-normal">
                        <div className="relative size-[72px] shrink-0 overflow-clip rounded-lg">
                          <Image
                            src={"/assets/other/placeholder.svg"}
                            alt={bank.name}
                            fill
                            className="object-cover"
                            sizes="50px"
                          />
                        </div>
                        <AnimatePresence>
                          <div className="flex flex-col space-y-1">
                            <motion.span
                              className="text-base font-medium text-gray-800"
                              animate={
                                selectedBankId === bank.id
                                  ? { scale: 1.1, x: 10 }
                                  : { scale: 1, x: 0 }
                              }
                              transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                                type: "spring",
                              }}
                            >
                              {bank.name.toUpperCase()}
                            </motion.span>
                            {selectedBankId === bank.id && (
                              <motion.div
                                layout
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{
                                  delay: 0.25,
                                  duration: 0.2,
                                  ease: "easeInOut",
                                  type: "spring",
                                }}
                                className="flex flex-col space-y-1 text-sm text-gray-500"
                              >
                                <span>
                                  {t("account-name")}: {bank.account_name}
                                </span>
                                <span>
                                  {t("account-number")}: {bank.account_number}
                                </span>
                              </motion.div>
                            )}
                          </div>
                        </AnimatePresence>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <Separator className="md:opacity-0" />

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="bank_slip"
          render={({ field }) => (
            <FormItem className="space-y-5 md:rounded-[10px] md:p-[30px] md:shadow-[0px_0px_4px_0px_#9090904D]">
              <FormLabel className="text-lg font-medium">
                {t("send-check")}:
              </FormLabel>
              <FormControl>
                <div className="relative grid h-[110px] w-full place-content-center rounded-sm border-2 border-dashed border-gray-300">
                  {image ? (
                    <>
                      <Image
                        src={URL.createObjectURL(image)}
                        alt="Uploaded check"
                        fill
                        className="object-cover"
                        sizes="(max-width: 110px) 100vw"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setImage(null);
                          field.onChange(null);
                        }}
                        className="absolute right-1 top-1 z-40 size-fit bg-red-500 p-0.5 text-white"
                      >
                        <X className="size-5" />
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <CameraPlus />
                      <span>{t("upload-photo")}</span>
                    </div>
                  )}
                  <Input
                    type="file"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    accept="image/*"
                    required
                    onChange={(e) => {
                      if (e.target.files) {
                        const newImage = e.target.files[0];
                        setImage(newImage);
                        field.onChange(newImage);
                      }
                    }}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Separator className="md:opacity-0" />

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <Button
            variant="contact-chat"
            size="col-1"
            type="submit"
            className="max-w-[575px] text-lg font-medium"
          >
            {t("submit-button")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommercialForm;
