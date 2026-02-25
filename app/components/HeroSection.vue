<script setup lang="ts">
const heroReady = ref(false)
const heroRef = ref<HTMLElement>()
const heroContent = ref<HTMLElement>()
const heroVisual = ref<HTMLElement>()

const slides = [
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: 'Современный интерьер' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', alt: 'Светлая гостиная' },
  { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', alt: 'Дизайнерская кухня' },
  { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', alt: 'Уютная спальня' },
  { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', alt: 'Стильный санузел' },
]

const currentSlide = ref(0)
let slideInterval: ReturnType<typeof setInterval>

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

let rafId = 0
let ticking = false

const isMobile = ref(false)

function onScroll() {
  if (isMobile.value || ticking) return
  ticking = true
  rafId = requestAnimationFrame(() => {
    if (!heroRef.value) { ticking = false; return }
    const scrollY = window.scrollY
    const heroHeight = heroRef.value.offsetHeight
    if (scrollY > heroHeight) { ticking = false; return }

    const progress = scrollY / heroHeight

    if (heroContent.value) {
      heroContent.value.style.transform = `translate3d(0,${scrollY * 0.12}px,0)`
      heroContent.value.style.opacity = `${Math.max(0, 1 - progress * 1.8)}`
    }

    if (heroVisual.value) {
      heroVisual.value.style.transform = `translate3d(0,${scrollY * 0.06}px,0)`
      heroVisual.value.style.opacity = `${Math.max(0, 1 - progress * 1.5)}`
    }

    ticking = false
  })
}

onMounted(() => {
  isMobile.value = window.innerWidth <= 768
  requestAnimationFrame(() => {
    heroReady.value = true
  })
  if (!isMobile.value) {
    window.addEventListener('scroll', onScroll, { passive: true })
  }
  slideInterval = setInterval(nextSlide, 4500)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(rafId)
  clearInterval(slideInterval)
})
</script>

<template>
  <section ref="heroRef" class="hero" :class="{ 'hero--ready': heroReady }">
    <div class="hero__bg" />
    <div class="container hero__inner">
      <div ref="heroContent" class="hero__content">
        <p class="hero__label">Ремонт квартир и домов в Грузии</p>
        <h1 class="hero__title">
          Ремонт,<br>
          в который <span class="hero__title--italic">хочется</span><br>
          возвращаться
        </h1>
        <p class="hero__desc">
          Меня зовут Антон, я строитель с большим практическим опытом.
          В AisBud мы выполняем частные и коммерческие ремонты, внимательно
          относимся к деталям и контролируем каждый этап работ.
        </p>
        <div class="hero__actions">
          <a href="#services" class="btn btn--primary">Наши услуги</a>
          <a href="tel:+995595067420" class="btn btn--outline">Позвонить</a>
        </div>
      </div>
      <div ref="heroVisual" class="hero__visual">
        <div class="hero__slideshow">
          <div
            v-for="(slide, i) in slides"
            :key="i"
            class="hero__slide"
            :class="{ 'hero__slide--active': currentSlide === i }"
          >
            <img :src="slide.src" :alt="slide.alt" :loading="i === 0 ? 'eager' : 'lazy'">
          </div>
          <div class="hero__slide-dots">
            <button
              v-for="(_, i) in slides"
              :key="i"
              class="hero__slide-dot"
              :class="{ 'hero__slide-dot--active': currentSlide === i }"
              :aria-label="`Слайд ${i + 1}`"
              @click="currentSlide = i"
            />
          </div>
        </div>
        <div class="hero__quote">
          <blockquote>
            &laquo;Моя цель&nbsp;&mdash; чтобы вы зашли в готовое пространство
            и сказали: <em>&lsquo;Именно таким я это и видел&rsquo;</em>.&raquo;
          </blockquote>
          <div class="hero__quote-author">
            <img src="/founder.jpg" alt="Антон — основатель AisBud" class="hero__quote-avatar">
            <span>&mdash; Антон, основатель AisBud</span>
          </div>
        </div>
      </div>
    </div>
    <div class="hero__scroll">
      <span>Листайте вниз</span>
      <div class="hero__scroll-line" />
    </div>
  </section>
</template>
