
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/userService';  // Importiere die Funktion

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Benutzernamen abrufen, wenn die Komponente geladen wird
  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await getAllUsers();
      setUsers(userData);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Lade Benutzerdaten...</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Benutzerliste</h1>
      <ul className="bg-white rounded-lg shadow-lg p-6">
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index} className="border-b py-2">
              {user.First_Name} 
              
            </li>
          ))
        ) : (
          <li>Keine Benutzer gefunden.</li>
        )}
      </ul>
    </div>
  );
}
