import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Cpu,
  Database,
  Boxes,
  BadgeCheck,
  Shield,
  Bot,
  Code2,
  Network,
  Rocket,
  TerminalSquare,
  Gamepad2,
  MessageCircle,
  Star,
  Trophy,
  Zap,
  Sparkles,
  Palette,
  Newspaper,
  FileText,
  Lock,
  QrCode,
} from "lucide-react";

/* ============================== TIPOS ============================== */
type SectionTitleProps = {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
};

type ContactItemProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  onClick?: () => void;
  tooltip?: string;
};

type GitHubUser = {
  login: string;
  public_repos: number;
  avatar_url?: string;
  followers?: number;
  public_gists?: number;
  created_at?: string;
};

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description?: string | null;
  stargazers_count: number;
  forks_count: number;
  language?: string | null;
  pushed_at: string;
};

type AchievementsData = {
  followers: number;
  public_repos: number;
  public_gists: number;
  since: number | null;
  stars: number;
};

type BlogArticle = {
  title: string;
  url: string;
  tags: string[];
  Icon?: React.ComponentType<{ className?: string }>;
};

type Certificate = {
  name: string;
  issuer: string;
  credential: string;
};

/* ============================== APP ============================== */
// 🚀 Currículo Web — Juan Mendes (Mobile-First Overflow-Safe)

export default function PortfolioJuanMendes() {
  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden">
      <GlobalOverflowReset />
      <AuroraBG />
      <CursorGlow />
      <GridFX />
      <ScrollProgress />
      <NavBar />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <Hero />
        <ContactStrip />
        <AboutMe />

        {/* GRID PRINCIPAL: min-w-0 em cada coluna */}
        <div className="grid lg:grid-cols-3 gap-5 sm:gap-6 mt-8">
          <div className="lg:col-span-2 space-y-5 sm:space-y-6 min-w-0">
            <ProjectsFromGitHub username="juanmmendes" />
            <TopLanguages username="juanmmendes" />
            <Experience />
            <BlogArticles />
            <Education />
          </div>
          <div className="space-y-5 sm:space-y-6 min-w-0">
            <TechMarquee />
            <TechStack />
            <Achievements username="juanmmendes" />
            <LinkedInBadge vanity="juan-mendes-739084273" />
            <SteamCard />
            <NowPlaying />
            <CepBadge cep="13189-210" />
          </div>
        </div>

        <Footer />
      </main>

      <DevSmoke />
    </div>
  );
}

/* ============================== RESET GLOBAL ============================== */
function GlobalOverflowReset() {
  return (
    <style>{`
      html, body { overflow-x: hidden; }
      * { min-width: 0; }
      img, svg, video, canvas { max-width: 100%; height: auto; }
      .clip-content { overflow: hidden; }
      .no-track-overflow { word-break: break-word; overflow-wrap: anywhere; }
    `}</style>
  );
}

/* ============================== DECOR ============================== */
function AuroraBG() {
  return (
    <div className="fixed inset-0 -z-20 clip-content pointer-events-none">
      <div className="absolute inset-0 bg-black" />
      <motion.div
        className="absolute rounded-full blur-3xl bg-gradient-to-br from-fuchsia-500/35 via-violet-500/25 to-cyan-400/25"
        style={{ top: "-20vw", left: "-20vw", width: "72vw", height: "72vw" }}
        animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.7, 1, 0.7], rotate: 360 }}
        transition={{
          scale: { duration: 8, ease: "easeInOut", repeat: Infinity },
          opacity: { duration: 8, ease: "easeInOut", repeat: Infinity },
          rotate: { duration: 60, ease: "linear", repeat: Infinity },
        }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl bg-gradient-to-br from-indigo-600/30 via-sky-500/20 to-emerald-400/20"
        style={{ top: "33%", right: "-10vw", width: "56vw", height: "56vw" }}
        animate={{ scale: [0.96, 1.06, 0.96], opacity: [0.65, 0.95, 0.65], rotate: -360 }}
        transition={{
          scale: { duration: 10, ease: "easeInOut", repeat: Infinity },
          opacity: { duration: 10, ease: "easeInOut", repeat: Infinity },
          rotate: { duration: 72, ease: "linear", repeat: Infinity },
        }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl bg-gradient-to-tr from-rose-500/25 via-fuchsia-400/20 to-amber-300/20"
        style={{ bottom: "-12vw", left: "20%", width: "68vw", height: "68vw" }}
        animate={{ scale: [0.94, 1.07, 0.94], opacity: [0.6, 0.9, 0.6], rotate: 360 }}
        transition={{
          scale: { duration: 12, ease: "easeInOut", repeat: Infinity },
          opacity: { duration: 12, ease: "easeInOut", repeat: Infinity },
          rotate: { duration: 84, ease: "linear", repeat: Infinity },
        }}
      />
    </div>
  );
}

function GridFX() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 opacity-[0.08] clip-content">
      <div
        className="w-full h-full"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px, 40px 40px",
          backgroundPosition: "0 0, 0 0",
          maskImage:
            "radial-gradient(circle at 50% 30%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)",
        }}
      />
    </div>
  );
}

// Glow do cursor
function CursorGlow() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  const style = useMemo(
    () =>
      ({
        left: pos.x - 200,
        top: pos.y - 200,
        position: "absolute",
        background:
          "radial-gradient(closest-side, rgba(99,102,241,.35), rgba(244,114,182,.22), rgba(34,211,238,0) 70%)",
      } as React.CSSProperties),
    [pos]
  );
  return (
    <div className="fixed inset-0 -z-[9] pointer-events-none clip-content" aria-hidden>
      <div className="blur-3xl opacity-50 mix-blend-soft-light" style={style}>
        <div className="w-[clamp(240px,40vw,520px)] aspect-square" />
      </div>
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      <div
        id="scroll-progress-bar"
        className="h-1 bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ============================== PRIMITIVOS ============================== */
type CardProps = {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
};

function Card({ children, className = "", tilt = false }: CardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotateX.set(py * -8);
    rotateY.set(px * 8);
  }
  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ perspective: 1200, rotateX, rotateY }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className={
        "relative rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden " +
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none " +
        "max-w-full " +
        className
      }
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-fuchsia-500/10 via-indigo-500/10 to-cyan-400/10 blur-xl" />
      <div className="relative p-4 sm:p-6 min-w-0">{children}</div>
    </motion.div>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }: SectionTitleProps) {
  return (
    <div className="flex items-start sm:items-center gap-3 mb-4 min-w-0">
      {Icon ? <Icon className="w-5 h-5 text-indigo-300 shrink-0" /> : null}
      <div className="min-w-0">
        <h3 className="text-lg font-semibold tracking-wide leading-tight supports-[text-wrap:balance]:[text-wrap:balance]">
          {title}
        </h3>
        {subtitle ? (
          <p className="text-sm text-slate-300/80 mt-1 leading-snug break-words">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ============================== NAV ============================== */
function NavBar() {
  return (
    <div className="sticky top-0 z-40 bg-black/50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <LogoJM size={28} />
          <span className="font-semibold tracking-wide text-sm sm:text-base truncate">
            Juan Mendes • Full Stack & Automação
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-3 text-sm text-slate-300/90">
          <a href="#projetos" className="hover:text-white">
            Projetos
          </a>
          <a href="#experiencia" className="hover:text-white">
            Experiência
          </a>
          <a href="#formacao" className="hover:text-white">
            Formação
          </a>
          <a href="#contatos" className="hover:text-white">
            Contato
          </a>
        </nav>
      </div>
    </div>
  );
}

/* LOGO “J” */
function LogoJM({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className="drop-shadow-[0_0_12px_rgba(99,102,241,.35)]"
    >
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="50%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#g)" opacity="0.15" />
      <path
        d="M44 16v20a12 12 0 0 1-12 12h-8"
        stroke="url(#g)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M20 48h10" stroke="url(#g)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/* ============================== HERO ============================== */
function Hero() {
  return (
    <section className="pt-8 md:pt-12">
      <Card tilt>
        <div className="grid lg:grid-cols-[1.15fr,0.85fr] gap-6 lg:gap-8 items-center min-w-0">
          <div className="min-w-0">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight supports-[text-wrap:balance]:[text-wrap:balance]"
            >
              <span className="inline-flex items-center gap-3 min-w-0">
                <LogoJM />
                <span className="truncate">Juan Mendes</span>
              </span>
            </motion.h1>
            <p className="mt-3 text-base md:text-xl text-slate-200/90">
              Full Stack Developer • IA • Automação • BI • N8N
            </p>
            <p className="mt-4 text-slate-200/85 leading-relaxed max-w-3xl">
              Eu crio soluções de software com <strong>identidade</strong>:
              automações robustas, integrações de APIs e produtos digitais de
              alta performance. Foco em qualidade, segurança e DX.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contatos"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-indigo-600/90 hover:bg-indigo-500 transition shadow-lg"
              >
                <Rocket className="w-4 h-4" /> Fale comigo
              </a>
              <a
                href="https://github.com/juanmmendes"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-white/10 hover:bg-white/20 transition"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/juan-mendes-739084273"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-white/10 hover:bg-white/20 transition"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>

          <div className="relative min-w-0">
            <AvatarOrb username="juanmmendes" />
          </div>
        </div>
      </Card>
    </section>
  );
}

function AvatarOrb({ username }: { username: string }) {
  const [avatar, setAvatar] = useState<string | null>(null);
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => r.json())
      .then((u: GitHubUser) => setAvatar(u && u.avatar_url ? u.avatar_url : null))
      .catch(() => {});
  }, [username]);
  return (
    <div className="relative aspect-square rounded-[2rem] border border-white/15 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      <div className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-br from-fuchsia-500/30 via-indigo-500/30 to-cyan-400/30" />
      <div className="absolute inset-0 m-4 sm:m-6 rounded-2xl bg-black/30 backdrop-blur flex items-center justify-center">
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full ring-4 ring-white/20 shadow-2xl object-cover"
          />
        ) : (
          <div className="text-6xl md:text-7xl">🧠</div>
        )}
      </div>
    </div>
  );
}

/* ============================== CONTATOS ============================== */
function ContactStrip() {
  const copy = (text: string) => navigator.clipboard?.writeText(text);
  return (
    <section id="contatos" className="mt-6">
      <Card tilt>
        <SectionTitle
          icon={Network}
          title="Contato e Redes"
          subtitle="Respostas rápidas e colaboração"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 min-w-0">
          <ContactItem
            icon={Mail}
            label="E-mail"
            value="juan.zx016@gmail.com"
            href="mailto:juan.zx016@gmail.com"
          />
          <ContactItem
            icon={Phone}
            label="Telefone"
            value="(19) 99979-1601"
            href="tel:+5519999791601"
          />
          <ContactItem
            icon={MessageCircle}
            label="Discord"
            value="724413788203253773"
            onClick={() => copy("724413788203253773")}
            tooltip="Copiar ID"
          />
          <ContactItem
            icon={Linkedin}
            label="LinkedIn"
            value="/in/juan-mendes-739084273"
            href="https://www.linkedin.com/in/juan-mendes-739084273"
          />
          <ContactItem
            icon={Github}
            label="GitHub"
            value="juanmmendes"
            href="https://github.com/juanmmendes"
          />
          <ContactItem
            icon={Gamepad2}
            label="Steam"
            value="Perfil"
            href="https://steamcommunity.com/profiles/76561199305304396"
          />
        </div>
      </Card>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
  onClick,
  tooltip,
}: ContactItemProps) {
  const content = (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10 cursor-pointer">
      <Icon className="w-4 h-4 text-indigo-300 shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="text-xs uppercase tracking-wider text-slate-300/80">
          {label}
        </div>
        <div className="text-sm font-medium truncate">{value}</div>
      </div>
      {href ? <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70 shrink-0" /> : null}
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" title={tooltip} className="block w-full">
      {content}
    </a>
  ) : (
    <button onClick={onClick} title={tooltip} className="text-left w-full">
      {content}
    </button>
  );
}

/* ============================== DNA VISUAL ============================== */
function TechMarquee() {
  const items = [
    { Icon: Code2, label: "TypeScript" },
    { Icon: Database, label: "PostgreSQL" },
    { Icon: Bot, label: "N8N" },
    { Icon: Boxes, label: "Docker" },
    { Icon: Shield, label: "OAuth 2.0" },
    { Icon: Cpu, label: "IA/ML" },
    { Icon: TerminalSquare, label: "CI/CD" },
    { Icon: Network, label: "APIs" },
  ];
  return (
    <Card tilt>
      <SectionTitle icon={Palette} title="DNA Visual & Tech" subtitle="Marquee interativo com minhas stacks principais" />
      <div className="relative overflow-x-hidden rounded-xl">
        <div className="flex gap-3 sm:gap-6 animate-[scrolllinear_18s_linear_infinite] will-change-transform min-w-[200%]">
          {[...items, ...items, ...items].map((it, i) => (
            <div key={i} className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
              <it.Icon className="w-4 h-4 text-fuchsia-300" />
              <span className="text-sm">{it.label}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes scrolllinear { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
@media (prefers-reduced-motion: reduce) { .animate-[scrolllinear_18s_linear_infinite] { animation: none !important; } }`}</style>
    </Card>
  );
}

/* ============================== STACK ============================== */
function TechStack() {
  const skills = [
    { icon: Code2, label: "Node.js / TypeScript" },
    { icon: Database, label: "PostgreSQL (Supabase)" },
    { icon: Bot, label: "N8N • Webhooks • APIs" },
    { icon: Shield, label: "OAuth 2.0 • Segurança" },
    { icon: Boxes, label: "Docker • Microserviços" },
    { icon: Cpu, label: "IA • Machine Learning" },
    { icon: TerminalSquare, label: "CI/CD • Filas" },
    { icon: Network, label: "Integrações Multicanal" },
  ];

  return (
    <Card tilt>
      <SectionTitle icon={BadgeCheck} title="Stack & Foco" subtitle="Ferramentas e áreas que mais uso" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
        {skills.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl p-3 bg-white/5 border border-white/10 hover:shadow-[0_0_0_1px_rgba(255,255,255,.15)]"
          >
            <s.icon className="w-4 h-4 text-teal-300 shrink-0" />
            <span className="text-sm break-words">{s.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ============================== PROJETOS EM DESTAQUE (GitHub) ============================== */
function ProjectsFromGitHub({ username }: { username: string }) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`).then((res) => res.json() as Promise<GitHubUser>),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`).then((res) => res.json() as Promise<GitHubRepo[]>),
        ]);
        setUser(u);
        const sorted = Array.isArray(r)
          ? [...r].sort(
              (a, b) =>
                b.stargazers_count - a.stargazers_count ||
                new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
            )
          : [];
        setRepos(sorted.slice(0, 6));
      } catch (err: unknown) {
        console.error("[ProjectsFromGitHub] fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [username]);

  return (
    <section id="projetos">
      <Card tilt>
        <SectionTitle
          icon={Github}
          title="Projetos em Destaque (GitHub)"
          subtitle={user ? `@${user.login} • ${user.public_repos} repositórios` : "Integração via API pública do GitHub"}
        />
        {loading ? (
          <div className="h-24 grid place-items-center text-slate-300">Carregando dados do GitHub…</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            {repos.map((repo) => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="group block min-w-0">
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/0 via-indigo-500/0 to-cyan-400/0 group-hover:from-fuchsia-500/10 group-hover:via-indigo-500/10 group-hover:to-cyan-400/10 blur-xl" />
                  <div className="relative flex items-center gap-2 min-w-0">
                    <span className="text-sm font-semibold group-hover:text-white truncate">{repo.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70 shrink-0" />
                  </div>
                  <p className="relative text-sm text-slate-300/90 mt-1 break-words">
                    {repo.description || "Sem descrição."}
                  </p>
                  <div className="relative mt-3 text-xs flex flex-wrap items-center gap-3 text-slate-300/80">
                    <span>
                      <Star className="inline w-3 h-3 mr-1" /> {repo.stargazers_count}
                    </span>
                    <span>⬚ {repo.forks_count}</span>
                    {repo.language ? <span>⌘ {repo.language}</span> : null}
                    <span className="ml-auto">Atualizado {new Date(repo.pushed_at).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </Card>
    </section>
  );
}

/* ============================== LINGUAGENS EM EVIDÊNCIA ============================== */
function TopLanguages({ username }: { username: string }) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then((r) => r.json() as Promise<GitHubRepo[]>)
      .then((data) => setRepos(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [username]);

  const langCount = useMemo(() => {
    const m = new Map<string, number>();
    repos.forEach((r) => r.language && m.set(r.language, (m.get(r.language) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [repos]);
  const total = langCount.reduce((acc, [, c]) => acc + c, 0) || 1;

  return (
    <Card tilt>
      <SectionTitle icon={Palette} title="Linguagens em Evidência" subtitle="Distribuição por repositórios" />
      <div className="space-y-3 min-w-0">
        {langCount.map(([lang, count]) => (
          <div key={lang} className="min-w-0">
            <div className="flex justify-between gap-3 text-xs text-slate-300/80">
              <span className="truncate">{lang}</span>
              <span className="shrink-0">{Math.round((count / total) * 100)}%</span>
            </div>
            <div className="h-2 mt-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-300"
                style={{ width: `${(count / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
        {langCount.length === 0 && (
          <div className="text-sm text-slate-300/80">Sem dados de linguagens disponíveis.</div>
        )}
      </div>
    </Card>
  );
}

/* ============================== EXPERIÊNCIA ============================== */
function Experience() {
  const items = [
    {
      title: "Desenvolvedor de software — Marinho Mendes Advogados",
      period: "jun/2025 — atual",
      location: "Campinas/SP",
      bullets: [
        "Arquitetando automações jurídicas com Node.js/TypeScript, PostgreSQL (Supabase) e N8N.",
        "Implementação de arquitetura orientada a eventos e microserviços para otimização operacional.",
        "Stack: Node.js • PostgreSQL • N8N • Docker • RESTful APIs • WebHooks • OAuth 2.0.",
        "Arquitetura: Event Sourcing • DDD • CI/CD • Filas • Integração Multicanal.",
      ],
    },
    {
      title: "Auxiliar administrativo executivo — Condomínio Monterrey Reserva",
      period: "out/2024 — jun/2025",
      location: "Monte Mor/SP",
      bullets: [
        "Atendimento a condôminos e fornecedores; suporte administrativo, financeiro e operacional.",
        "Organização de contratos, relatórios e correspondências; apoio a assembleias e reuniões.",
        "Acompanhamento de serviços terceirizados e rotinas de manutenção das áreas comuns.",
      ],
    },
    {
      title: "Estagiário de TI — UNASP Hortolândia",
      period: "jan/2022 — nov/2024",
      location: "Hortolândia/SP",
      bullets: [
        "Participação em manutenção de sistemas, suporte a hardware/software e atendimento a usuários.",
        "Aplicação prática de conhecimentos e fortalecimento de trabalho em equipe e resolução de problemas.",
      ],
    },
  ];

  return (
    <section id="experiencia">
      <Card tilt>
        <SectionTitle icon={BriefcaseIcon} title="Experiência" />
        <div className="space-y-5 min-w-0">
          {items.map((it, idx) => (
            <div key={idx} className="relative pl-5 border-l border-white/10 min-w-0">
              <span
                className="absolute left-0 top-2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-400 shadow"
                aria-hidden
              />
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <h4 className="font-semibold break-words">{it.title}</h4>
                <span className="text-xs text-slate-300/80">• {it.location}</span>
              </div>
              <div className="text-xs text-slate-300/80 mt-0.5">{it.period}</div>
              <ul className="mt-2 text-sm list-disc pl-4 space-y-1 text-slate-200/90">
                {it.bullets.map((b, i) => (
                  <li key={i} className="break-words">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-indigo-300" {...props}>
      <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M3 13h18" />
    </svg>
  );
}

/* ============================== BLOG ============================== */
function BlogArticles() {
  const articles: BlogArticle[] = [
    {
      title: "Ransomware e Vazamento de Dados: como proteger sua organização",
      url: "https://www.marinhomendes.adv.br/blog/ransomware-e-vazamento-de-dados/",
      tags: ["Segurança", "LGPD", "Risco"],
      Icon: Lock,
    },
    {
      title: "LGPD na Era da IA Generativa: riscos, limites e boas práticas",
      url: "https://www.marinhomendes.adv.br/blog/lgpd-na-era-da-ia-generativa/",
      tags: ["LGPD", "IA", "Governança"],
      Icon: Shield,
    },
    {
      title: "O uso da IA Generativa: Como garantir a segurança e a precisão?",
      url: "https://www.marinhomendes.adv.br/blog/ia-direito-seguranca/",
      tags: ["LGPD", "Compliance"],
      Icon: FileText,
    },
    {
      title: "Advocacia & Tecnologia: visão prática",
      url: "https://www.marinhomendes.adv.br/blog/advocacia-e-tecnologia/",
      tags: ["Tecnologia", "Prática Jurídica"],
      Icon: Newspaper,
    },
  ];

  return (
    <section id="blog">
      <Card tilt>
        <SectionTitle icon={Newspaper} title="Artigos do Blog" subtitle="Conteúdo autoral — tecnologia, LGPD e segurança" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
          {articles.map(({ title, url, tags, Icon }, i) => (
            <a key={i} href={url} target="_blank" rel="noreferrer" className="group block min-w-0">
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/0 via-indigo-500/0 to-cyan-400/0 group-hover:from-fuchsia-500/10 group-hover:via-indigo-500/10 group-hover:to-cyan-400/10 blur-xl" />
                <div className="relative flex items-start gap-3 min-w-0">
                  {Icon ? <Icon className="w-5 h-5 text-indigo-300 shrink-0" /> : null}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold group-hover:text-white leading-snug break-words">{title}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-2 shrink-0" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </Card>
    </section>
  );
}

/* ============================== FORMAÇÃO ============================== */
function Education() {
  return (
    <section id="formacao">
      <Card tilt>
        <SectionTitle icon={HatIcon} title="Formação Acadêmica" />
        <ul className="space-y-4 min-w-0">
          <li>
            <div className="font-semibold break-words">Bacharelado — Sistemas da Informação (em curso)</div>
            <div className="text-sm text-slate-300/80">Centro Universitário Adventista de São Paulo — fev/2025 a dez/2028</div>
          </li>
          <li>
            <div className="font-semibold break-words">Técnico Integrado — Ciências da Computação e Informática</div>
            <div className="text-sm text-slate-300/80">Centro Universitário Adventista de São Paulo — jan/2022 a dez/2024</div>

            {/* PROJETO DE TCC — Quick Location */}
            <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 mb-1">
                <QrCode className="w-4 h-4 text-indigo-300" />
                <span className="font-semibold">Projeto de TCC — Quick Location (Controle de Acesso por QR Code)</span>
              
              </div>
              <p className="text-sm text-slate-200/90 leading-relaxed">
                Desenvolvi uma plataforma web de <strong>check-in/out por QR Code</strong> com <strong>rastreamento em tempo real</strong>, trilha de auditoria e painéis de presença, com foco em <strong>segurança, escalabilidade e usabilidade</strong>.
              </p>
              <ul className="mt-2 text-sm list-disc pl-5 space-y-1 text-slate-200/90">
                <li>
                  <strong>Arquitetura e MVP:</strong> full-stack (Node.js/Express, HTML/CSS/JS, BD relacional) e <strong>MVP já publicado e funcional</strong>, com landing e planos.
                </li>
                <li>
                  <strong>Dados & SQL:</strong> consultas para presença/ausência, entradas sem saída e inconsistências.
                </li>
                <li>
                  <strong>Segurança:</strong> HTTPS, criptografia em repouso (AES-256), MFA, RBAC, logging e monitoramento.
                </li>
                <li>
                  <strong>Mapas & QR:</strong> Leaflet/Google Maps + QRCode.js/ZXing; visualização espacial e rastreio em tempo real.
                </li>
                <li>
                  <strong>Operação & relatórios:</strong> permanência, rotas, áreas visitadas; rotinas administrativas e pontos de instalação de QR.
                </li>
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10">Node.js (Express)</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10">JavaScript</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10">MySQL/PostgreSQL</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10">Leaflet</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10">QRCode.js/ZXing</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10">REST APIs</span>
              </div>
              <div className="mt-3">
                <a
                  href="https://www.projetomed.com.br/TECTI/2024/3TIC/grupo06/quickLocation/public/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 bg-indigo-600/90 hover:bg-indigo-500 transition shadow"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Ver site / demo
                </a>
              </div>
            </div>
          </li>
        </ul>
      </Card>
    </section>
  );
}

function HatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-indigo-300" {...props}>
      <path d="M3 10l9-5 9 5-9 5-9-5z" />
      <path d="M21 10v6" />
      <path d="M3 10v6a9 4 0 0 0 18 0" />
    </svg>
  );
}

/* ============================== LINKEDIN ============================== */
function LinkedInBadge({ vanity = "juan-mendes-739084273" }: { vanity?: string }) {
  return (
    <Card tilt>
      <SectionTitle icon={Linkedin} title="LinkedIn" subtitle="Cartão 3D personalizado" />
      <LinkedInGlass vanity={vanity} />
    </Card>
  );
}

function LinkedInGlass({ vanity }: { vanity: string }) {
  return (
    <div id="linkedin-glass" className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-5">
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-fuchsia-500/10 via-indigo-500/10 to-cyan-400/10 blur-2xl" />
      <div className="relative grid gap-3 sm:grid-cols-[auto,1fr] sm:gap-4 items-center min-w-0">
        <div className="shrink-0">
          <LogoJM size={48} />
        </div>
        <div className="min-w-0">
          <div className="text-xl font-bold truncate">Juan Mendes</div>
          <div className="text-sm text-slate-300/90 break-words">
            Full Stack Developer | Machine Learning | Business Intelligence | Data Science | N8N
          </div>
          <div className="text-xs text-slate-300/70 mt-1 break-words">
            Marinho Mendes Advogados • Centro Universitário Adventista de São Paulo
          </div>
        </div>
        <div className="sm:col-span-2 mt-2 flex flex-wrap gap-2">
          <a
            href={`https://www.linkedin.com/in/${vanity}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 bg-indigo-600/90 hover:bg-indigo-500 transition shadow"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Ver perfil
          </a>
          <a
            href={`https://www.linkedin.com/in/${vanity}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20 transition"
          >
            Conectar
          </a>
        </div>
      </div>
    </div>
  );
}

/* ============================== STEAM ============================== */
function SteamCard() {
  return (
    <Card tilt>
      <SectionTitle icon={Gamepad2} title="Steam" subtitle="Games & comunidade" />
      <a
        href="https://steamcommunity.com/profiles/76561199305304396"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm"
      >
        <ExternalLink className="w-3.5 h-3.5" /> Abrir perfil Steam
      </a>
    </Card>
  );
}

/* ============================== CONQUISTAS (GitHub) ============================== */
function Achievements({ username }: { username: string }) {
  const [data, setData] = useState<AchievementsData | null>(null);

  useEffect(() => {
    async function run() {
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`).then((res) => res.json() as Promise<GitHubUser>),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`).then((res) => res.json() as Promise<GitHubRepo[]>),
        ]);
        const stars = (Array.isArray(r) ? r : []).reduce((acc, x) => acc + (x.stargazers_count || 0), 0);
        setData({
          followers: (u && (u.followers as number)) || 0,
          public_repos: (u && (u.public_repos as number)) || 0,
          public_gists: (u && (u.public_gists as number)) || 0,
          since: u && u.created_at ? new Date(u.created_at).getFullYear() : null,
          stars,
        });
      } catch (err: unknown) {
        console.error("[Achievements] fetch failed:", err);
      }
    }
    run();
  }, [username]);

  // Fallbacks SEM optional chaining / nullish coalescing no JSX
  const followers = data ? data.followers : "—";
  const repos = data ? data.public_repos : "—";
  const stars = data ? data.stars : "—";
  const since = data ? (data.since !== null ? data.since : "—") : "—";

  return (
    <Card tilt>
      <SectionTitle icon={Trophy} title="Conquistas & Números" subtitle="GitHub em tempo real" />
      <div className="grid grid-cols-2 gap-3 min-w-0" id="achievements-stats">
        <Stat label="Followers" value={followers} />
        <Stat label="Repositórios" value={repos} />
        <Stat label="Stars (somadas)" value={stars} />
        <Stat label="Desde" value={since} />
      </div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4 bg-white/5 border border-white/10 min-w-0">
      <div className="text-xs uppercase tracking-wider text-slate-300/80">{label}</div>
      <div className="mt-1 text-2xl font-bold break-words">{value}</div>
    </div>
  );
}

/* ============================== CEP (badge) ============================== */
function CepBadge({ cep }: { cep: string }) {
  return (
    <Card tilt>
      <SectionTitle icon={MapPin} title="CEP" subtitle="Contato local" />
      <div className="grid place-items-center">
        <div className="px-5 py-3 rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-500/10 via-indigo-500/10 to-cyan-400/10 backdrop-blur text-center no-track-overflow">
          <div className="text-[11px] uppercase tracking-widest text-slate-300/80">Código Postal</div>
          <div className="mt-1 text-2xl font-black tracking-[0.15em] select-text">{cep}</div>
        </div>
      </div>
    </Card>
  );
}

/* ============================== NOW PLAYING ============================== */
function NowPlaying() {
  return (
    <Card tilt>
      <SectionTitle icon={Zap} title="No fone agora!" subtitle="Meu status musical em tempo real" />
      <div className="grid place-items-center gap-4 text-center clip-content">
        <img
          id="spotify-typing"
          src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=18&duration=2000&pause=1000&color=1DB954&center=true&vCenter=true&width=500&lines=%F0%9F%8E%B5+Currently+Listening+To...;%F0%9F%8E%B6+Coding+with+the+perfect+soundtrack!"
          alt="Spotify Typing"
          className="w-full max-w-[500px] h-auto block"
        />
        <img
          id="spotify-card"
          src="https://spotify-github-profile.kittinanx.com/api/view.svg?uid=3327c87dcmrrgsk3rh8efzcfo&cover_image=true&theme=default&show_offline=true&background_color=121212&interchange=true&bar_color=69bfa5&bar_color_cover=true"
          alt="Spotify Currently Playing"
          className="w-full max-w-[500px] h-auto block"
        />
      </div>
    </Card>
  );
}

/* ============================== FOOTER ============================== */
function Footer() {
  return (
    <div className="py-10 text-center text-xs text-slate-400/80">
      © {new Date().getFullYear()} Juan Mendes — Identidade Neon-Tech • React + Tailwind • Framer Motion
    </div>
  );
}

/* ============================== SOBRE MIM + CERTIFICAÇÕES ============================== */
function AboutMe() {
  const programming = ["TypeScript", "JavaScript", "Python (dados)", "SQL", "HTML", "CSS/Tailwind"];
  const studies = [
    "Ciência de Dados",
    "Inteligência Artificial",
    "Business Intelligence",
    "Automação (n8n)",
    "Engenharia de Software",
    "Cloud & DevOps",
    "Segurança da Informação",
  ];
  const certificates: Certificate[] = [
    { name: "Oficina de Língua Portuguesa (Gramática)", issuer: "Fundação Bradesco", credential: "50DF6C46-BF4B-4D33-9E39-C148 68ED1929" },
    { name: "Administrando Banco de Dados", issuer: "Fundação Bradesco", credential: "B5EEDA3C-5F1A-4F50-A005-D0D 964454296" },
    { name: "Análise de Dados no Power BI", issuer: "Fundação Bradesco", credential: "5309B7F4-723C-4AA3-A35F-F0FBC B30B3C5" },
    { name: "Curso Postura e Imagem Profissional", issuer: "Fundação Bradesco", credential: "E0405F0B-6808-4D22-9CE3-CF727 DA3924F" },
    { name: "IA para seu Novo Emprego: do Currículo à Entrevista", issuer: "Fundação Bradesco", credential: "47AB6F4F-9B92-4867-A948-CD3CC A5D2A06" },
    { name: "Implementação de Banco de Dados", issuer: "Fundação Bradesco", credential: "02F16181-843F-48D7-83A7-F7157 F1AE223" },
    { name: "Inteligência Artificial e o Novo Contexto da Cultura Digital", issuer: "Fundação Bradesco", credential: "B7CDFC99-B21B-4167-B3B7-BBAD 47C06958" },
    { name: "Lei Geral de Proteção de Dados (LGPD)", issuer: "Fundação Bradesco", credential: "0B90AFCA-2DD3-4383-9BC9-BD58 9C27D2AB" },
    { name: "Segurança em Tecnologia da Informação", issuer: "Fundação Bradesco", credential: "4FD2CD83-9D63-4D72-B14C-51EA 49953704" },
    { name: "SharePoint", issuer: "Fundação Bradesco", credential: "1789CB78-9CE7-44E4-9977-AC0D0 FF66BEC" },
    { name: "Visualizando Dados no Power BI", issuer: "Fundação Bradesco", credential: "47AB6F4F-9B92-4867-A948-CD3CC A5D2A06" },
  ];

  return (
    <section className="mt-6">
      <Card tilt>
        <SectionTitle icon={Sparkles} title="Sobre mim" subtitle="Perfil, linguagens, certificações e áreas de estudo" />
        <div className="grid lg:grid-cols-3 gap-6 min-w-0">
          <div className="lg:col-span-2 space-y-3 min-w-0">
            <p className="text-slate-200/90 leading-relaxed">
              Sou o <strong>Juan Mendes</strong>, desenvolvedor <em>full stack</em> com paixão por <strong>automação</strong>, <strong>dados</strong> e <strong>experiências digitais com identidade</strong>.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 min-w-0">
              <div className="rounded-xl p-4 bg-white/5 border border-white/10">
                <div className="text-xs uppercase tracking-wider text-slate-300/80 mb-2">Linguagens (código)</div>
                <div className="flex flex-wrap gap-2">
                  {programming.map((p) => (
                    <span key={p} className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-4 bg-white/5 border border-white/10">
                <div className="text-xs uppercase tracking-wider text-slate-300/80 mb-2">Idiomas </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="px-2.5 py-1 rounded-full bg-white/10">Português — Nativo</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10">Inglês — Profissional</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10">Espanhol — Profissional</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-4 bg-white/5 border border-white/10">
              <div className="text-xs uppercase tracking-wider text-slate-300/80 mb-2">Áreas de estudo & foco</div>
              <div className="flex flex-wrap gap-2">
                {studies.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-400/30">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-4 bg-white/5 border border-white/10">
              <div className="text-xs uppercase tracking-wider text-slate-300/80 mb-2">Trabalhos & entregas recentes </div>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-200/90">
                <li>
                  Bots e fluxos <strong>n8n</strong> com autenticação OAuth2, capturas multicanal e integrações (WhatsApp/Sheets/API).
                </li>
                <li>
                  APIs <strong>REST</strong> com Node.js/TypeScript e <strong>PostgreSQL</strong>, com logs estruturados e filas.
                </li>
                <li>
                  Dashboards de <strong>BI</strong> com métricas em tempo real e pipelines de dados.
                </li>
                <li>
                  UIs reativas com <strong>React</strong> + <strong>Tailwind</strong> + <strong>Framer Motion</strong>.
                </li>
              </ul>
            </div>
          </div>

          {/* Certificações */}
          <div className="space-y-3 min-w-0">
            <div className="rounded-xl p-4 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <BadgeCheck className="w-4 h-4 text-emerald-300" />
                <h4 className="font-semibold">Certificações</h4>
              </div>
              <ul className="space-y-2 text-sm max-h-80 overflow-auto pr-1">
                {certificates.map((c) => (
                  <li key={c.name} className="rounded-lg p-2 bg-white/5 border border-white/10">
                    <div className="font-medium leading-snug">{c.name}</div>
                    <div className="text-[12px] text-slate-300/80">Emissor: {c.issuer}</div>
                    <div className="text-[11px] text-slate-400/80 break-all">Credencial: {c.credential}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soft skills */}
            <div className="rounded-xl p-4 bg-white/5 border border-white/10">
              <div className="text-xs uppercase tracking-wider text-slate-300/80 mb-2">Soft skills</div>
              <div className="flex flex-wrap gap-2 text-sm">
                {["Comunicação", "Colaboração", "Resolução de Problemas", "Curiosidade Técnica", "Atenção a Detalhes"].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-white/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

/* ============================== DEV SMOKE (testes leves) ============================== */
function DevSmoke() {
  useEffect(() => {
    try {
      // Seções principais
      console.assert(document.querySelector("#projetos") !== null, "[Smoke] Seção Projetos");
      console.assert(document.getElementById("scroll-progress-bar") !== null, "[Smoke] Progress bar");
      console.assert(document.getElementById("spotify-typing") !== null, "[Smoke] Spotify typing");
      console.assert(document.getElementById("spotify-card") !== null, "[Smoke] Spotify card");
      console.assert(document.getElementById("linkedin-glass") !== null, "[Smoke] LinkedIn card");

      // 👇 Testes adicionais: Achievements e TCC
      const stats = document.getElementById("achievements-stats");
      console.assert(stats !== null, "[Smoke] Achievements container existe");
      if (stats) {
        console.assert(stats.children.length === 4, "[Smoke] Achievements deve ter 4 cards");
        console.assert(
          !!Array.from(stats.querySelectorAll("*")).find((el) => el.textContent?.includes("Desde")),
          '[Smoke] Campo "Desde" visível'
        );
      }
      const tccLink = document.querySelector<HTMLAnchorElement>('a[href*="projetomed.com.br/TECTI/2024/3TIC/grupo06/quickLocation/public"]');
      console.assert(!!tccLink, "[Smoke] Link do site/demo do TCC presente");
      const mvpChip = Array.from(document.querySelectorAll("span")).some((el) =>
        el.textContent?.trim() === "MVP publicado"
      );
      console.assert(mvpChip, '[Smoke] Badge "MVP publicado" presente');
    } catch (err) {
      console.error("[DevSmoke] falhou:", err);
    }
  }, []);
  return null;
}
