import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Helmet } from 'react-helmet-async';
import * as z from 'zod';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const signInSchema = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof signInSchema>;

export function SignIn() {
  //Só para ficar registrado, o handleSubmit é uma função que recebe uma função de callback que será executada quando o formulário for submetido. E isso é uma high order function, ou seja, uma função que retorna outra função.
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>();

  async function handleSignIn(data: SignInForm) {
    try {
      console.log(data);
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('Enviamos um link de autenticação para o seu e-mail!', {
        action: {
          label: 'Reenviar',
          onClick: () => {
            handleSignIn(data);
          },
        },
      });
    } catch (error) {
      toast.error('Credenciais inválidas');
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        {/* Esta prop "asChild" faz com que todos os estilos do botão
          sejam aplicados ao elemento filho, no caso, o Link. Isso é coisa
          do Radix. Assim o Link não precisa de estilização adicional.
        */}
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input type="email" id="email" {...register('email')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
