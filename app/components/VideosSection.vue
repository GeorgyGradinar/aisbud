<script setup lang="ts">
const { el: headerRef, revealed: headerRevealed } = useReveal()

const videos = [
  { id: 'mMTzNIOKAJk', idx: 0 },
  { id: '9l7MFmcqzm0', idx: 1 },
]
</script>

<template>
  <section id="videos" class="videos">
    <div class="container">
      <div ref="headerRef" class="section-header section-reveal" :class="{ revealed: headerRevealed }">
        <p class="section-label">{{ $t('videos.label') }}</p>
        <h2 class="section-title">{{ $t('videos.title') }}</h2>
      </div>
      <div class="videos__grid">
        <RevealCard v-for="(video, i) in videos" :key="video.id" class="video-card" :delay="i * 0.15">
          <div class="video-card__wrapper">
            <iframe
              class="video-card__iframe"
              :src="`https://www.youtube.com/embed/${video.id}`"
              :title="$t(`videos.items[${video.idx}].title`)"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
            />
          </div>
          <div class="video-card__info">
            <span class="video-card__tag">{{ $t('videos.tag') }}</span>
            <h3 class="video-card__title">{{ $t(`videos.items[${video.idx}].title`) }}</h3>
            <p class="video-card__desc">{{ $t(`videos.items[${video.idx}].desc`) }}</p>
          </div>
        </RevealCard>
      </div>
    </div>
  </section>
</template>
