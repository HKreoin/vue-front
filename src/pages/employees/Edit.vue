<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { baseUrl } from '@/config'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

const route = useRoute()

const departments = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/departments`)
    departments.value = data
  } catch (error) {
    console.log(error)
  }
})

const professions = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/professions`)
    professions.value = data
  } catch (error) {
    console.log(error)
  }
})

const form = ref({
  full_name: null,
  description: null,
  profession_id: null,
  department_id: null,
})

onMounted(async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/employees/${route.params.id}`)
    form.value = data
    form.value.department_id = data.department?.id
    form.value.profession_id = data.profession?.id
  } catch (error) {
    console.log(error)
  }
})

const submit = async () => {
  console.log(form.value)
  await axios.put(`${baseUrl}/employees/${route.params.id}`, form.value)
  router.push({ name: 'employees' })
}
</script>

<template>
  <h1 class="title">Обновить данные сотрудника</h1>
  <div class="w-2/4 mx-auto">
    <form @submit.prevent="submit">
      <div class="mb-6">
        <label>ФИО</label>
        <input type="text" v-model="form.full_name" />
      </div>

      <div class="mb-6">
        <label>Профессия</label>
        <select class="p-2.5" v-model="form.profession_id">
          <option
            v-for="profession in professions"
            :key="profession.id"
            :value="profession.id"
          >
            {{ profession.name }}
          </option>
        </select>
      </div>

      <div class="mb-6">
        <label>Отдел</label>
        <select class="p-2.5" v-model="form.department_id">
          <option
            v-for="department in departments"
            :key="department.id"
            :value="department.id"
          >
            {{ department.name }}
          </option>
        </select>
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
