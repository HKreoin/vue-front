<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { baseUrl } from '@/config'

const departments = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/departments`)
    departments.value = data
  } catch (error) {
    console.log(error)
  }
})

const deleteItem = async id => {
  await axios.delete(`${baseUrl}/departments/${id}`)
}
</script>

<template>
  <h1 class="title">Список отделов</h1>
  <div>
    <table class="table-auto">
      <thead>
        <tr>
          <th>id</th>
          <th>Наименование</th>
          <th>Родительский отдел</th>
          <th>Примечание</th>
          <th>Редактировать</th>
          <th>Удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in departments" :key="item.id">
          <td>{{ item.id }}</td>
          <td>
            <router-link :to="`/departments/${item.id}`">
              {{ item.name }}
            </router-link>
          </td>
          <td>
            {{
              departments.filter(d => d.id === item.parent_department_id)[0]
                ?.name
            }}
          </td>
          <td>{{ item.description }}</td>
          <td>
            <router-link class="round-btn" :to="`/departments/${item.id}/edit`">
              Редактировать
            </router-link>
          </td>
          <td>
            <button class="round-btn" @click="deleteItem(item.id)">
              Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex justify-end">
    <router-link class="round-btn" to="/departments/create"
      >Добавить отдел</router-link
    >
  </div>
</template>
