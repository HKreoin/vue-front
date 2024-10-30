<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { baseUrl } from '@/config'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const form = ref({
  name: null,
  description: null,
})

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/professions/${route.params.id}`,
    )
    form.value = data
  } catch (error) {
    console.log(error)
  }
})

const submit = async () => {
  console.log(form.value)
  await axios.put(`${baseUrl}/professions/${route.params.id}`, form.value)
  router.push({ name: 'professions' })
}
</script>

<template>
  <h1 class="title">Редактировать профессию</h1>
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
        <button class="primary-btn" :disabled="form.processing">
          Обновить
        </button>
      </div>
    </form>
  </div>
</template>
