import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function Dashboard({ auth }) {
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const [quoteData, setQuoteData] = useState([]);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

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

    const openProfileModal = async (symbol) => {
        try 
        {
            const response = await fetch(`/fmp/company_profile?symbol=${symbol}`, {
                method: 'GET',
            });
            const data = await response.json();
            setProfileData(data[0]);
            setIsProfileModalOpen(true);
        }
        catch (error)
        {
            console.error('Error fetching search results:', error);
        }
    }

    const openQuoteModal = async (symbol) => {
        try 
        {
            const response = await fetch(`/fmp/company_quote?symbol=${symbol}`, {
                method: 'GET',
            });
            const data = await response.json();
            setQuoteData(data[0]);
            setIsQuoteModalOpen(true);
        }
        catch (error)
        {
            console.error('Error fetching search results:', error);
        }
    }

    const closeModal = () => {
        setIsProfileModalOpen(false);
        setIsQuoteModalOpen(false);
        setProfileData([]);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-black-900 dark:text-black-100">
                            <div className='mb-4'>
                                <input 
                                    type="text" 
                                    className='border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full mb-1 text-black-900 dark:text-black-100'
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
                            </div>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {searchResults && searchResults.length > 0 ? (
                            <table className='table-auto border-separate border-spacing-2 border border-slate-500'>
                                <thead>
                                    <tr>
                                        <th className='border border-slate-600'>Symbol</th>
                                        <th className='border border-slate-600'>Name</th>
                                        <th className='border border-slate-600'>Currency</th>
                                        <th className='border border-slate-600'>Exchange</th>
                                        <th className='border border-slate-600'>Actions</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                {searchResults.map((result, index) => (
                                    <tr key={index}>
                                        <td className='border border-slate-700'>{result.symbol}</td>
                                        <td className='border border-slate-700'>{result.name}</td>
                                        <td className='border border-slate-700'>{result.currency}</td>
                                        <td className='border border-slate-700'>{result.exchangeShortName}</td>
                                        <td>
                                            <span>
                                                <button
                                                className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-2'
                                                onClick={() => openProfileModal(result.symbol)}
                                                >
                                                    Profile
                                                </button>
                                                <button
                                                className='ml-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mb-2'
                                                onClick={() => openQuoteModal(result.symbol)}
                                                >
                                                    Quote
                                                </button>
                                            </span>
                                        </td>
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

                
                <Modal show={isProfileModalOpen} onClose={closeModal}>
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        {profileData ? (
                        <table className='table-auto border-separate border-spacing-1 border border-slate-500'>
                            <tr>
                                <td className='border border-slate-700' rowSpan={10}><img src={profileData.image} alt="" /></td>
                            </tr>
                           <tr> 
                                <th>Name:</th>
                                <td>{profileData.companyName}</td>
                                <th>Symbol:</th>
                                <td>{profileData.symbol}</td>
                           </tr>
                           <tr>
                                <th>CEO:</th>
                                <td colSpan={3}>{profileData.ceo}</td>
                           </tr>
                           <tr> 
                                <th>Industry:</th>
                                <td>{profileData.industry}</td>
                                <th>Sector:</th>
                                <td>{profileData.sector}</td>
                           </tr>
                           <tr>
                                <th>Website:</th>
                                <td>{profileData.website}</td>
                                <th>Phone:</th>
                                <td>{profileData.phone}</td>
                           </tr>
                           <tr> 
                                <th>Exchange:</th>
                                <td colSpan={3}>{profileData.exchange}</td>
                           </tr>
                           <tr>
                                <th>Market Cap:</th>
                                <td>{profileData.mktCap}</td>
                                <th>Currency:</th>
                                <td>{profileData.currency}</td>
                           </tr>
                           <tr>
                                <th>Price:</th>
                                <td>{profileData.price}</td>
                                <th>Volume Average:</th>
                                <td>{profileData.volAvg}</td>
                           </tr>
                           <tr> 
                                <th>Trading Range:</th>
                                <td colSpan={3}>{profileData.range}</td>
                           </tr>
                        </table>
                       ) : (
                        <p>No results found.</p>
                    )}
                    </div>
                </Modal>

                <Modal show={isQuoteModalOpen} onClose={closeModal}>
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    {quoteData ? (
                    <table className='table-auto border-separate border-spacing-3 border border-slate-500'>
                        <tr> 
                            <th className='border border-slate-500'>Name:</th>
                            <td className='border border-slate-700'>{quoteData.name}</td>
                            <th className='border border-slate-500'>Symbol:</th>
                            <td className='border border-slate-700'>{quoteData.symbol}</td>
                            <th className='border border-slate-500'>Exchange:</th>
                            <td className='border border-slate-700'>{quoteData.exchange}</td>
                        </tr>

                        <tr> 
                            <th className='border border-slate-500'>Market Cap:</th>
                            <td className='border border-slate-700'>{quoteData.marketCap}</td>
                            <th className='border border-slate-500'>Average Volume:</th>
                            <td className='border border-slate-700'>{quoteData.avgVolume}</td>
                            <th className='border border-slate-500'>Volume:</th>
                            <td className='border border-slate-700'>{quoteData.volume}</td>
                        </tr>

                        <tr> 
                            <th className='border border-slate-500'>Day High:</th>
                            <td className='border border-slate-700'>{quoteData.dayHigh}</td>
                            <th className='border border-slate-500'>Day Low:</th>
                            <td className='border border-slate-700'>{quoteData.dayLow}</td>
                        </tr>

                        <tr>
                            <th className='border border-slate-500'>Change:</th>
                            <td className='border border-slate-700'>{quoteData.change}</td>
                            <th className='border border-slate-500'>Change Percentage:</th>
                            <td className='border border-slate-700'>{quoteData.changesPercentage}</td>
                        </tr>

                        <tr>
                            <th className='border border-slate-500'>Open:</th>
                            <td className='border border-slate-700'>{quoteData.open}</td>
                            <th className='border border-slate-500'>Price:</th>
                            <td className='border border-slate-700'>{quoteData.price}</td>
                            <th className='border border-slate-500'>Previous Close:</th>
                            <td className='border border-slate-700'>{quoteData.previousClose}</td>
                        </tr>
                        <tr>
                            <th className='border border-slate-500'>Year High:</th>
                            <td className='border border-slate-700'>{quoteData.yearHigh}</td>
                            <th className='border border-slate-500'>Year Low:</th>
                            <td className='border border-slate-700'>{quoteData.yearLow}</td>
                        </tr>
                        <tr>
                            <th className='border border-slate-500'>50-day Moving Average:</th>
                            <td className='border border-slate-700'>{quoteData.priceAvg50}</td>
                            <th className='border border-slate-500'>200-day Moving Average</th>
                            <td className='border border-slate-700'>{quoteData.priceAvg200}</td>
                        </tr>


                    </table>
                    ) : (
                        <p>No results found.</p>
                    )}
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
