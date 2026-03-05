<script setup lang="ts">
const { isLight, toggle } = useTheme()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isScrolled = ref(false)
const isBurgerOpen = ref(false)
const isLangOpen = ref(false)
const langRef = ref<HTMLElement>()

const currentLocale = computed(() =>
  (locales.value as Array<{ code: string; name: string }>).find(l => l.code === locale.value)
)

const displayCode: Record<string, string> = { ka: 'GE' }
function getDisplayCode(code: string) {
  return displayCode[code] || code.toUpperCase()
}

function toggleLang() {
  isLangOpen.value = !isLangOpen.value
}

function selectLocale() {
  isLangOpen.value = false
}

function onClickOutside(e: MouseEvent) {
  if (langRef.value && !langRef.value.contains(e.target as Node)) {
    isLangOpen.value = false
  }
}

let ticking = false

function closeMobile() {
  isBurgerOpen.value = false
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    isScrolled.value = window.scrollY > 50
    ticking = false
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('click', onClickOutside)
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onClickOutside)
})
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="container header__inner">
      <a href="#" class="logo">
        <img :src="isLight ? '/logo-for-white-background.svg' : '/logo-for-black-background.svg'" alt="AisBud" class="logo__img">
      </a>
      <nav class="nav" :class="{ 'nav--open': isBurgerOpen }">
        <NuxtLink to="#services" class="nav__link" @click="closeMobile">{{ $t('nav.services') }}</NuxtLink>
        <NuxtLink to="#stages" class="nav__link" @click="closeMobile">{{ $t('nav.stages') }}</NuxtLink>
        <NuxtLink to="#videos" class="nav__link" @click="closeMobile">{{ $t('nav.podcasts') }}</NuxtLink>
        <NuxtLink to="#portfolio" class="nav__link" @click="closeMobile">{{ $t('nav.portfolio') }}</NuxtLink>
        <NuxtLink to="#about" class="nav__link" @click="closeMobile">{{ $t('nav.about') }}</NuxtLink>
        <div class="nav__contacts">
          <a href="tel:+995595067420" class="nav__phone">+995 595 067 420</a>
          <div class="nav__socials">
            <a href="https://t.me/AIS_BUD" class="nav__social-icon" aria-label="Telegram" target="_blank" rel="noopener">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.492-1.302.486-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
            <a href="https://wa.me/995595067420" class="nav__social-icon" aria-label="WhatsApp" target="_blank" rel="noopener">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="https://www.instagram.com/remont_tbilisi_ua/" class="nav__social-icon" aria-label="Instagram" target="_blank" rel="noopener">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.youtube.com/@AISBUDTOP" class="nav__social-icon" aria-label="YouTube" target="_blank" rel="noopener">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </nav>
      <div class="header__right">
        <a href="tel:+995595067420" class="header__phone">+995 595 067 420</a>
        <a href="https://t.me/AIS_BUD" class="header__social" aria-label="Telegram" target="_blank" rel="noopener">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.492-1.302.486-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        </a>
        <a href="https://wa.me/995595067420" class="header__social" aria-label="WhatsApp" target="_blank" rel="noopener">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
        <button class="theme-toggle" :aria-label="$t('common.toggleTheme')" @click="toggle">
          <svg class="theme-toggle__icon theme-toggle__icon--moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
          <svg class="theme-toggle__icon theme-toggle__icon--sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        </button>
        <div ref="langRef" class="lang-switch">
          <button class="lang-switch__trigger" @click.stop="toggleLang">
            <svg class="lang-switch__globe" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            <span class="lang-switch__current">{{ getDisplayCode(currentLocale?.code ?? '') }}</span>
            <svg class="lang-switch__chevron" :class="{ 'lang-switch__chevron--open': isLangOpen }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <Transition name="dropdown">
            <div v-show="isLangOpen" class="lang-switch__dropdown">
              <NuxtLink
                v-for="loc in locales"
                :key="loc.code"
                :to="switchLocalePath(loc.code)"
                class="lang-switch__option"
                :class="{ 'lang-switch__option--active': locale === loc.code }"
                @click="selectLocale"
              >
                <span class="lang-switch__option-code">{{ getDisplayCode(loc.code) }}</span>
                <svg v-if="locale === loc.code" class="lang-switch__check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
              </NuxtLink>
            </div>
          </Transition>
        </div>
    
      </div>
      <button
        class="burger"
        :class="{ 'burger--active': isBurgerOpen }"
        :aria-label="$t('common.menu')"
        @click="isBurgerOpen = !isBurgerOpen"
      >
        <span /><span /><span />
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 20px 0;
  transition: all 0.4s var(--ease-out);
}

.header--scrolled {
  background: rgba(5, 8, 8, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo__img {
  height: 56px;
  width: auto;
  transition: transform 0.3s var(--ease-out), height 0.4s var(--ease-out);
}

.logo:hover .logo__img {
  transform: scale(1.05);
}

.header--scrolled .logo__img {
  height: 42px;
}

.nav {
  display: flex;
  gap: 36px;
}

.nav__contacts {
  display: none;
}

.nav__link {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--color-text-muted);
  transition: color 0.3s;
  position: relative;
}

.nav__link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-accent);
  transition: width 0.3s var(--ease-out);
}

.nav__link:hover {
  color: var(--color-white);
}

.nav__link:hover::after {
  width: 100%;
}

.header__phone {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-muted);
  transition: color 0.3s;
}

.header__phone:hover {
  color: var(--color-accent);
}

.header__right {
  display: flex;
  align-items: center;
  gap: 14px;
}

/* --- Language Switcher --- */
.lang-switch {
  position: relative;
  z-index: 100;
}

.lang-switch__trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-sans);
  letter-spacing: 0.02em;
  transition: all 0.3s var(--ease-out);
}

.lang-switch__trigger:hover {
  border-color: rgba(var(--accent-rgb), 0.35);
  color: var(--color-text);
}

.lang-switch__globe {
  opacity: 0.5;
  transition: opacity 0.3s;
}

.lang-switch__trigger:hover .lang-switch__globe {
  opacity: 0.8;
}

.lang-switch__chevron {
  opacity: 0.4;
  transition: transform 0.3s var(--ease-out), opacity 0.3s;
}

.lang-switch__chevron--open {
  transform: rotate(180deg);
  opacity: 0.7;
}

.lang-switch__dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 80px;
  padding: 4px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(16px);
}

.lang-switch__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--color-text-muted);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  transition: all 0.2s var(--ease-out);
  cursor: pointer;
}

.lang-switch__option:hover {
  background: rgba(var(--accent-rgb), 0.08);
  color: var(--color-text);
}

.lang-switch__option--active {
  color: var(--color-accent);
}

.lang-switch__check {
  color: var(--color-accent);
  flex-shrink: 0;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s var(--ease-out), transform 0.2s var(--ease-out);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* --- Header Social Icons --- */
.header__social {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  transition: all 0.35s var(--ease-out);
}

.header__social:hover {
  border-color: rgba(var(--accent-rgb), 0.3);
  color: var(--color-accent);
  transform: scale(1.1);
}

/* --- Theme Toggle --- */
.theme-toggle {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.35s var(--ease-out);
  position: relative;
}

.theme-toggle:hover {
  border-color: rgba(var(--accent-rgb), 0.3);
  color: var(--color-accent);
  transform: scale(1.1);
}

.theme-toggle__icon {
  position: absolute;
  transition: opacity 0.3s var(--ease-out), transform 0.4s var(--ease-out);
}

.theme-toggle__icon--sun {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.theme-toggle__icon--moon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

/* --- Burger --- */
.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.burger span {
  display: block;
  width: 24px;
  height: 1.5px;
  background: var(--color-white);
  transition: all 0.3s var(--ease-out);
  transform-origin: center;
}

.burger--active span:nth-child(1) {
  transform: rotate(45deg) translate(4px, 5px);
}

.burger--active span:nth-child(2) {
  opacity: 0;
}

.burger--active span:nth-child(3) {
  transform: rotate(-45deg) translate(4px, -5px);
}

/* --- Light theme --- */
.light .header--scrolled {
  background: rgba(243, 246, 244, 0.8);
}

.light .nav__link:hover {
  color: var(--color-text);
}

.light .burger span {
  background: var(--color-text);
}

.light .lang-switch__dropdown {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
}

.light .theme-toggle__icon--sun {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

.light .theme-toggle__icon--moon {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}

.light .theme-toggle {
  transition: all 0.4s var(--ease-out), background-color 0.4s var(--ease-out), border-color 0.4s var(--ease-out);
}

/* --- Mobile --- */
@media (max-width: 768px) {
  .nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: var(--color-surface);
    flex-direction: column;
    padding: 100px 32px 32px;
    gap: 24px;
    transition: right 0.4s var(--ease-out);
    border-left: 1px solid var(--color-border);
  }

  .nav--open {
    right: 0;
  }

  .nav__contacts {
    margin-top: auto;
    padding-top: 24px;
    border-top: 1px solid var(--color-border);
    display: flex !important;
    flex-direction: column;
    gap: 16px;
  }

  .nav__phone {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .nav__socials {
    display: flex;
    gap: 10px;
  }

  .nav__social-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--color-surface-2);
    border: 1px solid var(--color-border);
    color: var(--color-text-muted);
    transition: all 0.3s var(--ease-out);
  }

  .nav__social-icon:hover {
    border-color: rgba(var(--accent-rgb), 0.3);
    color: var(--color-accent);
  }

  .nav__link {
    font-size: 1.1rem;
    color: var(--color-text);
  }

  .header__phone,
  .header__social {
    display: none;
  }

  .header__right {
    gap: 12px;
  }

  .burger {
    display: flex;
    z-index: 1001;
  }
}
</style>
