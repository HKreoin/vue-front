<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { baseUrl } from '@/config'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  name: null,
  description: null,
})

const submit = async () => {
  console.log(form.value)
  await axios.post(`${baseUrl}/professions`, form.value)
  router.push({ name: 'professions' })
}
</script>

<template>
  <h1 class="title">Добавить профессию</h1>
  <div class="w-2/4 mx-auto">
    <form @submit.prevent="submit">
      <div class="mb-6">
        <label>Наименование</label>
        <input type="text" v-model="form.name" />
      </div>

      <div class="mb-6">
        <label>Примечание</label>
        <textarea
          class="resize-none"
          type="text"
          rows="5"
          v-model="form.description"
        ></textarea>
      </div>

      <div>
        <button class="primary-btn" :disabled="form.processing">Создать</button>
      </div>
    </form>
  </div>
</template>
