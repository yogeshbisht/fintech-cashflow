"use client";

import * as z from "zod";
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
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  agreeTerms: z.boolean().optional(),
});

type RegisterFormValues = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    console.log(values);
    setLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
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
              <FormItem className="mb-4">
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormControl>
                  <Input
                    className="dark:bg-gray-950 dark:placeholder:text-gray-700 dark:text-white/80 ease-soft bg-white text-gray-700 transition-all focus:border-gray-300"
                    disabled={loading}
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="form-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agreeTerms"
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
                  I agree the{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="font-bold text-slate-500"
                  >
                    Terms and Conditions
                  </Link>
                </FormLabel>
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            className="w-full mt-8 font-semibold text-white uppercase transition-all bg-transparent active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs bg-gradient-to-tl from-blue-600 to-cyan-400 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
          >
            Register
          </Button>
        </form>
      </Form>
      <div className="text-center">
        <p className="py-8 mb-0 leading-normal text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-slate-400">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
