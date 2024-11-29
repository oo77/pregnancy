<script setup>
import {onMounted, ref, watch} from "vue";
import {useDishesStore} from "@/store/dishStore";
import LoadingSpinner from "@/components/Bars/LoadingSpinner.vue";
import {percentageShareoOfTheTotal} from "./VitminProgress/vitamineCounter"

const dishes = ref([])
const loading = ref(true)
const filterType = ref(7)
const obj = ref({})
const formatterDate = (date) => {
  const d = date.split("T")[0].split("-").reverse().join(".")
  const t = date.split("T")[1]
  return t + "  " + d
}
onMounted(async () => {
  dishes.value = await useDishesStore().getAllDailyDishes(localStorage.getItem("userUid"))
  loading.value = false
})

watch(filterType, async (newType, oldType) => {
  dishes.value = await useDishesStore().SortDishesByDate(newType, await useDishesStore().getAllDailyDishes(localStorage.getItem("userUid")))
})


</script>

<template>
  <div class="container-fluid pt-4 px-4">
    <div class="bg-light text-center rounded p-4">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <div class="d-flex justify-items-center align-items-center">
          <i class="fa fa-clock fa-3x text-primary"></i>
          <h3 class="m-0 mx-2">Istemol tarixi</h3>
        </div>
        <select v-model="filterType" class="form-select form-select-sm w-25" aria-label=".form-select-sm example">
          <option selected="" :value="7">haftalik</option>
          <option :value="10">10 kunlik</option>
          <option :value="31">1 oy</option>
          <option :value="10000">trimestr</option>
        </select>
      </div>

      <loading-spinner v-if="loading"></loading-spinner>
      <!--      table -->
      <div v-else>
        <table class="table vh-10 overflow-y-scroll">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Taom nomi</th>
            <th scope="col">Taom miqdori</th>
            <th scope="col">Istemol vaqti</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="(d, idx) in dishes">
            <th scope="row">{{ idx + 1 }}</th>
            <td>{{ useDishesStore().getDishById(d.dishId).name_uz }}</td>
            <td>{{ d.dishValue + " " + useDishesStore().getDishById(d.dishId).unit }}</td>
            <td>{{ formatterDate(d.eatingTime) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>