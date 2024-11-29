<script setup>
import {reactive, ref} from "vue";
import {userAuth} from "@/store/userAuth";
import {useRouter} from "vue-router";
import Alert from "@/components/Bars/Alert.vue";

const router = useRouter()
const user = reactive({
  email: '',
  password: ''
})

const alert = ref(false)
const alertText = ref({})

async function loginUser() {
  let e = await userAuth().login(user)
  if (e.length > 0) {
    alert.value = true;
    alertText.value = e;
  } else {
    await router.push(`/${localStorage.getItem("userRole")}-dashboard`)
  }
}

</script>

<template>
  <Alert :alert-text="alertText" :alert="alert"></Alert>
  <div class="container-xxl position-relative bg-white d-flex p-0">

    <!-- Sign In Start -->
    <div class="container-fluid">
      <div class="row h-100 align-items-center justify-content-center" style="min-height: 100vh;">
        <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div class="bg-light rounded p-4 my-4 mx-3">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div class="col-10 m-auto">
                <img src="@/assets/logo-removebg-preview.jpg" class="w-100" alt="">
              </div>
            </div>
            <div class="form-floating mb-3">
              <input type="email"
                     class="form-control"
                     id="floatingInput"
                     placeholder="name@example.com"
                     v-model="user.email">
              <label for="floatingInput">Elektron manzilingiz</label>
            </div>
            <div class="form-floating mb-4">
              <input type="password"
                     class="form-control"
                     id="floatingPassword"
                     placeholder="Parol"
                     v-model="user.password"
              >
              <label for="floatingPassword">Parol</label>
            </div>
            <button type="submit" class="btn btn-primary py-2 w-100 mb-4" @click="loginUser">Kirish</button>
            <router-link to="/register" class="text-center mb-0 m-auto text-center">Akkauntingiz mavjud emasmi? <a
                href="">Ro'yxatdan
              oting</a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- Sign In End -->

  </div>


</template>

<style scoped>

</style>