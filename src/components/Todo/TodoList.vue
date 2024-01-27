<template>
    <div class="todos_wrapper">
        <TodoItem :users="usersList" v-for="todo in todos" :key="todo.id" :todo="todo" :is-done="todo.completed" />
    </div>
</template>

<script setup>
import TodoItem from './TodoItem.vue';
import { reactive, onBeforeMount } from "vue";

const todos = reactive([]);
const usersList = reactive([]);


onBeforeMount(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    todos.push(...data);

    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await usersResponse.json();
    usersList.push(...users);
})
</script>

<style lang="scss" scoped>
.todos_wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}
</style>