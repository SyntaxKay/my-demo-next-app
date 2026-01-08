"use client";
import { useState } from "react";
import {
  changePasswordSchema,
  ChangePasswordData,
} from "@/libs/validators/changepassword";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const ChangePasswordPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordData>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ChangePasswordData) => {
    const res = await fetch("/api/changepassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }),
    });

    const responseData = await res.json();
    console.log(responseData);
    if (!res.ok) {
      setError(responseData.message || responseData.error);
      return;
    }

    router.push("/users");
  };
  return (
    <div className="p-6 w-1/2">
      <h1 className="mt-4">Change Password</h1>
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
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <label className="label w-full">Old Password</label>
          <input
            type="password"
            className="input w-full validator"
            placeholder="Username"
            {...register("currentPassword")}
          />
          {errors.currentPassword && (
            <div className="validator-hint mt-1 text-red-600">
              {errors.currentPassword.message}
            </div>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <label className="label w-full">New Password</label>
          <input
            type="password"
            className="input w-full validator"
            placeholder="New Password"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <div className="validator-hint mt-1 text-red-600">
              {errors.newPassword.message}
            </div>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <label className="label w-full">Confirm Password</label>
          <input
            type="password"
            className="input w-full validator"
            placeholder="Re-enter Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <div className="validator-hint mt-1 text-red-600">
              {errors.confirmPassword.message}
            </div>
          )}
        </fieldset>
        <button className="btn btn-neutral mt-4" type="submit">
          Submit
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

export default ChangePasswordPage;
