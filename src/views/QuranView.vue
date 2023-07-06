<template>
    <div class="container mt-5">
        <form action="">
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text bg-dark text-white" id="basic-addon1"><i class="fa-solid fa-magnifying-glass"></i></span>
                    </div>
                    <input v-model="search" type="search" class="form-control" placeholder="Cari... (Al-fatihah, dst)" aria-label="Cari">
                </div>
            </div>
        </form>
        <div class="row card-equal-height">
            <div class="col-12 col-lg-6 col-xl-4 mt-2" v-for="s in filteredItems" :key="s.id">
                <RouterLink :to="`/surah/${s.id}`" class="card text-decoration-none text-dark">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="p-3 fw-bold bg-dark text-white rounded d-flex justify-content-center align-items-center rounded mr-3" style="width: 50px; height: 50px;">{{ s.id }}</div>
                            <div class="w-100">
                                <div class="d-flex w-100 justify-content-between">
                                    <div class="">
                                        <h5 class="heading-surah">{{ s.name_simple }}</h5>
                                    </div>
                                    <div class="">
                                        <h6 class="arab text-end">{{ s.name_arabic }}</h6>
                                    </div>
                                </div>
                                <div class="d-flex w-100 justify-content-between">
                                    <div class="">
                                        <span class="text-muted text-small">{{ s.translated_name.name }}</span>
                                    </div>
                                    <div class="">
                                        <span class="text-muted text-small">{{ s.verses_count }} Ayat</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            search: '',
            surah: []
        }
    },
    created() {
        this.fetchSurah()
    },
    methods: {
        fetchSurah() {
            axios.get('https://api.quran.com/api/v4/chapters?language=id')
                .then(response => {
                    this.surah = response.data.chapters;
                    console.log(this.surah)
                })
                .catch(error => {
                    console.error(error);
                })
        }
    },
    computed: {
        filteredItems() {
            return this.surah.filter(item => {
                return item.name_simple.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    }
}
</script>