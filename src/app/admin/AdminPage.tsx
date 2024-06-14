

'use client';

import React from 'react';
import { UserContextProvider } from "@/context/userContext";
import Profile from "@/components/profile";
import Login from "@/components/login";
import { useSaveUserSettingsContext, useUserContext, useUserSettingsContext } from "@/context/userContext";




const AdminPage: React.FC = () => {
  const user = useUserContext();
  const userSettings = useUserSettingsContext();
  const saveUserSettings = useSaveUserSettingsContext();
  return (

    <UserContextProvider>
      <main style={{ marginTop: '80px'}}>
       <Login />
        {user ? (
          <Profile />
          
        ) : (         
          <p> </p>
        )}

       
      </main>
    </UserContextProvider>

  );
}

export default AdminPage;



