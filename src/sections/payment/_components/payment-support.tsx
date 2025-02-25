import { Mail, Phone } from 'lucide-react'

const PaymentSupport = () => (
  <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl">
    <div className="mb-4 text-center">
      <h3 className="text-base font-semibold text-slate-900">
        Bạn cần hỗ trợ?
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn
      </p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <a
        href="tel:0985125849"
        className="group flex items-center gap-3 rounded-xl bg-emerald-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-100"
      >
        <div className="rounded-lg bg-white p-2 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg">
          <Phone
            className="size-5 text-emerald-600 transition-transform duration-300 group-hover:rotate-12"
            strokeWidth={1.5}
          />
        </div>
        <div className="transition-transform duration-300 group-hover:translate-x-2">
          <div className="text-sm font-medium text-emerald-900">Gọi hỗ trợ</div>
          <div className="text-xs text-emerald-600">1800 123 456</div>
        </div>
      </a>
      <a
        href="mailto:hotro@example.com"
        className="group flex items-center gap-3 rounded-xl bg-blue-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-100"
      >
        <div className="rounded-lg bg-white p-2 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg">
          <Mail
            className="size-5 text-blue-600 transition-transform duration-300 group-hover:rotate-12"
            strokeWidth={1.5}
          />
        </div>
        <div className="transition-transform duration-300 group-hover:translate-x-2">
          <div className="text-sm font-medium text-blue-900">Email hỗ trợ</div>
          <div className="text-xs text-blue-600">hotro@example.com</div>
        </div>
      </a>
    </div>
  </div>
)
export default PaymentSupport
