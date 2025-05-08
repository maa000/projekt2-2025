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
        setErrors({})

        try {
            await api.post('/register', props)
            await mutate()
            router.push('/')
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                setErrors({ general: ['Ismeretlen hiba történt.'] })
            }
        }
    }

    const login = async ({ setErrors, ...props }) => {
        await csrf()
        setErrors([])

        try {
            await api.post('/login', props)
            setErrors([])
            await mutate()
            router.push('/')
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            } else if (error.response?.status === 401) {
                setErrors({ login: ['Nincs ilyen felhasználó vagy hibás jelszó.'] })
            } else {
                setErrors({ general: ['Ismeretlen hiba történt.'] })
            }
        }
    }

    const logout = async () => {
        await csrf()
        await api.post('/logout')
        mutate(null)
        router.push('/login')
    }

    const forgotPassword = async ({ email, setStatus, setErrors }) => {
        await csrf()
        setStatus(null)
        setErrors([])

        try {
            const response = await api.post('/forgot-password', { email })
            setStatus(response.data.status)
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            }
        }
    }

    const resetPassword = async ({ email, token, password, password_confirmation, setSuccess, setError }) => {
        await csrf()
        setSuccess(null)
        setError([])

        try {
            const response = await api.post('/reset-password', {
                token,
                email,
                password,
                password_confirmation,
            })
            setSuccess(response.data.status)
            router.push('/login')
        } catch (error) {
            if (error.response?.status === 422) {
                setError(error.response.data.errors)
            }
        }
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
        forgotPassword,
        resetPassword,
    }
}
