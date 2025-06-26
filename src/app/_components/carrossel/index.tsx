import { useState, useEffect, useRef, useContext } from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
import { BannerContext } from '@/contexts/banner'
// USAR AQUI UMA FUNÇÃO PARA TRAZER UM ARRAY DE STRING QUE TRÁS AS URLS DAS FOTOS (Pensei assim ) Algo como:
// import { getPhotos } from '@/getPhotos';

export default function Carrossel() {
  const { activeBanners } = useContext(BannerContext)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const startX = useRef<number>(0)
  const endX = useRef<number>(0)
  const isDragging = useRef<boolean>(false)

  const photos = activeBanners.map(banner => banner.imageUrl)

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(prev => (photos.length ? (prev + 1) % photos.length : 0))
    }, 10000) // 10 Seconds
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentIndex, photos])

  function handleTouchStart(e: React.TouchEvent) {
    isDragging.current = true
    startX.current = e.touches[0].clientX
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!isDragging.current) return
    endX.current = e.touches[0].clientX
  }

  function handleTouchEnd() {
    if (!isDragging.current) return
    isDragging.current = false
    const diff = startX.current - endX.current
    if (Math.abs(diff) > 50) {
      setCurrentIndex(prev =>
        diff > 0
          ? (prev + 1) % photos.length
          : (prev - 1 + photos.length) % photos.length
      )
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    isDragging.current = true
    startX.current = e.clientX
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging.current) return
    endX.current = e.clientX
  }

  function handleMouseUp() {
    if (!isDragging.current) return
    isDragging.current = false
    const diff = startX.current - endX.current
    if (Math.abs(diff) > 50) {
      setCurrentIndex(prev =>
        diff > 0
          ? (prev + 1) % photos.length
          : (prev - 1 + photos.length) % photos.length
      )
    }
  }

  function handleMouseLeave() {
    if (isDragging.current) handleMouseUp()
  }

  if (!photos.length) return null

  return (
    <section
      className={styles.carrossel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onDragStart={e => e.preventDefault()}
    >
      <div
        className={styles.slider}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {photos.map((src, idx) => (
          <div className={styles.slide} key={idx}>
            <Image
              src={src}
              height={1000}
              width={1000}
              alt={`Slide ${idx + 1}`}
              draggable={false}
              onDragStart={e => e.preventDefault()}
              quality={100}
            />
          </div>
        ))}
      </div>

      <div className={styles.indicators}>
        {photos.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.dot} ${
              idx === currentIndex ? styles.active : ''
            }`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </section>
  )
}
