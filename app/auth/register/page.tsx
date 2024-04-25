import { Suspense } from 'react'

import RegisterForm from '@/components/auth/RegisterForm'

export default function SignUpPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}
