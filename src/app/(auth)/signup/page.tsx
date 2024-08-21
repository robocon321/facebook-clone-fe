"use client";

import { Formik } from "formik";
import React, { useContext } from "react";
import Button from "components/limb/buttons/Button";
import { TextInput } from "components/limb/input/TextInput";
import * as yup from "yup";
import Link from "next/link";
import { RegisterContext } from "app/(auth)/signup/_providers/RegisterProvider";
import Loading from "components/limb/loading/Loading";
import { SelectOptionInput } from "components/limb/input/SelectOptionInput";
import { RegisterContextType } from "app/(auth)/signup/_type/RegisterType";

const genderData = [
  {
    id: 1,
    text: "Male",
    value: "MALE",
  },
  {
    id: 2,
    text: "Female",
    value: "FEMALE",
  },
  {
    id: 3,
    text: "Other",
    value: "OTHER",
  },
];

const RegisterPage: React.FC = () => {
  const { register, registerState } = useContext(
    RegisterContext
  ) as RegisterContextType;

  const fieldValidationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email required"),
    phone: yup.string().required("Phone required"),
    firstName: yup.string().required("First name required"),
    lastName: yup.string().required("Last name required"),
    password: yup
      .string()
      .min(5, "Password must be >= 5 letters")
      .required("Password required"),
    birthday: yup.string().required("Birthdate require"),
    gender: yup.string().required("Gender required"),
  });

  return (
    <>
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
                birthday: "",
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
                  <label htmlFor="birthday">Date of birth</label>
                  <TextInput
                    inputsize="large"
                    type="date"
                    placeholder="Birthdate"
                    name="birthday"
                  />
                  <label htmlFor="gender">Gender</label>
                  <SelectOptionInput data={genderData} name="gender" />
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
                  <div className="text-sm w-full text-red-500">
                    {registerState.error}
                  </div>
                </form>
              )}
            </Formik>

            <div className="mt-5 text-center">
              <Link href="/login">
                <Button
                  size="large"
                  bg="bg-green-600"
                  fontSize="text-xl"
                  block="true"
                >
                  Log into account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {registerState.isLoading && <Loading />}
    </>
  );
};

export default RegisterPage;
