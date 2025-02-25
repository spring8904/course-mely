import React from 'react'

import RoomLiveStream from '@/components/shared/room-live-stream'

interface Props {
  params: {
    id: string
  }
}

const Page = ({ params }: Props) => {
  const { id } = params

  return <RoomLiveStream id={id} />
}

export default Page
