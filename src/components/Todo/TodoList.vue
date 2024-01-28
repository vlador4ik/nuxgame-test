<template>
    <div class="search">
        <Search @searchChanged="searchChanged" />
    </div>
    <div class="filter">
        <Filter @filterChanged="filterChanged" />
    </div>
    <ul class="todos_wrapper">
        <li v-for="todo in filteredTodos" :key="todo.id">
            <TodoItem :users="usersList" :todo="todo" :is-done="todo.completed" />
        </li>
    </ul>
    <p class="not_found" v-if="filteredTodos.length == 0"> Sorry, but nothing found for current filter.</p>
</template>

<script setup>
import TodoItem from './TodoItem.vue';
import Filter from '../Filter.vue';
import Search from '../Search.vue';
import { reactive, ref, computed, onBeforeMount } from "vue";

const todos = reactive([]);
const usersList = reactive([]);
const filter = ref([]);
const search = ref();

onBeforeMount(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    todos.push(...data);

    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await usersResponse.json();
    usersList.push(...users);
});

const filteredTodos = computed(() => {

    return todos.filter((todo) => {
        return todo.title.toLowerCase().includes(search.value.toLowerCase());
    });

});

const filterChanged = (newFilter) => {
    filter.value.push(newFilter);
};

const searchChanged = (newValue) => {
    search.value = newValue;
}

</script>

<style lang="scss" scoped>
.todos_wrapper {
    padding: 0;
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;

    li {
        width: 32%;
        list-style: none;
    }
}
</style>