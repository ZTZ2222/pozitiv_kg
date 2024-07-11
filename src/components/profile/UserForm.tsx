"use client";

import React from "react";
import { Mail, Phone, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { UserUpdateSchema, zUserRead, zUserUpdate } from "@/types/user.schema";
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
import { useAction } from "next-safe-action/hooks";
import {
  deleteMyAccount,
  updateUserInfo,
  userLogout,
} from "@/actions/user-actions";
import UserImageUpload from "./UserImageUpload";

interface Props {
  userInfo?: zUserRead;
  className?: string;
}

const UserForm: React.FC<Props> = ({ userInfo, className }) => {
  const t = useTranslations("ProfileForm");

  const { execute, isExecuting } = useAction(updateUserInfo);

  const form = useForm<zUserUpdate>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      name: userInfo?.name,
      phone: userInfo?.phone,
      email: userInfo?.email,
    },
  });

  const onSubmit = (data: zUserUpdate) => {
    execute(data);
    toast({
      description: "Данные успешно обновлены",
      duration: 3000,
    });
  };
  return (
    <div
      className={cn(
        "my-[30px] h-max max-w-[420px] space-y-[30px] text-gray-500 lg:my-0",
        className,
      )}
    >
      {/* Image upload */}
      <UserImageUpload userInfo={userInfo} className="hidden lg:block" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[30px]">
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

          {/* Locale Switcher */}
          <div className="space-y-2">
            <Label>{t("locale")}</Label>
            <LocaleSwitcher asSelect />
          </div>

          <div className="flex flex-col items-start gap-5">
            {/* Terms */}
            <Link
              href="/resources/terms"
              className="underline-offset-4 hover:underline"
            >
              {t("terms")}
            </Link>
            <Separator />

            {/* Logout */}
            <Button
              type="button"
              variant="link"
              size="xs"
              className="h-fit text-base font-normal text-gray-500"
              onClick={() => {
                userLogout();
                toast({
                  description: t("logout-toast"),
                  duration: 3000,
                });
              }}
            >
              {t("logout")}
            </Button>

            <Separator />

            {/* Delete my account */}
            <Button
              type="button"
              variant="link"
              size="xs"
              className="h-fit text-base font-normal text-red-500"
              onClick={async () => {
                // await deleteMyAccount();
                toast({
                  description: t("delete-toast"),
                  duration: 3000,
                });
              }}
            >
              {t("delete-account")}
            </Button>
          </div>

          {/* Submit */}
          <Button
            disabled={isExecuting}
            variant="contact-chat"
            size="col-1"
            type="submit"
            className="text-base disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("submit")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserForm;
