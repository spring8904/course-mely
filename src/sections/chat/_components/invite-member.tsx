import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import {
  useAddMemberGroupChat,
  useGetRemainingMembers,
} from '@/hooks/chat/useChat'
import { useForm } from 'react-hook-form'
import {
  AddMemberGroupChatPayload,
  addMemberGroupChatSchema,
} from '@/validations/chat'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import QUERY_KEY from '@/constants/query-key'

type Member = {
  id: number
  name: string
  avatar: string
}

type InviteMemberDialogProps = {
  isOpen: boolean
  onClose: () => void
  channelId: string
}

const InviteMember = ({
  isOpen,
  onClose,
  channelId,
}: InviteMemberDialogProps) => {
  const queryClient = useQueryClient()
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([])
  const { data: members, isLoading } = useGetRemainingMembers(channelId)
  const { mutate: addMember, isPending } = useAddMemberGroupChat()
  const form = useForm<AddMemberGroupChatPayload>({
    resolver: zodResolver(addMemberGroupChatSchema),
    defaultValues: {
      members: [],
    },
  })

  const toggleMemberSelection = (member: Member) => {
    const isAlreadySelected = selectedMembers.some(
      (selected) => selected.id === member.id
    )
    if (isAlreadySelected) {
      setSelectedMembers((prev) =>
        prev.filter((selected) => selected.id !== member.id)
      )
    } else {
      setSelectedMembers((prev) => [member, ...prev])
    }
  }

  const handleComplete = () => {
    const selectedIds = selectedMembers.map((member) => member.id.toString())

    addMember(
      {
        id: channelId,
        data: {
          members: selectedIds,
        },
      },
      {
        onSuccess: async (res: any) => {
          toast.success(res.message)
          await queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.GROUP_CHAT, channelId],
          })
          setSelectedMembers([])
          onClose()
        },
        onError: (error: any) => {
          toast.error(error.message)
        },
      }
    )
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Thêm thành viên</AlertDialogTitle>
          <AlertDialogDescription>
            Hãy thêm thành viên vào nhóm của bạn bằng cách nhập thông tin dưới
            đây.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {selectedMembers.length > 0 && (
          <div className="mb-4">
            <h4 className="mb-2 text-sm font-medium text-gray-600">Đã chọn:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedMembers.map((member) => (
                <div
                  className="flex flex-col items-center gap-2"
                  key={member.id}
                >
                  <Avatar className="size-10">
                    <AvatarImage
                      src={member.avatar}
                      alt={member.name}
                      className="rounded-full"
                    />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleComplete)}
            className="space-y-4"
          >
            <ScrollArea className="h-[300px]">
              {isLoading ? (
                <p>Loading members...</p>
              ) : !Array.isArray(members?.data) &&
                members?.data?.length === 0 ? (
                <div className="flex h-full items-center justify-center text-gray-500">
                  Không có thành viên nào để thêm
                </div>
              ) : (
                members?.data.map((member: any) => (
                  <FormField
                    key={member.id}
                    name={`member-${member.id}`}
                    render={() => (
                      <FormItem className="flex items-center gap-4 border-b pb-2">
                        <Avatar className="size-8">
                          <AvatarImage
                            src={member.avatar}
                            alt={member.name}
                            className="rounded-full"
                          />
                          <AvatarFallback>
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        {/* Member Name */}
                        <FormLabel className="flex-1 text-sm">
                          {member.name}
                        </FormLabel>

                        <Checkbox
                          checked={selectedMembers.some(
                            (selected) => selected.id === member.id
                          )}
                          onCheckedChange={() =>
                            toggleMemberSelection({
                              id: member.id,
                              name: member.name,
                              avatar: member.avatar,
                            })
                          }
                        />
                      </FormItem>
                    )}
                  />
                ))
              )}
            </ScrollArea>

            <AlertDialogFooter className="flex justify-end">
              <Button
                disabled={isPending}
                variant="destructive"
                onClick={onClose}
              >
                Hủy
              </Button>
              <Button onClick={handleComplete} disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" /> Dang thêm
                    ...
                  </>
                ) : (
                  'Thêm thành viên'
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default InviteMember
