<script setup lang="ts">
const heroReady = ref(false)
const heroRef = ref<HTMLElement>()
const heroContent = ref<HTMLElement>()
const heroVisual = ref<HTMLElement>()

const { t } = useI18n()

const slides = computed(() => [
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', alt: t('hero.slides.0') },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', alt: t('hero.slides.1') },
  { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', alt: t('hero.slides.2') },
  { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', alt: t('hero.slides.3') },
  { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', alt: t('hero.slides.4') },
])

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
        <p class="hero__label">{{ $t('hero.label') }}</p>
        <h1 class="hero__title">
          {{ $t('hero.title1') }}<br>
          {{ $t('hero.title2') }} <span class="hero__title--italic">{{ $t('hero.titleItalic') }}</span><br>
          {{ $t('hero.title3') }}
        </h1>
        <p class="hero__desc">
          {{ $t('hero.desc') }}
        </p>
        <div class="hero__actions">
          <a href="#services" class="btn btn--primary">{{ $t('hero.services') }}</a>
          <a href="tel:+995595067420" class="btn btn--outline">{{ $t('hero.call') }}</a>
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
              :aria-label="`${$t('hero.slideLabel')} ${i + 1}`"
              @click="currentSlide = i"
            />
          </div>
        </div>
        <div class="hero__quote">
          <blockquote>
            &laquo;{{ $t('hero.quote') }}&raquo;
          </blockquote>
          <div class="hero__quote-author">
            <img src="/founder.jpg" :alt="$t('common.founderAlt')" class="hero__quote-avatar">
            <span>{{ $t('hero.quoteAuthor') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="hero__scroll">
      <span>{{ $t('hero.scroll') }}</span>
      <div class="hero__scroll-line" />
    </div>
  </section>
</template>
