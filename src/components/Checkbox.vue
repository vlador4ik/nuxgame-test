<template>
    <div class="checkbox_wrapper">
        <div class="checkbox" @click="toggleChecked()" :class="{ 'checked': isChecked }">
            <span class="checkmark">&#10003;</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['checked']);
let isChecked = ref(props.checked);

const toggleChecked = () => {
    isChecked.value = !isChecked.value;
}

</script>

<style lang="scss" scoped>
@import '/src/assets/variables.scss';

.checkbox {
    border: 1px solid #ccc;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .checkmark {
        display: none;
        color: #fff;
        font-size: 15px;
    }

    &.checked {
        background: $green;
        border: none;

        span {
            display: block;
        }
    }
}</style>