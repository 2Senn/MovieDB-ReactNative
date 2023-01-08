import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import HomeScreen from '../screens/homescreen' 
import AuthScreen from '../screens/authscreen' 
import { useDispatch, useSelector } from "react-redux"
import { Init, Login } from "../redux/actions"
import { useEffect } from "react"

const Stack = createNativeStackNavigator()

const Root = () => {

  const token = useSelector(state => state.Auth.authToken)
  console.log(token)

  const dispatch = useDispatch()

  const init = () => {
    dispatch(Init())
  }

  useEffect(() => {
    init()
  }, [])


  return(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {
          token === null ?
            <Stack.Screen name="Auth" component={AuthScreen} /> : null
        }
          <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Root
