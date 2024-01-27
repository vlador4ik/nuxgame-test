<template>
    <div class="user_wrapper">
        <div class="user_image" :class="{'small' : props.smallAvatar}">
            <img src="/public/images/user.svg" alt="">
        </div>
        <span class="name"> {{ user?.name }} </span>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    id: Number,
    smallAvatar: Boolean,
    users: Array
});

const user = computed(() => props.users.find(user => user.id == props.id))
</script>

<style lang="scss" scoped>
@import "/src/assets/variables.scss";
.user_wrapper {
    display: flex;
    align-items: center;
    gap: 10px;

    .user_image {
        width: 60px;
        height: 60px;
        background: rgb(90, 90, 246);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            max-width: 45px;
            width: 100%;
        }

        &.small {
            width: 30px;
            height: 30px;
            img {
                max-width: 20px;
            }
        }
    }

    .name {
        color: $black;
        font-size: 20px;
        font-weight: 400;
    }
}
</style>