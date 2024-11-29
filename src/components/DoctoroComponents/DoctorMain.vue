<script setup>

import Navbar from "@/components/Bars/Navbar.vue";
</script>

<template>

  <section style="background-color: #eee;" class="w-100 h-100">
    <div class="container py-5">
      <navbar status="doctor"></navbar>
      <router-view/>
    </div>
  </section>
</template>

<style scoped>

</style>