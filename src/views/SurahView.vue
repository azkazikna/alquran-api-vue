<template>
    <div class="container mt-5">
        <div class="row">
            <div class="mx-auto text-center mb-5">
                <h1 class="arab">{{ surah.name_arabic }}</h1>
                <span class="text-muted text-small">({{ namaSurah }})</span>
                <h3>Surah {{ surah.name_simple }}</h3>
                <p>{{ surahInfo.short_text }}</p>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <span class="font-weight-bold text-small cursor-pointer" data-toggle="modal" data-target="#modalInfo"><i class="fas fa-circle-info"></i>&nbsp; Info Surah</span>
            <span class="font-weight-bold text-small cursor-pointer" data-toggle="modal" data-target="#modalTajwid"><i class="fas fa-circle-info"></i>&nbsp; Aturan Warna Tajwid</span>
        </div>
        <h2 v-if="surah.bismillah_pre" class="arab text-center my-4">بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ</h2>
        <div class="row_ayat" v-for="item in ayat">
            <hr>
            <div class="d-flex justify-content-between align-items-start">
                <div class="text-center">
                    <div class="p-3 fw-bold bg-dark text-white d-flex justify-content-center align-items-center" :style="'width: 20px; height: 20px;'">{{ item.verse_number }}</div>
                    
                    <span data-toggle="tooltip" data-placement="right" title="Tafsir"><i class="fa-regular fa-eye mt-3 text-muted tafsir" data-toggle="modal" :data-target="`#exampleModal${item.verse_number}`"></i></span>
                    
                    <audio :id="`audio-ayat-${item.verse_number}`" :src="`https://audio.qurancdn.com/${item.audio.url}`"></audio>

                    <span data-toggle="tooltip" data-placement="right" title="Tafsir" class="d-block" @click="playAudioAyat(item.verse_number)"><i :id="`play-icon-${item.verse_number}`" class="fa-solid fa-play mt-1 text-muted cursor-pointer"></i></span>
                </div>
                <div class="audio-container">
                    <h2 class="arab ayat my-5 d-inline-block text-right" :style="'direction: rtl;'">
                        <span v-for="word in item.words">
                            <audio :id="`audio-kata-${word.id}`" :src="`https://audio.qurancdn.com/${word.audio_url}`"></audio>

                            <span tabindex="0" class="word-arab d-inline-block" @click="playAudioWord(word.id)" data-toggle="tooltip" data-placement="top" :title="word.translation.text" v-html="word.text_uthmani_tajweed"></span>
                        </span>
                    </h2>
                </div>
            </div>
            <p>
                <span v-for="word in item.words" class="text-break">
                    {{ word.transliteration.text }}
                </span>
            </p>
            <p class="mt-4">
                <span v-for="word in item.words">
                    {{ word.translation.text }}
                </span>
            </p>
            <!-- Start Modal -->
            <!-- <div wire:ignore.self class="modal fade" id="exampleModal{{ $item["verse_number"] }}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Tafsir {{ $data_surah["name_simple"] }} Ayat {{ $item["verse_number"] }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                        {{-- <select wire:model="id_tafsir" id="id_tafsir" class="form-control">
                            @foreach ($data_tafsir as $tafsir)
                                <option value="{{ $tafsir["id"] }}">{{ $tafsir["translated_name"]["name"] }}</option>
                            @endforeach
                        </select> --}}
                    {{-- <p>{{ $id_tafsir }}</p> --}}
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
            </div> -->
            <!-- End Modal -->
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
    setup() {
        const surahID = useRoute();
        const surah = ref({})
        const namaSurah = ref({})
        const surahInfo =  ref({})
        const ayat =  ref([])
        const audioAyat = ref([])

        onMounted(() => {
            //fetch surah
            axios.get(`https://api.quran.com/api/v4/chapters/${surahID.params.id}?language=id`)
                .then(response => {
                    surah.value = response.data.chapter;
                    namaSurah.value = response.data.chapter.translated_name.name
                })
                .catch(error => {
                    console.error(error);
                })
            //fetch info surah
            axios.get(`https://api.quran.com/api/v4/chapters/${surahID.params.id}/info?language=id`)
                .then(response => {
                    surahInfo.value = response.data.chapter_info;
                })
                .catch(error => {
                    console.error(error);
                })
            //fetch ayat
            axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${surahID.params.id}?language=id&words=true&word_fields=text_uthmani_tajweed&audio=2&per_page=300`)
                .then(response => {
                    ayat.value = response.data.verses;
                })
                .catch(error => {
                    console.error(error);
                })
            //fetch audio ayat
            axios.get(`https://api.quran.com/api/v4/quran/recitations/1?chapter_number=${surahID.params.id}`)
                .then(response => {
                    audioAyat.value = response.data.audio_files;
                })
                .catch(error => {
                    console.error(error);
                }) 
            
        });

        const playAudioAyat = (nomor) => {
            var audio = document.getElementById("audio-ayat-" + nomor);
            var icon = document.getElementById("play-icon-" + nomor);

            if (audio.paused) {
                audio.play();
                icon.classList.remove("fa-play");
                icon.classList.add("fa-pause");
            } else {
                audio.pause();
                icon.classList.remove("fa-pause");
                icon.classList.add("fa-play");
            }

            audio.addEventListener("ended", function() {
                icon.classList.remove("fa-pause");
                icon.classList.add("fa-play");
            });
        }

        const playAudioWord = (nomor) => {
            var audio = document.getElementById("audio-kata-" + nomor);
            audio.play();
        } 

        return {
            surah,
            surahInfo,
            ayat,
            audioAyat,
            namaSurah,
            playAudioAyat,
            playAudioWord
        }
    }
    // data() {
    //     return {
    //         surahID: this.$route.params.id,
    //         surah: Object,
    //         surahInfo: {},
    //         ayat: [],
    //         audioAyat: [],
    //     }
    // },
    // created() {
    //     this.fetchSurah()
    //     this.fetchInfoSurah()
    //     this.fetchAyat()
    //     this.fetchAudioAyat()
    // },
    // methods: {
    //     fetchSurah() {
    //         axios.get(`https://api.quran.com/api/v4/chapters/${this.surahID}?language=id`)
    //             .then(response => {
    //                 this.surah = response.data.chapter;
    //                 console.log(this.surah)
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //             })
    //     },
    //     fetchInfoSurah() {
    //         axios.get(`https://api.quran.com/api/v4/chapters/${this.surahID}/info?language=id`)
    //             .then(response => {
    //                 this.surahInfo = response.data.chapter_info;
    //                 console.log(this.surahInfo)
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //             })
    //     },
    //     fetchAyat() {
    //         axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${this.surahID}?language=id&words=true&word_fields=text_uthmani_tajweed&audio=2&per_page=300`)
    //             .then(response => {
    //                 this.ayat = response.data.verses;
    //                 console.log(this.ayat)
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //             })
    //     },
    //     fetchAudioAyat() {
    //         axios.get(`https://api.quran.com/api/v4/quran/recitations/1?chapter_number=${this.surahID}`)
    //             .then(response => {
    //                 this.audioAyat = response.data.audio_files;
    //                 console.log(this.audioAyat)
    //             })
    //             .catch(error => {
    //                 console.error(error);
    //             })
    //     },
    //     playAudioAyat(nomor) {
    //         var audio = document.getElementById("audio-ayat-" + nomor);
    //         var icon = document.getElementById("play-icon-" + nomor);

    //         if (audio.paused) {
    //             audio.play();
    //             icon.classList.remove("fa-play");
    //             icon.classList.add("fa-pause");
    //         } else {
    //             audio.pause();
    //             icon.classList.remove("fa-pause");
    //             icon.classList.add("fa-play");
    //         }

    //         audio.addEventListener("ended", function() {
    //             icon.classList.remove("fa-pause");
    //             icon.classList.add("fa-play");
    //         });
    //     },
    //     playAudioWord(nomor) {
    //         var audio = document.getElementById("audio-kata-" + nomor);
    //         audio.play();
    //     }
    // }
}
</script>
<style>
    
</style>