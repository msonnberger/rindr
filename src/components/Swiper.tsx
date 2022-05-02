import { EffectCards } from 'swiper'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SwiperCard } from './SwiperCard'

export const SwiperContainer = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      modules={[EffectCards]}
      speed={500}
      loop={true}
      touchRatio={1.5}
      navigation={false}
      effect="cards"
      pagination={{ clickable: true }}
      className="mySwiper w-screen bg-none"
      centeredSlides={true}
      centeredSlidesBounds={true}
    >
      <SwiperSlide>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperCard />
      </SwiperSlide>
    </Swiper>
  )
}
