export function useTheme() {
  const isLight = useState('theme', () => false)

  useHead({
    htmlAttrs: {
      class: computed(() => isLight.value ? 'light' : ''),
    },
  })

  function init() {
    if (import.meta.client) {
      const saved = localStorage.getItem('aisbud-theme')
      if (saved === 'light') {
        isLight.value = true
      }
    }
  }

  function toggle() {
    isLight.value = !isLight.value
    if (import.meta.client) {
      localStorage.setItem('aisbud-theme', isLight.value ? 'light' : 'dark')
    }
  }

  return { isLight, init, toggle }
}
