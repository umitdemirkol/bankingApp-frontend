'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

function NewTransfer() {
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');

  const [accounts, setAccounts] = useState([]);
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState({
    email: '',
    username: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:80/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserProfile({
        email: response.data.email,
        username: response.data.username,
      });
    };

    fetchUserProfile();
  }, []);

  const totalBalance = accounts.reduce(
    (total, account) => total + account.balance,
    0
  );

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:80/accounts/getAccounts',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAccounts(response.data);
    };

    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:80/transactions/transfer',
        {
          fromAccountId,
          toAccountId,
          amount,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Handle successful response
      toast({
        title: 'Transfer successful',
        description: response.data.message,
        variant: 'success',
      });
      setFromAccountId('');
      setToAccountId('');
      setAmount('');
    } catch (error) {
      // Handle error response
      toast({
        title: 'Transfer failed',
        description: error.response.data.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10'>
      <div className='bg-white shadow-md rounded-lg p-6 mb-4'>
        <h2 className='text-gray-700 text-lg font-bold mb-2'>Total Balance</h2>
        <p className='text-gray-700 text-sm'>${totalBalance.toFixed(2)}</p>
      </div>
      <div className='bg-white shadow-md rounded-lg p-6'>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Gönderen Hesap:
            </label>
            <select
              value={fromAccountId}
              onChange={(e) => setFromAccountId(e.target.value)}
              required
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            >
              <option value='' className='bg-white text-gray-700'>
                Hesap Seç
              </option>
              {accounts.map((account) => (
                <option
                  key={account.id}
                  value={account.id}
                  className='bg-white text-gray-700'
                >
                  {account.name} - ${account.balance}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Alıcı Hesap:
            </label>
            <input
              type='text'
              value={toAccountId}
              onChange={(e) => setToAccountId(e.target.value)}
              required
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Miktar:
            </label>
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={(e) => {
              if (!fromAccountId || !toAccountId || !amount) {
                e.preventDefault();
                const form = e.target.closest('form');
                const existingError = form.querySelector('.text-red-500');
                if (existingError) {
                  existingError.remove();
                }

                if (!fromAccountId) {
                  const errorMessage = document.createElement('p');
                  errorMessage.textContent =
                    'Lütfen bir Gönderen Hesabı seçin.';
                  errorMessage.className = 'text-red-500 text-sm mt-2';
                  form.querySelector('select').after(errorMessage);
                } else if (!toAccountId) {
                  const errorMessage = document.createElement('p');
                  errorMessage.textContent = 'Lütfen bir Alıcı Hesabı girin.';
                  errorMessage.className = 'text-red-500 text-sm mt-2';
                  form.querySelector('input[type="text"]').after(errorMessage);
                } else if (!amount) {
                  const errorMessage = document.createElement('p');
                  errorMessage.textContent = 'Lütfen bir Miktar girin.';
                  errorMessage.className = 'text-red-500 text-sm mt-2';
                  form
                    .querySelector('input[type="number"]')
                    .after(errorMessage);
                }
              }
            }}
          >
            Onayla
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewTransfer;
