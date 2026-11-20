<template>
  <div class="home">
    <Header />
    <main class="main-content">
      <HeroSection />
      <ServicesSection />
      <PastPerformanceSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import HeroSection from '../components/HeroSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import PastPerformanceSection from '../components/PastPerformanceSection.vue'
import ContactSection from '../components/ContactSection.vue'
import Footer from '../components/Footer.vue'
</script>

<style scoped>
.home {
  font-family: var(--font-sans);
  min-height: 100vh;
}
.main-content {
  max-width: 1200px;
  margin: 0 auto;
}
</style>