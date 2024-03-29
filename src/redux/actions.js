import AsyncStorage from '@react-native-async-storage/async-storage'

export const Init = () => {
  
  return async dispatch => {
    let token = await AsyncStorage.getItem('token')
    if(token !== null){
      console.log("token fetched")
      dispatch({
        type: 'LOGIN',
        payload: token
      })
    }
  }
}
export const Login = (username, password) => {
  
  return async dispatch => {
    let token = null
    if(username && password){
      token = username + password
      await AsyncStorage.setItem('token', token)
      console.log("token stored")
    }
    dispatch({
      type: 'LOGIN',
      payload: token
    })
  }
}
