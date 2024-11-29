<script setup>
import {reactive, ref} from "vue";
import {userAuth} from "@/store/userAuth";
import {useRouter} from "vue-router";
import Alert from "@/components/Bars/Alert.vue";

const router = useRouter()
const user = reactive({
  name: '',
  surname: '',
  address: '',
  phone: '',
  role: '',
  email: '',
  password: '',
  messages: '',
  doctorId: '',
})

const alert = ref(false)
const alertText = ref({})

async function registerUser() {
  let e = await userAuth().register(user)
  if (e.length > 0) {
    alert.value = true;
    alertText.value = e;
  } else {
    await router.push(`/${user.role}-dashboard`)
  }
}


</script>

<template>
  <Alert :alert="alert" :alert-text="alertText"></Alert>
  <div class="container-xxl position-relative bg-white d-flex p-0">
    <!-- Sign Up Start -->
    <div class="container-fluid">
      <div class="row h-100 align-items-center justify-content-center" style="min-height: 100vh;">
        <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-8">
          <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div class="col-8 m-auto">
                <img src="@/assets/logo-removebg-preview.jpg" class="w-100" alt="">
              </div>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingText1" placeholder="Ismingiz" v-model="user.name">
              <label for="floatingText1">Ismingiz</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="2" placeholder="Familiyangiz"
                     v-model="user.surname">
              <label for="floatingText2">Familiyangiz</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingText3" placeholder="Manzil"
                     v-model="user.address">
              <label for="floatingText3">Manzil</label>
            </div>

            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingInput1" placeholder="Sana"
                     v-model="user.phone">
              <label for="floatingInput1">Telefon raqamingiz</label>
            </div>

            <label for="floatingInput1">Statusingiz</label>
            <select class="form-select mb-3" aria-label="Default select example" v-model="user.role">
              <option value="doctor">Shifokor</option>
              <option value="patient">Bemor</option>
            </select>

            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="floatingInput2" placeholder="Email"
                     v-model="user.email">
              <label for="floatingInput2">Elektron manzilingiz</label>
            </div>

            <div class="form-floating mb-4">
              <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                     v-model="user.password">
              <label for="floatingPassword">Parol</label>
            </div>
            <button type="submit" class="btn btn-primary py-3 w-100 mb-4" @click='registerUser'>Ro'yhatdan o'tish
            </button>
            <router-link to="/login" class="text-center mb-0">Mavjud profilga kirish!
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- Sign Up End -->
  </div>
</template>

<style scoped>

</style>