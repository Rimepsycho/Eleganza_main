import { useState, useEffect } from 'react'
import React from 'react'
import Head from 'next/head'
import styles from './form.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'
import RegisterForm from '@/component/users/form/register'

export default function Register() {
  const { auth } = useAuth()

  return (
    <>
      <RegisterForm />
    </>
  )
}
