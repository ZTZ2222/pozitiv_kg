"use client";

import {
  NextIntlClientProvider,
  IntlErrorCode,
  IntlError,
  useLocale,
  useMessages,
} from "next-intl";

function onError(error: IntlError) {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    // Missing translations are expected and should only log an error
    console.error(error);
  } else {
    // Other errors indicate a bug in the app and should be reported
    throw error;
  }
}

function getMessageFallback({
  namespace,
  key,
  error,
}: {
  namespace?: string;
  key: string;
  error: IntlError;
}) {
  const path = [namespace, key].filter((part) => part != null).join(".");

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return key;
  } else {
    return "Dear developer, please fix this message: " + path;
  }
}

const NextIntlCustomProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const locale = useLocale();
  const messages = useMessages();
  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      onError={onError}
      getMessageFallback={getMessageFallback}
    >
      {children}
    </NextIntlClientProvider>
  );
};

export default NextIntlCustomProvider;
