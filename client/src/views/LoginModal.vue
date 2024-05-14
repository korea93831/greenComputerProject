<template>
  <v-dialog v-model="showModal" max-width="500px">
    <v-card>
      <v-card-title class="headline">로그인</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="email" label="아이디" required></v-text-field>
          <v-text-field v-model="password" label="비밀번호" type="password" required></v-text-field>
          <v-btn type="submit" color="primary">확인</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);
const email = ref('');
const password = ref('');

const login = () => {
};
</script>

<script>
export default {
  name: 'LoginModal'
};
</script>
