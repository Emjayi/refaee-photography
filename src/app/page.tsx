"use client"
// Importing Swiper For main page slider
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'
// import required modules
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules';
import slide1 from "public/bg/bg (1).jpg"
import slide2 from "public/bg/bg (2).jpg"
import slide3 from "public/bg/bg (3).jpg"
import slide4 from "public/bg/bg (4).jpg"
import slide5 from "public/bg/bg (5).jpg"
import 'swiper/css';
import 'swiper/css/navigation';

const images = [
  {
    src: slide1,
    key: 1
  },
  {
    src: slide2,
    key: 2
  },
  {
    src: slide3,
    key: 3
  },
  {
    src: slide4,
    key: 4
  },
  {
    src: slide5,
    key: 5
  },
]
export default function Home() {

  return (
    <div className='flex justify-center items-center '>
      <Swiper
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        keyboard={{
          enabled: true,
        }}
        spaceBetween={0}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Keyboard, Pagination, Navigation]} className=" w-screen h-screen">
        {
          images.map((image) => (
            <SwiperSlide key={image.key}>
              <Image src={image.src} alt={`Image ${image.key}`} className=' min-h-screen object-cover'></Image>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div >
  )
}
