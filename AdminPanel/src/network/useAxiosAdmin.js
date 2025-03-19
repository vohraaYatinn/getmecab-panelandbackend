"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const useAxios = () => {
    const router = useRouter();

    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 
    const [controller, setController] = useState();

    const axiosFetch = async (configObj) => {
        const {
            axiosInstance,
            method,
            url,
            requestConfig = {}
        } = configObj;
        try {
            // Fetch token directly when making the request
            
            const storedToken = localStorage.getItem("adminJwtToken");
            const token = storedToken ? JSON.parse(storedToken).token : storedToken;

            console.log(token)
            if (token) {
                axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
            }

            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);

            const res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig,
                signal: ctrl.signal, // Add abort signal for better control
            });

            setResponse(res?.data);
        } catch (err) {
            setError(err);
            if (err?.response?.status === 404) {
                router.push('/not-found'); 
            } else if (err?.response?.status === 403) {
                router.push("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => controller && controller.abort(); // Cleanup on unmount
    }, [controller]);

    return [response, error, loading, axiosFetch, setError];
};

export default useAxios;
