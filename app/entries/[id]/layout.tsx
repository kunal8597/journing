import { AuthGuard } from '@/components/auth-guard';

export default function EntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}