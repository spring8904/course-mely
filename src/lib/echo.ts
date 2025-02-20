import Echo from 'laravel-echo'

const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  forceTLS: true,
  encrypted: true,
  authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer 127|TxtnSazuBneKANfvRFNKVFGkWIRuRbANGlIYeeoP60502ffd`,
    },
  },
})

echo.connector.pusher.connection.bind('connected', () => {
  console.log('✅ Kết nối với Pusher thành công!')
})

echo.connector.pusher.connection.bind('error', (err: any) => {
  console.error('❌ Lỗi kết nối với Pusher:', err)
})

export default echo
