<template>
    <div class="search">
        <label for="search_input"></label>
        <input type="text" placeholder="Search..." name="search_input" v-model="searchValue">
    </div>
</template>
<script setup>

const searchValue = defineModel();

</script>

<style lang="scss" scoped>
@import '../../assets/variables.scss';
    .search {
        input {
            padding: 6px 10px;
            border-radius: 10px;
            border: 2px solid $green;
        }
    }
</style>