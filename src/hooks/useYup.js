import { useMemo } from "react";
import * as yup from "yup";

const useYup = () => {
  const yupObj = useMemo(
    () =>
      yup
        .object({
          email: yup
            .string()
            .trim()
            .required("Please enter your email address!")
            .matches(
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
              "Please enter a valid email address!",
            ),
          username: yup.string().trim().required("Please enter your username!"),
          password: yup
            .string()
            .trim()
            .required("Please enter your password!")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
              "Your password must be at least 8 characters, including upper/lower case letters, numbers and symbols.",
            ),
          confirm_password: yup
            .string()
            .trim()
            .required("Please confirm your password!"),
          workspaceName: yup
            .string()
            .trim()
            .required("Please enter your workspace name!"),
          timezone: yup
            .string()
            .trim()
            .required("Please select your timezone!"),
          region: yup.string().trim().required("Please select your region!"),
        })
        .required(),
    [],
  );
  const yupSync = useMemo(
    () =>
      /** @type {any} */ ({
        async validator({ field }, value) {
          await yupObj.validateAt(field, { [field]: value });
        },
      }),
    [yupObj],
  );
  return { yupSync };
};

export default useYup;
