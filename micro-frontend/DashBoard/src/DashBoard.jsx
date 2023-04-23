import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img
                className="h-8 w-auto mr-2"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <h1 className="text-white font-bold text-lg">MyBank</h1>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <p className="text-white font-medium">Bienvenue, John Doe</p>
                <p className="text-gray-400 text-sm">Compte n°1234567890</p>
              </div>
              <button className="bg-white text-gray-900 px-4 py-2 rounded-md font-medium">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Tableau de bord
            </h1>
            <p className="text-gray-700 text-xl mb-8">
              Bienvenue sur votre tableau de bord. Utilisez le menu de
              navigation pour accéder aux différentes sections.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white shadow rounded-lg">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">
                    Solde du compte
                  </h2>
                  <p className="text-gray-600">Votre solde actuel est de :</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">
                      $5,678.90
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow rounded-lg">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">
                    Historique des transactions
                  </h2>
                  <p className="text-gray-600">
                    Visualisez l'historique complet de vos transactions.
                  </p>
                  <div className="mt-4">
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-md font-medium">
                      Voir les transactions
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow rounded-lg">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">
                    Virement
                  </h2>
                  <p className="text-gray-600">
                    Effectuez un virement vers un autre compte bancaire.
                  </p>
                  <div className="mt-4">
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-md font-medium">
                      Effectuer un virement
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
