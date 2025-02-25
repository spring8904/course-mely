'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

import {
  useGetLiveSessionClient,
  useJoinLiveSession,
} from '@/hooks/live/useLive'

import { Button } from '@/components/ui/button'
import ModalLoading from '@/components/common/ModalLoading'

const LiveListView = () => {
  const router = useRouter()

  const { data: liveSessionClient, isLoading } = useGetLiveSessionClient()

  const { mutate: joinLiveSession, isPending } = useJoinLiveSession()

  if (isLoading) return <ModalLoading />

  const handleJoinLiveSession = (id: string) => {
    joinLiveSession(id, {
      onSuccess: () => {
        router.push(`/room-live/${id}`)
      },
    })
  }

  if (isPending || isLoading) return <Loader2 />

  return (
    <>
      {isLoading && (
        <div className="mt-20">
          <Loader2 className="mx-auto size-8 animate-spin" />
        </div>
      )}
      <div
        style={{
          backgroundColor: '#FFEFEA',
          padding: '20px 0',
        }}
      >
        <div className="tf-container">
          <h2 className="fw-7">Phiên live trên hệ thống</h2>
        </div>
      </div>
      <div className="tf-container">
        <section className="section-inner mt-10">
          <div className="row mb-[50px]">
            {liveSessionClient?.data.map((live: any, index: number) => (
              <div className="col-xl-3" key={index}>
                <div className="course-item hover-img wow fadeInUp">
                  <div className="features image-wrap">
                    <Image
                      className="lazyload"
                      src="https://vitinhmiennam.com/upload/images/Livestream.jpg"
                      alt=""
                      width={270}
                      height={160}
                      style={{
                        objectFit: 'contain',
                        backgroundColor: '#f0f0f0',
                      }}
                    />
                  </div>
                  <div className="content flex justify-between">
                    <div>
                      <h6 className="fw-5 line-clamp-2">
                        <Link href={`/room-live/${live.id}`}>
                          {live.title || ''}
                        </Link>
                      </h6>
                      <div className="author flex items-center gap-2">
                        <Image
                          width={40}
                          height={40}
                          className="rounded-full"
                          src={live.instructor.avatar || ''}
                          alt={live.instructor.name}
                        />
                        <a href="#" className="author">
                          {live.instructor.name || ''}
                        </a>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        disabled={isPending}
                        onClick={() => handleJoinLiveSession(live.id)}
                      >
                        Tham gia
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default LiveListView
