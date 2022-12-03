import { useCallback, useState } from "react";
import {
  getProviders,
  signIn,
  ClientSafeProvider,
  LiteralUnion,
  SignInResponse,
} from "next-auth/react";
import { User } from "../generated/graphql";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";

type FormValues = Pick<User, "email"> & { password: string };

export async function getServerSideProps({}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<Record<string, any>>
> {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

function Login({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}) {
  const [formData, setFormData] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    },
    [formData.email, formData.password]
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const payload: SignInResponse | undefined = await signIn(
      providers?.credentials.id,
      {
        ...formData,
        redirect: false,
      }
    );

    setLoading(false);

    if (payload?.error) {
      toast.error(payload?.error ?? "Please check your credentials");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="grid h-screen place-content-center">
      <h1 className="mb-2 text-center text-3xl">Welcome to ChatApp</h1>
      <form onSubmit={onSubmit} className="w-96">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={onChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
            Your password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={onChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </div>
        <div className="mb-6 flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      <p>
        Don't have an account ?{" "}
        <Link passHref href={"/register"}>
          <a className="text-blue-600 hover:underline">Register</a>
        </Link>{" "}
      </p>
    </div>
  );
}

export default Login;
