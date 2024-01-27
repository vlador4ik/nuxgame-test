<template>
    <div class="todo_wrapper">
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </div>
</template>

<script setup>
import TodoItem from './TodoItem.vue';
import { reactive, onBeforeMount } from "vue";

const todos = reactive([]);


onBeforeMount(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    todos.push(...data);
})
</script>

<style lang="scss" scoped>
.todo_wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}
</style>