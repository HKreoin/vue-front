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
    const data2 = await axios.get(`${baseUrl}/departments`)
    console.log(data)
    console.log(data2.data)
    departments.value = data2.data.filter(item => item.id !== data.id)
    console.log(departments.value)
  } catch (error) {
    console.log(error)
  }
})

const submit = async () => {
  console.log(form.value)
  await axios.put(`${baseUrl}/departments/${route.params.id}`, form.value)
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
