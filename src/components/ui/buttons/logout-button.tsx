'use client';

import { Button } from "@/components/ui/buttons/button";
import { useIsAdmin } from "@/lib/hooks/hooks";
import { signOut } from 'next-auth/react';

export function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ redirectTo: '/' });
  };

  const { data } = useIsAdmin();
  return (
    <>
      {data &&
        <Button onClick={handleLogout} text={"Logout"} />
      }
    </>
  );
}