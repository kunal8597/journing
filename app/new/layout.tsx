import { AuthGuard } from '@/components/auth-guard';

export default function NewEntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}