import { MemberItem } from '@/sections/about-us/_components/member-item'

export interface IMember {
  name: string
  image: string
  role: string
}

type Props = {
  members: IMember[]
}

export const FoundingTeam = ({ members }: Props) => {
  return (
    <section>
      <h2 className="mb-4 text-3xl font-semibold text-gray-800">
        Đội ngũ sáng lập
      </h2>
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {members.slice(0, 3).map((member, index) => (
          <MemberItem member={member} key={index} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {members.slice(-4).map((member, index) => (
          <MemberItem member={member} key={index} />
        ))}
      </div>
    </section>
  )
}
