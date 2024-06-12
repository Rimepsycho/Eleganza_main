import UserLayout from '@/component/users/user-layout'
import Head from 'next/head'
import { AuthProvider } from '@/hooks/use-auth'

export default function UsersIndex() {}

UsersIndex.getLayout = function (page) {
  return (
    <AuthProvider>
      <UserLayout>{page}</UserLayout>
    </AuthProvider>
  )
}
