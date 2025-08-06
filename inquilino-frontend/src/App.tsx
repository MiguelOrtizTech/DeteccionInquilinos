import  { useEffect, useState } from 'react';
 

interface Inquilino {
  id: number;
  nombre: string;
  estatus: boolean;
  fecha: string;
}

// Navbar Component
function Navbar() {
  return (
    <nav className="bg-blue-700 text-white h-16 flex items-center justify-between px-6">
      <h1 className="text-xl font-bold">Detección Inquilino - Universidad Politécnica de Aguascalientes</h1>
      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
        <img src="../public/UPA_Logo.jpeg" alt="Logo" className="w-full h-full object-cover"/>
      </div>
    </nav>
  );
}

export default function App() {
  const [history, setHistory] = useState<Inquilino[]>([]);
  const [latest, setLatest] = useState<Inquilino | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.1:5174/api/Inquilino');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data: Inquilino[] = await response.json();
        setHistory(data);
        if (data.length > 0) {
          setLatest(data[data.length - 1]);
        } else {
          setLatest(null);
        }
      } catch (e: any) {
        setError(e.message);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const limitedHistory = history.slice(-5);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-grow p-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Detección de Inquilino</h2>
          {error && <p className="text-red-500">Error: {error}</p>}
          {!latest && !error && <p className="text-gray-500">Esperando detección...</p>}
          {latest && (
            <>
              <p className="text-lg">Inquilino: <span className="font-semibold">{latest.nombre}</span></p>
              <p className={`mt-2 font-semibold ${latest.estatus ? 'text-green-500' : 'text-red-500'}`}>{latest.estatus ? 'Conocido (1)' : 'Desconocido (0)'}</p>
              <p className="text-sm text-gray-400 mt-1">{new Date(latest.fecha).toLocaleString()}</p>
            </>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            {showHistory ? 'Ocultar Historial' : 'Mostrar Historial'}
          </button>
        </div>

        {showHistory && (
          <section className="mt-8 max-w-md w-full mx-auto">
            <h3 className="text-xl font-bold mb-4">Historial (últimos 5)</h3>
            <ul className="space-y-4">
              {limitedHistory.map(item => (
                <li key={item.id} className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{item.nombre}</p>
                    <p className={`text-sm ${item.estatus ? 'text-green-500' : 'text-red-500'}`}>{item.estatus ? 'Reconocido' : 'No reconocido'}</p>
                    <p className="text-xs text-gray-400">{new Date(item.fecha).toLocaleString()}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full overflow-hidden ml-4">
                    {
                      item.nombre == "Pinguino" ? (
                        <img src={"../public/Pinguino.jpeg"} className="w-full h-full object-cover" alt={item.nombre} />
                      )
                      : (
                        item.nombre == "Unicornio" ? (
                          <img src={"../public/Unicornio.jpeg"} className="w-full h-full object-cover" alt={item.nombre} />

                        )
                        :
                        (
                          <img src={"../public/Elefante.jpeg"} className="w-full h-full object-cover" alt={item.nombre} />
                        )
                      )
                    }
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
