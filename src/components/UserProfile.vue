<template>
    <div class="user_profile">
        <User :id="user.user_id" />
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

import User from './User.vue';

defineProps({
    user: Object
});

</script>

<style lang="scss" scoped>
@import "/src/assets/variables.scss";
    .user_profile {
        
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
