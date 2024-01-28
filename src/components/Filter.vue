<template>
    <div class="filter">
       <div class="status">
            <select name="status" v-model="filter.status" id="">
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="uncompleted">Uncompleted</option>
                <option value="favorites">Favorites</option>
            </select>
       </div>
       <div class="user">
            <select name="user" v-model="filter.users" id="">
                <option value="all">All Users</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
       </div>
       
    </div>
</template>
<script setup>

import { ref, watchEffect, watch, reactive } from 'vue';

const emit = defineEmits(['filterChanged']);

const status = ref('all');

const users = ref('all');

const filter = ref({
    status,
    users
})

// console.log(status.value, users.value)

// const filters = ref([]);

watchEffect(() => {
    emit('filterChanged', filter.value);
});

</script>