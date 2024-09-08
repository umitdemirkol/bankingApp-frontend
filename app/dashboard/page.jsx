'use client';

import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

function Dashboard({ userProfile }) {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found in localStorage');
        }

        const response = await axios.get(
          'http://localhost:80/accounts/getAccounts',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAccounts(response.data);
        console.log('Accounts:', response.data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Error fetching accounts',
          variant: 'destructive',
        });
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white shadow-md rounded-lg p-6 mb-6'>
          <div className='flex items-center justify-between space-x-4'>
            <div className='flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg'>
              <Avatar className='w-16 h-16'>
                <AvatarImage
                  src='https://via.placeholder.com/150'
                  alt='User Avatar'
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <div className='text-lg font-medium text-gray-900'>
                  {userProfile.username}
                </div>
                <div className='text-lg font-medium text-gray-900'>
                  {userProfile.email}
                </div>
              </div>
            </div>

            <div className='text-xl text-gray-500 '>
              <span className='font-bold mr-2 '>Toplam Bakiye:</span>
              <span className='text-green-500'>
                $
                {accounts
                  .reduce((total, account) => total + account.balance, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className='bg-blue-100 text-blue-800 p-4 rounded mb-6 justify-center text-center'>
          Transfer detaylarını görmek isterseniz hesabınıza tıklayabilirsiniz.
        </div>
        <div className='bg-white shadow-md rounded-lg p-6'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider'
                >
                  Hesap Numarası
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider'
                >
                  Hesap Adı
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider'
                >
                  Bakiye
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider'
                >
                  Oluşturulma Tarihi
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200 '>
              {accounts.map((account) => (
                <tr
                  key={account.id}
                  onClick={() =>
                    (window.location.href = `/transactions?accountId=${account.id}`)
                  }
                  className='cursor-pointer hover:bg-gray-300'
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {account.number}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {account.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    ${account.balance}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {new Date(account.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
