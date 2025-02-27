import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

import QUERY_KEY from '@/constants/query-key'
import { formatCurrency } from '@/lib/common'
import {
  useGetWithDrawalRequest,
  useHandleConfirmWithDrawalRequest,
} from '@/hooks/wallet/useWallet'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const statusMappings: Record<string, string> = {
  'Đang xử lý': 'bg-yellow-100 text-yellow-800',
  'Đã xử lý': 'bg-blue-100 text-blue-800',
  'Chờ xác nhận lại': 'bg-purple-100 text-purple-800',
  'Hoàn thành': 'bg-green-100 text-green-800',
  'Từ chối': 'bg-red-100 text-red-800',
}

const DialogWithDrawRequest = ({
  open,
  onOpenChange,
  selectWithDraw,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectWithDraw: string
}) => {
  const queryClient = useQueryClient()

  const [responseNote, setResponseNote] = useState('')
  const [isComplaintChecked, setIsComplaintChecked] = useState(false)

  const { data: withDrawRequestData, isLoading } =
    useGetWithDrawalRequest(selectWithDraw)

  const { mutate, isPending } = useHandleConfirmWithDrawalRequest()

  const handleRequestSubmission = () => {
    if (isComplaintChecked && !responseNote) {
      toast.warning('Hãy nhập nội dung phản hồi trước khi gửi khiếu nại! ')
      return
    }

    const isReceived = isComplaintChecked ? 1 : 0

    const payload = {
      is_received: isReceived,
      instructor_confirmation_note: isComplaintChecked
        ? responseNote
        : 'Đã nhận tiền thành công',
    }

    mutate(
      {
        id: selectWithDraw,
        data: payload,
      },
      {
        onSuccess: async (res: any) => {
          setIsComplaintChecked(false)
          onOpenChange(false)

          toast.success(res.message)

          await queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.INSTRUCTOR_WITH_DRAW_REQUEST],
          })
        },
        onError: (error: any) => {
          toast.error(error?.message)
        },
      }
    )
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl">
          <div className="flex items-center justify-between">
            <DialogHeader>
              <DialogTitle>
                Thông tin yêu cầu: {selectWithDraw ?? ''}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Dưới đây là thông tin yêu cầu rút tiền của bạn.
              </DialogDescription>
            </DialogHeader>
            <DialogHeader>
              {withDrawRequestData?.data.instructor_confirmation ===
              'confirmed' ? (
                <Badge variant="success">Đã phản hồi</Badge>
              ) : (
                <Badge>Chưa phản hồi</Badge>
              )}
            </DialogHeader>
          </div>
          {isLoading ? (
            <Loader2 className="mx-auto size-8 animate-spin" />
          ) : (
            <>
              {withDrawRequestData && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-300">
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium text-gray-900">
                          Ngân hàng
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {withDrawRequestData.data.bank_name}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium text-gray-900">
                          Số tài khoản
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {withDrawRequestData.data.account_number}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium text-gray-900">
                          Số tiền
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {formatCurrency(
                            withDrawRequestData.data.amount || ''
                          )}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium text-gray-900">
                          Ghi chú
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {withDrawRequestData.data.note}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium text-gray-900">
                          Trạng thái
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          <span
                            className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ${
                              statusMappings[withDrawRequestData.data.status] ||
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {withDrawRequestData.data.status}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium text-gray-900">
                          Ngày yêu cầu
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {withDrawRequestData.data.request_date}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium text-gray-900">
                          Ngày hoàn thành
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {withDrawRequestData.data.completed_date ||
                            'Chưa hoàn thành'}
                        </td>
                      </tr>
                      {withDrawRequestData.data.admin_comment && (
                        <tr className="border-b">
                          <td className="px-4 py-2 font-medium text-gray-900">
                            Ghi chú từ giảng viên
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            {withDrawRequestData.data.admin_comment ||
                              'Không có ghi chú'}
                          </td>
                        </tr>
                      )}
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium text-gray-900">
                          Phản hồi xác nhận
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {withDrawRequestData.data
                            .instructor_confirmation_note ||
                            'Bạn chưa phản hồi'}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium text-gray-900">
                          Ngày gửi yêu cầu khiếu nại
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {withDrawRequestData.data
                            .instructor_confirmation_date ||
                            'Bạn chưa phản hồi'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {withDrawRequestData?.data.status === 'Đã xử lý' && (
                <>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="complaintCheckbox"
                      className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={isComplaintChecked}
                      onChange={(e) => setIsComplaintChecked(e.target.checked)}
                    />
                    <label
                      htmlFor="complaintCheckbox"
                      className="text-sm font-medium text-gray-700"
                    >
                      Tôi muốn khiếu nại
                    </label>
                  </div>

                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-4"
                  >
                    {isComplaintChecked && (
                      <div>
                        <label className="block text-sm font-medium text-gray-900">
                          Nội dung phản hồi
                        </label>
                        <textarea
                          rows={3}
                          value={responseNote}
                          onChange={(e) => setResponseNote(e.target.value)}
                          className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Nhập nội dung phản hồi tại đây..."
                        />
                      </div>
                    )}
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isPending}
                        onClick={() => {
                          setIsComplaintChecked(false)
                          setResponseNote('')
                          onOpenChange(false)
                        }}
                      >
                        Hủy bỏ
                      </Button>
                      <Button
                        type="button"
                        variant="default"
                        onClick={handleRequestSubmission}
                        disabled={isPending}
                      >
                        {isPending ? (
                          <Loader2 className="mr-2 size-4 animate-spin" />
                        ) : isComplaintChecked ? (
                          'Xác nhận khiếu nại'
                        ) : (
                          'Đã nhận tiền'
                        )}
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DialogWithDrawRequest
