import React, { createContext, useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Input, { InputWrapper } from "./common/Input";
import { useForm } from "react-hook-form";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import Button from "./common/Button";
import toast from "react-hot-toast";
import api from "../api/api";
import { useAuth } from "./ProtectedRoute";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [icon, setIcon] = useState();
  const [type, setType] = useState("password");
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await api.post("/auth/login", data);
      if (response) {
        const user = JSON.stringify(response?.data?.user);
        localStorage.setItem("user", user);
        login();
        toast.success("Login Successfull");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  
  const handleToggle = () => {
    if (type === "password") {
      setIcon(true);
      setType("text");
    } else {
      setIcon(false);
      setType("password");
    }
  };
  return (
    <div
      className=" h-[100vh] w-[100vw]  fixed top-0 left-0 z-50   flex items-center justify-center bg-[black]/[70%] 
    "
    >
      <div className="h-auto  w-[450px] rounded-2xl bg-[#fff] pt-5 pb-7 text-black shadow-md">
        <div className="flex justify-between items-center mx-5">
          <h1 className="text-blue-500 font-bold text-2xl ">Log In</h1>
          {/* <button
            type="button"
            onClick={() => {
              setShow(false);
            }}
          >
            <IoMdClose />
          </button> */}
        </div>

        <form className="mx-7 space-y-2 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper register={register}>
            <Input
              type="email"
              placeholder="Email"
              required={true}
              name="email"
            ></Input>
            <div className="relative">
              <Input
                type={type}
                placeholder="Password"
                required={true}
                name="password"
              ></Input>
              <span
                className="absolute right-2 top-1/2 -translate-y-1/2 transform "
                onClick={handleToggle}
              >
                {icon ? (
                  <IoEyeOffOutline
                    className="cursor-pointer"
                    size={20}
                    color="lightgrey"
                  />
                ) : (
                  <MdOutlineRemoveRedEye
                    className="cursor-pointer"
                    size={20}
                    color="lightgrey"
                  />
                )}
              </span>
            </div>
          </InputWrapper>
          <p
            className="font-medium"
            onClick={() => {
              navigate("/signUp");
            }}
          >
            Don&apos;t have an account?{" "}
            <span className="cursor-pointer text-main">Register Now</span>
          </p>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
