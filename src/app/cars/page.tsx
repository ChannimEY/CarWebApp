'use client'

import { useState, useEffect } from 'react';
import { carService, Car } from '@/lib/carService';
import { isAuthenticated } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Car as CarIcon } from 'lucide-react';

export default function CarsPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setAuthenticated(isAuthenticated());
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            setLoading(true);
            const carsData = await carService.getAllCars();
            setCars(carsData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch cars');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCar = async () => {
        if (!authenticated) {
            alert('Please login to create a car listing');
            return;
        }

        try {
            // Hardcoded car data as requested
            const newCar = {
                brand: 'Toyota',
                model: 'Camry',
                year: 2023,
                price: 25000,
                description: 'A reliable sedan with great fuel economy',
                image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400'
            };

            await carService.createCar(newCar);
            alert('Car created successfully!');
            fetchCars(); // Refresh the list
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to create car');
        }
    };

    const handleUpdateCar = async (carId: number) => {
        if (!authenticated) {
            alert('Please login to update car listings');
            return;
        }

        try {
            // Hardcoded update data as requested
            const updateData = {
                price: 27000,
                description: 'Updated description - Great condition!'
            };

            await carService.updateCar(carId, updateData);
            alert('Car updated successfully!');
            fetchCars(); // Refresh the list
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to update car');
        }
    };

    const handleDeleteCar = async (carId: number) => {
        if (!authenticated) {
            alert('Please login to delete car listings');
            return;
        }

        if (!confirm('Are you sure you want to delete this car?')) {
            return;
        }

        try {
            await carService.deleteCar(carId);
            alert('Car deleted successfully!');
            fetchCars(); // Refresh the list
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to delete car');
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading cars...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Car Listings</h1>
                    <p className="text-gray-600">Browse all available cars</p>
                </div>
                {authenticated && (
                    <Button onClick={handleCreateCar} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add New Car
                    </Button>
                )}
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            {!authenticated && (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-6">
                    <p>💡 <strong>Tip:</strong> Login to create, update, and delete car listings!</p>
                </div>
            )}

            {cars.length === 0 ? (
                <div className="text-center py-12">
                    <CarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
                    <p className="text-gray-600">There are no car listings available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car) => (
                        <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            {car.image_url && (
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={car.image_url}
                                        alt={`${car.brand} ${car.model}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl">{car.brand} {car.model}</CardTitle>
                                        <Badge variant="secondary" className="mt-2">{car.year}</Badge>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-green-600">${car.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {car.description && (
                                    <p className="text-gray-600 mb-4">{car.description}</p>
                                )}
                                
                                {authenticated && (
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleUpdateCar(car.id!)}
                                            className="flex-1"
                                        >
                                            <Edit className="h-4 w-4 mr-1" />
                                            Update
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDeleteCar(car.id!)}
                                            className="flex-1"
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
} 