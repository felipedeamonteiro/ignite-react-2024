import { Header } from '@/components/header';
import { api } from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      response => response,
      error => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          // O "code" é um código de erro é uma propriedade que foi criado no backend
          const code = error.response?.data.code;

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/sign-in');
          }
        }
      }
    );

    return () => {
      //Isto serve para remover o interceptor quando o componente for desmontado
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen antialiased">
      <Header />

      <div className="flex flex-col flex-1 gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
