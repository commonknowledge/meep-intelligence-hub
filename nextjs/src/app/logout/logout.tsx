"use client";

const doLogout = () => {
    localStorage.removeItem('jwt');
    document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'; // Delete cookie by giving it an expiry date in the past
    window.location.href = '/';
};

export default function Logout() {
    return (
        <>
            <h1 className="pb-4">Logout from Mapped</h1>
            <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={doLogout}>Logout</button>
        </>
    );
}