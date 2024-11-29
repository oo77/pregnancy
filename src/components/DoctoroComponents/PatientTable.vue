<script setup>

import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const isOpen = ref(false)
const {patients} = defineProps(["patients"])

function openModal(uid) {
  localStorage.setItem("selectedPatient", uid)
  router.push('/selected-patient')
}

</script>

<template>
  <div class="col-xl-12 ">
    <h4>Bemorlar</h4>
    <div class="card my-3 rounded">
      <table class="table rounded-2">

        <thead class="bg-light">
        <tr>
          <th>Ism-Familiya</th>
          <th>Manzil</th>
          <th>Telefon</th>
          <th>Ko'rish</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="patient in patients">
          <td>
            <div class="d-flex align-items-center">
              <img
                  src="https://firebasestorage.googleapis.com/v0/b/projectguzal.appspot.com/o/pictures%2F94OmggttKhZGSr04SwYTatQySMh1?alt=media&token=9e185cc3-73c9-478e-ad62-325f3daf6541"
                  alt=""
                  style="width: 45px; height: 45px"
                  class="rounded-circle"
              />
              <div class="ms-3">
                <p class="fw-bold mb-1">{{ patient.name }}</p>
                <p class="text-muted mb-0">{{ patient.surname }}</p>
              </div>
            </div>
          </td>
          <td>
            <p class="fw-normal mb-1">{{ patient.address }}</p>
          </td>
          <td>
            <span class="fw-normal mb-1">{{ patient.phone }}</span>
          </td>
          <td>
            <button type="button" @click="openModal(patient.uid)" class="btn btn-link btn-sm btn-rounded">
              ko'rish
            </button>
          </td>
        </tr>

        </tbody>
      </table>
    </div>
  </div>

</template>

<style scoped>

</style>