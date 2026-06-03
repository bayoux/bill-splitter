import { ref } from 'vue';

const isDark = ref(localStorage.getItem('theme') === 'dark');

document.documentElement.setAttribute(
  'data-theme',
  isDark.value ? 'dark' : 'light',
);

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value;
    document.documentElement.setAttribute(
      'data-theme',
      isDark.value ? 'dark' : 'light',
    );
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  }

  return {
    isDark,
    toggleTheme,
  };
}
