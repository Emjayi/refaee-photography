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
    import("public/bg/02.jpg"),
    import("public/bg/03.jpg"),
    import("public/bg/01.jpg"),
    import("public/bg/04.jpg"),
    import("public/bg/05.jpg"),
    import("public/bg/06.jpg"),
    import("public/bg/07.jpg"),
    import("public/bg/08.jpg")
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
        modules={[Autoplay, Keyboard, Pagination, Navigation]} className=" cursor-default w-screen h-screen">
        {
          images.map((image, index) => (
            <SwiperSlide key={index + 1}>
              <Image src={image.default} alt={`Image ${index + 1}`} className='max-h-screen min-h-screen object-contain md:object-cover '></Image>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <footer className="footer fixed w-screen bottom-0">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
          <p>
            <span className="text-sm text-gray-400 sm:text-center">© 2023 <a href="/" className="hover:underline">Refaee™</a>. All Rights Reserved.
            </span>
          </p>
        </div>
      </footer>
    </div >
  )
}
