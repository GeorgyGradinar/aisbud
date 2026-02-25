<script setup lang="ts">
const props = withDefaults(defineProps<{ delay?: number }>(), { delay: 0 })

const el = ref<HTMLElement>()
const revealed = ref(false)

onMounted(() => {
  if (!el.value) return
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealed.value = true
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  )
  observer.observe(el.value)
})
</script>

<template>
  <div ref="el" :class="{ revealed }" :style="{ transitionDelay: `${delay}s` }">
    <slot />
  </div>
</template>
