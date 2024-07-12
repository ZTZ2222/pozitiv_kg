"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useRouter } from "@/lib/i18nNavigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container grid h-[50vh] place-content-center gap-5">
      <h2 className="mb-5 text-4xl">{t("title")}</h2>
      <Button
        variant="contact-favorites"
        size="col-1"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        {t("try-again")}
      </Button>
      <Button variant="contact-chat" size="col-1" onClick={() => router.back()}>
        {t("go-back")}
      </Button>
    </div>
  );
}
