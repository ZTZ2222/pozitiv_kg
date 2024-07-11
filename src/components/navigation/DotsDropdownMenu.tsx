"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Archive,
  ArchiveRestore,
  ArchiveX,
  CircleSlash,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
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
import { Pen, ThreeDots } from "@/components/icons";
import { useTranslations } from "next-intl";
import { zPromotionRead } from "@/types/ad.schema";
import { zUserRead } from "@/types/user.schema";
import { useRouter } from "@/lib/i18nNavigation";
import {
  changePromotionStatus,
  deletePromotion,
  reportPromotion,
} from "@/actions/ads-actions";
import { useAction } from "next-safe-action/hooks";

type Props = {
  promotion: zPromotionRead;
  currentUser?: zUserRead;
  editMode?: boolean;
  className?: string;
};

const DotsDropdownMenu: React.FC<Props> = ({
  promotion,
  currentUser,
  editMode = false,
  className,
}) => {
  const t = useTranslations("Modal");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const editPromotionButtonHandler = (advertisementId: number) => {
    router.push(`/ads/${advertisementId}/edit`);
  };

  const changeStatusPromotionButtonHandler = async (
    advertisement: zPromotionRead,
  ) => {
    if (advertisement.owner_status === "pending") {
      await changePromotionStatus({
        promotion_id: advertisement.id,
        status: "published",
      });
      toast({
        description: (
          <span className="flex items-center gap-2.5">
            <ArchiveRestore /> {t("promotion-restore-success-toast")}
          </span>
        ),
        duration: 3000,
      });
    } else if (advertisement.owner_status === "published") {
      await changePromotionStatus({
        promotion_id: advertisement.id,
        status: "pending",
      });
      toast({
        description: (
          <span className="flex items-center gap-2.5">
            <Archive /> {t("promotion-archive-success-toast")}
          </span>
        ),
        duration: 3000,
      });
    } else {
      toast({
        description: (
          <span className="flex items-center gap-2.5">
            <CircleSlash /> Oops! Something went wrong
          </span>
        ),
        duration: 3000,
      });
    }
  };

  const deletePromotionButtonHandler = async (advertisementId: number) => {
    await deletePromotion(advertisementId);
    toast({
      description: (
        <span className="flex items-center gap-2.5">
          <Trash2 /> {t("promotion-delete-success-toast")}
        </span>
      ),
      duration: 3000,
    });
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("size-fit px-2 py-1", className)}
          >
            {editMode ? <Pen className="size-8" /> : <ThreeDots />}
          </Button>
        </DropdownMenuTrigger>
        {currentUser?.id === promotion?.seller.id || editMode ? (
          <DropdownMenuContent className="-translate-x-2 translate-y-2 space-y-4 px-3 py-5 sm:-translate-x-4 lg:px-14">
            {/* Edit */}
            <DropdownMenuItem asChild>
              <Button
                variant="outline"
                onClick={editPromotionButtonHandler.bind(null, promotion?.id)}
                className="w-[280px] justify-start rounded-[10px] px-4 font-medium"
              >
                <Pencil className="mr-2.5 size-[18px]" />
                {t("dropdown-edit")}
              </Button>
            </DropdownMenuItem>

            {/* Change Status */}
            <DropdownMenuItem asChild>
              <Button
                variant="outline"
                onClick={changeStatusPromotionButtonHandler.bind(
                  null,
                  promotion,
                )}
                className={cn(
                  "w-[280px] justify-start rounded-[10px] px-4 font-medium",
                  promotion?.owner_status === "pending"
                    ? "text-green-500"
                    : "text-amber-500",
                )}
              >
                {promotion?.owner_status === "pending" ? (
                  <>
                    <ArchiveRestore className="mr-2.5 size-[18px]" />
                    {t("dropdown-activate")}
                  </>
                ) : (
                  <>
                    <ArchiveX className="mr-2.5 size-[18px]" />
                    {t("dropdown-archive")}
                  </>
                )}
              </Button>
            </DropdownMenuItem>

            {/* Delete */}
            <DropdownMenuItem asChild>
              <Button
                variant="outline"
                onClick={deletePromotionButtonHandler.bind(null, promotion?.id)}
                className="w-[280px] justify-start rounded-[10px] px-4 font-medium text-red-500"
              >
                <Trash2 className="mr-2.5 size-[18px]" />
                {t("dropdown-delete")}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent className="-translate-x-4 translate-y-2">
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              {t("complain")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
      <ComplainModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        promotionId={promotion?.id}
      />
    </>
  );
};

const ComplainModal = ({
  promotionId,
  isOpen,
  setIsOpen,
}: {
  promotionId: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const t = useTranslations("Modal");

  const form = useForm<zComplainForm>({
    resolver: zodResolver(ComplainFormSchema),
  });

  const { execute, isExecuting, hasSucceeded } = useAction(reportPromotion);
  function onSubmit(data: zComplainForm) {
    execute(data);
    if (hasSucceeded)
      toast({
        description: t("complain-sent-toast"),
        duration: 3000,
      });
  }

  const reasonList = [
    {
      id: 1,
      name: t("reason-spam"),
      value: `Cпам|${promotionId}`,
    },
    {
      id: 2,
      name: t("reason-not-relevant"),
      value: `Объявление неактуально|${promotionId}`,
    },
    {
      id: 3,
      name: t("reason-prohibited"),
      value: `Запрещенный товар|${promotionId}`,
    },
    {
      id: 4,
      name: t("reason-duplicate"),
      value: `Дубликат|${promotionId}`,
    },
    {
      id: 5,
      name: t("reason-wrong-category"),
      value: `Неверная категория|${promotionId}`,
    },
    {
      id: 6,
      name: t("reason-fraud"),
      value: `Мошенничество|${promotionId}`,
    },
    {
      id: 7,
      name: t("reason-other"),
      value: `Другое|${promotionId}`,
    },
  ];

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
                <h4 className="text-lg">{t("complain")}</h4>
                {/* Close Button (X) */}
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
                  {/* Complain Form */}
                  <FormField
                    control={form.control}
                    name="reportText"
                    render={({ field }) => (
                      <FormItem className="space-y-5 rounded-lg bg-white p-5">
                        <FormLabel className="mb-5 text-lg">
                          {t("choose-reason")}
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

                  {/* Submit Button */}
                  <Button
                    variant="contact-chat"
                    size="col-2"
                    type="submit"
                    className={cn(
                      "mx-auto disabled:cursor-not-allowed disabled:opacity-50",
                      form.formState.isValid
                        ? "bg-fuchsia-500 hover:bg-fuchsia-600"
                        : "cursor-not-allowed bg-gray-400 hover:bg-gray-500",
                    )}
                    onClick={() => setIsOpen(false)}
                    disabled={isExecuting}
                  >
                    {t("send-complain")}
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
