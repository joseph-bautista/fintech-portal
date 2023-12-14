import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth }) {
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try 
        {
            const response = await fetch(`/fmp/search?keyword=${keyword}`, {
                method: 'GET',
                
            });

            const data = await response.json();
            setSearchResults(data);
        }
        catch (error)
        {
            console.error('Error fetching search results:', error);
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className='mb-4'>
                                <input 
                                    type="text" 
                                    className='border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full mb-1'
                                    placeholder="Search symbol..."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <button
                                    className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-2'
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                                <div>
                                    {searchResults && searchResults.length > 0 ? (
                                    <table className='table-auto border-separate border-spacing-2 border border-slate-500'>
                                        <thead>
                                            <tr>
                                                <th className='border border-slate-600'>Symbol</th>
                                                <th className='border border-slate-600'>Name</th>
                                                <th className='border border-slate-600'>Currency</th>
                                                <th className='border border-slate-600'>Exchange</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>
                                        {searchResults.map((result, index) => (
                                            <tr key={index}>
                                                <td className='border border-slate-700'>{result.symbol}</td>
                                                <td className='border border-slate-700'>{result.name}</td>
                                                <td className='border border-slate-700'>{result.currency}</td>
                                                <td className='border border-slate-700'>{result.exchangeShortName}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    ) : (
                                        <p>No results found.</p>
                                    )}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
