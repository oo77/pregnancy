import {defineStore} from "pinia";
import {get, ref, getDatabase, set} from "firebase/database";

export const patientMethods = defineStore('patient', {
    state: () => {
        return {}
    }, actions: {
        async getDoctors() {
            let doctors
            await get(ref(getDatabase(), '/users/doctor')).then(d => {
                const docs = d.val()
                doctors = docs ? Object.keys(docs).map((id) => {
                    return {...docs[id], id}
                }) : [];
            })
            return doctors
        },
        async getDoctorById(uid) {
            const doctors = await this.getDoctors()
            const doctor = doctors.filter((d) => d.id === uid)[0]
            if (doctor) {
                return doctor
            } else {
                return 'noDoctor'
            }
        },
        async profileUpdate(user) {
            const uid = localStorage.getItem('userUid')
            await set(ref(getDatabase(), `/users/patient/${uid}`), user)
        }
    }, getters: {}
})