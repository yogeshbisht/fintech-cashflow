"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import DayJS from "dayjs";
import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean().optional(),
});

type SignInFormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    console.log(values);
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", {
        ...values,
        lastLogin: DayJS().format(),
      });
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormControl>
                  <Input
                    className="dark:bg-gray-950 dark:placeholder:text-gray-700 dark:text-white/80 ease-soft bg-white text-gray-700 transition-all focus:border-gray-300"
                    disabled={loading}
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="form-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-8">
                <FormControl>
                  <Input
                    className="dark:bg-gray-950 dark:placeholder:text-gray-700 dark:text-white/80 ease-soft bg-white text-gray-700 transition-all focus:border-gray-300"
                    disabled={loading}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="form-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex justify-start items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={loading}
                  />
                </FormControl>
                <FormLabel className="text-xs text-slate-400 pl-2 pb-2">
                  Remember Me
                </FormLabel>
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            className="w-full mt-8 font-semibold text-white uppercase transition-all bg-transparent active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs bg-linear-to-tl from-blue-600 to-cyan-400 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
          >
            Login
          </Button>
        </form>
      </Form>
      <div className="relative w-full max-w-full p-6 my-2 text-center shrink-0">
        <p className="text-slate-400 text-sm mb-0 font-semibold before:bg-linear-to-r before:from-transparent before:via-neutral-500/40 before:to-neutral-500/40 before:right-2 before:-ml-1/2 before:content-[''] before:inline-block before:w-3/10 before:h-px before:relative before:align-middle after:left-2 after:-mr-1/2 after:bg-linear-to-r after:from-neutral-500/40 after:via-neutral-500/40 after:to-transparent after:content-[''] after:inline-block after:w-3/10 after:h-px after:relative after:align-middle">
          Don&apos;t have an account?
        </p>
      </div>
      <div className="text-center">
        <Button
          disabled={loading}
          className="w-full mb-4 font-semibold text-white uppercase transition-all bg-transparent active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs bg-linear-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
          onClick={() => {
            router.push("/register");
          }}
        >
          Register
        </Button>
      </div>
    </>
  );
};

export default SignInForm;
