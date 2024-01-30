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

const status = defineModel();

</script>

<style lang="scss" scoped>
@import '../../assets/variables.scss';
    .status {
        select {
            padding: 5px 0;
            border: 2px solid $green;
            border-radius: 10px;
        }
    }
</style>