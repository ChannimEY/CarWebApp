'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BorderBeam } from "@/components/magicui/border-beam";

export function SignUpComponent() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            alert('Registration successful! Please login.');
            router.push('/login');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="relative w-[350px] overflow-hidden py-8 border">
            <CardHeader>
                <h1 className="font-bold text-2xl text-center">Create Your Account</h1>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        {/* email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@gmail.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                disabled={loading}
                            />
                        </div>
                        {/* username */}
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Koko0077"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                                disabled={loading}
                            />
                        </div>
                        {/* password */}
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                name="password" 
                                type="password" 
                                value={formData.password}
                                onChange={handleInputChange}
                                required 
                                disabled={loading}
                            />
                        </div>
                        {/* confirm_password */}
                        <div className="grid gap-2">
                            <Label htmlFor="confirm_password">Confirm Password</Label>
                            <Input 
                                id="confirm_password" 
                                name="confirm_password" 
                                type="password" 
                                value={formData.confirm_password}
                                onChange={handleInputChange}
                                required 
                                disabled={loading}
                            />
                        </div>
                        
                        {/* Submit button needs to be inside the form */}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}
                <Button variant="outline" className="w-full" type="button">
                    Sign Up with Google
                </Button>
            </CardFooter>
             <BorderBeam duration={4} size={300} />
        </Card>
    )
}