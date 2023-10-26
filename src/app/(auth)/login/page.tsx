"use client";

import { Formik } from "formik";
import React, { useContext } from "react";
import Button from "components/limb/buttons/Button";
import { TextInput } from "components/limb/input/TextInput";
import * as yup from "yup";
import Link from "next/link";
import { LoginContext } from "app/(auth)/login/_providers/LoginProvider";
import Loading from "components/limb/loading/Loading";
import { LoginContextType } from "app/(auth)/login/_type/LoginType";

const LoginPage: React.FC = () => {

  const { login, loginState } = useContext(LoginContext) as LoginContextType;

  const fieldValidationSchema = yup.object({
    username: yup.string().required("Email or phone required"),
    password: yup.string().required("Password required"),
  });

  return (
    <>
      <div className="lg:w-2/6 md:w-1/2 bg-white shadow-lg rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-96 h-auto bg-white rounded-md shadow-md p-4">
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={(values, { resetForm }) => {
                login(values);
              }}
              validationSchema={fieldValidationSchema}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <TextInput
                    inputsize="large"
                    type="text"
                    placeholder="Email address or phone number"
                    name="username"
                  />
                  <TextInput
                    inputsize="large"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <Button
                    type="submit"
                    size="large"
                    block="true"
                    fontSize="text-xl"
                    fontWeight="font-bold"
                    bg="bg-blue-600"
                  >
                    Login
                  </Button>
                  <div className="text-sm w-full text-red-500">{loginState.error}</div>
                  <div className="mt-2 text-center pb-3 border-b border-gray-300">
                    <p className="text-white cursor-pointer underline">
                      Forgot password?
                    </p>
                  </div>
                </form>
              )}
            </Formik>

            <div className="mt-5 text-center">
              <Link href="/signup">
                <Button
                  size="large"
                  bg="bg-green-600"
                  fontSize="text-xl"
                  block="true"
                >
                  Create New Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {loginState.isLoading && <Loading />}
    </>
  );
};

export default LoginPage;
