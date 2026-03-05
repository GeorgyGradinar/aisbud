<script setup lang="ts">
const { el: headerRef, revealed: headerRevealed } = useReveal()
const { isLight } = useTheme()
const projects = [
  {
    idx: 0,
    cover: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85',
    ],
  },
  {
    idx: 1,
    cover: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=85',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=85',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=85',
    ],
  },
  {
    idx: 2,
    cover: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=85',
    ],
  },
  {
    idx: 3,
    cover: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=85',
    ],
  },
]

const lightboxOpen = ref(false)
const lightboxProject = ref(0)
const lightboxSlide = ref(0)

function openLightbox(projectIndex: number) {
  lightboxProject.value = projectIndex
  lightboxSlide.value = 0
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function lightboxPrev() {
  const images = projects[lightboxProject.value].images
  lightboxSlide.value = (lightboxSlide.value - 1 + images.length) % images.length
}

function lightboxNext() {
  const images = projects[lightboxProject.value].images
  lightboxSlide.value = (lightboxSlide.value + 1) % images.length
}

function onLightboxKey(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') lightboxPrev()
  if (e.key === 'ArrowRight') lightboxNext()
}

onMounted(() => {
  window.addEventListener('keydown', onLightboxKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onLightboxKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <section id="portfolio" class="portfolio">
    <div class="container">
      <div ref="headerRef" class="section-header section-reveal" :class="{ revealed: headerRevealed }">
        <p class="section-label">{{ $t('portfolio.label') }}</p>
        <h2 class="section-title">{{ $t('portfolio.title1') }}<br>{{ $t('portfolio.title2') }}</h2>
      </div>
      <div class="portfolio__grid">
        <RevealCard
          v-for="(project, i) in projects"
          :key="i"
          class="portfolio__card"
          :delay="i * 0.1"
          @click="openLightbox(i)"
        >
          <div class="portfolio__card-img">
            <img :src="project.cover" :alt="$t(`portfolio.projects[${project.idx}].title`)" loading="lazy">
          </div>
          <div class="portfolio__card-info">
            <span class="portfolio__card-tag">{{ $t(`portfolio.projects[${project.idx}].tag`) }}</span>
            <h3 class="portfolio__card-title">{{ $t(`portfolio.projects[${project.idx}].title`) }}</h3>
            <p class="portfolio__card-location">{{ $t(`portfolio.projects[${project.idx}].location`) }}</p>
          </div>
        </RevealCard>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="lightboxOpen" class="lightbox" :class="{ light: isLight }" @click.self="closeLightbox">
          <button class="lightbox__close" :aria-label="$t('portfolio.close')" @click="closeLightbox">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>

          <button class="lightbox__arrow lightbox__arrow--prev" :aria-label="$t('portfolio.prev')" @click="lightboxPrev">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div class="lightbox__stage">
            <Transition name="lightbox-slide" mode="out-in">
              <img
                :key="lightboxSlide"
                :src="projects[lightboxProject].images[lightboxSlide]"
                :alt="`${$t(`portfolio.projects[${lightboxProject}].title`)} — ${$t('portfolio.photo')} ${lightboxSlide + 1}`"
                class="lightbox__img"
              >
            </Transition>
            <div class="lightbox__meta">
              <span class="lightbox__title">{{ $t(`portfolio.projects[${lightboxProject}].title`) }}</span>
              <span class="lightbox__counter">{{ lightboxSlide + 1 }} / {{ projects[lightboxProject].images.length }}</span>
            </div>
          </div>

          <button class="lightbox__arrow lightbox__arrow--next" :aria-label="$t('portfolio.next')" @click="lightboxNext">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>

          <div class="lightbox__dots">
            <button
              v-for="(_, i) in projects[lightboxProject].images"
              :key="i"
              class="lightbox__dot"
              :class="{ 'lightbox__dot--active': lightboxSlide === i }"
              @click="lightboxSlide = i"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
