import App from './App.vue'
import router from "@/router/router";
import {createPinia} from "pinia";
import {initializeApp} from "firebase/app";
import {createApp} from 'vue'
import './assets/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import './assets/style.css'


const firebaseConfig = {
    apiKey: "AIzaSyBz5qf9SGKv54J3Ul19CEOaN-tf8TV6-8c",
    authDomain: "projectguzal.firebaseapp.com",
    projectId: "projectguzal",
    storageBucket: "projectguzal.appspot.com",
    messagingSenderId: "391462316589",
    appId: "1:391462316589:web:5a58b0eb464705f15366a4",
    measurementId: "G-6GXQVVR7YC"
};

const fireApp = initializeApp(firebaseConfig);
const piniaStore = createPinia()
const app = createApp(App)


app.use(router)
app.use(piniaStore)
app.mount('#app')


