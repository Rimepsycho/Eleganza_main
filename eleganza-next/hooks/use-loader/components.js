import Lottie from 'lottie-react'
import violinAnimation from '@/assets/violin-loader.json'

// lottie-react
export function ViolinLoader({ show = false }) {
  return (
    <>
      <div
        className={`
    violin-loader-bg ${show ? '' : 'violin-loader--hide'}`}
      >
        <Lottie
          className={`violin-loader ${show ? '' : 'violin-loader--hide'}`}
          animationData={violinAnimation}
        />
      </div>
    </>
  )
}
