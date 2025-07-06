'use server'

import { redirect } from "next/navigation";

interface UserCreateType{
    username:string,
    email:string,
    password: string, 
    confirm_password: string
}

interface UserLoginType{
    email:string,
    password: string
}

export async function createUser(prevState:unknown, formData:FormData){
    const userSignUp:UserCreateType ={
        username: formData.get('username')?.toString() || '',
        email: formData.get('email')?.toString() || '',
        password: formData.get('password')?.toString() || '',
        confirm_password: formData.get('confirm_password')?.toString() || ''
    }
    
    try {
        const res = await fetch('https://car-nextjs-api.cheatdev.online/register',
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(userSignUp)
            }
        );
        
        const jsonData = await res.json();
        console.log('Signup response:', jsonData);
        
        if(!res.ok){
            return {
                message: jsonData.message || 'Failed to register'
            };
        }
        
        // Redirect to login page after successful registration
        redirect('/login')
    } catch (error) {
        console.error('Signup error:', error);
        return {
            message: 'Network error occurred'
        };
    }
}

export async function UserLogin(prevState:unknown, formData:FormData){
    const userLogin:UserLoginType ={
        email: formData.get('email')?.toString() || '',
        password: formData.get('password')?.toString() || ''
    }
    
    try {
        const res = await fetch('https://car-nextjs-api.cheatdev.online/login',
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(userLogin)
            }
        );
        
        const jsonData = await res.json();
        console.log('Login response:', jsonData);
        
        if(!res.ok){
            return {
                message: jsonData.message || 'Failed to login'
            };
        }
        
        // Store tokens in cookies (server-side)
        const response = new Response();
        response.headers.set('Set-Cookie', `accessToken=${jsonData.access_token}; Path=/; HttpOnly; Secure; SameSite=Strict`);
        response.headers.set('Set-Cookie', `refreshToken=${jsonData.refresh_token}; Path=/; HttpOnly; Secure; SameSite=Strict`);
        
        redirect('/dashboard')
    } catch (error) {
        console.error('Login error:', error);
        return {
            message: 'Network error occurred'
        };
    }
}


