'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase/auth'; 

export default function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut(); 

    if (error) {
      toast({
        title: 'Error logging out',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });

    router.push('/auth/login'); 
  }

  return (
    <Button onClick={handleLogout} variant="outline">
      Log Out
    </Button>
  );
}
