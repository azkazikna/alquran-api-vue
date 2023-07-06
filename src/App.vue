<template>
  <Navbar />

  <router-view @some-event="callback"/>

  <Footer />
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
export default {
  components: {
    Navbar,
    Footer
  }
}
</script>

