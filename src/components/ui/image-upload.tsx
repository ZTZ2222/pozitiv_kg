"use client";

import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import type { ControllerRenderProps } from "react-hook-form";
import { Button } from "./button";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { zGalleryImage } from "@/types/ad.schema";
import { useOptimisticAction } from "next-safe-action/hooks";
import { deletePromotionImage } from "@/actions/ads-actions";
import { toast } from "./use-toast";

type Props = {
  field: ControllerRenderProps<any, any>;
  existingImages?: zGalleryImage[];
};

const ImageUpload: React.FC<Props> = ({ field, existingImages }) => {
  const t = useTranslations("PromotionForm");
  const [images, setImages] = useState<File[]>([]);

  const { execute: deleteImage, optimisticState } = useOptimisticAction(
    deletePromotionImage,
    {
      currentState: { existingImages },
      updateFn: (state, item) => {
        return {
          existingImages: state.existingImages?.filter((i) => i.id !== item.id),
        };
      },
    },
  );

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files);
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      field.onChange(updatedImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    field.onChange(newImages);
  };

  const handleDeleteExistingImage = (image: zGalleryImage) => {
    deleteImage(image);
    toast({
      description: t("delete-image-success-toast"),
      duration: 3000,
    });
  };

  return (
    <FormItem>
      <FormLabel className="text-lg font-medium">{t("images-label")}</FormLabel>
      <FormControl>
        <div className="flex flex-wrap gap-5">
          <AnimatePresence>
            {optimisticState.existingImages?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: "-20%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-20%", opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative size-24 overflow-hidden rounded-sm bg-gray-400"
              >
                <Image
                  src={item.image}
                  alt={`Uploaded Image ${index + 1}`}
                  className="object-contain"
                  fill
                  sizes="(max-width: 600px) 100vw, 50vw"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={handleDeleteExistingImage.bind(null, item)}
                  className="absolute right-1 top-1 size-fit bg-red-500 p-0.5 text-white"
                >
                  <X className="size-5" />
                </Button>
                {index === 0 && (
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-nowrap rounded-sm bg-cyan-400 px-1 text-[10px] text-white">
                    {t("main-image-label")}
                  </span>
                )}
              </motion.div>
            ))}
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ y: "-20%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-20%", opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative size-24 overflow-hidden rounded-sm bg-gray-400"
              >
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded Image ${index + 1}`}
                  className="object-contain"
                  fill
                  sizes="(max-width: 600px) 100vw, 50vw"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute right-1 top-1 size-fit bg-red-500 p-0.5 text-white"
                >
                  <X className="size-5" />
                </Button>
                {!optimisticState.existingImages && index === 0 && (
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-nowrap rounded-sm bg-cyan-400 px-1 text-[10px] text-white">
                    {t("main-image-label")}
                  </span>
                )}
              </motion.div>
            ))}
            <div className="relative grid size-24 place-content-center rounded-sm bg-gray-400">
              <ImagePlus className="size-8 stroke-white" />
              <Input
                type="file"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                onChange={handleImageUpload}
                multiple
                accept="image/*"
              />
            </div>
          </AnimatePresence>
        </div>
      </FormControl>
    </FormItem>
  );
};

export default ImageUpload;
