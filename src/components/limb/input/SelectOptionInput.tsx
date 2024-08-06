"use client";

import React, { InputHTMLAttributes, useRef } from "react";
import { useField } from "formik";

type InputData = {
  text: string;
  value: string;
  id: string | number;
};

type IProps = InputHTMLAttributes<HTMLInputElement> & {
  data?: Array<InputData>;
};

const SelectOptionInput: React.FC<IProps> = (props) => {
  const { data, name } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [field, { error, touched }] = useField(props as string);
  return (
    <div>
      <div className="flex justify-between" ref={inputRef} {...field}>
        {data?.map((item) => (
          <div
            className="border border-gray rounded-md p-2 my-3 mr-3 flex-1"
            key={item.id}
          >
            <label htmlFor={`${item.id}`} className="mr-3 cursor-pointer">
              {item.text}
            </label>
            <input
              id={`${item.id}`}
              type="radio"
              value={item.value}
              name={name}
            />
          </div>
        ))}
      </div>
      {touched && error ? (
        <div className="text-sm w-full text-red-500">
          <p>{error}</p>
        </div>
      ) : null}
    </div>
  );
};

export { SelectOptionInput };
