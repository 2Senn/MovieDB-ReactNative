import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

export const LoginValidation = yup.object().shape({
  email: yup.string().email("Please Enter a valid email").required("Required"),
  password: yup.string().min(8).max(15).matches(passwordRules, { message: "Please create a stronger password" }).required("Required")
})
