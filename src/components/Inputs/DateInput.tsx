import React from "react";

interface DateInputProps {
  register: any;
  name: string;
  placeholder: string;
  errors: any;
}

const DateInput: React.FC<DateInputProps> = ({
  register,
  name,
  placeholder,
  errors,
}) => {
  return (
    <>
      <input
        {...register(name, { required: `This field is required!` })}
        type="date"
        placeholder={placeholder}
        name={name}
        className="bg-bgdark p-1 rounded-md outline-none text-white"
      />
      {errors && (
        <p className="text-red-400 text-xs font-bold relative animate-bounce p-1">
          {errors[name]?.message}
        </p>
      )}
    </>
  );
};

export default DateInput;
