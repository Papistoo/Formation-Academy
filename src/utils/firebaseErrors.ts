export const getFirebaseErrorMessage = (error: any): string => {
  if (!error) return "Une erreur inattendue s'est produite. Veuillez réessayer.";

  const code = error?.code || error?.message || '';

  switch (code) {
    case 'auth/invalid-email':
      return "L'adresse email est invalide.";
    case 'auth/user-disabled':
      return "Ce compte a été désactivé.";
    case 'auth/user-not-found':
      return "Aucun compte associé à cet email.";
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return "Email ou mot de passe incorrect.";
    case 'auth/too-many-requests':
      return "Trop de tentatives échouées. Veuillez réessayer plus tard.";
    case 'auth/network-request-failed':
      return "Erreur réseau. Vérifiez votre connexion internet.";
    case 'permission-denied':
    case 'PERMISSION_DENIED':
      return "Vous n'avez pas l'autorisation d'effectuer cette action.";
    case 'unavailable':
      return "Le service est temporairement indisponible. Vérifiez votre connexion.";
    default:
      if (typeof code === 'string' && code.includes('offline')) {
        return "Vous êtes hors ligne. Vérifiez votre connexion internet.";
      }
      if (typeof code === 'string' && code.includes('quota')) {
        return "Le quota du service a été dépassé. Veuillez réessayer plus tard.";
      }
      return "Une erreur inattendue s'est produite. Veuillez réessayer.";
  }
};
