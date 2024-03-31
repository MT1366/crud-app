import React from "react";

interface FileInputProps {
  register: any;
  name: string;
  placeholder: string;
  errors: any;
}

const FileInput: React.FC<FileInputProps> = ({
  register,
  name,
  placeholder,
  errors,
}) => {
  return (
    <>
      <input
        {...register(name, { required: `This field is required!` })}
        type="file"
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

export default FileInput;
