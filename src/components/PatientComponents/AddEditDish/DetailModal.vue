<script setup>
import {defineProps} from "vue"

const props = defineProps(['showModal', 'good'])


</script>

<template>

  <div class="modal " :class="{'show d-block': showModal}" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>{{ props.good }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="showModal=false">Save changes</button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>