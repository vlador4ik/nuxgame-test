<template>
    <div class="login_wrapper">
        <div class="form">
            <div class="form__header">
                <h1>Login</h1>
            </div>
            <div class="form__body">
                <p class="form__subtitle">description</p>
                <form @submit.prevent="onSubmit()">
                    <div class="form__body-wrapper">
                        <input type="text" v-model="username" required placeholder="Username" class="form__input">
                    </div>
                    <div class="form__body-wrapper">
                        <input type="text" v-model="phone" placeholder="Phone Number" required class="form__input">
                    </div>
                    <p ng-if="errorMessage" class="error_message"> {{ errorMessage }}</p>
                    <div class="form__body-wrapper">
                        <button type="submit" class="form__button">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter()

const username = ref();
const phone = ref();
const errorMessage = ref();
const users = ref([]);

onBeforeMount(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    users.value.push(...data);
})

const onSubmit = async () => {
    const regexForUsername = /^[A-Za-z]+$/;
    const regexForPhone = /[0-9 ()\-\+]+$/;

    if(!regexForUsername.test(username.value)) {
        errorMessage.value = "Username is not valid. It accepts only letters.";
        return;
    }

    if(!regexForPhone.test(phone.value)) {
        errorMessage.value = "Phone is not valid. It accepts only numbers and special symbols.";
        return;
    }
    

    const isUser = users.value.find(user => user.username === username.value && user.phone === phone.value);
    if (isUser) {
        localStorage.setItem('user', JSON.stringify(isUser));
        router.push('/profile');
    } else {
        errorMessage.value = "Login error. Username or phone is incorrect!"
    }
}
</script>

<style lang="scss" scoped>
@import "/src/assets/variables.scss";
.login_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #545454;
}

.form {
    border-radius: 5px;
    background: #C3C3C3;
    max-width: 447px;
    width: 100%;

    &__header {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 15px 0;
        background: #a5a5a5;

        h1 {
            color: $grey;
            font-size: 17px;
            font-weight: 400;
            text-align: center;
            margin: 0;
        }
    }

    &__body {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 0 25px;
        padding-bottom: 30px;
        background: #C3C3C3;

        &-wrapper {
            &:not(:last-child) {
                margin-bottom: 20px;
            }
        }
        .error_message {
            color: red;
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 15px;
            font-weight: 500;
        }
    }

    &__subtitle {
        font-size: 15px;
        font-weight: 400;
        line-height: 1.4;
        margin: 15px 0;
        color: $grey;
    }

    &__input {
        width: 100%;
        padding: 10px;
        color: $black;
        font-size: 17px;
        font-weight: 400;
        letter-spacing: -0.425px;
        border-radius: 5px;
        border: none;
        outline: none;
        box-sizing: border-box;

        &::placeholder {
            color: $black;
        }
    }

    &__button {
        width: 100%;
        margin-top: 5px;
        padding: 10px 30px;
        border-radius: 5px;
        background: #519945;
        font-size: 17px;
        font-weight: 600;
        color: #fff;
        outline: none;
        border-color: transparent;
        cursor: pointer;
        transition: .3s all ease-in;

        &:hover {
            transition: .3s all ease-in;
            opacity: .8;
        }
    }
}

@media all and (max-width: 575px) {
    .form {
        margin: 0 15px;
    }
}</style>