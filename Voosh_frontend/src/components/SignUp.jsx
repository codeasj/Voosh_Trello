import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Input, { InputWrapper } from "./common/Input";
import { useForm } from "react-hook-form";
import { RxUpload } from "react-icons/rx";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import Button from "./common/Button";
import { authMultiFormApi } from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignUp({ setShow }) {
  const [icon, setIcon] = useState();
  const [type, setType] = useState("password");
  const inputRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      if (data?.password !== data?.confirmPassword) {
        return toast.error("Password do not match");
      }
      const response = await authMultiFormApi.post("/auth/register", data);
      if (response) {
        toast.success("User Registered Successfully");
        setShow(false);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
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
    <div className=" h-[100vh] w-[100vw]  fixed top-0 left-0 z-50   flex items-center justify-center bg-[black]/[70%]">
      <div className="h-auto  w-[450px] rounded-2xl bg-[#fff] pt-5 pb-7 text-black shadow-md">
        <div className="flex justify-between items-center mx-5">
          <h1 className="text-blue-500 font-bold text-2xl ">Sign Up</h1>
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
          <InputWrapper type="text" register={register}>
            <Input
              placeholder="First Name"
              required={true}
              name="firstName"
            ></Input>
            <Input placeholder="Last Name" name="lastName"></Input>
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
            <div className="relative">
              <Input
                type={type}
                placeholder="Confirm Password"
                required={true}
                name="confirmPassword"
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
            <div
              className="gap-2 border h-8 flex rounded p-2 font-bold justify-center cursor-pointer w-auto 
                items-center bg-gray-200 "
              onClick={() => {
                inputRef.current.click();
              }}
            >
              <input
                type="file"
                name="icon"
                accept="image/png, image/jpg, image/jpeg"
                className="hidden"
                {...register("icon")}
                ref={inputRef}
              />
              <RxUpload className="text-lg" />
              <span>Upload Image</span>
            </div>
          </InputWrapper>
          <p
            className="font-medium"
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account?
            <span className="cursor-pointer text-main"> Sign in</span>
          </p>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
