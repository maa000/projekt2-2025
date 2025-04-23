'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWR from 'swr'
import api from '@/lib/axios'

export default function useAuth({ middleware, redirectIfAuthenticated } = {}) {
    const router = useRouter()

    const {
        data: user,
        error,
        mutate,
    } = useSWR('/api/user', () =>
        api.get('/api/user').then(res => res.data).catch(() => null)
    )

    const csrf = () => api.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        try {
            await api.post('/register', props)
            await mutate()
            router.push('/')
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            }
        }
    }

    const login = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        try {
            await api.post('/login', props)
            await mutate()
            router.push('/')
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            }
        }
    }

    const logout = async () => {
        await api.post('/logout')
        mutate(null)
        router.push('/login')
    }

    useEffect(() => {
        if (middleware === 'guest' && user) {
            router.push(redirectIfAuthenticated || '/')
        }

        if (middleware === 'auth' && error) {
            router.push('/login')
        }
    }, [user, error])

    return {
        user,
        register,
        login,
        logout,
    }
}
