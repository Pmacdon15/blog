'use client';

import { Button } from "@/components/ui/buttons/button";
import { signOut } from 'next-auth/react';

export function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ redirectTo: '/' });
  };

  return (
    <Button onClick={handleLogout} text={"Logout"} />
  );
}