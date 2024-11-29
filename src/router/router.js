import PatientDashboard from "@/components/PatientComponents/PatientDashboard.vue";
import History from "@/components/PatientComponents/History.vue";
import AddDish from "@/components/PatientComponents/AddEditDish/AddDish.vue";
import EditDish from "@/components/PatientComponents/AddEditDish/EditDish.vue";
import ProfileEdit from "@/components/PatientComponents/ProfileEdit.vue";
import DoctorDasboard from "@/components/DoctoroComponents/DoctorDasboard.vue";
import Patients from "@/components/DoctoroComponents/SelectedPatient.vue";
import SelectedPatient from "@/components/DoctoroComponents/SelectedPatient.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import page404 from '@/components/OtherComponents/404Page.vue'
import {getAuth} from "firebase/auth";
import {createRouter, createWebHistory} from 'vue-router'


const routes = [
    {
        path: '/doctor-dashboard',
        component: DoctorDasboard,
        meta: {
            auth: true,
            role: 'doctor',
        },
        props: true,
    }, {
        path: '/patient-dashboard',
        component: PatientDashboard,
        meta: {
            auth: true,
            role: 'patient',
        },
        props: true
    }, {
        path: '/history',
        component: History,
        meta: {
            auth: true,
            role: 'patient',
        },
        props: true
    }, {
        path: '/addDish',
        component: AddDish,
        meta: {
            auth: true,
            role: 'patient',
        },
        props: true
    }, {
        path: '/login',
        component: Login,
        props: true,
        meta: {
            auth: false
        },
    }, {
        path: '/register',
        component: Register,
        props: true,
        meta: {
            auth: false
        },
    }, {
        path: '/editDish',
        component: EditDish,
        props: true,
        meta: {
            auth: true,
            role: 'patient',
        },
    }, {
        path: '/profileEdit',
        component: ProfileEdit,
        props: true,
        meta: {
            auth: true,
            role: 'patient',
        }
    },
    {
        path: '/:pathMatch(.*)*',
        component: page404,
        meta: {
            auth: false
        }
    }, {
        path: '/doctor-patients',
        component: Patients,
        meta: {
            auth: true,
            role: 'doctor',
        }
    },{
        path: '/selected-patient',
        component: SelectedPatient,
        meta: {
            auth: true,
            role: 'doctor',
        }
    }



]

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach(async (to, from, next) => {
    const uid = localStorage.getItem('userUid')
    if (to.path == '/') {
        next('/login')
    }
    if (uid !== '') {
        next()
    } else {
        const user = getAuth().currentUser
        if (!user && to.matched.some((route) => route.meta.auth)) {
            next('/login')
        } else {
            next()
        }
    }
})
export default router