import {defineStore} from "pinia";
import {get, ref, getDatabase} from "firebase/database";

export const doctorMethods = defineStore('doctor', {
    state: () => {

    }, actions: {
        async getPatients() {
            const uid = localStorage.getItem('userUid')
            let patients
            await get(ref(getDatabase(), '/users/patient')).then(p => {
                patients = p.val() ? (Object.values(p.val())).filter(p => p.doctorId.id === uid) : []
            })
            return patients
        }


    }, getters: {}
})