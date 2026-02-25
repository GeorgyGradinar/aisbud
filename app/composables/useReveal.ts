export function useReveal(options?: { threshold?: number; rootMargin?: string }) {
  const el = ref<HTMLElement>()
  const revealed = ref(false)

  onMounted(() => {
    if (!el.value) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          revealed.value = true
          observer.disconnect()
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -80px 0px',
      },
    )
    observer.observe(el.value)
  })

  return { el, revealed }
}
