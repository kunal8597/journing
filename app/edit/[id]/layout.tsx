import { AuthGuard } from '@/components/auth-guard';

export default function EditEntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}