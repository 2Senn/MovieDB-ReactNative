import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './src/redux/store'
import { persistore } from './src/redux/store'
import Root from './src/navigation/index'
import { StatusBar } from 'react-native'


const App = () => {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistore}>
        <StatusBar hidden />
        <Root />
      </PersistGate>
    </Provider>
  )
}

export default App
