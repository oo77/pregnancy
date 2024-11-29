<!--<script setup>-->
<!--import {onMounted, ref,} from "vue";-->
<!--import {userAuth} from "@/store/userAuth";-->
<!--import {getUserPhotosById} from "@/store/methodsStorage"-->
<!--import {currentTrimByUser} from "@/components/PatientComponents/VitminProgress/vitamineCounter"-->

<!--const user = ref({})-->
<!--const photoUrl = ref({})-->
<!--const curTrimestre = ref({})-->
<!--const {uid} = defineProps(["uid"])-->

<!--onMounted(async () => {-->
<!--  photoUrl.value = await getUserPhotosById(localStorage.getItem("userUid"))-->
<!--  user.value = await userAuth().getUserById(uid)-->
<!--  curTrimestre.value = await currentTrimByUser(uid)-->
<!--})-->


<!--</script>-->

<!--<template>-->
<!--  {{ "salom" }}-->
<!--  <div class="row m-2 ">-->
<!--    <div class="col-xl-4">-->
<!--      <div class="card">-->
<!--        <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">-->
<!--          <img :src="photoUrl" alt="avatar" id="doctorImage"-->
<!--               class="rounded-circle img-thumbnail" style="width: 150px; height: 150px">-->
<!--          <h2>{{ user.name + " " + user.surname }}</h2>-->
<!--          <p class="fw-bold text-primary">{{ user.phone || "+998984754" }}</p>-->
<!--          <div class="d-flex social-links mt-2 gap-2">-->
<!--            <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>-->
<!--            <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>-->
<!--            <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>-->
<!--            <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="col-xl-8">-->
<!--      <div class="card">-->
<!--        <div class="card-body pt-3">-->
<!--          &lt;!&ndash; Bordered Tabs &ndash;&gt;-->
<!--          <ul class="nav nav-tabs nav-tabs-bordered" role="tablist">-->

<!--            <li class="nav-item" role="presentation">-->
<!--              <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview"-->
<!--                      aria-selected="true" role="tab">Bemor-->
<!--              </button>-->
<!--            </li>-->

<!--          </ul>-->
<!--          <div class="tab-content pt-2">-->

<!--            <div class="tab-pane fade profile-overview active show" id="profile-overview" role="tabpanel">-->
<!--              <h5 class="card-title">Ma'lumotnoma</h5>-->
<!--              <div class="d-flex gap-1">-->
<!--                <div class="col-6">-->
<!--                  <div class="row">-->
<!--                    <div class="col-6 label ">F.I.Sh</div>-->
<!--                    <div class="col-6 fw-bold">{{ user.surname + "  " + user.name }}</div>-->
<!--                  </div>-->
<!--                  <div class="row">-->
<!--                    <div class="col-6 col-6 label">Manzil</div>-->
<!--                    <div class="col-6 col-6 fw-bold">{{ user.address || "Lueilwitz, Wisoky and Leuschke" }}</div>-->
<!--                  </div>-->
<!--                  <div class="row">-->
<!--                    <div class="col-6  label">Tug'ulgan sanasi</div>-->
<!--                    <div class="col-6 fw-bold">{{ user.birth || "12.12.2000" }}</div>-->
<!--                  </div>-->
<!--                  <div class="row">-->
<!--                    <div class="col-6  label">Telefon raqam</div>-->
<!--                    <div class="col-6 fw-bold">{{ user.phone || "(436) 486-3538 x29071" }}</div>-->
<!--                  </div>-->
<!--                  <div class="row">-->
<!--                    <div class="col-6 label">Elektrom manzil</div>-->
<!--                    <div class="col-6 fw-bold">{{ user.email || "k.anderson@example.com" }}</div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="col-6">-->
<!--                  <div class="row">-->
<!--                    <div class="col-6 label">Homila sanasi</div>-->
<!--                    <div class="col-6 fw-bold">-->
<!--                      <div>{{ user.pregnancyDate || "20.20.2024" }}</div>-->
<!--                      <small>({{ curTrimestre }} chi trimestr)</small>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="row">-->
<!--                    <div class="col-6 label">Tug'ruqlar soni</div>-->
<!--                    <div class="col-6 fw-bold">{{ user.numOfBirth || "0" }}</div>-->
<!--                  </div>-->
<!--                  <div class="row">-->
<!--                    <div class="col-6 label">Homiladorlik soni</div>-->
<!--                    <div class="col-6 fw-bold">{{ user.numOfPregnancies || "0" }}</div>-->
<!--                  </div>-->
<!--                  <div class="row">-->
<!--                    <div class="col-6 label">Qon bosimi</div>-->
<!--                    <div class="col-6 fw-bold">{{ user.bloodPressure || "130/40" }}</div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="mt-2">-->
<!--                <h5 class="card-title">Bemor haqida</h5>-->
<!--                <p class="small fst-italic">{{-->
<!--                    user.additionallyInfo || `Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus.-->
<!--                Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet-->
<!--                perspiciatis odit. Fuga sequi sed ea saepe at unde.`-->
<!--                  }}</p>-->
<!--              </div>-->
<!--            </div>-->

<!--          </div>&lt;!&ndash; End Bordered Tabs &ndash;&gt;-->

<!--        </div>-->
<!--      </div>-->

<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->

<!--</style>-->