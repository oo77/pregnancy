<script setup>
import Register from "@/components/Register.vue";
import PatientMain from "@/components/PatientComponents/PatientMain.vue";
import DoctorMain from "@/components/DoctoroComponents/DoctorMain.vue";
import Login from "@/components/Login.vue";
import {useRoute} from "vue-router";
import page404 from '@/components/OtherComponents/404Page.vue'

</script>

<template>

  <login v-if="useRoute().path === '/login'"></login>
  <register v-else-if="useRoute().path === '/register'"></register>
  <page404 v-else-if="useRoute().path === '/:pathMatch(.*)*'"></page404>
  <patient-main v-if="useRoute().meta?.role === 'patient'"></patient-main>
  <doctor-main v-if="useRoute().meta?.role === 'doctor'"></doctor-main>
</template>
<style>

.card {
  margin-bottom: 30px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0 30px rgba(1, 41, 112, 0.1);
}

.card-header,
.card-footer {
  border-color: #ebeef4;
  background-color: #fff;
  color: #798eb3;
  padding: 15px;
}

.card-title {
  padding: 20px 0 15px 0;
  font-size: 18px;
  font-weight: 500;
  color: #012970;
  font-family: "Poppins", sans-serif;
}

.card-title span {
  color: #899bbd;
  font-size: 14px;
  font-weight: 400;
}

.card-body {
  padding: 0 20px 20px 20px;
}

.card-img-overlay {
  background-color: rgba(255, 255, 255, 0.6);
}

</style>


