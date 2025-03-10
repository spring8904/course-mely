import { IMember } from '@/sections/about-us/_components/founding-team'
import Image from 'next/image'

type Props = {
  member: IMember
}

export const MemberItem = ({ member }: Props) => (
  <div className="group relative mx-auto h-64 w-48 overflow-hidden rounded-xl">
    <Image
      src={member.image}
      alt={member.name}
      width={160}
      height={224}
      className="size-full rounded-xl object-cover"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
      <h3 className="text-lg font-semibold text-white">{member.name}</h3>
      <p className="text-sm text-gray-300">{member.role}</p>
    </div>
  </div>
)
