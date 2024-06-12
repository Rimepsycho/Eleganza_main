import React, { useContext, createContext, useState } from 'react'

// 建立一個context對象

const LoaderContext = createContext({
  // 預設值
  loading: false,
  setLoading: () => {},
})

// 提供一個組件
export const LoaderProvider = ({ children, CustomLoader }) => {
  const [loading, setLoading] = useState(false)
  

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      <CustomLoader show={loading} />
      {children}
    </LoaderContext.Provider>
  )

}

// 導出
export const useLoader = () => useContext(LoaderContext)
