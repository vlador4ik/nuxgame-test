<template>
    <div class="add_todo">
        <p class="create_title">Create Todo</p>
        <div class="create_wrapper">
            <div class="input_wrapper">
                <label for="user_id">User ID</label>
                <input type="number" id="user_id" v-model="userId" max="10" placeholder="User ID" class="user">
            </div>
            <div class="input_wrapper">
                <label for="title">Title</label>
                <input type="text" v-model="title" id="title" placeholder="Title">
            </div>
            <button class="add" @click="createTodo">Add</button>
        </div>
    </div>
    <div class="filters">
        <Search @filter-reset="onFilterReset" @search-changed="onSearchChanged" />
        <user-filter @user-changed="onUserChanged" />
        <status-filter @status-changed="onStatusChanged" />

        <div @click="onFilterReset" class="clear_filter">
            <span>Clear Filter</span>
        </div>
    </div>

    <ul class="todos_wrapper">
        <li v-for="todo in filteredTodos" :key="todo.id">
            <TodoItem :users="usersList" :todo="todo" :is-done="todo.completed" />
        </li>
    </ul>
    <p class="not_found" v-if="filteredTodos.length == 0"> Sorry, but nothing found for current filter.</p>
</template>

<script setup>
import { reactive, ref, computed, onBeforeMount } from "vue";

import TodoItem from './TodoItem.vue';
import UserFilter from '../Filters/UserFilter.vue';
import StatusFilter from "../Filters/StatusFilter.vue";
import Search from '../Filters/Search.vue';

const todos = reactive([]);
const usersList = reactive([]);
const userFilter = ref('all');
const statusFilter = ref('all');
const search = ref();
const userId = ref('');
const title = ref('');

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

        let searchResult = true, statusResult = true, userIdResult = true;

        if (statusFilter.value) {
            switch (statusFilter.value) {
                case 'all':
                    statusResult = todo;
                    break;

                case 'completed':
                    statusResult = todo.completed;
                    break;

                case 'uncompleted':
                    statusResult = !todo.completed;
                    break;

                case 'favorites':
                    statusResult = todo.favorite;
                    break;
                default:
                    statusResult = false;
                    break;
            }
        }

        if (userFilter.value && userFilter.value != 'all') {
            userIdResult = todo.userId == userFilter.value;
        } else {
            userIdResult = todo;
        }

        if (search.value) {
            searchResult = todo.title.toLowerCase().includes(search.value.toLowerCase());
        }

        return searchResult && statusResult && userIdResult;
    });

});

const onUserChanged = (newSelectedUser) => {
    userFilter.value = newSelectedUser;
};

const onSearchChanged = (newValue) => {
    search.value = newValue;
};

const onStatusChanged = (newStatus) => {
    statusFilter.value = newStatus;
}
const emit = defineEmits(['filterReset']);
const onFilterReset = () => {
    search.value = '';
    userFilter.value = 'all';
    statusFilter.value = 'all';
    emit('filterReset');
}

const createTodo = async () => {
    if (!userId.value || !title.value) return;
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        data: JSON.stringify({ user_id: userId.value, title: title.value })
    })

    const data = await response.json();
    if (data) {
        todos.push({
            userId: userId.value,
            title: title.value,
            id: data.id,
            completed: false
        });

        userId.value = '';
        title.value = '';
    }
}

</script>

<style lang="scss" scoped>
@import '/src/assets/variables.scss';

.add_todo {
    padding: 10px;
    box-shadow: $shadow;
    border-radius: 10px;

    .create_title {
        font-size: 35px;
        text-align: center;
        font-weight: 500;
        margin: 0;
    }

    .create_wrapper {
        margin-top: 10px;

        .input_wrapper {

            &:not(:last-child) {
                margin-bottom: 10px;
            }

            label {
                font-size: 17px;
                margin-right: 10px;
            }

            input {
                font-size: 16px;
                padding: 5px 10px;
                border: 1px solid $green;
                border-radius: 10px;
            }
        }

        .add {
            background: $green;
            outline: none;
            cursor: pointer;
            border: 1px solid transparent;
            padding: 5px 35px;
            border-radius: 10px;
            color: #fff;
            font-size: 18px;
            transition: .3s all ease-in;

            &:hover {
                transition: .3s all ease-in;
                background: transparent;
                color: $black;
                border-color: $green;
            }
        }
    }
}

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