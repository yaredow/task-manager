"use client";

import { useForm } from "react-hook-form";

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

import { SignUpData, SignUpSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import DottedSeparator from "@/components/dotted-separator";
import Link from "next/link";
import { useSignUp } from "../api/use-sign-up";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function SignUpForm() {
  const router = useRouter();
  const { isPending, signup } = useSignUp();
  const form = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password1: "",
      password2: "",
    },
  });

  const onSubmit = (values: SignUpData) => {
    signup(values, {
      onSuccess: () => {
        toast({
          description: "Account created successfullu",
        });
        router.push("/sign-in");
      },
    });
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        type="text"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password..."
                        type="password"
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
                name="password2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm your password"
                        type="password"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">
                {isPending ? "Loading..." : "Sign Up"}
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
        </CardContent>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="justify-center flex items-center">
          <p>
            Already have an account?{" "}
            <Link href="/sign-in">
              <span className=" text-blue-700">&nbsp;Sign In</span>
            </Link>
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
