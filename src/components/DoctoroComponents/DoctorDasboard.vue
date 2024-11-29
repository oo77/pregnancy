<script setup>
import {onMounted, ref} from "vue";
import {userAuth} from "@/store/userAuth";
import {getUserPhotosById, uploadPhotoFile} from "@/store/methodsStorage"
import LoadingSpinner from "@/components/Bars/LoadingSpinner.vue";
import PatientTable from "@/components/DoctoroComponents/PatientTable.vue";
import {doctorMethods} from "@/store/doctorMethods";

const user = ref({})
const loading = ref({})
const photoUrl = ref({})
const pictureFile = ref({})
const patients = ref({})

onMounted(async () => {
  photoUrl.value = await getUserPhotosById(localStorage.getItem("userUid"))
  user.value = await userAuth().getCurUser()
  patients.value = await doctorMethods().getPatients()
  loading.value = false
})


function uploadFile(event) {
  pictureFile.value = event.target.files[0]
}

async function updateProfile() {
  loading.value = true
  await uploadPhotoFile(pictureFile.value)
  await userAuth().setUser(localStorage.getItem("userUid"), user.value)
  loading.value = false
}

</script>

<template>
  <loading-spinner v-if="loading"></loading-spinner>
  <div class="row" v-else>

    <div class="col-xl-4">
      <div class="card">
        <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">

          <img :src="photoUrl" alt="avatar" id="doctorImage"
               class="rounded-circle img-thumbnail" style="width: 150px; height: 150px">
          <h2>{{ user.name + " " + user.surname }}</h2>
          <h3>{{ user.speciality || "pediatr" }}</h3>
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
                      aria-selected="true" role="tab">Shifokor
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
              <h5 class="card-title">Shifokor haqida</h5>
              <p class="small fst-italic">{{
                  user.about || `Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus.
                Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet
                perspiciatis odit. Fuga sequi sed ea saepe at unde.`
                }}</p>

              <h5 class="card-title">Ma'lumotnoma</h5>

              <div class="row">
                <div class="col-lg-3 col-md-4 label ">F.I.Sh</div>
                <div class="col-lg-9 col-md-8">{{ user.surname + "  " + user.name }}</div>
              </div>

              <div class="row">
                <div class="col-lg-3 col-md-4 label">Ish joyi</div>
                <div class="col-lg-9 col-md-8">{{ user.job || "Lueilwitz, Wisoky and Leuschke" }}</div>
              </div>

              <div class="row">
                <div class="col-lg-3 col-md-4 label">Mutahasisligi</div>
                <div class="col-lg-9 col-md-8">{{ user.speciality || "pediatr" }}</div>
              </div>


              <div class="row">
                <div class="col-lg-3 col-md-4 label">Manzil</div>
                <div class="col-lg-9 col-md-8">{{ user.address || "A108 Adam Street, New York, NY 535022" }}</div>
              </div>

              <div class="row">
                <div class="col-lg-3 col-md-4 label">Telefon raqam</div>
                <div class="col-lg-9 col-md-8">{{ user.phone || "(436) 486-3538 x29071" }}</div>
              </div>

              <div class="row">
                <div class="col-lg-3 col-md-4 label">Elektrom manzil</div>
                <div class="col-lg-9 col-md-8">{{ user.email || "k.anderson@example.com" }}</div>
              </div>

            </div>

            <div class="tab-pane fade profile-edit pt-3" id="profile-edit" role="tabpanel">

              <form @submit="updateProfile">
                <!--rasm yuklash uchun -->
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
                <!---------------------------------------------------->
                <div class="row mb-3">
                  <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Ismingiz</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="fullName" type="text" class="form-control" id="fullName" v-model="user.name" required>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="fullSurname" class="col-md-4 col-lg-3 col-form-label">Familiyangiz</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="fullName" type="text" class="form-control" id="fullSurname" v-model="user.surname"
                           required>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="about" class="col-md-4 col-lg-3 col-form-label">O'zingiz haqingizda</label>
                  <div class="col-md-8 col-lg-9">
                    <textarea name="about" class="form-control" id="about" style="height: 100px"
                              v-model="user.about" required></textarea>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="company" class="col-md-4 col-lg-3 col-form-label">Ish joyi</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="company" type="text" class="form-control" id="company"
                           v-model="user.job" required>
                  </div>
                </div>

                <div class="row mb-3">
                  <label for="Job" class="col-md-4 col-lg-3 col-form-label">Mutahasisligi</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="job" type="text" class="form-control" id="Job" v-model="user.speciality">
                  </div>
                </div>

                <div class="row mb-3">
                  <label for="Country" class="col-md-4 col-lg-3 col-form-label">Maznil</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="country" type="text" class="form-control" id="Country" v-model="user.address">
                  </div>
                </div>

                <div class="row mb-3">
                  <label for="Address" class="col-md-4 col-lg-3 col-form-label">Telefon raqam</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="address" type="text" class="form-control" id="Address"
                           v-model="user.phone">
                  </div>
                </div>

                <div class="row mb-3">
                  <label for="Phone" class="col-md-4 col-lg-3 col-form-label">Elektron manzil</label>
                  <div class="col-md-8 col-lg-9">
                    <input name="phone" type="text" class="form-control" id="Phone" v-model="user.email">
                  </div>
                </div>

                <div class="text-center">
                  <button class="btn btn-primary" type="submit">Profilni yangilash</button>
                </div>

              </form>

            </div>


            <div class="tab-pane fade pt-3" id="profile-change-password" role="tabpanel">
              <!-- Change Password Form -->
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
              </form><!-- End Change Password Form -->

            </div>

          </div><!-- End Bordered Tabs -->

        </div>
      </div>

    </div>
  </div>
  <div class="row">
    <patient-table :patients="patients"></patient-table>
  </div>

</template>

<style scoped>

</style>