import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Input, { InputWrapper } from "./common/Input";
import { useForm } from "react-hook-form";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import Button from "./common/Button";

export default function SignUp({ setShow }) {
  const [icon, setIcon] = useState();
  const [type, setType] = useState("password");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
          <button
            type="button"
            onClick={() => {
              setShow(false);
            }}
          >
            <IoMdClose />
          </button>
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
