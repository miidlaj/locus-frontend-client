import React from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import authenticationService from "../../services/authentication.service";

interface Props {
  setForgetPassModal: (a: boolean) => void;
  handleSuccessForForget: (a: string) => void;
}
const ForgetPassword = (props: Props) => {
  const { setForgetPassModal, handleSuccessForForget } = props;

  const formSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const [errorMessage, seterrorMessage] = React.useState("");

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    await authenticationService
      .requestPasswordReset(data.email)
      .then((response) => {
        handleSuccessForForget(response.data);
        reset({
          email:''
        });
        seterrorMessage('');
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 404) {
          seterrorMessage(error.response.data);
        } else {
          seterrorMessage(
            "Unexpected error occurred. Please try again after sometimes."
          );
        }
      });
  };

  return (
    <>
      <div className="mt-8">
        <input
          className={
            "w-full text-lg py-2 border-b border-gray-300 focus:outline-none bg-white " +
            (errors.email ? "focus:border-red-700" : "focus:border-teal-900")
          }
          type="text"
          placeholder="Email Address"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-700 text-sm block mt-2">
            {errors.email?.message}
          </span>
        )}

        {errorMessage && (
          <span className="text-red-700 text-sm block mt-2">
            {errorMessage}
          </span>
        )}
      </div>

      <div className="modal-action">
        <button
          onClick={() => {
            seterrorMessage('')
            reset({
              email:''
            });
            setForgetPassModal(false);
          }}
          className="btn bg-white/95 border-none text-teal-900 hover:bg-white hover:text-black"
          disabled={isSubmitting}
        >
          Close
        </button>

        <button
          onClick={handleSubmit(onSubmit)}
          className="btn bg-teal-900 border-none text-white hover:bg-white hover:text-teal-900"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default ForgetPassword;
