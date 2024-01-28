<template>
    <div class="todo" :class="{ 'completed': completed }">
        <div class="wrapper">
            <User :small="true" :users="users" :id="todo.userId" />
            <p class="name"> {{ todo.title }} </p>
            <div class="actions">
                <Checkbox :checked="completed" @checkboxChecked="checkboxChanged" />
                <div class="favorite_container" :class="{'active': todo.favorite}" @click="toggleFavorites(todo)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.25 1.5C3.07485 1.5 0.5 4.0484 0.5 7.1925C0.5 9.73055 1.50625 15.7543 11.4112 21.8435C11.5886 21.9515 11.7923 22.0086 12 22.0086C12.2077 22.0086 12.4114 21.9515 12.5888 21.8435C22.4937 15.7543 23.5 9.73055 23.5 7.1925C23.5 4.0484 20.9251 1.5 17.75 1.5C14.5748 1.5 12 4.95 12 4.95C12 4.95 9.42515 1.5 6.25 1.5Z" stroke="#383838" stroke-width="0.958333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import User from '../User/User.vue';
import Checkbox from '../Checkbox.vue';

const props = defineProps({
    todo: Object,
    isDone: Boolean,
    users: Array
});

const completed = ref(props.todo.completed);

const checkboxChanged = (checkbox) => {
    completed.value = checkbox;
};

// Check if favorites exist in local storage 
// I created a clone of todos in TodoList
// anyway I think update or add properties in props it's not a good idea.
const data = localStorage.getItem('favorites');

if(data) {
    const favorites = JSON.parse(data);

    const isCurrentTodoInFavorite = favorites.find(favorite => favorite == props.todo.id);

    if(isCurrentTodoInFavorite) props.todo.favorite = true;
}

const toggleFavorites = (todo) => {
    const favorites = localStorage.getItem('favorites');
    let favoritesToLocaleStorage = [];

    if(favorites) {
        const favoritesArray = JSON.parse(favorites);
        const isFavoriteExist = favoritesArray.find(favoriteId => favoriteId == todo.id);

        if(isFavoriteExist) {
            todo.favorite = false;
            favoritesToLocaleStorage = favoritesArray.filter(favorite => favorite != todo.id);
        } else {
            favoritesToLocaleStorage = favoritesArray;
            todo.favorite = true;
            favoritesToLocaleStorage.push(todo.id);
        }

    } else {
        favoritesToLocaleStorage.push(todo.id);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favoritesToLocaleStorage));
};

</script>

<style lang="scss" scoped>
@import '/src/assets/variables.scss';

.todo {
    padding: 10px;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    min-height: 100%;

    .name {
        font-size: 16px;
        margin: 0;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .actions {
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }
    }

    &.completed {
        .name {
            text-decoration: line-through;
        }
    }
    .favorite_container {
        &.active {
            svg {
                path {
                    fill: red;
                }
            }
        }
    }
}
</style>