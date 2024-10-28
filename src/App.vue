<template>
  <div>
    <header>
      <nav>
        <div class="space-x-6">
          <router-link to="/" class="nav-link"> На главную </router-link>
        </div>
        <div class="space-x-6">
          <router-link to="/professions" class="nav-link">
            Профессии
          </router-link>

          <router-link to="/departments" class="nav-link"> Отделы </router-link>

          <router-link to="/employees" class="nav-link">
            Сотрудники
          </router-link>
        </div>
      </nav>
    </header>

    <main class="p-4">
      <router-view></router-view>
    </main>
  </div>
</template>
