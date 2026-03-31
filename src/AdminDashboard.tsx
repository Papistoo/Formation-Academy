import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ShieldCheck, LogOut, Search, CheckCircle2, 
  XCircle, Clock, Trash2, Mail, Phone, MapPin, Calendar
} from 'lucide-react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { toast } from 'sonner';
import { getFirebaseErrorMessage } from './utils/firebaseErrors';

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  birthPlace: string;
  nationality: string;
  residenceRegion: string;
  studyLevel: string;
  profile: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Timestamp;
}

const ADMIN_EMAIL = 'academyairesearch@gmail.com';

export const AdminDashboard = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && user.email === ADMIN_EMAIL) {
      const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Registration[];
        setRegistrations(data);
      }, (error) => {
        console.error("Error fetching registrations:", error);
        toast.error(getFirebaseErrorMessage(error));
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      toast.success("Connexion réussie !");
    } catch (error: any) {
      console.error("Login error:", error);
      const msg = getFirebaseErrorMessage(error);
      setLoginError(msg);
      toast.error(msg);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.info("Vous avez été déconnecté.");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(getFirebaseErrorMessage(error));
    }
  };

  const updateStatus = async (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'registrations', id), { status: newStatus });
      toast.success("Statut mis à jour avec succès.");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(getFirebaseErrorMessage(error));
    }
  };

  const deleteRegistration = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette inscription ?")) {
      try {
        await deleteDoc(doc(db, 'registrations', id));
        toast.success("Inscription supprimée avec succès.");
      } catch (error) {
        console.error("Error deleting registration:", error);
        toast.error(getFirebaseErrorMessage(error));
      }
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reg.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || reg.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center sm:p-4 bg-slate-900/90 backdrop-blur-md overflow-y-auto"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white w-full h-full sm:h-auto sm:max-h-[90vh] max-w-6xl sm:rounded-3xl overflow-hidden shadow-2xl sm:my-8 flex flex-col"
        >
          {/* Header */}
          <div className="bg-slate-900 p-4 sm:p-6 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500/20 p-2 rounded-xl text-indigo-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Espace Administrateur</h2>
                <p className="text-slate-400 text-[10px] sm:text-xs">Gestion des pré-inscriptions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Déconnexion</span>
                </button>
              )}
              <button 
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6">
            {loadingAuth ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              </div>
            ) : !user ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <ShieldCheck className="w-16 h-16 text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Accès Restreint</h3>
                <p className="text-slate-500 mb-8 max-w-md">Veuillez vous connecter avec le compte administrateur pour accéder au tableau de bord.</p>
                
                <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
                  <input
                    type="email"
                    placeholder="Email administrateur"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  {loginError && <p className="text-red-500 text-sm font-medium">{loginError}</p>}
                  <button 
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 mt-2"
                  >
                    Se connecter
                  </button>
                </form>
              </div>
            ) : user.email !== ADMIN_EMAIL ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <XCircle className="w-16 h-16 text-red-400 mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Accès Refusé</h3>
                <p className="text-slate-500 mb-6">Votre compte ({user.email}) n'a pas les droits d'administration.</p>
                <button 
                  onClick={handleLogout}
                  className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-300 transition-all"
                >
                  Se déconnecter
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Stats & Filters */}
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="grid grid-cols-2 sm:flex gap-2">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex-1 min-w-[140px] col-span-2 sm:col-span-1">
                      <div className="text-slate-500 text-xs font-bold uppercase mb-1">Total</div>
                      <div className="text-2xl font-black text-slate-800">{registrations.length}</div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex-1 min-w-[140px]">
                      <div className="text-amber-500 text-xs font-bold uppercase mb-1">En attente</div>
                      <div className="text-2xl font-black text-slate-800">{registrations.filter(r => r.status === 'pending').length}</div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex-1 min-w-[140px]">
                      <div className="text-emerald-500 text-xs font-bold uppercase mb-1">Validées</div>
                      <div className="text-2xl font-black text-slate-800">{registrations.filter(r => r.status === 'approved').length}</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Rechercher..." 
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select 
                      className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="pending">En attente</option>
                      <option value="approved">Validées</option>
                      <option value="rejected">Rejetées</option>
                    </select>
                  </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                        <tr>
                          <th className="px-6 py-4">Candidat</th>
                          <th className="px-6 py-4">Contact</th>
                          <th className="px-6 py-4">Profil</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Statut</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredRegistrations.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                              Aucune inscription trouvée.
                            </td>
                          </tr>
                        ) : (
                          filteredRegistrations.map((reg) => (
                            <tr key={reg.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="font-bold text-slate-800">{reg.fullName}</div>
                                <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                  <MapPin className="w-3 h-3" /> {reg.residenceRegion}, {reg.nationality}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-slate-600 mb-1">
                                  <Mail className="w-3.5 h-3.5" /> <a href={`mailto:${reg.email}`} className="hover:text-indigo-600">{reg.email}</a>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-600">
                                  <Phone className="w-3.5 h-3.5" /> <a href={`https://wa.me/${reg.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="hover:text-emerald-600">{reg.phone}</a>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-medium text-slate-700">{reg.profile}</div>
                                <div className="text-xs text-slate-500">{reg.studyLevel}</div>
                              </td>
                              <td className="px-6 py-4 text-slate-500">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {reg.createdAt ? new Date(reg.createdAt.toDate()).toLocaleDateString('fr-FR') : 'N/A'}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                {reg.status === 'pending' && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700"><Clock className="w-3 h-3" /> En attente</span>}
                                {reg.status === 'approved' && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700"><CheckCircle2 className="w-3 h-3" /> Validé</span>}
                                {reg.status === 'rejected' && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700"><XCircle className="w-3 h-3" /> Rejeté</span>}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {reg.status !== 'approved' && (
                                    <button 
                                      onClick={() => updateStatus(reg.id, 'approved')}
                                      className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                      title="Valider"
                                    >
                                      <CheckCircle2 className="w-4 h-4" />
                                    </button>
                                  )}
                                  {reg.status !== 'rejected' && (
                                    <button 
                                      onClick={() => updateStatus(reg.id, 'rejected')}
                                      className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                      title="Rejeter"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => deleteRegistration(reg.id)}
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Supprimer"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {filteredRegistrations.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center text-slate-500">
                      Aucune inscription trouvée.
                    </div>
                  ) : (
                    filteredRegistrations.map((reg) => (
                      <div key={reg.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <div className="font-bold text-slate-800 text-lg">{reg.fullName}</div>
                            <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" /> {reg.residenceRegion}, {reg.nationality}
                            </div>
                          </div>
                          <div>
                            {reg.status === 'pending' && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700"><Clock className="w-3 h-3" /> En attente</span>}
                            {reg.status === 'approved' && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700"><CheckCircle2 className="w-3 h-3" /> Validé</span>}
                            {reg.status === 'rejected' && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700"><XCircle className="w-3 h-3" /> Rejeté</span>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mail className="w-4 h-4 text-slate-400" /> 
                            <a href={`mailto:${reg.email}`} className="hover:text-indigo-600 truncate">{reg.email}</a>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Phone className="w-4 h-4 text-slate-400" /> 
                            <a href={`https://wa.me/${reg.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="hover:text-emerald-600">{reg.phone}</a>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            {reg.createdAt ? new Date(reg.createdAt.toDate()).toLocaleDateString('fr-FR') : 'N/A'}
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <div className="w-4 h-4 flex items-center justify-center bg-slate-100 rounded text-[10px] font-bold text-slate-500">P</div>
                            <span className="truncate">{reg.profile} - {reg.studyLevel}</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                          {reg.status !== 'approved' && (
                            <button 
                              onClick={() => updateStatus(reg.id, 'approved')}
                              className="flex-1 flex justify-center items-center gap-2 py-2.5 px-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl font-medium transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4" /> Valider
                            </button>
                          )}
                          {reg.status !== 'rejected' && (
                            <button 
                              onClick={() => updateStatus(reg.id, 'rejected')}
                              className="flex-1 flex justify-center items-center gap-2 py-2.5 px-3 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-xl font-medium transition-colors"
                            >
                              <XCircle className="w-4 h-4" /> Rejeter
                            </button>
                          )}
                          <button 
                            onClick={() => deleteRegistration(reg.id)}
                            className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
