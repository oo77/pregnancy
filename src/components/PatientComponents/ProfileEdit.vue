<script setup>
import {onMounted, reactive, ref} from "vue";
import {userAuth} from "@/store/userAuth";
import {patientMethods} from "@/store/patientMethods";
import LoadingSpinner from "@/components/Bars/LoadingSpinner.vue";
import {useRoute, useRouter} from "vue-router";


const user = ref({

})
const loading = ref(true)
const doctors = ref([])
const router = useRouter()
onMounted(async () => {
  const curUser = await userAuth().getCurUser()
  user.value = {...curUser}
  doctors.value = await patientMethods().getDoctors()
  loading.value = false

})


async function profileUpdate() {
  await patientMethods().profileUpdate(user.value)
  await router.push('/patient-dashboard')
}
</script>

<template>

  <loading-spinner v-if="loading"></loading-spinner>
  <div>
    <div
        class="bg-light container-fluid mt-4 mx-4 p-4 w-auto rounded d-flex align-items-center justify-content-between">
      <div class="d-flex gap-2">
        <div class="rounded-circle  bg-white   d-flex justify-content-center  align-items-center"
             style="width: 50px; height: 50px">
          <span class="fa fa-user fa-2x m-0 p-0 text-primary"></span>
        </div>
        <div class="form-floating mb-3">
          <input v-model="user.name" type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">Ismingiz</label>
        </div>
        <div class="form-floating mb-3">
          <input v-model="user.surname" type="text" class="form-control" id="floatingInput"
                 placeholder="name@example.com">
          <label for="floatingInput">Familyangiz</label>
        </div>
      </div>
      <div class="form-floating mb-3">
        <input v-model="user.address" type="email" class="form-control" id="floatingInput"
               placeholder="name@example.com">
        <label for="floatingInput">Manzil</label>
      </div>
    </div>

    <div class="container-fluid bg-light mt-4 mx-4 p-4 w-auto rounded d-flex">
      <div class="col-5">
        <h3>Malumotlar:</h3>
        <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
          <p class="h5 text-primary m-0">tugulgan sanasi: </p>
          <input v-model="user.pregnancyDate" class="form-control w-25" type="date" placeholder=""
                 aria-label="">
        </div>

        <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
          <p class="h5 text-primary m-0">boyi va vazni: </p>
          <input v-model="user.height" class="form-control w-25" type="number" placeholder="Bo'yi"
                 aria-label="default input example">
          <input v-model="user.weight" class="form-control w-25" type="number" placeholder="Vazni"
                 aria-label="default input example">
        </div>
        <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
          <p class="h5 text-primary m-0">homiladorlik sanasi: </p>
          <input v-model="user.birth" class="form-control w-25" type="date" placeholder=""
                 aria-label="">
        </div>

        <div class="d-flex align-items-center  justify-content-between mb-2 gap-4">
          <p class="h5 text-primary m-0">tug'ruqlar soni: </p>
          <input v-model="user.numOfBirth" class="form-control w-25" type="number" placeholder=""
                 aria-label="default input example">
        </div>

        <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
          <p class="h5 text-primary m-0">homiladorlik soni: </p>
          <input v-model="user.numOfPregnancies" class="form-control w-25" type="number" placeholder=""
                 aria-label="default input example">
        </div>

        <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
          <p class="h5 text-primary m-0">qon bosimi: </p>
          <input v-model="user.bloodPressure" class="form-control w-25" type="number" placeholder=""
                 aria-label="default input example">
        </div>
        <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
          <p class="h5 text-primary m-0">qo'shimcha ma'lumotlar: </p>
        </div>
        <div class="form-floating">
        <textarea v-model="user.additionallyInfo" class="form-control" placeholder="Leave a comment here"
                  id="floatingTextarea"
                  style="height: 150px;"></textarea>
        </div>
      </div>
      <div class="col-2">

      </div>
      <div class="col-5 align-content-between">
        <div class="">
          <h3>Shifokor:</h3>
          <div class="d-flex gap-4 align-items-center mb-2">
            <p class="h5 text-primary m-0">F.I.Sh: </p>
            <select v-model="user.doctorId" class="form-select w-50" id="floatingSelect"
                    aria-label="Floating label select example">
              <option v-for="doctor in doctors" :value="doctor.id">{{ doctor.name }}</option>
            </select>
          </div>
          <div class="d-flex align-items-center gap-4">
            <p class="h5 m-0 text-primary ">Mutahasiligi: </p>
            <p class="h5 m-0">Pediatr</p>
          </div>
          <div class="d-flex align-items-center gap-4">
            <p class="h5 m-0 text-primary ">Telefon raqami:: </p>
            <p class="h5 m-0">+99890 9888989</p>
          </div>
          <p class="h5 text-primary"></p>
        </div>
        <div class="d-flex justify-content-end align-items-end mt-5">
          <div class="btn btn-primary" @click="profileUpdate"> Malumotlarni yangilash</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>