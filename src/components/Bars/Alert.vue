<script setup>
import {defineProps, watch} from "vue";

let {text, alert} = defineProps(["alertText", "alert"])

</script>

<template>
  <div v-if="alert" class="alert alert-danger" role="alert">
    {{ alertText }}
  </div>
</template>

<style scoped>

</style>