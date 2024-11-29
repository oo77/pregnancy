<script setup>

import {onMounted, reactive} from "vue";

const emit = defineEmits(['send'])

const message = reactive({
  text: "",
  date: Date.now()
})

const scrollToBottom = () => {
  const scrollElement = document.getElementById('scroll');
  if (scrollElement) {
    scrollElement.scrollTop = scrollElement.scrollHeight;
  }
};

onMounted(() => {
  scrollToBottom()
})


function send() {
  emit('send', message)
  scrollToBottom()
  message.text = ""
}

const {messages, status} = defineProps(["messages", "status"])

</script>

<template>
  <div class="container w-100 mb-1" style="height: fit-content">
    <div class="border rounded-5 py-2" style="overflow-y: scroll; height: 20vh" id="scroll">
      <div class="h-100 d-flex justify-content-center align-items-end text-primary"
           v-if="messages && messages.length === 0">
        <div> Shifokor bilan yozishmalar mavjud emas!</div>
      </div>
      <div v-else v-for="message in messages" :key="message.id">
        <!--        me   -->
        <div v-if="status !== message.author" class="d-flex gap-1 mb-4 justify-content-center">
          <img class=" rounded-circle col-1"
               style="width: 100px; height: 100px"
               src="https://avatars.mds.yandex.net/i?id=63f132c1fc698bf43b742801957ca357ff42e3e6-12144624-images-thumbs&n=13">
          <div class="col-9 mb-1 border p-2 bg-gray text-dark">
            <h6>Wed</h6>
            <div class="">{{ message.text }}
            </div>
          </div>
        </div>

        <!--      you     -->
        <div v-else class="d-flex gap-1 mb-4 justify-content-center">
          <div class="col-9 mb-1 border p-2 bg-gray text-dark text-end">
            <h6>Me</h6>
            <div class="">{{ message.text }}
            </div>
          </div>
          <img class=" rounded-circle col-1"
               style="width: 100px; height: 100px"
               src="https://avatars.mds.yandex.net/i?id=63f132c1fc698bf43b742801957ca357ff42e3e6-12144624-images-thumbs&n=13">
        </div>

      </div>
    </div>


    <div class=" mb-3 h-10
     d-flex">
      <div class="form-floating col-11 py-2">
        <textarea class="form-control h-100" v-model="message.text" placeholder="Leave a comment here"
                  id="floatingTextarea"></textarea>
        <label for="floatingTextarea">xabaringizni kiriting ...</label>
      </div>

      <div class="col-1 d-flex justify-content-center align-items-center">
        <div class="btn btn-lg btn-primary btn-lg-square" @click="send">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-send"
               viewBox="0 0 16 16">
            <path
                d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

#scroll::-webkit-scrollbar {
  width: 12px; /* ширина scrollbar */
}

#scroll::-webkit-scrollbar-track {
  background: #ffffff; /* цвет дорожки */
}

#scroll::-webkit-scrollbar-thumb {
  background-color: #009CFF; /* цвет плашки */
  border-radius: 20px; /* закругления плашки */
  border: 3px solid #ffffff; /* padding вокруг плашки */
}
</style>
