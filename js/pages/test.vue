<template>
    <div class="pt-4 text-center" style="width: 500px;">

        <audio-player 
            id="intro_audio"
            source="http://staging.wejunket.com/audio/c31668ea5ad90523774aff393e3b4edc.mp3"
            :busy="false"
        />
        
    </div>
</template>

<script>
export default {
    
    computed: {
    },

    metaInfo () {
        return { title: "Test Page" }
    },

    data: () => ({
    }),

    methods: {
    }
}
</script>
