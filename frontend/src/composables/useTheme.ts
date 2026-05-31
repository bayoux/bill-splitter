import { ref } from 'vue';

export function useTheme() {
  const isDark = ref(false);

  function toggleTheme() {
    isDark.value = !isDark.value;
    document.documentElement.setAttribute(
      'data-theme',
      isDark.value ? 'dark' : 'light',
    );
  }

  return{
      isDark,
      toggleTheme,
  }
}
