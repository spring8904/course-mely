import ProtectedRoute from '@/components/shared/protected-route'
import ChatView from '@/sections/chats/view/chat-view'
import { ChatHeader } from './_component/chat-header'

const ChatUserPage = () => {
  return (
    <ProtectedRoute>
      <ChatHeader />
      <div className="h-[calc(100svh-4rem)] overflow-y-auto">
        <ChatView />
      </div>
    </ProtectedRoute>
  )
}
export default ChatUserPage
