<script setup>
import { ref } from "vue"
import { Client } from "tacitact"

const tc = new Client()
tc.startSync()

const syncedTime = ref(tc.getTime())
setInterval(() => {
    syncedTime.value = tc.getTime()
}, 1000)
</script>

<template>
    <div>{{ syncedTime }}</div>
</template>
