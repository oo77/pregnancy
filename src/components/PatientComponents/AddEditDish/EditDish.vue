<script setup>
import {ref} from "vue"
import {useDishesStore} from "@/store/dishStore"
import DetailModal from "@/components/PatientComponents/AddEditDish/DetailModal.vue";

const db = useDishesStore()
const curCategory = ref('')
const curGood = ref('')
const showModal = ref(false)

function showDetail(good) {
  curGood.value = good
  showModal.value = true;
}

</script>

<template>
  {{ db.getGoods[0].name_uz }}
  <div class="container-fluid pt-4 px-4">
    <div class="bg-light text-center rounded p-4">
      <h3>Edit datebase</h3>

      <div class="col-3 m-auto mt-4 form-floating mb-3">
        <select v-model="curCategory" class="form-select" id="floatingSelect"
                aria-label="Floating label select example">
          <option v-for="names in db.categoryNames" :value="names">{{ names }}</option>
        </select>
        <label for="floatingSelect">Mahsulot turi</label>
      </div>

      <div class="container-fluid overflow-auto ">
        <table class="tableMain table text-start">
          <thead>
          <tr>
            <th>T/R</th>
            <th>Nomi</th>
            <th>ID</th>
            <th>Kaloriya</th>
          </tr>
          </thead>
          <tbody>
          <tr @click="showDetail(good)" class="tableRow" v-for="(good, id) in db.getGoodsByCategory(curCategory)">
            <th>
              {{ id + 1 }}
            </th>
            <td>
              {{ good.name_uz }}
            </td>
            <td>
              {{ good.id }}
            </td>
            <td>
              {{ good.calory }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <button @click="showModal=!showModal">press</button>
  <detail-modal :show-modal="showModal" :good="curGood"></detail-modal>


</template>

<style scoped>

</style>