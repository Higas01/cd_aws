import Image from "next/image";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <article className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] dark:bg-zinc-900 dark:shadow-none dark:ring-1 dark:ring-zinc-800 dark:hover:ring-zinc-700">
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
      <div className="flex flex-col items-center gap-3 px-6 py-5 text-center">
        <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full border-2 border-zinc-100 dark:border-zinc-800">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={72}
              height={72}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 text-xl font-semibold text-violet-700 dark:from-indigo-900/40 dark:to-violet-900/40 dark:text-violet-300">
              {getInitials(user.name)}
            </div>
          )}
        </div>
        <h3 className="text-base font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
          {user.name}
        </h3>
        <a
          href={`mailto:${user.email}`}
          className="text-sm text-zinc-500 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
        >
          {user.email}
        </a>
      </div>
    </article>
  );
}
