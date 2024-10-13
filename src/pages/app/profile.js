import { useState, useEffect } from 'react';
import { supabase } from '@components/lib/supabaseClient';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Router importieren

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter(); // Router-Hook initialisieren

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);

                // Benutzer-Session abfragen, um die User-ID zu bekommen
                const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) throw sessionError;

                const authUser = sessionData?.session?.user;
                if (!authUser) throw new Error('User not authenticated');

                // Benutzerdaten aus der `public.User`-Tabelle holen
                const { data: userData, error: userError } = await supabase
                    .from('User')
                    .select('id, Email, Ort, PLZ, created_at')
                    .eq('Email', authUser.email)
                    .single();
                if (userError) throw userError;

                setUserData(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p className="text-center text-white">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="relative w-full min-h-screen bg-gray-900 text-white">
            {/* Hintergrundbild mit Blur-Effekt */}
            <div className="absolute inset-0">
                <Image
                    src="/Images/Haus_am_See.jpg"
                    alt="Haus am See"
                    layout="fill"
                    objectFit="cover"
                    className="blur-md"
                />
            </div>

            {/* Overlay, um das Bild etwas dunkler zu machen */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto p-8">
                <button
                    onClick={() => router.back()} // Back-Funktion aufrufen
                    className="bg-indigo-600 text-white px-4 py-2 mb-6 rounded-lg hover:bg-indigo-800 transition duration-300"
                >
                    Zurück
                </button>

                <h1 className="text-5xl font-bold mb-6 text-center">Dein Profil</h1>

                {userData && (
                    <div className="bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg p-6 mb-8">
                        <h2 className="text-3xl font-bold mb-4">Profilinformationen</h2>
                        <p className="text-lg mb-2">
                            <strong>Email:</strong> {userData.Email}
                        </p>
                        <p className="text-lg mb-2">
                            <strong>Ort:</strong> {userData.Ort}
                        </p>
                        <p className="text-lg mb-2">
                            <strong>PLZ:</strong> {userData.PLZ}
                        </p>
                        <p className="text-lg">
                            <strong>Registriert seit:</strong> {new Date(userData.created_at).toLocaleDateString()}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
