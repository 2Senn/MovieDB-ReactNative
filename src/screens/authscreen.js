import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Button,
} from 'react-native';
import Loading from '../components/loading'
import InputCustom from '../components/input'
import { Field, Formik } from 'formik'
import { LoginValidation } from '../schemas/validation'
import { useDispatch } from 'react-redux';
import { Login } from '../redux/actions'

const { width, height } = Dimensions.get('window');

const SPACING = 10

const AuthScreen = ({ navigation }) => {

  const [disabled, setDisabled] = React.useState(true)
  const dispatch = useDispatch()

  const formSubmission = (values) => {
    dispatch(Login(values.email, values.password))
    navigation.navigate("Home")
  }

  return (
    <Formik 
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => formSubmission(values)}
      validationSchema={LoginValidation}
    >
      {({ handleChange, handleSubmit, handleBlur, values, errors, setFieldTouched, touched, isValid }) => (
  
        <View style={styles.mainContainer}>
          <Image source={require("../assets/images/popcorn.png")} style={styles.backImage} />
          <View style={styles.boxContainer}>
            <Text style={styles.title}>MOVIE TIME</Text>
            <Field name="email" component={InputCustom} ph={"Enter Your Email"} label="Email" /> 
            {touched.email && errors.email &&
              <Text style={{ fontSize: 14, color: '#FF0D10', fontWeight: 'bold' }}>{errors.email}</Text>
            }
            <Field name="password" component={InputCustom} ph={"Enter Password"} label="Password" /> 
            {touched.password && errors.password &&
              <Text style={{ fontSize: 14, color: '#FF0D10', fontWeight: 'bold' }}>{errors.password}</Text>
            }
            <View style={{ margin: SPACING}}>
              <Button onPress={handleSubmit} disabled={errors.password || errors.email || values.email == "" ? true : false} title={"Login"} />
            </View>
          </View>
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    position: 'absolute',
    top: 10,
    width: 100,
    height: 100,
  },
  boxContainer: {
    width: width / 1.25,
    height: height / 2,
    backgroundColor: '#ffffff80',
    alignItems: 'center',
    padding: SPACING,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ffffff90'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'

  }
})

export default AuthScreen

