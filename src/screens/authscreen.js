import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import Loading from '../components/loading'
import InputCustom from '../components/input'
import { Field, Formik } from 'formik'
import { LoginValidation } from '../schemas/validation'
import { useDispatch } from 'react-redux';
import { Login } from '../redux/actions'
import I18n, { translate } from '../utils/i18n'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart'

const { width, height } = Dimensions.get('window');

const SPACING = 10

const AuthScreen = ({ navigation }) => {

  const [disabled, setDisabled] = React.useState(true)
  const [lng, setLng] = React.useState("en")
  const dispatch = useDispatch()

  const formSubmission = (values) => {
    dispatch(Login(values.email, values.password))
    navigation.navigate("Home")
  }

  const handleLanguage = async () => {
    if(lng == "en"){
      setLng("ar")
    } else{
      setLng("en")
    }
    await AsyncStorage.setItem('lang', lng)
    I18n.locale = I18nManager.isRTL ? 'ar' : 'en'
    I18nManager.forceRTL(lng === 'ar')
    setTimeout(() => {
      RNRestart.Restart()
    }, 500)
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
            <Field name="email" component={InputCustom} ph={translate("Enter Your Email")} label={translate("Email")} /> 
            {touched.email && errors.email &&
              <Text style={{ fontSize: 14, color: '#FF0D10', fontWeight: 'bold' }}>{errors.email}</Text>
            }
            <Field name="password" component={InputCustom} ph={translate("Password")} label={translate("Password")} /> 
            {touched.password && errors.password &&
              <Text style={{ fontSize: 14, color: '#FF0D10', fontWeight: 'bold' }}>{errors.password}</Text>
            }
            <View style={{ margin: SPACING}}>
              <Button onPress={handleSubmit} disabled={errors.password || errors.email || values.email == "" ? true : false} title={translate("Login")} />
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

  },
  langButton: {
    backgroundColor: '#ffffff80', 
    position: 'absolute', 
    bottom: 0, 
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 175,
    borderRadius: 20,
    height: 70,
    padding: 5
  }
})

export default AuthScreen

