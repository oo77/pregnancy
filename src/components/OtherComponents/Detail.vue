<script setup>

const props= defineProps(['toogleBtn', 'info'])


</script>

<template>
  <!-- Modal -->
  <div v-if="props.toogleBtn" class="modal fade show d-block" tabindex="-1" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="$emit('onClose')"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('onClose')">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>