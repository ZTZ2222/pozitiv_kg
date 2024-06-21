import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { AllLocales, AppConfig } from "./i18n";

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
});
