import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { api } from '@/shared/api/instance';

const TOKEN_KEY = 'bill_splitter_token';
const toast = useToast();
const token = ref<string | null>(localStorage.getItem(TOKEN_KEY));
const loading = ref(false);

interface AuthResponse {
  accessToken: string;
  user: { id: string; email: string; name: string };
}

export function useAuth() {
  const isAuthenticated = () => !!token.value;

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.removeItem('isGuest');
  }

  function logout() {
    token.value = null;
    localStorage.removeItem(TOKEN_KEY);
  }

  async function register(email: string, name: string, password: string) {
    loading.value = true;
    try {
      const { data } = await api.post<AuthResponse>('/auth/register', {
        email,
        name,
        password,
      });
      setToken(data.accessToken);
      return true;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 409) {
        toast.error('Такой email уже зарегистрирован');
      } else {
        toast.error('Не удалось зарегистрироваться');
      }
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function login(email: string, password: string) {
    loading.value = true;
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      });
      setToken(data.accessToken);
      return true;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        toast.error('Неверный email или пароль');
      } else {
        toast.error('Не удалось войти');
      }
      return false;
    } finally {
      loading.value = false;
    }
  }

  return {
    token,
    loading,
    isAuthenticated,
    setToken,
    logout,
    register,
    login,
  };
}
