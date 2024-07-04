"use client";

import React from "react";
import { Mail, Phone, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { UserUpdateSchema, zUserUpdate } from "@/types/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import LocaleSwitcher from "@/components/navigation/LocaleSwitcher";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

type Props = {
  name?: string;
  phone?: string;
  email?: string;
  className?: string;
};

const UserForm: React.FC<Props> = ({ name, phone, email, className }) => {
  const t = useTranslations("ProfileForm");

  const form = useForm<zUserUpdate>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      name: name,
      phone: phone,
      email: email,
    },
  });

  const onSubmit = (data: zUserUpdate) => {
    toast({
      title: "Form submitted!",
      description: JSON.stringify(data, null, 2),
      duration: 3000,
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "my-[30px] max-w-[420px] space-y-[30px] text-gray-500 lg:my-0",
          className,
        )}
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={t("name-placeholder")}
                    {...field}
                    className="min-w-[324px] border-black/25 pl-10"
                  />
                  <User className="absolute left-2.5 top-1/2 size-5 -translate-y-1/2" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("phone")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={t("phone-placeholder")}
                    {...field}
                    className="min-w-[324px] border-black/25 pl-10"
                  />
                  <Phone className="absolute left-2.5 top-1/2 size-5 -translate-y-1/2" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={t("email-placeholder")}
                    {...field}
                    className="min-w-[324px] border-black/25 pl-10"
                  />
                  <Mail className="absolute left-2.5 top-1/2 size-5 -translate-y-1/2" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Language */}
        <div className="space-y-2">
          <Label>{t("locale")}</Label>
          <LocaleSwitcher asSelect />
        </div>

        {/* Terms, Logout and Delete */}
        <div className="flex flex-col items-start gap-5">
          <Link href="/terms">{t("terms")}</Link>
          <Separator />
          <Button
            type="button"
            variant="link"
            size="xs"
            className="h-fit text-base font-normal text-gray-500"
            onClick={(e) => {
              toast({
                description: t("logout"),
              });
            }}
          >
            {t("logout")}
          </Button>
          <Separator />
          <Button
            type="button"
            variant="link"
            size="xs"
            className="h-fit text-base font-normal text-red-500"
            onClick={(e) => {
              toast({
                description: t("delete-account"),
              });
            }}
          >
            {t("delete-account")}
          </Button>
        </div>

        {/* Submit */}
        <Button
          variant="contact-chat"
          size="col-1"
          type="submit"
          className="text-base"
        >
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
};

export default UserForm;
