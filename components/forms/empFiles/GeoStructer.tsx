import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { GeoStructureItem, GeoStructerProps } from '@/app/utils/dtos';

function GeoStructer({ control, setValue }: GeoStructerProps) {
    const [countries, setCountries] = useState<{ value: string; label: string }[]>([]);
    const [governorates, setGovernorates] = useState<{ value: string; label: string }[]>([]);
    const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedGovernorate, setSelectedGovernorate] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/GeoStructure');
                const data: GeoStructureItem[] = await response.json();

                const countryOptions = data
                    .filter(item => item.ParentID === "1" && item.ChildID === "0")
                    .map(item => ({ value: item.GeoID, label: item.Description }));

                setCountries(countryOptions);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchGovernorates = async () => {
            if (selectedCountry) {
                try {
                    const response = await fetch('http://localhost:3000/api/GeoStructure');
                    const data: GeoStructureItem[] = await response.json();

                    const governorateOptions = data
                        .filter(item => item.ParentID === "2" && item.ChildID === selectedCountry)
                        .map(item => ({ value: item.GeoID, label: item.Description }));

                    setGovernorates(governorateOptions);
                    setCities([]);
                    setSelectedGovernorate(null);
                    setSelectedCity(null);
                } catch (error) {
                    console.error('Error fetching governorates:', error);
                }
            } else {
                setGovernorates([]);
                setCities([]);
                setSelectedGovernorate(null);
                setSelectedCity(null);
            }
        };

        fetchGovernorates();
    }, [selectedCountry]);

    useEffect(() => {
        const fetchCities = async () => {
            if (selectedGovernorate) {
                try {
                    const response = await fetch('http://localhost:3000/api/GeoStructure');
                    const data: GeoStructureItem[] = await response.json();

                    const cityOptions = data
                        .filter(item => item.ParentID === "3" && item.ChildID === selectedGovernorate)
                        .map(item => ({ value: item.GeoID, label: item.Description }));

                    setCities(cityOptions);
                } catch (error) {
                    console.error('Error fetching cities:', error);
                }
            } else {
                setCities([]);
                setSelectedCity(null);
            }
        };

        fetchCities();
    }, [selectedGovernorate]);

    return (
        <div className="grid grid-cols-1 grid-rows-3 gap-4 items-center text-center">
            <div className="row-start-1">
                <Controller
                    name="L1_Geo"
                    control={control}
                    render={({ field }) => (
                        <select
                            id="countrySelect"
                            value={field.value || ''}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                setSelectedCountry(e.target.value);
                            }}
                            className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                        >
                            <option value="" disabled>Select Country</option>
                            {countries.map(country => (
                                <option key={country.value} value={country.value}>{country.label}</option>
                            ))}
                        </select>
                    )}
                />
            </div>

            <div className="row-start-2">
                <Controller
                    name="L2_Geo"
                    control={control}
                    render={({ field }) => (
                        <select
                            id="governorateSelect"
                            value={field.value || ''}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                setSelectedGovernorate(e.target.value);
                                setSelectedCity(null); // Reset city when governorate changes
                            }}
                            className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                        >
                            <option value="" disabled>Select Governorate</option>
                            {governorates.map(governorate => (
                                <option key={governorate.value} value={governorate.value}>{governorate.label}</option>
                            ))}
                        </select>
                    )}
                />
            </div>

            <div className="row-start-3">
                <Controller
                    name="L3_Geo"
                    control={control}
                    render={({ field }) => (
                        <select
                            id="citySelect"
                            value={field.value || ''}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                setSelectedCity(e.target.value);
                            }}
                            className="border border-dark-3 text-dark-1 text-subtle-medium rounded-md focus:ring-blue focus:border-blue block w-full p-1.5"
                        >
                            <option value="" disabled>Select City</option>
                            {cities.map(city => (
                                <option key={city.value} value={city.value}>{city.label}</option>
                            ))}
                        </select>
                    )}
                />
            </div>
        </div>
    );
}

export default GeoStructer;
