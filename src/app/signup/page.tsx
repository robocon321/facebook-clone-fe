"use client";

import { Formik } from "formik";
import React, { useContext } from "react";
import Button from "components/limb/buttons/Button";
import { TextInput } from "components/limb/input/TextInput";
import * as yup from "yup";
import Link from "next/link";
import { RegisterContext } from "providers/RegisterProvider";
import Loading from "components/limb/loading/Loading";
import { SelectOptionInput } from "components/limb/input/SelectOptionInput";
import { RegisterContextType } from "types/pages/Register";

const genderData = [
  {
    id: 1,
    text: 'Male',
    value: 'MALE'  
  },
  {
    id: 2,
    text: 'Female',
    value: 'FEMALE'  
  },
  {
    id: 3,
    text: 'Other',
    value: 'OTHER'  
  }
]

const RegisterPage: React.FC = () => {

  const { register, registerState } = useContext(RegisterContext) as RegisterContextType;
  
  const fieldValidationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email required"),
    phone: yup.string().required("Phone required"),
    firstName: yup.string().required("First name required"),
    lastName: yup.string().required("Last name required"),
    password: yup.string().min(5, "Password must be >= 5 letters").required("Password required"),
    birthdate: yup.string().required("Birthdate require"),
    gender: yup.string().required("Gender required")
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
                    email: "",
                    phone: "",
                    firstName: "",
                    lastName: "",                    
                    password: "",
                    birthdate: "",
                    gender: "",
                  }}
                  onSubmit={(values, { resetForm }) => {
                    register(values);
                  }}
                  validationSchema={fieldValidationSchema}
                >
                  {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="flex -my-3">
                        <div className="flex-1 mr-1.5">
                          <TextInput
                            className="my-0"
                            inputsize="large"
                            type="text"
                            placeholder="First name"
                            name="firstName"
                          />
                        </div>
                        <div className="flex-1 ml-1.5">
                          <TextInput
                            className="my-0"
                            inputsize="large"
                            type="text"
                            placeholder="Last name"
                            name="lastName"
                          />
                        </div>
                      </div>
                      <TextInput
                        inputsize="large"
                        type="text"
                        placeholder="Email"
                        name="email"
                      />
                      <TextInput
                        inputsize="large"
                        type="text"
                        placeholder="Phone"
                        name="phone"
                      />
                      <TextInput
                        inputsize="large"
                        name="password"
                        type="password"
                        placeholder="Password"
                      />
                      <label htmlFor="birthdate">Date of birth</label>
                      <TextInput
                        inputsize="large"
                        type="date"
                        placeholder="Birthdate"
                        name="birthdate"
                      />
                      <label>Gender</label>
                      <SelectOptionInput data={genderData} name="gender"  />
                      <Button
                        type="submit"
                        size="large"
                        block="true"
                        fontSize="text-xl"
                        fontWeight="font-bold"
                        bg="bg-blue-600"
                      >
                        Register
                      </Button>
                      <div className="text-sm w-full text-red-500">{registerState.error}</div>
                    </form>
                  )}
                </Formik>

                <div className="mt-5 text-center">
                  <Link href="/login">
                    <Button
                      size="large"
                      bg="bg-green-600"
                      fontSize="text-xl"
                      block='true'
                    >
                      Log into account
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
              Responsive Facebook Register clone © 2023 Created by robocon321
            </p>
          </div>
        </div>
      </div>
      {registerState.isLoading && <Loading />}
    </>
  );
};

export default RegisterPage;
