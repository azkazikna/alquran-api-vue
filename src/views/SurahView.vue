<template>
    
    <div class="container mt-5" @some-event="callback">
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

                            <span tabindex="0" class="word-arab d-inline-block" id="tooltip" @click="playAudioWord(word)" data-bs-toggle="tooltip" data-bs-placement="top" :title="word.translation.text" v-html="word.text_uthmani_tajweed"></span>
                        </span>
                    </h2>
                </div>
            </div>
            <p>
                <span v-for="word in item.words" class="text-break">
                    {{ word.transliteration.text}} 
                </span>
            </p>
            <p class="mt-4">
                <span v-for="word in item.words">
                    {{ word.translation.text + ' ' }} 
                </span>
            </p>
            <!-- Start Modal -->
            <div class="modal fade" :id="`exampleModal${item.verse_number}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Tafsir {{ surah.name_simple }} Ayat {{ item.verse_number }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
            </div>
            <!-- End Modal -->
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { Tooltip } from 'bootstrap';


export default {
    props: ['propLanguage'],
    data() {
        return {
            surahID: this.$route.params.id,
            surah: {},
            namaSurah: {},
            surahInfo:  {},
            ayat:  [],
            audioAyat: [],
            audioPlayers: [], // Array to store audio players
        }
    },
    mounted() {
        axios.get(`https://api.quran.com/api/v4/chapters/${this.surahID}?language=${this.propLanguage}`)
                .then(response => {
                    this.surah = response.data.chapter;
                    this.namaSurah = response.data.chapter.translated_name.name
                })
                .catch(error => {
                    console.error(error);
                })
        //fetch info surah
        axios.get(`https://api.quran.com/api/v4/chapters/${this.surahID}/info?language=${this.propLanguage}`)
            .then(response => {
                this.surahInfo = response.data.chapter_info;
            })
            .catch(error => {
                console.error(error);
            })
        //fetch ayat
        axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${this.surahID}?language=${this.propLanguage}&words=true&word_fields=text_uthmani_tajweed&audio=2&per_page=300`)
            .then(response => {
                this.ayat = response.data.verses;
            })
            .catch(error => {
                console.error(error);
            })
        //fetch audio ayat
        axios.get(`https://api.quran.com/api/v4/quran/recitations/1?chapter_number=${this.surahID}`)
            .then(response => {
                this.audioAyat = response.data.audio_files;
            })
            .catch(error => {
                console.error(error);
            }) 
    },
    methods: {
        // const tooltipTriggerList = [].slice.call(
        //     document.querySelectorAll('#tooltip')
        // ),

        // tooltipTriggerList.map(function (tooltipTriggerEl) {
        //     return new Tooltip(tooltipTriggerEl);
        // }),
        

        playAudioAyat(nomor) {
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
        },

        playAudioWord(word) {
            // Your existing playAudioAyat function

            // Create and store audio player
            const audioPlayer = new Audio(`https://audio.qurancdn.com/${word.audio_url}`);
            this.audioPlayers.push(audioPlayer);

            // Play audio
            audioPlayer.play();
        }
    }
}
</script>
<style>
    
</style>