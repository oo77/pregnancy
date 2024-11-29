<script setup>
import Navbar from "@/components/Bars/Navbar.vue";

import {onDeactivated, onMounted, ref} from "vue";

import LoadingSpinner from "@/components/Bars/LoadingSpinner.vue";


const loading = ref(false)
const isOpen = ref(false)
onMounted(async () => {

})


</script>

<template>
  <loading-spinner v-if="loading"></loading-spinner>
  <div class="container">
    <navbar status="patient"></navbar>
    <div class="container bg-white d-flex p-0">

      <router-view></router-view>

      <a href="#" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
    </div>
  </div>
</template>

<style scoped>

</style>