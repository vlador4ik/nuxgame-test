<template>
    <div class="search">
        <label for="search_input"></label>
        <input type="text" placeholder="Search..." name="search_input" v-model="searchValue">
    </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue';

const searchValue = ref('');
const emit = defineEmits(['searchChanged']);

watchEffect(() => {
    emit('searchChanged', searchValue.value);
})
</script>