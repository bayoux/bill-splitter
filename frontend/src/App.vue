<template>
  <div class="app">
    <header class="header">
      <div class="header__inner">
        <div class="logo">
          <span class="logo__icon">✦</span>
          <h1>Bill Splitter</h1>
        </div>
        <p class="tagline">Разделите счет честно и без споров</p>
      </div>
    </header>

    <nav class="nav">
      <RouterLink to="/create" class="nav__link">
        <span class="nav__icon">＋</span>
        Добавить блюдо
      </RouterLink>
      <RouterLink to="/guest" class="nav__link">
        <span class="nav__icon">◉</span>
        Что я ел
      </RouterLink>
    </nav>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.header {
  padding: 20px 0;
  position: sticky;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;

  &__icon {
    font-size: 20px;
    color: var(--color-primary);
  }
}

h1 {
  font-family: 'DM Serif Display', serif;
  font-size: 32px;
  font-weight: 400;
  letter-spacing: -0.5px;
}

.tagline {
  font-size: 14px;
  color: #7a7a7a;
  font-weight: 300;
  padding-left: 25px;
}

.nav {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;

  &__link {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 50px;
    border-radius: 16px;
    background: var(--color-white);
    border: 1.5px solid var(--color-border);
    color: var(--color-charcoal);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
      background: var(--color-primary-light);
    }

    &.router-link-active {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-white);
    }
  }

  &__icon {
    font-size: 16px;
  }
}

.main {
  flex: 1;
  width: 100%;
  background: var(--color-white);
  border-radius: 16px;
  border: 1px solid var(--color-border);
  padding: 20px 25px;
}
</style>
