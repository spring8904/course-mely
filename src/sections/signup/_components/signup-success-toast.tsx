import { toast } from 'react-toastify'

const SignUpSuccessToast = ({
  navigateToLogin,
}: {
  navigateToLogin: () => void
}) => {
  const handleNavigate = () => {
    navigateToLogin()
    toast.dismiss()
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold text-green-600">Đăng ký thành công!</p>

      <div className="flex items-center gap-4">
        <p>Chuyển sang trang đăng nhập</p>
        <button
          onClick={handleNavigate}
          className="rounded bg-green-500 px-3 py-1.5 text-white transition hover:bg-green-600"
        >
          Đồng ý
        </button>
      </div>
    </div>
  )
}

export default SignUpSuccessToast
