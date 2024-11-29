<script setup>
import {onMounted, ref} from "vue";
import VitaminProgressBar from "@/components/PatientComponents/VitminProgress/VitaminProgressBar.vue";
import {userAuth} from "@/store/userAuth";
import LoadingSpinner from "@/components/Bars/LoadingSpinner.vue";
import PatientAnketa from "@/components/PatientComponents/PatientAnketa.vue";
import {currentTrim} from "@/components/PatientComponents/VitminProgress/vitamineCounter";
import Chatroom from "@/components/Bars/Chatroom.vue";
import {patientMethods} from "@/store/patientMethods";
import {getUserPhotosById} from "@/store/methodsStorage";


const trim = ref(111)
const user = ref({})
const loading = ref(true)
const messages = ref([])
const doctor = ref()
const doctorImgUrl = ref()

onMounted(async () => {
  user.value = await userAuth().getCurUser()
  trim.value = await currentTrim()
  if (user.value.doctorId.id) {
    doctor.value = await patientMethods().getDoctorById(user.value.doctorId.id)
    doctorImgUrl.value = await getUserPhotosById(user.value.doctorId.id)
    messages.value = await userAuth().getPatientMessages(localStorage.getItem("userUid"), user.value.doctorId.id)
  }
  loading.value = false
})


async function sending(message) {
  await userAuth().savePatientMessages(localStorage.getItem("userUid"), user.value.doctorId.id,
      {
        ...message,
        author: "patient",
        doctor: user.value.doctorId.id
      })
  messages.value = await userAuth().getPatientMessages(localStorage.getItem("userUid"), user.value.doctorId.id)
}

</script>

<template>
  <loading-spinner v-if="loading"></loading-spinner>
  <div v-else>

    <PatientAnketa></PatientAnketa>

    <!--Haftalik norma-->
    <vitamin-progress-bar></vitamin-progress-bar>


    <div class="card mx-4">
      <div v-if="!doctor" class="d-flex text-primary justify-content-center my-3">
        <div>
          <div>Shifokor bilan xabarlashish uchun shifokorni tanlang</div>
          <div class="text-center text-dark">Profil sozlamasi bo'limidan shifokorni tanlang</div>
        </div>
      </div>
      <div v-else>
        <div class="card-body profile-card pt-4 d-flex salign-items-center">
          <img
              :src="doctorImgUrl"
              alt="avatar" id="doctorImage"
              class="rounded-circle img-thumbnail" style="width: 70px; height:  70px">
          <div class="d-flex align-items-center px-2">
            <h6>{{ doctor.name + " " + doctor.surname }}</h6>
          </div>
        </div>
        <chatroom @send="sending" :messages="messages" status="patient"></chatroom>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>