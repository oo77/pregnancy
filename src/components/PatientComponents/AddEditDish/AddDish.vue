<script setup>
import {reactive} from "vue";
import {useDishesStore} from "@/store/dishStore";
import {minValue, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useRouter} from "vue-router";

const router = useRouter()
const db = useDishesStore()
const Dishes = reactive([])
const currentDish = reactive({
  dishId: '',
  dishValue: 0,
  eatingTime: '',
  dishCategory: ''
})


// -----------Validation----------
const rules = {
  dishId: {required},
  eatingTime: {required},
  dishValue: {required, minValue: minValue(0.5)},
}
const v$ = useVuelidate(rules, currentDish)

// -----------Validation----------

async function addDish() {
  const result = await v$.value.$validate()
  if (result) {
    Dishes.push({...currentDish})
  } else {
    console.log('error')
  }
}

function deleteDish(idx) {
  Dishes.splice(idx, 1)
}


async function saveDishes() {
  await useDishesStore().saveDishes(Dishes).then(() => {
  })
}

</script>

<template>
  <div class="container-fluid pt-4">
    <div class="text-start rounded  p-4">

      <div class="d-flex justify-items-center align-items-center my-4">
        <i class="fa fa-utensils fa-3x text-primary"></i>
        <h3 class="m-0 mx-2">Istemol qilingan mahsulotlar</h3>
      </div>


      <div class="d-flex flex-column p-4 shadow-sm border-end border-start border-top border-bottom rounded mb-3">

        <!--istemol vaqti-->
        <div class="d-flex justify-content-evenly mb-3">
          <div class="d-flex align-items-center justify-content-start col-3 ">
            <h4 :class="{'error': v$.eatingTime.$errors.length>0 }"> Istemol vaqti</h4>
          </div>
          <input type="datetime-local"
                 class="border border-2 rounded px-3 w-50 h-auto"
                 v-model="currentDish.eatingTime"
          >
        </div>
        <!--taom turi -->
        <div class="d-flex justify-content-evenly mb-3 disabled">
          <div class="d-flex align-items-center justify-content-start col-3">
            <h4 :class="{'error': v$.dishId.$errors.length>0 }"> Taom turi </h4>
          </div>
          <select class="form-select form-select w-50"
                  v-model="currentDish.dishCategory"
                  aria-label=".form-select-lg example">
            <option
                v-for="name in db.categoryNames"
                :value="name"> {{ name }}
            </option>
          </select>
        </div>
        <!-- taom nomi  -->
        <div class="d-flex justify-content-evenly mb-3">
          <div class="d-flex align-items-center justify-content-start col-3">
            <h4 :class="{'error': v$.dishId.$errors.length>0 }"> Taom nomi</h4>
          </div>
          <select
              v-model="currentDish.dishId"
              class="form-select form-select w-50"
              aria-label=""
          >
            <option v-for="dish in db.getDishByCategory(currentDish.dishCategory)" :value="dish.id">
              {{ dish.name_uz }}
            </option>
          </select>
        </div>
        <!--taom portsiyasi -->
        <div class="d-flex justify-content-evenly mb-3">
          <div class="d-flex  justify-content-start col-3">
            <h4 class="p-0" :class="{'error': v$.dishValue.$errors.length>0 }"> Taom miqdori</h4>
          </div>
          <div class="input-group w-50">
            <span class="input-group-text bg-primary text-white"
                  id="basic-addon">{{ db.getDishById(currentDish.dishId)?.unit }}</span>
            <input type="number" class="form-control" aria-label="Username"
                   aria-describedby="basic-addon1"
                   v-model="currentDish.dishValue"
            >
          </div>
        </div>

        <button class="btn btn-outline-primary m-auto rounded w-25" @click="addDish">
          taom qoshish
        </button>
      </div>
      <div v-if="Dishes == 0" class="border-top border-bottom py-2 my-2">
        <p class="text-center p-0 m-0">Istemol qilingan taomlar yo'q</p>
      </div>
      <table v-else class="table table-striped text-dark">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Taom nomi</th>
          <th scope="col">Istemol vaqti</th>
          <th scope="col">Taom miqdori</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="Dishes.length>0" v-for="(dish,idx) in Dishes">
          <th scope="row">{{ idx + 1 }}</th>
          <td>{{ useDishesStore().getDishById(dish.dishId).name_uz.toUpperCase() }}</td>
          <td>{{ dish.eatingTime }}</td>
          <td>{{ dish.dishValue + " " + useDishesStore().getDishById(dish.dishId).unit }}</td>
          <td>
            <i class="fa fa-trash fa-1x text-danger scale mx-3" @click="deleteDish(idx)"></i>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-end mb-3 gap-2">
        <button class="btn btn-primary col-2" @click="saveDishes"> Saqlash</button>
      </div>

    </div>
  </div>


</template>

<style scoped>
.scale:hover {

  transform: scale(1.05);
  transition-duration: 0.5s;
}

.error {
  animation: heartbeat 20s infinite;
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  2% {
    transform: scale(1.03);
  }
  4% {
    transform: scale(1);

  }
  6% {
    transform: scale(1.03);
  }
  8% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}

</style>