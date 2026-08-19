"use client";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import DayJS from "dayjs";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(String(error.response?.data ?? "Something went wrong"));
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mb-4">
              <Input
                className="dark:bg-gray-950 dark:placeholder:text-gray-700 dark:text-white/80 ease-soft bg-white text-gray-700 transition-all focus:border-gray-300"
                disabled={loading}
                placeholder="Email"
                {...field}
              />
              <FieldError className="form-error" />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mb-4">
              <Input
                className="dark:bg-gray-950 dark:placeholder:text-gray-700 dark:text-white/80 ease-soft bg-white text-gray-700 transition-all focus:border-gray-300"
                disabled={loading}
                placeholder="Password"
                {...field}
              />
              <FieldError className="form-error" />
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mb-6">
              <Input
                className="dark:bg-gray-950 dark:placeholder:text-gray-700 dark:text-white/80 ease-soft bg-white text-gray-700 transition-all focus:border-gray-300"
                disabled={loading}
                placeholder="Confirm Password"
                {...field}
              />
              <FieldError className="form-error" />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="agreeTerms"
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex justify-start items-center ml-2"
            >
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={loading}
              />
              <FieldLabel className="text-xs text-slate-400 pl-2">
                I agree the{" "}
                <Link
                  href="/terms-and-conditions"
                  className="font-bold text-slate-500"
                >
                  Terms and Conditions
                </Link>
              </FieldLabel>
              <FieldError className="form-error" />
            </Field>
          )}
        />
        <Button
          disabled={loading}
          className="w-full mt-8 font-semibold text-white uppercase transition-all bg-transparent active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs bg-linear-to-tl from-blue-600 to-cyan-400 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
        >
          Register
        </Button>
      </form>
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
