<template>
  <Navbar @gantiBahasa="handlerGanti"/>

  <router-view :key="language" :prop-language="language"/>

  <Footer />
</template>

<script>
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
  export default {
    name: 'App',
    components: {
      Navbar,
      Footer
    },
    data() {
      return {
        language: 'id'
      }
    },
    computed: {
      propLanguage() {
        return this.language; // Menggunakan nilai language sebagai prop-language
      }
    },
    methods: {
      handlerGanti(newLanguage) {
        this.language = newLanguage;
      },

      getPropLanguage() {
        return this.language; // Mengembalikan nilai language sebagai prop-language
      }
    }
  }
</script>

