import {defineStore} from "pinia";
import dataJson from "./data.json"
import {Dish, VitamineName} from "@/store/classes";
import {child, ref, getDatabase, push, get} from "firebase/database"


export const useDishesStore = defineStore('dishes', {
    state: () => ({
        dailyDishes: {},
        Dishes: dataJson.Dishes,
        normalValue: dataJson.NormalValue,
        vitaminNames: dataJson.VitaminNames
    }),
    actions: {
        getDishByCategory(category) {
            return this.Dishes.filter((d) => d.category === category)
        },
        getDishById(id) {
            return this.getDishes.filter((d) => d.id === id)[0]
        },
        async saveDishes(dishes) {
            const uid = localStorage.getItem('userUid')
            for (let i = 0; i < dishes.length; i++) {
                await push(child(ref(getDatabase()), `/users/patient/${uid}/dishes/`), dishes[i])
            }
        },
        async getAllDailyDishes(uid) {
            let dishes = [];
            await get(ref(getDatabase(), `/users/patient/${uid}/dishes`)).then((d) => {
                if (d.val()) {
                    dishes = Object.values(d.val())

                }
            })
            return dishes

        },
        async SortDishesByDate(type = 0, allDishes = []) {
            const minDateTime = (new Date(Date.now())).getTime() - 86400000 * type
            return allDishes.filter((d) => (new Date(d.eatingTime)).getTime() > minDateTime).sort((d1, d2) => (new Date(d2.eatingTime)).getTime() - (new Date(d1.eatingTime)).getTime())
        },


    },
    getters: {
        categoryNames(state) {
            return Array.from(new Set(state.getDishes.map((good) => good.category)))
        },
        getDishes(state) {
            return state.Dishes.map(d => new Dish(d))
        },
        getVitamineNames(state) {
            return state.vitaminNames.map((vita) => new VitamineName(vita))
        },
        getVitaminTags(state) {
            return state.getVitamineNames.map((vita) => vita.tag)
        },
        getNormalValues(state) {
            const val = state.normalValue
            return Object.keys(val).map((key) => val[key])
        }

    }
})