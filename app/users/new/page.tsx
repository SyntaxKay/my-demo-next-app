'use client';
import { useRouter } from 'next/navigation'

const NewUser = () => {
    const router = useRouter();
  return (
    <div>
      <p>Create new User</p>
        <button className='btn btn-secondary' onClick={() => router.push('/users')}> Create</button>
    </div>
  )
}

export default NewUser
