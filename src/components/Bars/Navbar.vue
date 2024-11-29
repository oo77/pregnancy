<script setup>
import {userAuth} from "@/store/userAuth";
import {onMounted, ref} from "vue";
import {getAuth, signOut} from "firebase/auth";
import {useRouter} from "vue-router";

const router = useRouter()
const user = ref({})
const {status} = defineProps(["status"])

function logout() {
  signOut(getAuth())
  router.push('/login')
  localStorage.clear()
}

onMounted(async () => {
  user.value = await userAuth().getCurUser()
})


</script>

<template>
  <nav class="navbar navbar-expand bg-light shadow navbar-light sticky-top justify-content-between  py-0 mb-2 rounded ">
    <div class="d-flex m-2" style="width: 15%">
      <img src="../../assets/logo-removebg-preview.jpg" class="w-100" alt="">
    </div>

    <div v-if="status==='patient'" class="d-flex mx-auto justify-content-evenly gap-4 ">
      <router-link to="/patient-dashboard" class=""><i class="fa fa-tachometer-alt me-2"></i>Asosiy bo'lim</router-link>
      <router-link to="/history" class=""><i class="fa fa-history me-2"></i>Istemol tarixi</router-link>
      <router-link to="/addDish" class=""><i class="fa fa-plus me-2"></i>Taom Qoshish</router-link>
    </div>

    <div class="align-items-center " style="width: 15%">
      <div class="dropdown">
        <div class="dropdown-toggle d-flex align-items-center justify-content-center" role="button"
             data-bs-toggle="dropdown">
          <i class="fa fa-user fa-1x   me-lg-2"></i>
          <span class="d-none d-lg-inline-flex">{{ user.surname }}</span>
        </div>
        <div class="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
          <div class="dropdown-item " @click="">Profil</div>
          <div class="dropdown-item " @click="">Uskunalar</div>
          <div class="dropdown-item " @click="logout">Chiqish</div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>