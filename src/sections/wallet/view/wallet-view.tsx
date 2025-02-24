'use client'

import { useState } from 'react'
import {
  AlertCircle,
  ArrowDownToLine,
  Banknote,
  Clock,
  Info,
  ShieldCheck,
  Wallet,
} from 'lucide-react'

import { cn } from '@/lib/utils'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const AMOUNTS = [50000, 100000, 200000, 500000, 1000000, 2000000]
const BANKS = [
  { id: 'vcb', name: 'Vietcombank' },
  { id: 'tcb', name: 'Techcombank' },
  { id: 'acb', name: 'ACB' },
  { id: 'mb', name: 'MB Bank' },
  { id: 'bidv', name: 'BIDV' },
]

function WalletView() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-2xl font-bold">
            Ví của bạn
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="size-16 border-4 border-white/20">
                    <AvatarImage src="https://storage.googleapis.com/a1aa/image/DCqdFGzcb1rqIdoeHHdr3Zjfo9rbmejO9ixlponF0VG2CmePB.jpg" />
                    <AvatarFallback>TN</AvatarFallback>
                  </Avatar>
                  <div className="text-white">
                    <h3 className="text-xl font-semibold">Tran nguyen</h3>
                    <p className="text-white/80">ID: #123456</p>
                  </div>
                </div>
                <div className="mt-6 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/90">Số dư khả dụng</span>
                    <span className="text-2xl font-bold text-white">
                      100 VNĐ
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden border-none bg-gradient-to-br from-white to-gray-50 shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2 text-xl text-primary">
                  <ArrowDownToLine className="size-5" />
                  Rút tiền về tài khoản
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-primary/5 p-4">
                      <Clock className="mb-2 size-5 text-primary" />
                      <p className="text-sm font-medium">Thời gian xử lý</p>
                      <p className="text-2xl font-bold text-primary">
                        1-5 phút
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-4">
                      <Banknote className="mb-2 size-5 text-primary" />
                      <p className="text-sm font-medium">Phí giao dịch</p>
                      <p className="text-2xl font-bold text-primary">0 VNĐ</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <ShieldCheck className="size-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">An toàn & Bảo mật</h4>
                        <p className="text-sm text-muted-foreground">
                          Mọi giao dịch đều được mã hóa và bảo vệ
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Clock className="size-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Xử lý tức thì</h4>
                        <p className="text-sm text-muted-foreground">
                          Tiền về tài khoản trong vài phút
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Wallet className="size-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Không giới hạn</h4>
                        <p className="text-sm text-muted-foreground">
                          Rút tiền không giới hạn số lần/ngày
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="mt-4 w-full bg-gradient-to-r from-primary to-primary/80"
                  >
                    <ArrowDownToLine className="mr-2 size-4" />
                    Rút tiền ngay
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Alert variant="default" className="border-blue-200 bg-blue-50">
                <Info className="size-4 text-blue-500" />
                <AlertDescription className="text-blue-700">
                  Số tiền tối thiểu cho mỗi lần rút là 50,000 VNĐ. Số dư trong
                  tài khoản phải lớn hơn số tiền bạn muốn rút.
                </AlertDescription>
              </Alert>

              <Alert
                variant="destructive"
                className="border-destructive/20 bg-destructive/5"
              >
                <AlertCircle className="size-4" />
                <AlertDescription>
                  Vui lòng kiểm tra kỹ thông tin tài khoản ngân hàng trước khi
                  thực hiện rút tiền. Chúng tôi không chịu trách nhiệm nếu bạn
                  cung cấp sai thông tin.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <Card className="border-none shadow-lg lg:col-span-8">
            <CardHeader className="border-b bg-primary/5">
              <CardTitle>Thông tin rút tiền</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <Label>Chọn số tiền muốn rút</Label>
                <div className="grid grid-cols-3 gap-4">
                  {AMOUNTS.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      className={cn(
                        'flex h-24 flex-col gap-2 hover:border-primary hover:bg-primary/5',
                        selectedAmount === amount &&
                          'border-primary bg-primary/5'
                      )}
                      onClick={() => {
                        setSelectedAmount(amount)
                        setCustomAmount('')
                      }}
                    >
                      <Wallet className="size-5 text-primary" />
                      <span className="font-medium">
                        {amount.toLocaleString('vi-VN')}
                        <span className="ml-1 text-xs text-muted-foreground">
                          VNĐ
                        </span>
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Hoặc nhập số tiền khác</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setSelectedAmount(null)
                    }}
                    placeholder="Nhập số tiền bạn muốn rút"
                    className="pr-16"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    VNĐ
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Chọn ngân hàng</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ngân hàng nhận tiền" />
                  </SelectTrigger>
                  <SelectContent>
                    {BANKS.map((bank) => (
                      <SelectItem key={bank.id} value={bank.id}>
                        {bank.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Số tài khoản</Label>
                <Input
                  id="accountNumber"
                  placeholder="Nhập số tài khoản nhận tiền"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountName">Tên chủ tài khoản</Label>
                <Input
                  id="accountName"
                  placeholder="Nhập tên chủ tài khoản nhận tiền"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  placeholder="Nhập ghi chú nếu cần thiết"
                  className="resize-none"
                />
              </div>

              <Button
                className="w-full bg-gradient-to-r from-primary to-primary/80"
                size="lg"
              >
                Xác nhận rút tiền
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default WalletView
