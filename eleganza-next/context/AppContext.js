import React, { createContext, useContext, useReducer } from 'react'

const initialState = {
  cart: [],
  userCourses: [],
}

const AppContext = createContext(initialState)

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] }
    case 'ADD_USER_COURSE':
      return { ...state, userCourses: [...state.userCourses, action.payload] }
    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
