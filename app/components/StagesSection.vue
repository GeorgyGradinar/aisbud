<script setup lang="ts">
const { el: headerRef, revealed: headerRevealed } = useReveal()

const stages = [
  { num: '01', title: 'Замер и оценка', desc: 'Выезжаем на объект, фиксируем размеры, обсуждаем пожелания и формируем смету', icon: 'search' },
  { num: '02', title: 'Подготовительные работы', desc: 'Демонтаж, вывоз мусора, подготовка помещения к ремонту', icon: 'trash' },
  { num: '03', title: 'Черновые работы', desc: 'Электрика, сантехника, штукатурка, стяжка полов', icon: 'zap' },
  { num: '04', title: 'Подготовка объекта', desc: 'Шпаклёвка, грунтовка, выравнивание поверхностей под финиш', icon: 'grid' },
  { num: '05', title: 'Чистовая отделка', desc: 'Покраска, укладка плитки, монтаж полов и потолков', icon: 'tiles' },
  { num: '06', title: 'Монтаж и финиш', desc: 'Установка дверей, мебели, освещения, сантехники', icon: 'floor' },
  { num: '07', title: 'Контроль и сдача', desc: 'Финальная проверка, устранение замечаний, передача ключей', icon: 'check' },
]

const timeline = ref<HTMLElement>()
const timelineFill = ref<HTMLElement>()
const itemRefs = ref<HTMLElement[]>([])
const activeItems = ref<Set<number>>(new Set())

let rafId = 0
let ticking = false

function updateTimeline() {
  if (ticking) return
  ticking = true
  rafId = requestAnimationFrame(() => {
    if (!timeline.value || !timelineFill.value) { ticking = false; return }

    const rect = timeline.value.getBoundingClientRect()
    const triggerPoint = window.innerHeight * 0.55
    const scrolledIn = triggerPoint - rect.top
    const fillPercent = Math.max(0, Math.min(100, (scrolledIn / rect.height) * 100))
    timelineFill.value.style.height = `${fillPercent}%`

    itemRefs.value.forEach((item, i) => {
      if (!item) return
      const itemRect = item.getBoundingClientRect()
      const itemCenter = itemRect.top + itemRect.height / 2
      if (itemCenter < triggerPoint) {
        activeItems.value.add(i)
      }
    })
    ticking = false
  })
}

onMounted(() => {
  window.addEventListener('scroll', updateTimeline, { passive: true })
  updateTimeline()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateTimeline)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <section id="stages" class="stages">
    <div class="container">
      <div ref="headerRef" class="section-header section-header--center section-reveal" :class="{ revealed: headerRevealed }">
        <p class="section-label">02 / Этапы</p>
        <h2 class="section-title">Прозрачный процесс<br>от замера до сдачи</h2>
      </div>
      <div ref="timeline" class="timeline">
        <div class="timeline__track">
          <div ref="timelineFill" class="timeline__track-fill" />
        </div>

        <div
          v-for="(stage, i) in stages"
          :key="stage.num"
          :ref="(el: any) => { if (el) itemRefs[i] = el as HTMLElement }"
          class="timeline__item"
          :class="[
            i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right',
            { active: activeItems.has(i) },
          ]"
        >
          <template v-if="i % 2 === 0">
            <div class="timeline__card">
              <span class="timeline__number">{{ stage.num }}</span>
              <h3 class="timeline__title">{{ stage.title }}</h3>
              <p class="timeline__desc">{{ stage.desc }}</p>
              <div class="timeline__icon">
                <StageIcon :name="stage.icon" />
              </div>
            </div>
            <div class="timeline__dot" />
          </template>
          <template v-else>
            <div class="timeline__dot" />
            <div class="timeline__card">
              <span class="timeline__number">{{ stage.num }}</span>
              <h3 class="timeline__title">{{ stage.title }}</h3>
              <p class="timeline__desc">{{ stage.desc }}</p>
              <div class="timeline__icon">
                <StageIcon :name="stage.icon" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
