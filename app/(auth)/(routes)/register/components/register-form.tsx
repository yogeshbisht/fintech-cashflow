"use client";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DayJS from "dayjs";

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
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Creating a cookie for user session state
const cookieExpiryDate = new Date();
cookieExpiryDate.setDate(cookieExpiryDate.getDate() + 7);

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type RegisterFormValues = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const router = useRouter();
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
    try {
      setLoading(true);

      await axios.post("/api/auth/register", {
        ...values,
        joinedDate: DayJS().format(),
        lastLogin: DayJS().format(),
      });
      toast.success("Account created successfully!");
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
              <FormItem>
                <div className="flex justify-start items-center ml-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormLabel className="text-xs text-slate-400 pl-2">
                    I agree the{" "}
                    <Link
                      href="/terms-and-conditions"
                      className="font-bold text-slate-500"
                    >
                      Terms and Conditions
                    </Link>
                  </FormLabel>
                </div>
                <FormMessage className="form-error" />
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
