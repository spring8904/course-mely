import Image from 'next/image'

const AuthWithGoogle = ({ content }: { content: string }) => (
  <div className="flex w-full cursor-pointer items-center space-x-4 rounded-lg border p-1 hover:bg-[#F5F5F5]">
    <div className="rounded-lg bg-[#E93E30] p-2">
      <Image
        src="/images/google-icon.png"
        alt="google-icon"
        width={24}
        height={24}
      />
    </div>
    <div>
      <p className="text-[#5D5A6F]">{content}</p>
    </div>
  </div>
)

export default AuthWithGoogle
