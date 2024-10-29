<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { baseUrl } from '@/config'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

const route = useRoute()

const departments = ref([])

const form = ref({
  name: null,
  description: null,
  parent_department_id: null,
})

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/departments/${route.params.id}`,
    )
    form.value = data
    form.value.parent_department_id = data.parent_department?.id
    console.log(data)
  } catch (error) {
    console.log(error)
  }
})

onMounted(async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/departments`)
    departments.value = data
  } catch (error) {
    console.log(error)
  }
})

const submit = () => {
  console.log(form.value)
  axios.put(`${baseUrl}/departments/${route.params.id}`, form.value)
  router.push({ name: 'departments' })
}
</script>

<template>
  <h1 class="title">Добавить отдел</h1>
  <div class="w-2/4 mx-auto">
    <form @submit.prevent="submit">
      <div class="mb-6">
        <label>Наименование</label>
        <input type="text" v-model="form.name" />
      </div>

      <div class="mb-6">
        <label>Примечание</label>
        <input type="text" v-model="form.description" />
      </div>

      <div class="mb-6">
        <label>Родительский отдел</label>
        <select class="p-2.5" v-model="form.parent_department_id">
          <option
            v-for="department in departments"
            :key="department.id"
            :value="department.id"
          >
            {{ department.name }}
          </option>
        </select>
      </div>
      <div>
        <button class="primary-btn" :disabled="form.processing">
          Обновить
        </button>
      </div>
    </form>
  </div>
</template>
