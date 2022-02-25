<template>
  <div class="alert">
    <p>{{ message }}</p>
  </div>
</template>

<script>

export default {
  props: ['message'],
};
</script>

<style scoped>
.alert {
    background: #d4edda;
}
.alert p {
    color: red;
}
</style>