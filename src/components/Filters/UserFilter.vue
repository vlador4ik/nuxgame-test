<template>
    <div class="user">
        <select name="user" v-model="users" id="">
            <option value="all">All Users</option>
            <option v-for="user in userIds" :key="user" :value="user"> {{ user }} </option>
        </select>
   </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue';

const users = ref('all');
const emit = defineEmits(['userChanged']);

const userIds = [1,2,3,4,5,6,7,8,9,10];

watchEffect(() => {
    emit('userChanged', users.value);
});

</script>