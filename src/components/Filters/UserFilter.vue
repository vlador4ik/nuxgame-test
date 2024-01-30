<template>
    <div class="user">
        <select name="user" v-model="users" id="">
            <option value="all">All Users</option>
            <option v-for="user in userIds" :key="user" :value="user"> {{ user }} </option>
        </select>
   </div>
</template>
<script setup>

const users = defineModel();

const userIds = [1,2,3,4,5,6,7,8,9,10];

</script>

<style lang="scss" scoped>
@import '../../assets/variables.scss';
.user {
    select {
        padding: 5px 0;
        border: 2px solid $green;
        border-radius: 10px;
    }
}
</style>