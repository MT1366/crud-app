import React from "react";

interface TextInputProps {
  register: any;
  name: string;
  placeholder: string;
  type: string;
  errors: any;
}

const TextInput: React.FC<TextInputProps> = ({
  register,
  name,
  placeholder,
  errors,
}) => {
  return (
    <div>
      <input
        {...register(name, { required: `This field is required!` })}
        name={name}
        placeholder={placeholder}
        className="bg-bgdark w-full p-2 rounded-md outline-none text-white"
      />
      {errors && (
        <p className="text-red-400 text-xs font-bold relative animate-bounce">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default TextInput;
