<script setup>
import {onMounted, ref, watch} from "vue";
import {useDishesStore} from "@/store/dishStore";
import {percentageShareoOfTheTotal} from "@/components/PatientComponents/VitminProgress/vitamineCounter";
import LoadingSpinner from "@/components/Bars/LoadingSpinner.vue";

const loading = ref(true)
const vitaminNames = ref({})
const filterType = ref(7)
const trim = ref('')
const dishes = ref([])
const percentageValues = ref([])

watch(filterType, async (nValue, oValue) => {
  percentageValues.value = percentageShareoOfTheTotal(await useDishesStore().SortDishesByDate(filterType.value, dishes.value), filterType.value)
})

onMounted(async () => {
  let uid = localStorage.getItem("selectedPatient") ? localStorage.getItem("selectedPatient") : localStorage.getItem("userUid")
  dishes.value = await useDishesStore().getAllDailyDishes(uid)
  vitaminNames.value = useDishesStore().getVitamineNames
  percentageValues.value = percentageShareoOfTheTotal(await useDishesStore().SortDishesByDate(filterType.value, dishes.value))
  loading.value = false
})


</script>

<template>

  <loading-spinner v-if="loading"></loading-spinner>
  <div v-else class="card px-4">
    <div class="d-flex align-items-center justify-content-between my-4 mt-5 ">
      <div class="d-flex justify-items-center align-items-center">
        <i class="fa fa-cookie-bite fa-3x text-primary"></i>
        <h3 class="m-0 mx-2">Vitaminlar</h3>
      </div>

      <select v-model="filterType" class="form-select form-select-sm w-25" aria-label=".form-select-sm example">
        <option selected="" :value="7">haftalik</option>
        <option :value="10">10 kunlik</option>
        <option :value="31">1 oy</option>
        <option :value="10000">trimestr</option>
      </select>
    </div>

    <!--    <div class="d-flex justify-content-center py-2" v-if="dishes">-->

    <!--      <div id="spinner" class="show bg-white  translate-middle d-flex align-items-center justify-content-center">-->
    <!--        <div class="spinner-border text-primary" style="width: 1rem; height: 1rem;" role="status">-->
    <!--          <span class="sr-only">Loading...</span>-->
    <!--        </div>-->
    <!--      </div>-->

    <!--    </div>-->

    <div class="d-grid gap-2 my-2" v-for="names  in vitaminNames">
      <div class="row align-items-center">
        <div class="col-4 d-flex align-items-center gap-4">
          <div class="rounded-circle text-white  bg-primary align-items-center justify-content-center d-flex"
               style="width: 50px; height: 50px; font-size: larger; font-weight: bolder">
            {{ names.icon }}
          </div>
          <h4 class="text-primary text-end m-0"> {{ names.name_uz.toUpperCase() }}</h4>
        </div>
        <div class="col-7">
          <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated"
                 :class="{ 'bg-danger' : percentageValues[names.tag]<20,
                                         'bg-warning' : percentageValues[names.tag]<50 && percentageValues[names.tag]>21,
                                         'bg-success' :percentageValues[names.tag]>50
                                         }"
                 role="progressbar" aria-valuenow="10" aria-valuemin="0"
                 aria-valuemax="100" :style="{width: percentageValues[names.tag] + '%'}"></div>
          </div>
        </div>
        <div class="col-1">
          {{ (Math.ceil(percentageValues[names.tag] * 10)) / 10 + "%" }}
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>


</style>