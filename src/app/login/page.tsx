"use client";

import { Formik } from "formik";
import React, { useContext } from "react";
import Button from "components/limb/button/Button";
import { TextInput } from "components/limb/input/TextInput";
import * as yup from "yup";
import Link from "next/link";
import { LoginContext, LoginContextType } from "providers/LoginProvider";
import Loading from "components/limb/loading/Loading";

const LoginPage: React.FC = () => {

  const { login, loginState } = useContext(LoginContext) as LoginContextType;
  
  const fieldValidationSchema = yup.object({
    username: yup.string().required("Email or phone required"),
    password: yup.string().required("Password required"),
  });

  return (
    <>
      <section className="text-gray-600 body-font bg-gray-100">
        <div className="container xl:px-32 px-5 py-36 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-bold lg:text-7xl text-6xl text-blue-600 text-center md:text-left ">
              facebook
            </h1>
            <p className="leading-relaxed mt-4 lg:text-3xl text-2xl lg:max-w-xl font-medium  text-black text-center md:text-left ">
              Facebook helps you connect and share with the people in your life.
            </p>
          </div>
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
                        <p className="text-primary cursor-pointer underline">
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
          <div className="lg:w-2/6 md:w-1/2 bg-transparent rounded-lg p-8 flex flex-col md:ml-auto w-full mt-3 md:mt-0">
            <p className="text-sm text-gray-700 mt-3 text-center">
              <b>Create a Page</b> for a celebrity, band or business
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <div className="mt-10 border-t-2 border-gray-300 flex flex-col items-center">
          <div className="sm:w-2/3 text-center py-6">
            <p className="text-sm text-blue-700 font-bold mb-2">
              Responsive Facebook Login clone © 2023 Created by robocon321
            </p>
          </div>
        </div>
      </div>
      {loginState.isLoading && <Loading />}
    </>
  );
};

export default LoginPage;
