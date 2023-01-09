import * as yup from 'yup'
import { translate } from '../utils/i18n'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

export const LoginValidation = yup.object().shape({
  email: yup.string().email(translate("Valid Email")).required(translate("Required")),
  password: yup.string().min(8).max(15).matches(passwordRules, { message: translate("Stronger Password") }).required(translate("Required"))
})
