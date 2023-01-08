const initialState = {
  authToken: null,
}


export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        authToken: action.payload
      }
    default:
      return state
  }
}

export default AuthReducer
