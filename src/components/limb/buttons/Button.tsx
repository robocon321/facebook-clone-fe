import React, { ButtonHTMLAttributes } from 'react';

type IColor = 'text-white' | 'text-gray-600' | 'text-black' | 'text-blue-600';
type IBackground = 'bg-white' | 'bg-green-600' | "bg-blue-600" | "bg-gray-300" | 'bg-blue-100';
type IButtonSize = 'small' | 'medium' | 'large';
type IFontSize = 'text-xs' | 'text-md' | 'text-xl' | 'text-2xl';
type IFontWeight = 'font-bold' | 'font-extrabold' | 'font-thin' | 'font-medium';

type IProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: IButtonSize;
  bg?: IBackground;
  color?: IColor;
  fontWeight?: IFontWeight;
  fontSize?: IFontSize;
  isdisabled?: string;
  isloading?: string;
  block?: string;
};

const Button: React.FC<IProps> = (props) => {
  const {
    color,
    bg,
    size,
    fontSize,
    fontWeight,
    isdisabled,
    isloading,
    children,
    block,
  } = props;
  return (
    <button
      {...props}
      className={`cursor-pointer ${
        block ? 'w-full' : 'inline-block'
      } px-4 items-center justify-center rounded-md shadow-md font ${
        size === 'small' ? 'h-7' : size === 'large' ? 'h-11' : 'h-8'
      } ${color ? color : 'text-white'} ${bg ? bg : 'bg-primary'}
      ${fontWeight ? fontWeight : 'font-semibold'}
      ${fontSize ? fontSize : 'text-sm'}
       ${props.className}`}
      disabled={isdisabled == 'true' || isloading == 'true' ? true : false}
    >
      {isloading == 'true' ? '...' : children}
    </button>
  );
};

export default Button;
