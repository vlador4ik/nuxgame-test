<template>
    <div class="wrapper">
        <div class="user_wrapper">
            <UserProfile :user="user" />
        </div>
        <div class="todo_wrapper">
            <TodoList />
        </div>
    </div>
  </template>
  <script setup>
  import UserProfile from '../components/UserProfile.vue';
  import TodoList from '../components/TodoList.vue';
  const user = JSON.parse(localStorage.getItem("user"));
  
  </script>
  
  <style lang="scss" scoped>
    .wrapper {
        display: flex;
        justify-content: space-between;
        gap: 50px;
        max-width: 1440px;
        margin: 40px auto;

        .user_wrapper {
            padding: 15px;
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
            border-radius: 10px;
            width: 20%;
            position: sticky;
            top: 20px;
            height: max-content;
        }
        .todo_wrapper {
            width: 80%;
        }
    }
  </style>