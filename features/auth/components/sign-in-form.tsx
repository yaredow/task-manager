"use client";

import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

import DottedSeparator from "@/components/dotted-separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SignInData, SignInSchema } from "../schemas";
import { useSignIn } from "../api/use-sign-in";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const { signin, isPending } = useSignIn();
  const form = useForm<SignInData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInData) => {
    signin(values);
  };

  return (
    <Card className="mx-auto max-w-sm md:w-[487px]">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="gap-y-4">
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        type="email"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        type="password"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Sign In"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <CardContent className="px-7 flex flex-col gap-y-4">
          <Button
            className="w-full flex flex-row gap-2"
            disabled={false}
            variant="secondary"
          >
            <FcGoogle size={16} /> Login with Google
          </Button>

          <Button
            className="w-full flex flex-row gap-2"
            disabled={false}
            variant="secondary"
          >
            <FaGithub size={16} />
            Login with Google
          </Button>
        </CardContent>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="justify-center flex items-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up">
              <span className=" text-blue-700">&nbsp;Sign Up</span>
            </Link>
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
