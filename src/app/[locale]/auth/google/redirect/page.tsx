import { exchangeCodeForToken, storeToken } from "@/actions/auth-actions";
import { redirect } from "@/lib/i18nNavigation";

const Redirect = async ({
  searchParams,
}: {
  searchParams: { code: string };
}) => {
  const code = searchParams?.code;
  if (code) {
    const token = await exchangeCodeForToken(code);

    if (token) {
      await storeToken(token);
      redirect("/");
    }
  }
  return <div className="container text-2xl">Authorization...</div>;
};

export default Redirect;
