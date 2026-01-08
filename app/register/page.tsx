"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/libs/validators/register";
import { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormData) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });

    const responseData = await res.json();
    if (!res.ok) {
      setError(responseData.message || responseData.error);
      return;
    }

    router.push("/api/auth/signin");
  };

  return (
    <div className="w-1/2">
      {error && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      <form
        className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="fieldset">
          <label className="label w-full">Username</label>
          <input
            type="text"
            className="input w-full validator"
            placeholder="Username"
            {...register("username")}
          />
          {errors.username && (
            <div className="validator-hint mt-1 text-red-600">
              {errors.username.message}
            </div>
          )}
        </fieldset>

        <fieldset className="fieldset">
          <label className="label w-full">Email</label>
          <input
            type="email"
            className="input validator w-full"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <div className="validator-hint mt-1 text-red-600">
              {errors.email.message}
            </div>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <label className="label w-full">Password</label>
          <input
            type="password"
            className="input validator w-full"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <div className="validator-hint mt-1 text-red-600">
              {errors.password.message}
            </div>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <label className="label w-full">Confirm Password</label>
          <input
            type="password"
            className="input validator w-full"
            placeholder="re-enter password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <div className="validator-hint mt-1 text-red-600">
              {errors.confirmPassword.message}
            </div>
          )}
        </fieldset>

        <button className="btn btn-neutral mt-4" type="submit">
          Register
        </button>
        <button
          className="btn btn-ghost mt-1 ml-3"
          type="reset"
          onClick={() => reset()}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
