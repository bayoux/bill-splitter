import { ref } from 'vue';

// Module-level singleton: all components share the same theme state,
// and it survives component unmount/remount cycles.
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
