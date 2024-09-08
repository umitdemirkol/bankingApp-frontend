'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
function Transactions() {
  const { toast } = useToast();
  const urlParams = new URLSearchParams(window.location.search);
  const accountId = urlParams.get('accountId');
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserAllHistory = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found in localStorage');
        }

        const response = await axios.get(
          'http://localhost:80/transactions/userAllHistory',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransactions(response.data);
        console.log('User All History:', response.data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Error fetching user all history',
          variant: 'destructive',
        });
        console.error('Error fetching user all history:', error);
      }
      setIsLoading(false);
    };

    if (!accountId) {
      fetchUserAllHistory();
    }
  }, [accountId]);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found in localStorage');
        }

        const response = await axios.get(
          `http://localhost:80/transactions/accountHistory/${accountId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransactions(response.data);
        console.log('Transactions:', response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
      setIsLoading(false);
    };

    fetchTransactions();
  }, [accountId]);

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      {transactions.length === 0 ? (
        <div className='text-center text-gray-500'>
          <div className='text-center text-gray-500 bg-yellow-100 p-4 rounded'>
            This account does not have any transfers.
          </div>
        </div>
      ) : null}
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white shadow-md rounded-lg p-6'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider'
                >
                  Gönderen Hesap
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider'
                >
                  Alıcı Hesap
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider'
                >
                  Miktar
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider'
                >
                  İşlem Tarihi
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider'
                >
                  Durum
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {transaction.fromAccountId}-
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {transaction.toAccountId}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    ${transaction.amount}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {new Date(transaction.transactionDate).toLocaleDateString()}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {transaction.status}
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

export default Transactions;
