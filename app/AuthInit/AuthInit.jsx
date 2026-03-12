'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../store/login/loginSlice';

/**
 * При зареждане на приложението проверява дали има валидна httpOnly cookie (извиква check-auth).
 * Ако backend върне успех, Redux auth state се попълва и потребителят остава логнат.
 */
export default function AuthInit({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return children;
}
