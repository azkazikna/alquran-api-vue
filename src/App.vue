<template>
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
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </div>
          </div>
      </div>
  </nav>
  <router-view/>
  <footer class="text-muted bg-light mt-5">
      <div class="container">
        <p class="float-right">
          <a href="#">Back to top</a>
        </p>
        <p><span class="text-dark font-weight-bold">QuranAzka</span> merupakan website yang dibuat biar kalian pada baca terus gua dapet pahala hayyukkk</p>
        <p>Dibuat oleh <a href="https://github.com/azkazikna">Azkazikna Ageung Laksana</a> dengan API <a href="https://equran.id/apidev">equran.id</a>.</p>
      </div>
  </footer>
</template>

