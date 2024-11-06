<script lang="ts" setup>
defineProps<{
  sinNumber: string
}>()
</script>

<template>
  <div class="d-flex justify-center mb-6">
    <div class="justify-center sin-card-holder">
      <input
        type="text"
        inputmode="numeric"
        pattern="[0-9\s]"
        placeholder="123456789"
        maxlength="9"
        class="justify-center sin-number-input"
        :value="sinNumber"
        @blur="$emit('updateSinNumber', $event)"
        @keyup.enter="$emit('updateSinNumber', $event)"
        @keypress="$emit('checkForNumberKeys', $event)"
        autofocus
      />
    </div>
  </div>
</template>

<style scoped>
.sin-card-holder {
  background-image: url('/sin-card.png');
  background-size: cover;
  width: 770px;
  height: 480px;
}

input[type='text'] {
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 37px;
  margin-top: 319px;
  margin-left: 130px;
  color: black;
}
</style>
