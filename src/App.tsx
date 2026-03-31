import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart3, 
  Database, 
  LineChart, 
  CheckCircle2, 
  Video, 
  BookOpen, 
  Layout, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Plus,
  Minus,
  Quote,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  X,
  Download,
  FileText,
  Smartphone,
  Sigma,
  Search,
  Table,
  FileSpreadsheet,
  User,
  CreditCard,
  Check,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Printer,
  QrCode,
  Globe
} from "lucide-react";
import { 
  LineChart as ReLineChart, 
  Line, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import React, { useState, FormEvent, useRef, useEffect } from "react";
import html2pdf from 'html2pdf.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { Toaster, toast } from 'sonner';
import { getFirebaseErrorMessage } from './utils/firebaseErrors';
import { AdminDashboard } from './AdminDashboard';

const lineData = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 35 },
  { name: 'Mar', value: 25 },
  { name: 'Apr', value: 45 },
  { name: 'May', value: 30 },
  { name: 'Jun', value: 55 },
];

const Navbar = ({ onStartRegistration }: { onStartRegistration: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1 rounded-lg">
              <BarChart3 className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">DataMaster</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#programme" className="hover:text-indigo-600 transition-colors">Programme</a>
            <a href="#outils" className="hover:text-indigo-600 transition-colors">Outils</a>
            <a href="#temoignages" className="hover:text-indigo-600 transition-colors">Avis</a>
            <a href="#tarifs" className="hover:text-indigo-600 transition-colors">Tarifs</a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onStartRegistration}
              className="hidden sm:block bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-800 transition-all"
            >
              S'inscrire
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
        className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
      >
        <div className="px-4 py-6 space-y-4 text-center font-medium text-slate-600">
          <a href="#programme" onClick={() => setIsMenuOpen(false)} className="block hover:text-indigo-600">Programme</a>
          <a href="#outils" onClick={() => setIsMenuOpen(false)} className="block hover:text-indigo-600">Outils</a>
          <a href="#temoignages" onClick={() => setIsMenuOpen(false)} className="block hover:text-indigo-600">Avis</a>
          <a href="#tarifs" onClick={() => setIsMenuOpen(false)} className="block hover:text-indigo-600">Tarifs</a>
          <a href="#faq" onClick={() => setIsMenuOpen(false)} className="block hover:text-indigo-600">FAQ</a>
          <button 
            onClick={() => { setIsMenuOpen(false); onStartRegistration(); }}
            className="block w-full bg-indigo-600 text-white py-3 rounded-xl"
          >
            S'inscrire
          </button>
        </div>
      </motion.div>
    </nav>
  );
};

const Hero = ({ onShowProgramme, onStartRegistration }: { onShowProgramme: () => void, onStartRegistration: () => void }) => (
  <section className="pt-32 pb-16 overflow-hidden bg-white">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
          Maîtrisez l'Analyse de Données <br className="hidden md:block" />
          <span className="text-indigo-600">et Démarquez-vous !</span>
        </h1>
        <p className="text-base md:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
          Devenez l'expert capable de transformer des données brutes en décisions stratégiques percutantes. Formation complète 2026.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <button 
            onClick={onStartRegistration}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-full font-bold text-base hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            S'inscrire Maintenant
          </button>
          <button 
            onClick={onShowProgramme}
            className="w-full sm:w-auto px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-base hover:bg-slate-50 transition-all"
          >
            Voir le Programme
          </button>
        </div>

        {/* Compact Illustrative Box */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-0">
          <div className="bg-indigo-600 rounded-[2rem] aspect-[16/8] overflow-hidden relative shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <motion.div 
                  animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 right-1/4 w-20 h-20 md:w-24 md:h-24 bg-pink-500 rounded-2xl rotate-12 flex items-center justify-center shadow-lg"
                >
                  <div className="text-white text-3xl md:text-4xl">📊</div>
                </motion.div>
                <motion.div 
                  animate={{ x: [0, 10, 0], rotate: [-10, -2, -10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-1/4 left-1/3 w-32 h-8 md:w-40 md:h-10 bg-amber-400 rounded-full -rotate-12 shadow-lg flex items-center justify-end px-3"
                >
                  <div className="w-3 h-3 bg-slate-900 rounded-full" />
                </motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/4 w-24 h-24 md:w-32 md:h-32 bg-indigo-400 rounded-full flex items-center justify-center shadow-xl"
                >
                  <div className="text-slate-900 text-4xl md:text-5xl font-bold">💡</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const PainSolution = () => (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
            Pourquoi maintenant ?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            La Compétence Clé du 21ème Siècle
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed">
            Dans un monde submergé d'informations, ceux qui savent transformer les données brutes en décisions stratégiques sont ceux qui dominent le marché.
          </p>
          <div className="space-y-3">
            {[
              "Prenez des décisions basées sur des preuves.",
              "Automatisez vos rapports et gagnez du temps.",
              "Démarquez-vous avec des visualisations percutantes."
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="bg-emerald-100 p-0.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-slate-700 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="relative hidden lg:block">
          <div className="bg-slate-50 rounded-[2rem] aspect-square overflow-hidden relative border border-slate-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 border border-dashed border-indigo-200 rounded-full flex items-center justify-center"
              >
                <div className="w-32 h-32 border border-dashed border-indigo-300 rounded-full" />
              </motion.div>
              <div className="absolute bg-white p-6 rounded-2xl shadow-lg border border-slate-50">
                <TrendingUp className="w-10 h-10 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Analytics = () => (
  <section className="py-20 bg-slate-50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Analyses et Reporting</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6 text-slate-900">Hashtag Performance</h3>
          <div className="flex flex-wrap gap-2">
            {['#Data', '#Analysis', '#2026', '#Master', '#Insights', '#Growth'].map((tag, i) => (
              <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-xs font-medium text-slate-500">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Optimisation</h3>
            <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-bold uppercase">Live</span>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={lineData}>
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={false} />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">+41%</div>
            <span className="text-slate-400 text-xs font-medium">Engagement Rate</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Modules = () => (
  <section id="programme" className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Programme de Formation</h2>
        <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">Trois piliers fondamentaux pour devenir un expert complet.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Collecte de Données",
            desc: "Maîtrisez KoboToolbox et les techniques de collecte mobile pour des données propres.",
            icon: <Database className="w-6 h-6" />,
            color: "bg-indigo-600"
          },
          {
            title: "Visualisation",
            desc: "Transformez des tableaux complexes en graphiques parlants avec Excel et Sphinx.",
            icon: <Layout className="w-6 h-6" />,
            color: "bg-pink-500"
          },
          {
            title: "Analyse Avancée",
            desc: "Utilisez SPSS, STATA et Sphinx pour des analyses statistiques et prédictions fiables.",
            icon: <LineChart className="w-6 h-6" />,
            color: "bg-emerald-500"
          }
        ].map((item, i) => (
          <div key={i} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-lg transition-all group">
            <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Tools = () => {
  const tools = [
    { name: 'KoboToolbox', icon: <Smartphone className="w-6 h-6" />, color: "text-orange-500", bg: "bg-orange-50" },
    { name: 'SPSS', icon: <Sigma className="w-6 h-6" />, color: "text-blue-600", bg: "bg-blue-50" },
    { name: 'Sphinx', icon: <Search className="w-6 h-6" />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { name: 'STATA', icon: <Table className="w-6 h-6" />, color: "text-red-600", bg: "bg-red-50" },
    { name: 'Excel', icon: <FileSpreadsheet className="w-6 h-6" />, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <section id="outils" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">La Boîte à Outils</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {tools.map((tool, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 text-center hover:shadow-md transition-all group">
              <div className={`${tool.bg} ${tool.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                {tool.icon}
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{tool.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Bonuses = () => (
  <section id="bonus" className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 lg:p-16 text-white overflow-hidden relative">
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8">Les Plus Inclus</h2>
            <div className="space-y-6">
              {[
                { title: "Tutoriels Vidéos", desc: "Accès à vie à notre bibliothèque pratique.", icon: <Video className="w-5 h-5" /> },
                { title: "E-books Complets", desc: "Guides détaillés pour chaque logiciel.", icon: <BookOpen className="w-5 h-5" /> },
                { title: "Cas Pratiques", desc: "Données réelles d'entreprises.", icon: <ShieldCheck className="w-5 h-5" /> }
              ].map((bonus, i) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-white/10 p-3 rounded-xl h-fit">
                    {bonus.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold mb-1">{bonus.title}</h4>
                    <p className="text-white/50 text-xs leading-relaxed">{bonus.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="bg-indigo-600 rounded-2xl aspect-video flex items-center justify-center shadow-xl rotate-2">
              <Video className="w-12 h-12 text-white opacity-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section id="temoignages" className="py-20 bg-slate-50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ce que disent nos étudiants</h2>
        <p className="text-slate-500 text-sm md:text-base">Rejoignez des centaines de professionnels déjà formés.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { 
            name: "Ibrahim D.", 
            role: "Analyste de données", 
            text: "Une formation transformatrice. J'ai pu automatiser mes rapports complexes en quelques jours seulement.",
            avatar: "JD"
          },
          { 
            name: "Aminata K.", 
            role: "Consultante ONG", 
            text: "KoboToolbox a radicalement changé ma façon de collecter des données sur le terrain. Un gain de temps énorme.",
            avatar: "AK"
          },
          { 
            name: "Issaka L.", 
            role: "Étudiant Master", 
            text: "Le support et les bonus (E-books, vidéos) sont incroyables. C'est l'investissement le plus rentable de mon année.",
            avatar: "ML"
          }
        ].map((t, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative">
            <Quote className="absolute top-6 right-8 w-8 h-8 text-indigo-50 opacity-20" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                {t.avatar}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                <p className="text-[10px] text-slate-400 font-medium">{t.role}</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed italic">"{t.text}"</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = ({ onStartRegistration }: { onStartRegistration: () => void }) => (
  <section id="tarifs" className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Tarifs</h2>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="bg-white border border-indigo-100 rounded-[2.5rem] p-8 md:p-12 relative shadow-xl shadow-indigo-50">
          <div className="text-center mb-10">
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Inscription</div>
            <div className="text-5xl font-black text-slate-900 mb-1">10 000 F</div>
            <div className="text-indigo-600 text-sm font-bold">+ 3 000 F (Attestation)</div>
          </div>
          <div className="space-y-4 mb-10">
            {[
              "Accès complet aux 3 modules",
              "Logiciels fournis",
              "Support technique",
              "Certificat de formation",
              "Accès aux bonus"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-sm text-slate-600 font-medium">{item}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={onStartRegistration}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-base hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
          >
            S'inscrire Maintenant <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const questions = [
    { q: "Prérequis ?", a: "Aucun, nous reprenons les bases." },
    { q: "Logiciels ?", a: "KoboToolbox, SPSS, Sphinx, STATA et Excel fournis." },
    { q: "Certification ?", a: "Oui, attestation reconnue délivrée." },
    { q: "Format ?", a: "Théorie et pratique sur cas réels." }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">FAQ</h2>
        <div className="space-y-2">
          {questions.map((item, i) => (
            <div key={i} className="border-b border-slate-100">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-6 flex justify-between items-center text-left group"
              >
                <span className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.q}</span>
                {openIndex === i ? <Minus className="w-5 h-5 text-indigo-600" /> : <Plus className="w-5 h-5 text-slate-400" />}
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? "auto" : 0, opacity: openIndex === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="pb-6 text-slate-500 text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onOpenAdmin }: { onOpenAdmin: () => void }) => (
  <footer className="py-12 bg-white border-t border-slate-50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-indigo-600 w-5 h-5" />
          <span className="font-bold text-lg text-slate-900">DataMaster</span>
        </div>
        
        <div className="flex gap-6 text-xs font-medium text-slate-400">
          <a href="#programme" className="hover:text-indigo-600">Programme</a>
          <a href="#outils" className="hover:text-indigo-600">Outils</a>
          <a href="#temoignages" className="hover:text-indigo-600">Avis</a>
          <a href="#tarifs" className="hover:text-indigo-600">Tarifs</a>
          <a href="#faq" className="hover:text-indigo-600">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            © 2026 DataMaster Academy
          </div>
          <button 
            onClick={onOpenAdmin}
            className="text-[10px] text-indigo-600/50 hover:text-indigo-600 font-bold uppercase tracking-widest transition-colors flex items-center gap-1"
          >
            <ShieldCheck className="w-3 h-3" /> Admin
          </button>
        </div>
      </div>
    </div>
  </footer>
);

const BrochureModal = ({ isOpen, onClose, onStartRegistration }: { isOpen: boolean, onClose: () => void, onStartRegistration: () => void }) => {
  const brochureRef = useRef<HTMLDivElement>(null);
  if (!isOpen) return null;

  const handleDownloadBrochure = () => {
    if (!brochureRef.current) return;
    
    const element = brochureRef.current;
    const opt = {
      margin: 0,
      filename: 'Programme_Formation_DataMaster_2026.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: true,
        scrollY: 0
      },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-[800px] my-8"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-[110] p-3 bg-white rounded-full text-slate-900 hover:bg-slate-100 transition-all shadow-xl border border-slate-200 flex items-center justify-center group"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* A4 Paper Container */}
          <div className="overflow-x-auto w-full pb-4">
            <div ref={brochureRef} className="bg-white shadow-2xl rounded-2xl sm:rounded-sm overflow-hidden flex flex-col w-[210mm] h-[297mm] shrink-0 print:m-0 print:shadow-none mx-auto">
              {/* Header / Banner */}
            <div className="bg-indigo-600 p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2 sm:mb-4">
                  <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8" />
                  <span className="text-xl sm:text-2xl font-black tracking-tighter">DATAMASTER ACADEMY</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold leading-tight">PROGRAMME DE FORMATION <br className="hidden sm:block"/>ANALYSE DE DONNÉES 2026</h1>
                <p className="text-indigo-100 text-xs sm:text-sm font-medium">Expertise - Pratique - Certification</p>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">Session</div>
                <div className="text-lg sm:text-xl font-black">AVRIL 2026</div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-10 flex-grow space-y-8 sm:space-y-10">
              {/* Modules Section */}
              <section>
                <h2 className="text-indigo-600 font-black text-[10px] sm:text-sm uppercase tracking-widest mb-4 sm:mb-6 flex items-center gap-2">
                  <div className="w-6 sm:w-8 h-[2px] bg-indigo-600" /> 
                  Le Programme Détaillé
                </h2>
                <div className="grid gap-4 sm:gap-6">
                  {[
                    { 
                      num: "01", 
                      title: "Collecte & Digitalisation", 
                      details: "KoboToolbox : Création de formulaires complexes, déploiement mobile et nettoyage des données." 
                    },
                    { 
                      num: "02", 
                      title: "Traitement & Analyse", 
                      details: "SPSS & STATA : Analyses descriptives, tests d'hypothèses et modélisation statistique." 
                    },
                    { 
                      num: "03", 
                      title: "Visualisation & Reporting", 
                      details: "Excel Avancé & Sphinx : Tableaux de bord dynamiques et rédaction de rapports stratégiques." 
                    }
                  ].map((m, i) => (
                    <div key={i} className="flex gap-4 sm:gap-6 items-start border-b border-slate-100 pb-4 sm:pb-6 last:border-0">
                      <span className="text-2xl sm:text-4xl font-black text-indigo-100 leading-none">{m.num}</span>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">{m.title}</h3>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{m.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tools & Logistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                <section>
                  <h2 className="text-indigo-600 font-black text-[10px] sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">Outils Maîtrisés</h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {['KoboToolbox', 'IBM SPSS', 'STATA 18', 'Sphinx iQ3', 'Excel Pro'].map((tool, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                        <div className="w-1 h-1 rounded-full bg-indigo-400" /> {tool}
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h2 className="text-indigo-600 font-black text-[10px] sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">Bonus Inclus</h2>
                  <ul className="space-y-2">
                    <li className="text-xs sm:text-sm text-slate-600 flex items-center gap-2">
                      <Video className="w-3.5 h-3.5 text-indigo-400" /> Tutoriels vidéos à vie
                    </li>
                    <li className="text-xs sm:text-sm text-slate-600 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> E-books & Guides PDF
                    </li>
                  </ul>
                </section>
              </div>

              {/* Pricing Box */}
              <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                  <div className="text-center sm:text-left">
                    <h2 className="text-indigo-600 font-black text-[10px] sm:text-sm uppercase tracking-widest mb-1">Investissement</h2>
                    <p className="text-slate-500 text-[10px]">Formation certifiante complète</p>
                  </div>
                  <div className="flex gap-6 sm:gap-8 text-center">
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900">10 000 F</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">Formation</div>
                    </div>
                    <div className="w-[1px] h-8 sm:h-10 bg-slate-200" />
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-indigo-600">3 000 F</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">Attestation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer / CTA */}
            <div className="bg-slate-900 p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="text-center sm:text-left">
                <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">Prêt à commencer ?</p>
                <p className="text-xs sm:text-sm font-medium">Contactez-nous pour réserver votre place.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button 
                  onClick={handleDownloadBrochure}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all"
                >
                  <Download className="w-4 h-4" /> Télécharger PDF
                </button>
                <button 
                  onClick={() => { onClose(); onStartRegistration(); }}
                  className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all"
                >
                  S'inscrire
                </button>
                <button 
                  onClick={onClose}
                  className="flex items-center justify-center bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all border border-white/20"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const RegistrationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState<'form' | 'receipt'>('form');
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const totalSteps = 5;
  const ficheRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    birthDate: '',
    birthPlace: '',
    nationality: '',
    residenceRegion: '',
    email: '',
    studyLevel: '',
    profile: 'Étudiant'
  });

  const handleNextStep = async (e: FormEvent) => {
    e.preventDefault();
    if (formStep < totalSteps) {
      setFormStep(formStep + 1);
    } else {
      setIsSubmitting(true);
      setError('');
      try {
        await addDoc(collection(db, 'registrations'), {
          ...formData,
          createdAt: serverTimestamp(),
          status: 'pending'
        });
        setStep('receipt');
        toast.success("Candidature soumise avec succès !");
      } catch (err) {
        console.error("Error adding document: ", err);
        const msg = getFirebaseErrorMessage(err);
        setError(msg);
        toast.error(msg);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  const handleDownloadPDF = () => {
    if (!ficheRef.current) return;
    
    const element = ficheRef.current;
    const opt = {
      margin: 0,
      filename: `Fiche_Preinscription_${formData.fullName.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: true,
        scrollY: 0
      },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };

    // Use html2pdf to generate and save the PDF
    html2pdf().set(opt).from(element).save().then(() => {
      toast.success("Fiche PDF téléchargée avec succès !");
    }).catch((err: any) => {
      console.error("PDF generation error:", err);
      toast.error("Erreur lors du téléchargement du PDF.");
    });
  };

  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setFormStep(1);
      setError('');
      setIsSubmitting(false);
      setFormData({
        fullName: '',
        phone: '',
        birthDate: '',
        birthPlace: '',
        nationality: '',
        residenceRegion: '',
        email: '',
        studyLevel: '',
        profile: 'Étudiant'
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center sm:p-4 bg-slate-900/80 backdrop-blur-md overflow-hidden"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className={`bg-white w-full ${step === 'form' ? 'max-w-xl' : 'max-w-3xl'} h-full sm:h-auto sm:max-h-[90vh] flex flex-col sm:rounded-[2.5rem] shadow-2xl`}
        >
          {/* Header */}
          <div className="bg-indigo-600 p-6 sm:p-8 text-white relative shrink-0">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-2 rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">Dossier de Candidature</h2>
            </div>
            <p className="text-indigo-100 text-xs sm:text-sm">
              {step === 'form' ? "Veuillez remplir tous les champs soigneusement pour la session 2026." : "Félicitations ! Votre candidature a été validée."}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
            {step === 'form' && (
              <form onSubmit={handleNextStep} className="flex flex-col min-h-full">
                {/* Progress Bar */}
                <div className="mb-6 sm:mb-8 shrink-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Étape {formStep} sur {totalSteps}</span>
                    <span className="text-xs font-bold text-indigo-600">{Math.round((formStep / totalSteps) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${(formStep / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={formStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-5"
                    >
                      {formStep === 1 && (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nom complet</label>
                            <input 
                              required
                              type="text" 
                              placeholder="Ex: Abdoulaye Mamane"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              value={formData.fullName}
                              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
                            <input 
                              required
                              type="email" 
                              placeholder="email@exemple.com"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                          </div>
                        </>
                      )}

                      {formStep === 2 && (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Téléphone (WhatsApp)</label>
                            <input 
                              required
                              type="tel" 
                              placeholder="+227 00 00 00 00"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Région de résidence</label>
                            <input 
                              required
                              type="text" 
                              placeholder="Ex: Zinder"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              value={formData.residenceRegion}
                              onChange={(e) => setFormData({...formData, residenceRegion: e.target.value})}
                            />
                          </div>
                        </>
                      )}

                      {formStep === 3 && (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date de naissance</label>
                            <input 
                              required
                              type="date" 
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              value={formData.birthDate}
                              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lieu de naissance</label>
                            <input 
                              required
                              type="text" 
                              placeholder="Ex: Niamey"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              value={formData.birthPlace}
                              onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                            />
                          </div>
                        </>
                      )}

                      {formStep === 4 && (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nationalité</label>
                            <input 
                              required
                              type="text" 
                              placeholder="Ex: Nigérienne"
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                              value={formData.nationality}
                              onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                            />
                          </div>
                        </>
                      )}

                      {formStep === 5 && (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Niveau d'étude actuel</label>
                            <select 
                              required
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                              value={formData.studyLevel}
                              onChange={(e) => setFormData({...formData, studyLevel: e.target.value})}
                            >
                              <option value="">Sélectionner...</option>
                              <option value="Bac">Baccalauréat</option>
                              <option value="Licence">Licence</option>
                              <option value="Master">Master</option>
                              <option value="Doctorat">Doctorat</option>
                              <option value="Autre">Autre</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Profil</label>
                            <select 
                              required
                              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                              value={formData.profile}
                              onChange={(e) => setFormData({...formData, profile: e.target.value})}
                            >
                              <option value="Étudiant">Étudiant</option>
                              <option value="Professionnel">Professionnel</option>
                              <option value="Chercheur d'emploi">Chercheur d'emploi</option>
                            </select>
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100 mt-8 shrink-0 sticky bottom-0 bg-white pb-2 sm:pb-0 sm:static">
                  {formStep > 1 && (
                    <button 
                      type="button"
                      onClick={handlePrevStep}
                      disabled={isSubmitting}
                      className="px-6 py-4 rounded-xl font-bold text-base text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all disabled:opacity-50"
                    >
                      Retour
                    </button>
                  )}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold text-base hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Traitement...</>
                    ) : (
                      formStep < totalSteps ? 'Continuer' : 'Soumettre ma candidature'
                    )}
                  </button>
                </div>
                {error && (
                  <p className="text-xs text-red-500 font-medium text-center mt-2">
                    {error}
                  </p>
                )}
                <p className="text-[11px] text-slate-400 text-center mt-4">
                  Vos données sont confidentielles et traitées par DataMaster.
                </p>
              </form>
            )}

            {step === 'receipt' && (
              <div className="flex flex-col min-h-full">
                <div className="flex items-center justify-between mb-4 shrink-0">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-bold text-sm sm:text-base">Candidature validée avec succès !</span>
                  </div>
                </div>

                {/* A4 Paper Fiche */}
                <div className="md:hidden text-[10px] text-slate-500 mb-2 flex items-center gap-1 shrink-0 font-medium uppercase tracking-wider">
                  <ArrowRight className="w-3 h-3" /> Faites glisser pour voir toute la fiche
                </div>
                <div className="overflow-x-auto w-full pb-4 flex-1 bg-slate-50 sm:bg-transparent rounded-xl sm:rounded-none border sm:border-0 border-slate-100 p-2 sm:p-0">
                  <div 
                    ref={ficheRef}
                    id="fiche-preinscription" 
                    className="bg-white border border-slate-200 shadow-sm p-8 sm:p-12 relative overflow-hidden print:p-0 print:border-0 print:shadow-none mx-auto w-[210mm] h-[297mm] shrink-0"
                  >
                    {/* Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                    <BarChart3 className="w-[400px] h-[400px] -rotate-12" />
                  </div>

                  {/* Header */}
                  <div className="flex justify-between items-start border-b-2 border-indigo-600 pb-6 mb-8 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-600 p-2 rounded-lg">
                        <BarChart3 className="text-white w-8 h-8" />
                      </div>
                      <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tighter">DATAMASTER ACADEMY</h1>
                        <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Expertise en Analyse de Données</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <h2 className="text-lg font-bold text-slate-900">FICHE DE PRÉ-INSCRIPTION</h2>
                      <p className="text-xs text-slate-500 font-mono">#PRE-{Math.floor(Math.random() * 1000000)}</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {/* Student Info */}
                    <div className="md:col-span-2 space-y-6">
                      <section>
                        <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4 border-b border-indigo-100 pb-1">Informations du Candidat</h3>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Nom complet</p>
                            <p className="text-sm font-bold text-slate-900">{formData.fullName}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Téléphone</p>
                            <p className="text-sm font-bold text-slate-900">{formData.phone}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Date de naissance</p>
                            <p className="text-sm font-bold text-slate-900">{formData.birthDate}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Lieu de naissance</p>
                            <p className="text-sm font-bold text-slate-900">{formData.birthPlace}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Nationalité</p>
                            <p className="text-sm font-bold text-slate-900">{formData.nationality}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Région</p>
                            <p className="text-sm font-bold text-slate-900">{formData.residenceRegion}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Email</p>
                            <p className="text-sm font-bold text-slate-900">{formData.email}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Niveau d'étude</p>
                            <p className="text-sm font-bold text-slate-900">{formData.studyLevel}</p>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4 border-b border-indigo-100 pb-1">Programme de Formation</h3>
                        <div className="space-y-3">
                          <div className="flex gap-3 items-start">
                            <div className="w-5 h-5 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 text-[10px] font-bold mt-0.5">01</div>
                            <p className="text-xs text-slate-600"><span className="font-bold text-slate-900">Collecte & Digitalisation :</span> KoboToolbox & ODK</p>
                          </div>
                          <div className="flex gap-3 items-start">
                            <div className="w-5 h-5 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 text-[10px] font-bold mt-0.5">02</div>
                            <p className="text-xs text-slate-600"><span className="font-bold text-slate-900">Traitement & Analyse :</span> SPSS, STATA & Sphinx</p>
                          </div>
                          <div className="flex gap-3 items-start">
                            <div className="w-5 h-5 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 text-[10px] font-bold mt-0.5">03</div>
                            <p className="text-xs text-slate-600"><span className="font-bold text-slate-900">Visualisation :</span> Excel Avancé & Tableaux de bord</p>
                          </div>
                        </div>
                      </section>
                    </div>

                    {/* QR & Verification */}
                    <div className="space-y-8">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                        <div className="bg-white p-3 rounded-xl shadow-sm mb-3">
                          <QrCode className="w-24 h-24 text-slate-900" />
                        </div>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Code de Vérification</p>
                        <p className="text-[10px] font-mono text-slate-900 mt-1">VERIF-DM-2026-OK</p>
                      </div>

                      <div className="p-4 border-2 border-indigo-50 rounded-2xl">
                        <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2">À régler</h4>
                        <div className="flex justify-between items-end">
                          <span className="text-2xl font-black text-slate-900">10 000 F</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase mb-1">CFA</span>
                        </div>
                        <p className="text-[9px] text-slate-400 mt-2 italic">Paiement physique au secrétariat</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-16 pt-8 border-t border-slate-100 text-center relative z-10">
                    <p className="text-[10px] text-slate-400 leading-relaxed max-w-md mx-auto">
                      Cette fiche de pré-inscription est valable pour la session d'Avril 2026. 
                      Veuillez vous présenter au secrétariat muni de ce document pour finaliser votre inscription.
                    </p>
                    <div className="mt-6 flex justify-center gap-8">
                      <div className="text-left">
                        <p className="text-[9px] text-slate-300 font-bold uppercase mb-8">Signature Candidat</p>
                        <div className="w-32 h-[1px] bg-slate-200" />
                      </div>
                      <div className="text-left">
                        <p className="text-[9px] text-slate-300 font-bold uppercase mb-8">Cachet Academy</p>
                        <div className="w-32 h-[1px] bg-slate-200" />
                      </div>
                    </div>
                  </div>
                </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6 shrink-0 sticky bottom-0 bg-white pb-2 sm:pb-0 sm:static pt-2 sm:pt-0">
                  <button 
                    onClick={handleDownloadPDF}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold text-base hover:bg-slate-800 transition-all shadow-lg"
                  >
                    <Download className="w-5 h-5" /> Télécharger la fiche PDF
                  </button>
                  <button 
                    onClick={onClose}
                    className="flex-1 bg-white text-slate-500 py-4 rounded-xl font-bold text-base hover:bg-slate-50 transition-all border border-slate-200"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Toaster position="top-center" richColors />
      <Navbar onStartRegistration={() => setIsRegistrationOpen(true)} />
      <main>
        <Hero 
          onShowProgramme={() => setIsBrochureOpen(true)} 
          onStartRegistration={() => setIsRegistrationOpen(true)}
        />
        <PainSolution />
        <Analytics />
        <Modules />
        <Tools />
        <Bonuses />
        <Testimonials />
        <Pricing onStartRegistration={() => setIsRegistrationOpen(true)} />
        <FAQ />
      </main>
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      <BrochureModal 
        isOpen={isBrochureOpen} 
        onClose={() => setIsBrochureOpen(false)} 
        onStartRegistration={() => setIsRegistrationOpen(true)}
      />
      <RegistrationModal 
        isOpen={isRegistrationOpen} 
        onClose={() => setIsRegistrationOpen(false)} 
      />
      <AdminDashboard 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
