import { AuthGuard } from '@/components/auth-guard';

export default function EntriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}