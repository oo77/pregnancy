<script setup>
import {computed, onMounted, ref, watch, watchEffect} from "vue";
import {userAuth} from "@/store/userAuth";
import {getUserPhotosById, uploadPhotoFile} from "@/store/methodsStorage"
import LoadingSpinner from "@/components/Bars/LoadingSpinner.vue";
import {patientMethods} from "@/store/patientMethods";
import {currentTrim} from "./VitminProgress/vitamineCounter"

const user = ref({})
const loading = ref({})
const photoLoader = ref(false)
const photoUrl = ref({})
const pictureFile = ref({})
const doctorPhotoUrl = ref({})
const doctors = ref({})
const curDoctor = ref({})
const curTrimestre = ref({})

onMounted(async () => {
  photoUrl.value = await getUserPhotosById(localStorage.getItem("userUid"))
  user.value = await userAuth().getCurUser()
  doctors.value = await patientMethods().getDoctors()
  curDoctor.value = await patientMethods().getDoctorById(user.value.doctorId)
  curTrimestre.value = await currentTrim()
  loading.value = false
})

watch(curDoctor, async (newDoctor, oldDoctor) => {
  photoLoader.value = true
  doctorPhotoUrl.value = await getUserPhotosById(curDoctor.value.id)
  photoLoader.value = false
})

function uploadFile(event) {
  pictureFile.value = event.target.files[0]
}

async function updateProfile() {
  loading.value = true
  user.value.doctorId = curDoctor.value
  await uploadPhotoFile(pictureFile.value)
  await userAuth().setUser(localStorage.getItem("userUid"), user.value)
  loading.value = false
}

</script>

<template>
  <loading-spinner v-if="loading"></loading-spinner>
  <div class="row m-2 " v-else>
    <div class="col-xl-4">
      <div class="card">
        <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
          <img :src="photoUrl" alt="avatar" id="doctorImage"
               class="rounded-circle img-thumbnail" style="width: 150px; height: 150px">
          <h2>{{ user.name + " " + user.surname }}</h2>
          <p class="fw-bold text-primary">{{ user.phone || "+998984754" }}</p>
          <div class="d-flex social-links mt-2 gap-2">
            <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
            <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-8">
      <div class="card">
        <div class="card-body pt-3">
          <!-- Bordered Tabs -->
          <ul class="nav nav-tabs nav-tabs-bordered" role="tablist">

            <li class="nav-item" role="presentation">
              <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview"
                      aria-selected="true" role="tab">Bemor
              </button>
            </li>

            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit" aria-selected="false"
                      role="tab" tabindex="-1">Profil sozlamasi
              </button>
            </li>

            <li class="nav-item" role="presentation">
              <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password"
                      aria-selected="false" role="tab" tabindex="-1">Kirish uchun ma'lumotlar
              </button>
            </li>

          </ul>
          <div class="tab-content pt-2">

            <div class="tab-pane fade profile-overview active show" id="profile-overview" role="tabpanel">
              <h5 class="card-title">Ma'lumotnoma</h5>
              <div class="d-flex gap-1">
                <div class="col-6">
                  <div class="row">
                    <div class="col-6 label ">F.I.Sh</div>
                    <div class="col-6 fw-bold">{{ user.surname + "  " + user.name }}</div>
                  </div>
                  <div class="row">
                    <div class="col-6 col-6 label">Manzil</div>
                    <div class="col-6 col-6 fw-bold">{{ user.address || "Lueilwitz, Wisoky and Leuschke" }}</div>
                  </div>
                  <div class="row">
                    <div class="col-6  label">Tug'ulgan sanasi</div>
                    <div class="col-6 fw-bold">{{ user.birth || "12.12.2000" }}</div>
                  </div>
                  <div class="row">
                    <div class="col-6  label">Telefon raqam</div>
                    <div class="col-6 fw-bold">{{ user.phone || "(436) 486-3538 x29071" }}</div>
                  </div>
                  <div class="row">
                    <div class="col-6 label">Elektrom manzil</div>
                    <div class="col-6 fw-bold">{{ user.email || "k.anderson@example.com" }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="row">
                    <div class="col-6 label">Homila sanasi</div>
                    <div class="col-6 fw-bold">
                      <div>{{ user.pregnancyDate || "20.20.2024" }}</div>
                      <small>({{ curTrimestre }} chi trimestr)</small>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6 label">Tug'ruqlar soni</div>
                    <div class="col-6 fw-bold">{{ user.numOfBirth || "0" }}</div>
                  </div>
                  <div class="row">
                    <div class="col-6 label">Homiladorlik soni</div>
                    <div class="col-6 fw-bold">{{ user.numOfPregnancies || "0" }}</div>
                  </div>
                  <div class="row">
                    <div class="col-6 label">Qon bosimi</div>
                    <div class="col-6 fw-bold">{{ user.bloodPressure || "130/40" }}</div>
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <h5 class="card-title">Bemor haqida</h5>
                <p class="small fst-italic">{{
                    user.additionallyInfo || `Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus.
                Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet
                perspiciatis odit. Fuga sequi sed ea saepe at unde.`
                  }}</p>
              </div>
            </div>

            <div class="tab-pane fade profile-edit pt-3" id="profile-edit" role="tabpanel">
              <form class="" @submit="updateProfile">
                <h5 class="mb-2">Malumotlar:</h5>
                <div class="row mb-3">
                  <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Rasmingiz</label>
                  <div class="col-md-8 col-lg-9">
                    <div class="pt-2">
                      <input type="file" class="form-control" title="Upload new profile image"
                             placeholder="file tanlang"
                             @change="uploadFile"
                      >
                    </div>
                  </div>
                </div>
                <div class="d-flex gap-2">
                  <div class="">

                    <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
                      <p class="m-0 w-50">Ismingiz: </p>
                      <input v-model="user.name" class="form-control w-50" type="text" placeholder=""
                             aria-label="" required>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
                      <p class="m-0 w-50">Familiangiz: </p>
                      <input v-model="user.surname" class="form-control w-50" type="text" placeholder=""
                             aria-label="" required>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
                      <p class="m-0 w-50">Manzil: </p>
                      <input v-model="user.address" class="form-control w-50" type="text" placeholder=""
                             aria-label="" required>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
                      <p class="m-0 w-50">Telefon: </p>
                      <input v-model="user.phone" class="form-control w-50" type="text" placeholder=""
                             aria-label="" required>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
                      <p class="m-0 w-50">Tugulgan sanasi: </p>
                      <input v-model="user.birth" class="form-control w-50" type="date" placeholder=""
                             aria-label="" required>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
                      <p class="m-0 w-50">Boyi va vazni: </p>
                      <input v-model="user.height" class="form-control w-25" type="number" placeholder="Bo'yi"
                             aria-label="default input example" required>
                      <input v-model="user.weight" class="form-control w-25" type="number" placeholder="Vazni"
                             aria-label="default input example" required>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
                      <p class="m-0 w-50">Homila sanasi: </p>
                      <input v-model="user.pregnancyDate" class="form-control w-50" type="date" placeholder=""
                             aria-label="" required>
                    </div>
                  </div>
                  <div class="">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                      <p class="m-0 w-50">Tug'ruqlar soni: </p>
                      <input v-model="user.numOfBirth" class="form-control w-25" type="number" placeholder=""
                             aria-label="default input example" required>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
                      <p class="m-0 w-50">Homiladorlik soni: </p>
                      <input v-model="user.numOfPregnancies" class="form-control w-25" type="number" placeholder=""
                             aria-label="default input example" required>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
                      <p class="m-0 w-50">Qon bosimi: </p>
                      <input v-model="user.bloodPressure" class="form-control w-25" type="number" placeholder=""
                             aria-label="default input example" required>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-2 gap-4">
                      <p class="m-0 ">Qo'shimcha ma'lumotlar: </p>
                    </div>
                    <div class="form-floating">
                    <textarea v-model="user.additionallyInfo" class="form-control"
                              placeholder="Leave a comment here"
                              id="floatingTextarea"
                              style="height: 150px;"></textarea>
                    </div>
                  </div>
                </div>
                <hr>
                <h5>Shifokor:</h5>
                <div class="d-flex">
                  <div class="col-9">
                    <select v-model="curDoctor" class="form-select w-75 mb-2" id="floatingSelect"
                            aria-label="Floating label select example" required>
                      <option v-for="doctor in doctors" :value="doctor">{{
                          doctor.name + " " + doctor.surname
                        }}
                      </option>
                    </select>

                    <div class="d-flex align-items-center">
                      <p class="m-0 w-50">Telefon raqami: </p>
                      <p class="m-0 w-50 fw-bold">{{ curDoctor.phone || "+998 98 099 99 98" }}</p>
                    </div>
                  </div>
                  <div class="col-3 d-flex justify-content-center align-items-center">
                    <div v-if="photoLoader" class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <img v-else
                         :src="doctorPhotoUrl"
                         alt="avatar" id="doctorImage" class="rounded-circle img-thumbnail"
                         style="width: 150px; height: 150px;">
                  </div>

                </div>
                <div class="d-flex mt-3 justify-content-center">
                  <button class="btn btn-primary" type="submit"> Malumotlarni yangilash</button>
                </div>
              </form>
            </div>

            <div class="tab-pane fade pt-3" id="profile-change-password" role="tabpanel">
              <form>
                <div class="row mb-3">
                  <label for="currentPassword" class="col-md-4 col-lg-3 col-form-label">Current Password</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="password" type="password" class="form-control" id="currentPassword">
                  </div>
                </div>

                <div class="row mb-3">
                  <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">New Password</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="newpassword" type="password" class="form-control" id="newPassword">
                  </div>
                </div>

                <div class="row mb-3">
                  <label for="renewPassword" class="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="renewpassword" type="password" class="form-control" id="renewPassword">
                  </div>
                </div>

                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Change Password</button>
                </div>
              </form>
            </div>

          </div><!-- End Bordered Tabs -->

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>