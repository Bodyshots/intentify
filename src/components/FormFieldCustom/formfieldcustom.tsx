import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Input } from '../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription
} from "@/components/ui/form"

interface FormFieldCustomProps {
  name: string;
  id: string;
  placeholder: string;
  type: string;
  autoComplete: string;
  desc?: string;
  required: boolean;
  control: Control<any>;
  errors: FieldErrors<any>;
  formItemClass?: string;
}

const FormFieldCustom: React.FC<FormFieldCustomProps> = ({
  name,
  id,
  placeholder,
  type,
  autoComplete,
  desc,
  control,
  errors,
  required,
  formItemClass,
}) => {
  // Errors must be a string
  const errorMessage =
    typeof errors[name]?.message === 'string' ? errors[name]?.message : undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={formItemClass}>
          <FormControl>
            <Input
              placeholder={placeholder}
              required={required}
              type={type}
              autoComplete={autoComplete}
              id={id}
              {...field}
            />
          </FormControl>
          {desc && <FormDescription>{desc}</FormDescription>}
          <FormMessage>{errorMessage}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default FormFieldCustom;

