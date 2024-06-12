// hooks/use-alert.js
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const useAlert = () => {
  const success = (message) => {
    MySwal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const error = (message) => {
    MySwal.fire({
      icon: 'error',
      title: '錯誤',
      text: message,
    })
  }

  return {
    success,
    error,
  }
}

export default useAlert
