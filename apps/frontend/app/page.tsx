import { UserCard, type User } from "@/components/UserCard";

export default async function Home() {
    const response = await fetch(`${process.env.API_URL ?? ""}/users`);
    const users = await response.json();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="w-full max-w-4xl px-4 py-16 sm:px-6">
        <header className="mb-10 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Usuários
          </h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            Listagem de pessoas cadastradass
          </p>
        </header>

        {!users?.length ? (
          <p className="text-center text-zinc-500 dark:text-zinc-400">
            Nenhum usuário encontrado.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user: User) => (
              <li key={user.id}>
                <UserCard user={user} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}