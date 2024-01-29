<template>
    <div class="status">
        <select name="status" v-model="status" id="">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
            <option value="favorites">Favorites</option>
        </select>
   </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue';

const status = ref('all');
const emit = defineEmits(['statusChanged']);

watchEffect(() => {
    emit('statusChanged', status.value);
});

const clearFilter = () => {
    status.value = 'all';
}
</script>