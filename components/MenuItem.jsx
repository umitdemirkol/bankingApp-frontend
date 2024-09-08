import React from 'react';
import Link from 'next/link';
function MenuItem({ title, address }) {
  return (
    <Link href={address}>
      <div className='text-xl font-bold hover:text-blue-700'>{title}</div>
    </Link>
  );
}

export default MenuItem;
