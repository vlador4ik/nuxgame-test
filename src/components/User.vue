<template>
    <div class="user_wrapper">
        <div class="user_image">
            <img src="/public/images/user.svg" alt="">
        </div>
        <!-- <span class="name"> {{ user.name }} </span> -->
    </div>
</template>

<script setup>

defineProps({
    user: Object
});

</script>

<style lang="scss" scoped>
@import "/src/assets/variables.scss";
.user_wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;

    .user_image {
        width: 70px;
        height: 70px;
        background: $green;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            max-width: 50px;
            width: 100%;
        }
    }

    .name {
        color: $black;
        font-size: 20px;
        font-weight: 400;
    }
}
</style>