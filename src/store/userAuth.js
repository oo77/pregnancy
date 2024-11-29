import {defineStore} from "pinia";
import {get, ref, getDatabase, set, push, child} from "firebase/database";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {getCurrentUser} from "vuefire";
import {patientMethods} from "@/store/patientMethods";

export const userAuth = defineStore('user', {
    state: () => {
        return {
            user: {}
        }
    }, actions: {
        async register(u) {
            let response
            let error = "";
            try {
                response = await createUserWithEmailAndPassword(getAuth(), u.email, u.password)
                await this.setUser(response.user.uid, u)

            } catch (e) {
                error = e.toString()
            }
            return error

        }, async login(user) {
            let response
            let error = "";
            try {
                response = await signInWithEmailAndPassword(getAuth(), user.email, user.password)
                let u = await this.getUserById(response.user.uid)
                saveOnLocal(response.user.uid, u.role)
            } catch (e) {
                error = e.toString()
            }
            return error
        }, async setUser(uid, u) {
            await set(ref(getDatabase(), `/users/${u.role}/${uid}`), {
                ...u, uid
            })
            saveOnLocal(uid, u.role)
        }, async getUserById(uid) {
            let users
            await get(ref(getDatabase(), `/users`)).then((u) => {
                users = {...u.val().patient, ...u.val().doctor}
            })
            return users[uid]
        }, async getCurUser() {
            this.user = await this.getUserById(localStorage.getItem('userUid'))
            return await this.getUserById(localStorage.getItem('userUid'))
        },


        // methods for getting and setting messages
        async getPatientMessages(patientUid, doctorUid) {

            let doctor = await patientMethods().getDoctorById(doctorUid)

            if (doctor) {
                let messages
                await get(ref(getDatabase(), `/users/patient/${patientUid}/messages/${doctorUid}`)).then((m) => {
                    messages = m.val() ? Object.values(m.val()) : []
                })
                return messages
            } else {
                return []
            }
        },

        async savePatientMessages(patientUid, doctorUid, message) {
            await push(child(ref(getDatabase()), `/users/patient/${patientUid}/messages/${doctorUid}`), {...message})
            console.log('succes')
        },

    }
})

function saveOnLocal(uid, role) {
    localStorage.setItem('userUid', uid)
    localStorage.setItem('userRole', role)
}
