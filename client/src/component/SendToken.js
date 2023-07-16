import axios from "axios";


const token = localStorage.getItem('tokenjwt');

// Créer un objet de configuration pour Axios
const config = {
  headers: {
    'Content-Type': 'application/json',
    // Ajouter le token dans les en-têtes de la requête
    'Authorization': `Bearer ${token}`
  }
};

// Faire une requête HTTP vers le serveur en utilisant Axios
axios.post('http://localhost:3000/api/users/login', { /* données supplémentaires si nécessaire */ }, config)
  .then(response => {
    // Traiter la réponse du serveur
    if (response.status === 200) {
      // Connexion réussie
      console.log('Connexion réussie !');
    } else {
      // Gérer les erreurs de connexion
      console.error('Erreur lors de la connexion :', response.status);
    }
  })
  .catch(error => {
    // Gérer les erreurs de connexion
    console.error('Erreur lors de la connexion :', error);
  });
