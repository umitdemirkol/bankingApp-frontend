import React from 'react';
import MenuItem from './MenuItem';
function Header() {
  return (
    <div className='flex gap-1 justify-between mt-4 bg-blue-400 text-white rounded-lg'>
      <div>
        <img
          src='https://img.icons8.com/ios-filled/150/ffffff/us-dollar-circled.png'
          alt='American Dollars Icon'
          style={{ width: '150px', height: '150px' }}
        />
      </div>

      <div className='flex gap-4 justify-between  items-center mr-[300px]'>
        <MenuItem title='Ana Sayfa' address='/' />
        <MenuItem title='Transferlerim' address='/transactions' />
        <MenuItem title='Yeni Transfer' address='/newtransfer' />
      </div>
    </div>
  );
}

export default Header;
