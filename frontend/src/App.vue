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
        <span class="nav__icon"><i class="ti ti-plus"></i></span>
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
  padding: 1.25rem 0;
  position: sticky;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.625rem;
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;

  &__icon {
    font-size: 1.25rem;
    color: var(--color-primary);
  }
}

h1 {
  font-family: 'DM Serif Display', serif;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: -0.03125rem;
}

.tagline {
  font-size: 0.875rem;
  color: var(--color-gray);
  font-weight: 300;
  padding-left: 1.5625rem;
}

.nav {
  display: flex;
  gap: 0.625rem;
  margin-bottom: 1.5625rem;
  flex-wrap: wrap;

  &__link {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 3.125rem;
    border-radius: 1rem;
    background: var(--color-white);
    border: 1.5px solid var(--color-border);
    color: var(--color-charcoal);
    text-decoration: none;
    font-size: 0.875rem;
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
    font-size: 1rem;
  }
}

.main {
  flex: 1;
  width: 100%;
  background: var(--color-white);
  border-radius: 1rem;
  border: 1px solid var(--color-border);
  padding: 1.25rem 1.5625rem;
}
</style>
