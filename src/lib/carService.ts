"use client"

import secureLocalStorage from "react-secure-storage";

const API_BASE_URL = 'https://car-nextjs-api.cheatdev.online';

// Get auth token from storage
const getAuthToken = (): string | null => {
    try {
        if (typeof window === 'undefined') return null;
        return secureLocalStorage.getItem("authToken") as string | null;
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
};

// Refresh token function
const refreshToken = async (): Promise<string | null> => {
    try {
        const refreshToken = secureLocalStorage.getItem("refreshToken") as string | null;
        if (!refreshToken) return null;

        const response = await fetch('/api/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        const data = await response.json();
        if (response.ok && data.access_token) {
            secureLocalStorage.setItem("authToken", data.access_token);
            return data.access_token;
        }
        return null;
    } catch (error) {
        console.error('Token refresh failed:', error);
        return null;
    }
};

// Generic API call with token refresh
const apiCall = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const token = getAuthToken();
    
    if (!token) {
        throw new Error('No authentication token found');
    }

    const makeRequest = async (authToken: string): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
                ...options.headers,
            },
        });

        if (response.status === 401) {
            // Token expired, try to refresh
            const newToken = await refreshToken();
            if (newToken) {
                return makeRequest(newToken);
            } else {
                throw new Error('Authentication failed');
            }
        }

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data as T;
    };

    return makeRequest(token);
};

// Car interfaces
export interface Car {
    id?: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    description?: string;
    image_url?: string;
    user_id?: number;
    created_at?: string;
    updated_at?: string;
}

// CRUD Operations
export const carService = {
    // Get all cars (public)
    getAllCars: async (): Promise<Car[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/cars`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch cars');
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching cars:', error);
            throw error;
        }
    },

    // Get car by ID (public)
    getCarById: async (id: number): Promise<Car> => {
        try {
            const response = await fetch(`${API_BASE_URL}/cars/${id}`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch car');
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching car:', error);
            throw error;
        }
    },

    // Create car (authenticated)
    createCar: async (carData: Omit<Car, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Car> => {
        return apiCall<Car>('/cars', {
            method: 'POST',
            body: JSON.stringify(carData),
        });
    },

    // Update car (authenticated, own cars only)
    updateCar: async (id: number, carData: Partial<Car>): Promise<Car> => {
        return apiCall<Car>(`/cars/${id}`, {
            method: 'PUT',
            body: JSON.stringify(carData),
        });
    },

    // Delete car (authenticated, own cars only)
    deleteCar: async (id: number): Promise<void> => {
        return apiCall<void>(`/cars/${id}`, {
            method: 'DELETE',
        });
    },

    // Get user's cars (authenticated)
    getUserCars: async (): Promise<Car[]> => {
        return apiCall<Car[]>('/cars/my-cars');
    },
}; 