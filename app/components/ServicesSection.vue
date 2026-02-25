<script setup lang="ts">
const { el: headerRef, revealed: headerRevealed } = useReveal()

const services = [
  { title: 'Подбор недвижимости', desc: 'Поможем выбрать квартиру или дом под ваш бюджет и задачи', icon: 'home' },
  { title: 'Дизайн и техплан', desc: 'Проектирование пространства с учётом всех ваших пожеланий', icon: 'layout' },
  { title: 'Электрика', desc: 'Разводка, монтаж щитков, установка розеток и выключателей', icon: 'zap' },
  { title: 'Сантехника', desc: 'Установка и замена труб, смесителей, сантехнического оборудования', icon: 'tool' },
  { title: 'Штукатурка и выравнивание', desc: 'Подготовка стен и потолков под чистовую отделку', icon: 'grid' },
  { title: 'Покраска и декор', desc: 'Покраска стен, декоративная штукатурка и отделочные работы', icon: 'clock' },
  { title: 'Укладка плитки', desc: 'Облицовка ванных, кухонь и других помещений любой сложности', icon: 'tiles' },
  { title: 'Монтаж полов', desc: 'Ламинат, паркет, наливные полы и стяжка', icon: 'floor' },
  { title: 'Двери и окна', desc: 'Установка входных и межкомнатных дверей, оконных систем', icon: 'door' },
  { title: 'Мебель и конструкции', desc: 'Встроенные шкафы, гардеробные, кухонная мебель на заказ', icon: 'file' },
  { title: 'Кондиционеры', desc: 'Поставка и монтаж систем кондиционирования', icon: 'cloud' },
  { title: 'Освещение', desc: 'Подбор и установка светильников, световой дизайн интерьера', icon: 'sun' },
  { title: 'Декор и мелкие работы', desc: 'Финальные штрихи, навеска полок, карнизов и декоративных элементов', icon: 'star' },
]
</script>

<template>
  <section id="services" class="services">
    <div class="container">
      <div ref="headerRef" class="section-header section-reveal" :class="{ revealed: headerRevealed }">
        <p class="section-label">01 / Услуги</p>
        <h2 class="section-title">Полный спектр работ<br>по ремонту и отделке</h2>
      </div>
      <div class="services__grid">
        <RevealCard v-for="(service, i) in services" :key="i" class="service-card" :delay="i * 0.05">
          <div class="service-card__icon">
            <ServiceIcon :name="service.icon" />
          </div>
          <h3 class="service-card__title">{{ service.title }}</h3>
          <p class="service-card__desc">{{ service.desc }}</p>
        </RevealCard>
      </div>
    </div>
  </section>
</template>
