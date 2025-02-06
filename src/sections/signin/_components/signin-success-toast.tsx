const SignInSuccessToast = ({
  navigateToLogin,
}: {
  navigateToLogin: () => void
}) => {
  navigateToLogin()

  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold text-green-600">Đăng nhập thành công!</p>
    </div>
  )
}

export default SignInSuccessToast
