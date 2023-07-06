<template lang="">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
          <a class="navbar-brand" href="#">QuranAzka</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ml-auto">
              <router-link class="nav-link" to="/">Beranda</router-link>
              <router-link class="nav-link" to="/quran">Quran</router-link>
              <router-link class="nav-link" to="">Doa Harian</router-link>
              <button class="pull-xs-right border-0 bg-light" id="navbarSideButton" @click="bukaSidebar" type="button">
                <i class="fa-solid fa-gear"></i>
              </button>
          </div>
          </div>
      </div>
  </nav>

  <section class="container">
    <nav class="navbar navbar-light navbar-static bg-faded" role="navigation">
  
      <a class="navbar-brand" href="#">
        <img src="" alt="">
      </a>
  
      <ul :class="['navbar-side', 'bg-white', 'shadow-sm', { reveal: isSidebarVisible }]" id="navbarSide">
      <li class="navbar-side-item text-muted mt-3">
        <p class="side-link">Pengaturan</p>
        <hr>
      </li>
      <li class="navbar-side-item text-muted mt-3">
        <div class="side-link">
          <div class="d-flex justify-content-between align-items-center">
            <p class="w-50 mt-2">Bahasa Terjemahan</p>
            <select v-model="selectedLanguage" @change="$emit('someEvent', selectedLanguage.value)" id="language" class="form-control w-50">
              <option v-for="item in languages" :value="item.iso_code">{{ item.name }}</option>
            </select>
          </div>
          <span class="text-small">Sumber terjemahan kata demi kata: <a href="">quranwbw</a>.</span>
          <span class="text-small"><i>Sumber ini tidak tergantung pada pemilihan terjemahan ayat.</i></span>
          <p class="w-50 mt-2">Bahasa Terjemahan</p>
        <input wire:model="dibarisan" type="checkbox" id="dibarisan" value="true">
        <label for="dibarisan" class="text-small">Dibarisan</label>
        </div>
      </li>
      </ul>
  
      <div class="overlay" @click="tutupSidebar"></div>
    </nav>
  </section>
</template>
<script>
    import axios from 'axios';
    import { ref, onMounted } from 'vue';

    export default {
      setup() {

        const isSidebarVisible = ref(false);
        const languages = ref([]);
        const selectedLanguage = ref('id');

        const bukaSidebar = () => {
          isSidebarVisible.value = true;
            // Menambahkan class 'reveal' ke '.overlay' untuk mengatur tampilan display menjadi 'block'
            const overlay = document.querySelector('.overlay');
            overlay.classList.add('reveal');
        }
        
        const tutupSidebar = () => {
          isSidebarVisible.value = false;
          // Menambahkan class 'reveal' ke '.overlay' untuk mengatur tampilan display menjadi 'block'
          const overlay = document.querySelector('.overlay');
          overlay.classList.remove('reveal');
        }

        onMounted(async () => {
            //fetch language
            await axios.get(`https://api.quran.com/api/v4/resources/languages`)
                .then(response => {
                languages.value = response.data.languages;
                })
                .catch(error => {
                    console.error(error);
                })
        });

        const changeLanguage = () => {
          console.log(selectedLanguage.value);
        }

        return {
          isSidebarVisible,
          languages,
          selectedLanguage,
          bukaSidebar,
          tutupSidebar,
          changeLanguage
        }

      }
    }

    

</script>
<style lang="">
    
</style>