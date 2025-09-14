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
} from "lucide-react";

// ============================================================
// 🚀 Currículo Web — Juan Mendes (Edição Ultra, enxuta)
// Identidade forte, animações com parallax/tilt
// - React + Tailwind + Framer Motion
// - GitHub API (perfil, repositórios, métricas)
// - LinkedIn: Cartão 3D (sem badge oficial)
// - CEP no mapa: ViaCEP + Nominatim (OSM)
// ============================================================

export default function PortfolioJuanMendes() {
  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden">
      <AuroraBG />
      <CursorGlow />
      <GridFX />
      <ScrollProgress />
      <NavBar />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <ContactStrip />
        <AboutMe />

        <div className="grid lg:grid-cols-3 gap-6 mt-10">
          <div className="lg:col-span-2 space-y-6">
            <ProjectsFromGitHub username="juanmmendes" />
            <TopLanguages username="juanmmendes" />
            <Experience />
            <Education />
          </div>
          <div className="space-y-6">
            <TechMarquee />
            <TechStack />
            <Achievements username="juanmmendes" />
            <LinkedInBadge vanity="juan-mendes-739084273" />
            <SteamCard />
            <NowPlaying />
            <MapCEP cep="13189-210" />
          </div>
        </div>

        <Footer />
      </main>

      {/* Smoke tests for runtime sanity (non-intrusive) */}
      <DevSmoke />
    </div>
  );
}

/* ============================== DECOR ============================== */
function AuroraBG() {
  return (
    <div className="fixed inset-0 -z-20">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute -top-32 left-0 w-[70vw] h-[70vw] bg-gradient-to-br from-fuchsia-500/35 via-violet-500/25 to-cyan-400/25 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-20 w-[50vw] h-[50vw] bg-gradient-to-br from-indigo-600/30 via-sky-500/20 to-emerald-400/20 rounded-full blur-3xl animate-[pulse_9s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-10rem] left-1/4 w-[60vw] h-[60vw] bg-gradient-to-tr from-rose-500/25 via-fuchsia-400/20 to-amber-300/20 rounded-full blur-3xl animate-[pulse_12s_ease-in-out_infinite]" />
    </div>
  );
}

function GridFX() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 opacity-[0.08]">
      <div
        className="w-full h-full"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px, 40px 40px",
          backgroundPosition: "-1px -1px, -1px -1px",
          maskImage:
            "radial-gradient(circle at 50% 30%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)",
        }}
      />
    </div>
  );
}

// Glow que segue o cursor
function CursorGlow() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const style = useMemo(
    () => ({
      left: pos.x - 250,
      top: pos.y - 250,
      background:
        "radial-gradient(closest-side, rgba(99,102,241,.35), rgba(244,114,182,.22), rgba(34,211,238,0) 70%)",
    }),
    [pos]
  );
  return (
    <div className="fixed inset-0 -z-[9] pointer-events-none" aria-hidden>
      <div className="absolute w-[500px] h-[500px] blur-3xl opacity-50 mix-blend-soft-light" style={style} />
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
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const px = x / r.width - 0.5;
    const py = y / r.height - 0.5;
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
        "relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl " +
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none " +
        className
      }
    >
      {/* brilho dinâmico */}
      <div className="pointer-events-none absolute -inset-1 rounded-[inherit] bg-gradient-to-br from-fuchsia-500/10 via-indigo-500/10 to-cyan-400/10 blur-xl" />
      <div className="relative p-5 sm:p-6">{children}</div>
    </motion.div>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }: any) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {Icon ? <Icon className="w-5 h-5 text-indigo-300" /> : null}
      <div>
        <h3 className="text-lg font-semibold tracking-wide">{title}</h3>
        {subtitle ? (
          <p className="text-sm text-slate-300/80 -mt-0.5">{subtitle}</p>
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
        <div className="flex items-center gap-3">
          <LogoJM size={28} />
          <span className="font-semibold tracking-wide">Juan Mendes • Full Stack & Automação</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-sm text-slate-300/90">
          <a href="#projetos" className="hover:text-white">Projetos</a>
          <a href="#experiencia" className="hover:text-white">Experiência</a>
          <a href="#formacao" className="hover:text-white">Formação</a>
          <a href="#contatos" className="hover:text-white">Contato</a>
        </div>
      </div>
    </div>
  );
}

/* LOGO “J” (novo) */
function LogoJM({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="drop-shadow-[0_0_12px_rgba(99,102,241,.35)]">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="50%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#g)" opacity="0.15" />
      {/* “J” estilizado */}
      <path
        d="M44 16v20a12 12 0 0 1-12 12h-8"
        stroke="url(#g)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* detalhe base */}
      <path d="M20 48h10" stroke="url(#g)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}


/* ============================== HERO ============================== */
function Hero() {
  return (
    <section className="pt-10 md:pt-14">
      <Card className="relative" tilt>
        <div className="grid lg:grid-cols-[1.15fr,0.85fr] gap-8 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-black tracking-tight"
            >
              <span className="inline-flex items-center gap-3">
                <LogoJM />
                Juan Mendes
              </span>
            </motion.h1>
            <p className="mt-3 text-lg md:text-xl text-slate-200/90">
              Full Stack Developer • IA • Automação • BI • N8N
            </p>
            <p className="mt-4 text-slate-200/85 leading-relaxed max-w-3xl">
              Eu crio soluções de software com <strong>identidade</strong>: automações robustas, integrações de APIs e produtos digitais de alta
              performance. Foco em qualidade, segurança e DX.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contatos" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-indigo-600/90 hover:bg-indigo-500 transition shadow-lg">
                <Rocket className="w-4 h-4" /> Fale comigo
              </a>
              <a href="https://github.com/juanmmendes" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-white/10 hover:bg-white/20 transition">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/juan-mendes-739084273" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-white/10 hover:bg-white/20 transition">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>

          <div className="relative">
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
      .then((u) => setAvatar(u?.avatar_url))
      .catch(() => {});
  }, [username]);
  return (
    <div className="relative aspect-square rounded-[2rem] border border-white/15 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      {/* orb animada */}
      <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[140%] h-[140%] bg-gradient-to-br from-fuchsia-500/30 via-indigo-500/30 to-cyan-400/30 rounded-full blur-3xl animate-[spin_28s_linear_infinite]" />
      {/* avatar */}
      <div className="absolute inset-0 m-6 rounded-2xl bg-black/30 backdrop-blur flex items-center justify-center">
        {avatar ? (
          <img src={avatar} alt="Avatar" className="w-40 h-40 rounded-full ring-4 ring-white/20 shadow-2xl object-cover" />
        ) : (
          <div className="text-7xl">🧠</div>
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
        <SectionTitle icon={Network} title="Contato e Redes" subtitle="Respostas rápidas e colaboração" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ContactItem icon={Mail} label="E-mail" value="juan.zx016@gmail.com" href="mailto:juan.zx016@gmail.com" />
          <ContactItem icon={Phone} label="Telefone" value="(19) 99979-1601" href="tel:+5519999791601" />
          <ContactItem icon={MessageCircle} label="Discord" value="724413788203253773" onClick={() => copy("724413788203253773")} tooltip="Copiar ID" />
          <ContactItem icon={Linkedin} label="LinkedIn" value="/in/juan-mendes-739084273" href="https://www.linkedin.com/in/juan-mendes-739084273" />
          <ContactItem icon={Github} label="GitHub" value="juanmmendes" href="https://github.com/juanmmendes" />
          <ContactItem icon={Gamepad2} label="Steam" value="Perfil" href="https://steamcommunity.com/profiles/76561199305304396" />
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
}: {
  icon: any; label: string; value: string; href?: string; onClick?: () => void; tooltip?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10 cursor-pointer">
      <Icon className="w-4 h-4 text-indigo-300" />
      <div>
        <div className="text-xs uppercase tracking-wider text-slate-300/80">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
      {href ? <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70" /> : null}
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" title={tooltip}>
      {content}
    </a>
  ) : (
    <button onClick={onClick} title={tooltip} className="text-left">{content}</button>
  );
}

/* ============================== TECH ============================== */
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
      <SectionTitle icon={Palette} title="DNA Visual & Tech" subtitle="Marquee interativo com suas stacks principais" />
      <div className="relative overflow-hidden rounded-xl">
        <div className="flex gap-6 animate-[scrolllinear_18s_linear_infinite] will-change-transform">
          {[...items, ...items, ...items].map((it, i) => (
            <div key={i} className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
              <it.Icon className="w-4 h-4 text-fuchsia-300" />
              <span className="text-sm">{it.label}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes scrolllinear { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
    </Card>
  );
}

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

  const studies = [
    "Ciência de Dados",
    "Inteligência Artificial",
    "Business Intelligence",
    "Automação",
    "Engenharia de Software",
    "Cloud Computing",
    "Segurança da Informação",
  ];

  return (
    <Card tilt>
      <SectionTitle icon={BadgeCheck} title="Stack & Foco" subtitle="Ferramentas e áreas que mais uso" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {skills.map((s, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl p-3 bg-white/5 border border-white/10 hover:shadow-[0_0_0_1px_rgba(255,255,255,.15)]">
            <s.icon className="w-4 h-4 text-teal-300" />
            <span className="text-sm">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {studies.map((tag) => (
          <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30">
            {tag}
          </span>
        ))}
      </div>
    </Card>
  );
}

/* ============================== GITHUB ============================== */
function ProjectsFromGitHub({ username }: { username: string }) {
  const [user, setUser] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`).then((res) => res.json()),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`).then((res) => res.json()),
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
      } catch (e) {
        console.error(e);
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
          <div className="grid sm:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="group">
                <div className="rounded-2xl p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition h-full relative overflow-hidden">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-fuchsia-500/0 via-indigo-500/0 to-cyan-400/0 group-hover:from-fuchsia-500/10 group-hover:via-indigo-500/10 group-hover:to-cyan-400/10 blur-xl" />
                  <div className="relative flex items-center gap-2">
                    <span className="text-sm font-semibold group-hover:text-white">{repo.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </div>
                  <p className="relative text-sm text-slate-300/90 mt-1 line-clamp-2">
                    {repo.description || "Sem descrição."}
                  </p>
                  <div className="relative mt-3 text-xs flex items-center gap-3 text-slate-300/80">
                    <span><Star className="inline w-3 h-3 mr-1" /> {repo.stargazers_count}</span>
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

function Achievements({ username }: { username: string }) {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    async function run() {
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`).then((res) => res.json()),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`).then((res) => res.json()),
        ]);
        const stars = (Array.isArray(r) ? r : []).reduce((acc, x) => acc + (x.stargazers_count || 0), 0);
        setData({
          followers: u?.followers || 0,
          public_repos: u?.public_repos || 0,
          public_gists: u?.public_gists || 0,
          since: u?.created_at ? new Date(u.created_at).getFullYear() : null,
          stars,
        });
      } catch {}
    }
    run();
  }, [username]);

  return (
    <Card tilt>
      <SectionTitle icon={Trophy} title="Conquistas & Números" subtitle="GitHub em tempo real" />
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Followers" value={data?.followers ?? "—"} />
        <Stat label="Repositórios" value={data?.public_repos ?? "—"} />
        <Stat label="Stars (somadas)" value={data?.stars ?? "—"} />
        <Stat label="Desde" value={data?.since ?? "—"} />
      </div>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4 bg-white/5 border border-white/10">
      <div className="text-xs uppercase tracking-wider text-slate-300/80">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}

function TopLanguages({ username }: { username: string }) {
  const [repos, setRepos] = useState<any[]>([]);
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then((r) => r.json())
      .then((data) => setRepos(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [username]);

  const langCount = useMemo(() => {
    const m = new Map<string, number>();
    repos.forEach((r) => {
      if (r.language) m.set(r.language, (m.get(r.language) || 0) + 1);
    });
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [repos]);

  const total = langCount.reduce((acc, [, c]) => acc + c, 0) || 1;

  return (
    <Card tilt>
      <SectionTitle icon={Palette} title="Linguagens em Evidência" subtitle="Distribuição por repositórios" />
      <div className="space-y-3">
        {langCount.map(([lang, count]) => (
          <div key={lang}>
            <div className="flex justify-between text-xs text-slate-300/80">
              <span>{lang}</span>
              <span>{Math.round((count / total) * 100)}%</span>
            </div>
            <div className="h-2 mt-1 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-300" style={{ width: `${(count / total) * 100}%` }} />
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

/* ============================== EXPERIÊNCIA / FORMAÇÃO ============================== */
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
        <ol className="relative border-s border-white/10 ml-3 pl-6 space-y-6">
          {items.map((it, idx) => (
            <li key={idx} className="relative">
              <span className="absolute -left-3 top-1.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-400 shadow" />
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{it.title}</h4>
                <span className="text-xs text-slate-300/80">• {it.location}</span>
              </div>
              <div className="text-xs text-slate-300/80 mt-0.5">{it.period}</div>
              <ul className="mt-2 text-sm list-disc pl-4 space-y-1 text-slate-200/90">
                {it.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </Card>
    </section>
  );
}

function BriefcaseIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-indigo-300" {...props}>
      <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M3 13h18" />
    </svg>
  );
}

function Education() {
  return (
    <section id="formacao">
      <Card tilt>
        <SectionTitle icon={HatIcon} title="Formação Acadêmica" />
        <ul className="space-y-4">
          <li>
            <div className="font-semibold">Bacharelado — Sistemas da Informação (em curso)</div>
            <div className="text-sm text-slate-300/80">Centro Universitário Adventista de São Paulo — fev/2025 a dez/2028</div>
          </li>
          <li>
            <div className="font-semibold">Técnico Integrado — Ciências da Computação e Informática</div>
            <div className="text-sm text-slate-300/80">Centro Universitário Adventista de São Paulo — jan/2022 a dez/2024</div>
          </li>
        </ul>
      </Card>
    </section>
  );
}

function HatIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-indigo-300" {...props}>
      <path d="M3 10l9-5 9 5-9 5-9-5z" />
      <path d="M21 10v6" />
      <path d="M3 10v6a9 4 0 0 0 18 0" />
    </svg>
  );
}

/* ============================== LINKEDIN (somente cartão 3D) ============================== */
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
      <div className="pointer-events-none absolute -inset-1 rounded-[inherit] bg-gradient-to-r from-fuchsia-500/10 via-indigo-500/10 to-cyan-400/10 blur-2xl" />
      <div className="relative grid gap-3 sm:grid-cols-[auto,1fr] sm:gap-4 items-center">
        <div className="shrink-0"><LogoJM size={48} /></div>
        <div>
          <div className="text-xl font-bold">Juan Mendes</div>
          <div className="text-sm text-slate-300/90">Full Stack Developer | Machine Learning | Business Intelligence | Data Science | N8N</div>
          <div className="text-xs text-slate-300/70 mt-1">Marinho Mendes Advogados • Centro Universitário Adventista de São Paulo</div>
        </div>
        <div className="sm:col-span-2 mt-2 flex flex-wrap gap-2">
          <a href={`https://www.linkedin.com/in/${vanity}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 bg-indigo-600/90 hover:bg-indigo-500 transition shadow">
            <ExternalLink className="w-3.5 h-3.5" /> Ver perfil
          </a>
          <a href={`https://www.linkedin.com/in/${vanity}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20 transition">
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
      <a href="https://steamcommunity.com/profiles/76561199305304396" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm">
        <ExternalLink className="w-3.5 h-3.5" /> Abrir perfil Steam
      </a>
    </Card>
  );
}

/* ============================== CEP / MAPA ============================== */
function MapCEP({ cep }: { cep: string }) {
  const [addr, setAddr] = useState<any>(null);
  const [pos, setPos] = useState<{ lat: number; lon: number } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setErr(null);
        const v = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`).then((r) => r.json());
        if (!cancelled) setAddr(v);

        const q = encodeURIComponent(`${cep} ${v?.localidade || ""} ${v?.uf || ""} Brasil`);
        const geo = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${q}`).then((r) => r.json());
        if (!Array.isArray(geo) || !geo[0]) throw new Error("Geocodificação não retornou resultados");
        const lat = parseFloat(geo[0].lat), lon = parseFloat(geo[0].lon);
        if (!cancelled) setPos({ lat, lon });
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || String(e));
      }
    }
    run();
    return () => { cancelled = true; };
  }, [cep, retryKey]);

  const iframeSrc = useMemo(() => {
    if (!pos) return null;
    const { lat, lon } = pos;
    const d = 0.02;
    const bbox = `${lon - d},${lat - d},${lon + d},${lat + d}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
  }, [pos]);

  const subtitle = addr
    ? `CEP ${cep} — ${addr?.localidade || ""}/${addr?.uf || ""}${addr?.bairro ? ` • ${addr.bairro}` : ""}`
    : `CEP ${cep}`;

  return (
    <Card tilt>
      <SectionTitle icon={MapPin} title="Localização (CEP)" subtitle={subtitle} />
      <div className="relative rounded-xl overflow-hidden border border-white/10">
        {iframeSrc ? (
          <iframe id="map-osm-iframe" title="Mapa CEP (OSM)" src={iframeSrc} className="w-full h-[300px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        ) : (
          <div className="w-full h-[300px] grid place-items-center text-slate-300/90">
            {err ? (
              <div className="text-center">
                <div className="mb-2">Não foi possível carregar o mapa do CEP.</div>
                <button onClick={() => setRetryKey((k) => k + 1)} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20">
                  Tentar novamente
                </button>
              </div>
            ) : (
              <div>Localizando CEP no mapa…</div>
            )}
          </div>
        )}
        {/* Alvo & anéis visuais */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="relative inline-block">
            <span className="absolute inline-flex h-14 w-14 rounded-full bg-fuchsia-400/30 blur-md animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-300 shadow-md ring-4 ring-fuchsia-400/40" />
          </span>
        </div>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-fuchsia-400/20 animate-[spin_16s_linear_infinite]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-indigo-400/10 animate-[spin_24s_linear_infinite_reverse]" />
        </div>
      </div>
      {addr && (
        <div className="mt-2 text-xs text-slate-300/80">
          {addr.logradouro ? `${addr.logradouro}, ` : ""}
          {addr.bairro ? `${addr.bairro} — ` : ""}
          {addr.localidade}/{addr.uf}
        </div>
      )}
    </Card>
  );
}

/* ============================== FOOTER ============================== */
function Footer() {
  return (
    <div className="py-10 text-center text-xs text-slate-400/80">
      © {new Date().getFullYear()} Juan Mendes — Identidade Neon-Tech • React + Tailwind + Framer Motion
    </div>
  );
}

/* ============================== SOBRE MIM ============================== */
function AboutMe() {
  const programming = ["TypeScript", "JavaScript", "Python (dados)", "SQL", "HTML", "CSS/Tailwind"];
  const studies = ["Ciência de Dados", "Inteligência Artificial", "Business Intelligence", "Automação (n8n)", "Engenharia de Software", "Cloud & DevOps", "Segurança da Informação"];
  const certs = [
    { name: "Hackathon 2025 — UNASP Tech", status: "Concluído" },
    { name: "N8N e Integrações com APIs", status: "Em andamento" },
    { name: "Fundamentos de Data Science", status: "Em andamento" },
  ];

  return (
    <section className="mt-6">
      <Card tilt>
        <SectionTitle icon={Sparkles} title="Sobre mim" subtitle="Perfil, linguagens, certificações e áreas de estudo" />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <p className="text-slate-200/90 leading-relaxed">
              Sou o <strong>Juan Mendes</strong>, desenvolvedor <em>full stack</em> com paixão por <strong>automação</strong>, <strong>dados</strong> e <strong>experiências digitais com identidade</strong>.
              Construo integrações de alto desempenho (APIs, webhooks), pipelines de dados e interfaces com motion design para entregar valor real e medível.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl p-4 bg-white/5 border border-white/10">
                <div className="text-xs uppercase tracking-wider text-slate-300/80 mb-2">Linguagens (código)</div>
                <div className="flex flex-wrap gap-2">
                  {programming.map((p) => (
                    <span key={p} className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30">{p}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-4 bg-white/5 border border-white/10">
                <div className="text-xs uppercase tracking-wider text-slate-300/80 mb-2">Idiomas (falados)</div>
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
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-400/30">{s}</span>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-4 bg-white/5 border border-white/10">
              <div className="text-xs uppercase tracking-wider text-slate-300/80 mb-2">Trabalhos & entregas recentes (exemplos)</div>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-200/90">
                <li>Bots e fluxos <strong>n8n</strong> com autenticação OAuth2, capturas multicanal e integrações (WhatsApp/Sheets/API).</li>
                <li>APIs <strong>REST</strong> com Node.js/TypeScript e <strong>PostgreSQL</strong>, com logs estruturados e filas.</li>
                <li>Dashboards de <strong>BI</strong> com métricas em tempo real e pipelines de dados para insights operacionais.</li>
                <li>UIs reativas com <strong>React</strong> + <strong>Tailwind</strong> + <strong>Framer Motion</strong> (motion design funcional).</li>
              </ul>
            </div>
          </div>

          {/* Certificações */}
          <div className="space-y-3">
            <div className="rounded-xl p-4 bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <BadgeCheck className="w-4 h-4 text-emerald-300" />
                <h4 className="font-semibold">Certificações</h4>
              </div>
              <ul className="space-y-2 text-sm">
                {certs.map((c) => (
                  <li key={c.name} className="flex items-center justify-between gap-2">
                    <span>{c.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10">{c.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soft skills */}
            <div className="rounded-xl p-4 bg-white/5 border border-white/10">
              <div className="text-xs uppercase tracking-wider text-slate-300/80 mb-2">Soft skills</div>
              <div className="flex flex-wrap gap-2 text-sm">
                {["Comunicação", "Colaboração", "Resolução de Problemas", "Curiosidade Técnica", "Atenção a Detalhes"].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-white/10">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

/* ============================== NOW PLAYING (Spotify) ============================== */
function NowPlaying() {
  return (
    <Card tilt>
      <SectionTitle icon={Zap} title="No fone agora!" subtitle="Seu status musical em tempo real" />
      <div className="grid place-items-center gap-4 text-center">
        <img
          id="spotify-typing"
          src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=18&duration=2000&pause=1000&color=1DB954&center=true&vCenter=true&width=500&lines=%F0%9F%8E%B5+Currently+Listening+To...;%F0%9F%8E%B6+Coding+with+the+perfect+soundtrack!"
          alt="Spotify Typing"
          className="max-w-full"
        />
        <img
          id="spotify-card"
          src="https://spotify-github-profile.kittinanx.com/api/view.svg?uid=3327c87dcmrrgsk3rh8efzcfo&cover_image=true&theme=default&show_offline=true&background_color=121212&interchange=true&bar_color=69bfa5&bar_color_cover=true"
          alt="Spotify Currently Playing"
          className="max-w-full"
        />
      </div>
    </Card>
  );
}

/* ============================== DEV SMOKE (console) ============================== */
function DevSmoke() {
  useEffect(() => {
    try {
      console.assert(document.querySelector("#projetos") !== null, "[Smoke] Seção Projetos deve existir");
      console.assert(typeof window !== "undefined", "[Smoke] Ambiente browser");
      console.assert(document.getElementById("scroll-progress-bar") !== null, "[Smoke] Progress bar presente");
      console.assert(document.getElementById("spotify-typing") !== null, "[Smoke] SVG typing presente");
      console.assert(document.getElementById("spotify-card") !== null, "[Smoke] Spotify card presente");
      console.assert(document.getElementById("linkedin-glass") !== null, "[Smoke] LinkedIn card presente");
      setTimeout(() => {
        const map = document.getElementById("map-osm-iframe");
        if (!map) console.warn("[Smoke] Mapa OSM ainda não carregado (geocodificação pendente)");
      }, 2000);
    } catch (e) {
      console.warn("Smoke tests falharam:", e);
    }
  }, []);
  return null;
}
