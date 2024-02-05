"use client"
// Importing Swiper For main page slider
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'
// import required modules
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default async function Home() {

  const images = await Promise.all([
    import("public/bg/bg (1).jpg"),
    import("public/bg/bg (2).jpg"),
    import("public/bg/bg (3).jpg"),
    import("public/bg/bg (4).jpg"),
    import("public/bg/bg (5).jpg")
  ])

  return (
    <div className='flex justify-center items-center '>
      <Swiper
        autoplay={{
          delay: 2500,
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
          images.map((image, index) => (
            <SwiperSlide key={index + 1}>
              <Image src={image.default} alt={`Image ${index + 1}`} className='max-h-screen min-h-screen object-cover md:object-cover '></Image>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div >
  )
}
