'use client';

import Dashboard from './dashboard/page';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [userProfile, setUserProfile] = useState({
    email: '',
    username: '',
  });

  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.post('http://localhost:80/auth/login', {
          email: 'deneme1',
          password: 'deneme3',
        });
        const token = response.data.token;
        console.log(token);
        localStorage.setItem('token', token);

        const userProfileResponse = await axios.get(
          'http://localhost:80/users/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('User Profile:', userProfileResponse.data);
        setUserProfile({
          email: userProfileResponse.data.email,
          username: userProfileResponse.data.username,
        });
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };

    login();
  }, []);

  return (
    <div>
      <Dashboard userProfile={userProfile} />
    </div>
  );
}
