<template>
    <div class="user_profile">
        <User class="user" :users="usersList" :id="user.id" />
        <a class="info_wrapper" :href="'mailto:' + user.email">
            <img src="/public/images/mail.svg" alt="">
            {{ user.email }} </a>
        <a class="info_wrapper" :href="'tel:' + user.phone">
            <img src="/public/images/call.svg" alt="">
            {{ user.phone }}
        </a>
        <a class="info_wrapper" :href="'tel:' + user.phone">
            <img src="/public/images/map.svg" alt="">
            {{ user.address.city }}, {{ user.address.street }}, {{ user.address.suite }}
        </a>
    </div>
</template>
<script setup>
import { onBeforeMount, reactive } from 'vue';
import User from '../User/User.vue';

defineProps({
    user: Object
});

const usersList = reactive([]);

onBeforeMount(async () => {
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await usersResponse.json();
    usersList.push(...users);
})

</script>

<style lang="scss" scoped>
@import "/src/assets/variables.scss";
    .user_profile {

        .user {
            margin-bottom: 15px;
        }
        
        .info_wrapper {
            display: flex;
            align-items: center;
            gap: 10px;
            transition: .3s all ease-in;
            &:not(:last-child) {
                margin-bottom: 15px;
            }

            &:hover {
                color: $green;
                transition: .3s all ease-in;
            }
        }
    }
</style>
