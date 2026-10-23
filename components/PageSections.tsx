"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  X,
  Check,
  MapPin,
  Phone,
  Mail,
  Building2,
  Compass,
  Layers,
  ShieldCheck,
} from "lucide-react";
import {
  OFFICE_INFO,
  LEISTUNGEN,
  FEATURED_PROJECTS,
  ARCHIVE_PROJECTS,
  VORGEHEN_STEPS,
  ProjectItem,
} from "@/lib/siteData";

const CATEGORIES = [
  "Alle",
  "Umbau & Renovation",
  "Neubau & Weiterbau",
  "Raumgestaltung",
] as const;

export default function PageSections() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>("Alle");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [showFullArchive, setShowFullArchive] = useState(false);

  // Contact form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Umbau / Sanierung im Bestand",
    location: "",
    message: "",
  });

  const filteredProjects =
    selectedCategory === "Alle"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === selectedCategory);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#FAFAF9] text-[#121212] relative z-20">
      {/* =====================================================================
          1. STATEMENT / ARCHITECTURAL MANIFESTO SECTION
      ===================================================================== */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 pt-8 pb-24 md:pb-32">
        <div className="border-t border-[#121212]/15 pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#121212]/70 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D92B2B]" />
              <span>Haltung · Seit 2013 in Zürich</span>
            </div>
            <p className="font-mono text-[12px] text-[#121212]/65 leading-relaxed max-w-xs">
              Tschander.Keller Architekten
              <br />
              Marietta Tschander, dipl. Architektin ETH/SIA
              <br />
              Christian Keller, Architekt
              <br />
              Dolderstrasse 30 · 8032 Zürich
            </p>
          </div>

          <div className="lg:col-span-8">
            <h2 className="text-[26px] sm:text-[34px] lg:text-[42px] font-light leading-[1.2] tracking-[-0.025em] text-[#121212] mb-8">
              Architektur beginnt mit dem genauen Hinsehen. Ob{" "}
              <span className="font-normal underline decoration-[#D92B2B]/50 decoration-1 underline-offset-8">
                denkmalgeschütztes Bauernhaus von 1526
              </span>
              , Zürcher Stadtvilla aus der Gründerzeit oder zeitgemässer Neubau
              am See — wir gestalten Räume, die atmosphärisch berühren und im
              Alltag selbstverständlich funktionieren.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[15px] leading-[1.68] text-[#121212]/80 pt-4 border-t border-[#121212]/12">
              <p>
                Ein Haus umzubauen oder neu zu errichten bedeutet, seine
                räumlichen, konstruktiven und geschichtlichen Schichten zu
                verstehen. Wir entwickeln unsere Projekte aus dem Dialog mit dem
                Ort, der vorhandenen Substanz und den Menschen, die darin leben
                werden.
              </p>
              <p>
                Dabei begleiten wir unsere Bauherrschaften persönlich über alle
                Phasen hinweg — vom ersten Entwurfsgespräch über das
                Bewilligungsverfahren und die Detaillierung im Massstab 1:1 bis
                zur täglichen Präsenz auf der Baustelle.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Column Architectural Credentials Strip */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 lg:grid-cols-4 border-y border-[#121212]/15 divide-y sm:divide-y-0 sm:divide-x divide-[#121212]/12">
          {[
            {
              metric: "ETH / SIA",
              label: "Fachkompetenz & Verband",
              detail:
                "Fundierte Entwurfs-, Denkmalpflege- und Ausführungskompetenz nach SIA-Ordnung 102.",
            },
            {
              metric: "1526 – 2026",
              label: "Bauen im Bestand",
              detail:
                "Vom spätmittelalterlichen Holztragwerk über Stadtvillen von 1894 bis zum Neubau.",
            },
            {
              metric: "A – Z",
              label: "Alles aus einer Hand",
              detail:
                "Keine Schnittstellenverluste: Entwurf, Werkplanung, Raumgestaltung & eigene Bauleitung.",
            },
            {
              metric: "8032 Zürich",
              label: "Atelier am Zürichberg",
              detail:
                "Seit 2013 in Zürich verwurzelt, seit 2015 an der Dolderstrasse 30 in Hottingen.",
            },
          ].map((item, i) => (
            <div key={i} className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#121212]/55 mb-2">
                  0{i + 1} · {item.label}
                </div>
                <div className="text-[24px] sm:text-[28px] font-light tracking-[-0.02em] text-[#121212] mb-2">
                  {item.metric}
                </div>
              </div>
              <p className="text-[13px] leading-[1.55] text-[#121212]/72">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          2. LEISTUNGEN SECTION (#leistungen)
      ===================================================================== */}
      <section
        id="leistungen"
        className="scroll-mt-20 border-t border-[#121212]/12 bg-[#F2F0EC]/65 py-24 md:py-32"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-14 border-b border-[#121212]/15 items-end">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#121212]/70 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D92B2B]" />
                <span>01 · Leistungsspektrum</span>
              </div>
              <h2 className="text-[32px] sm:text-[40px] font-light leading-[1.12] tracking-[-0.025em] text-[#121212]">
                Umbau, Neubau und{" "}
                <span className="font-medium">Raumgestaltung.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pl-8">
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#121212]/78 max-w-2xl">
                Wir übernehmen die Gesamtverantwortung für Ihr Bauvorhaben. Ob
                komplexe Altbausanierung im Denkmalbestand, massgeschneidertes
                Einfamilienhaus oder feingliedriger Innenausbau — jedes Projekt
                wird durch beide Partner persönlich betreut.
              </p>
            </div>
          </div>

          {/* 4 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#121212]/15 divide-y md:divide-y-0 md:divide-x divide-[#121212]/12">
            {LEISTUNGEN.slice(0, 2).map((service) => (
              <div
                key={service.index}
                className="p-7 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#FAFAF9]/60 hover:bg-[#FAFAF9] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#D92B2B] font-medium">
                      {service.index} / DISZIPLIN
                    </span>
                    <Layers className="w-4 h-4 text-[#121212]/40" />
                  </div>
                  <h3 className="text-[24px] sm:text-[28px] font-normal tracking-[-0.02em] text-[#121212] mb-2">
                    {service.title}
                  </h3>
                  <p className="font-mono text-[12px] text-[#121212]/65 mb-5">
                    {service.subtitle}
                  </p>
                  <p className="text-[14px] sm:text-[15px] leading-[1.65] text-[#121212]/80 mb-7">
                    {service.description}
                  </p>
                  <ul className="space-y-2.5 border-t border-[#121212]/10 pt-5 mb-8">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[13px] text-[#121212]/85"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D92B2B] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#121212]/10 flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] text-[#121212]/65">
                    Auswahl: {service.references}
                  </span>
                  <a
                    href="#projekte"
                    className="shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] text-[#121212] hover:text-[#D92B2B] inline-flex items-center gap-1"
                  >
                    <span>Referenzen</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#121212]/15 divide-y md:divide-y-0 md:divide-x divide-[#121212]/12">
            {LEISTUNGEN.slice(2, 4).map((service) => (
              <div
                key={service.index}
                className="p-7 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#FAFAF9]/60 hover:bg-[#FAFAF9] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[#D92B2B] font-medium">
                      {service.index} / DISZIPLIN
                    </span>
                    <Compass className="w-4 h-4 text-[#121212]/40" />
                  </div>
                  <h3 className="text-[24px] sm:text-[28px] font-normal tracking-[-0.02em] text-[#121212] mb-2">
                    {service.title}
                  </h3>
                  <p className="font-mono text-[12px] text-[#121212]/65 mb-5">
                    {service.subtitle}
                  </p>
                  <p className="text-[14px] sm:text-[15px] leading-[1.65] text-[#121212]/80 mb-7">
                    {service.description}
                  </p>
                  <ul className="space-y-2.5 border-t border-[#121212]/10 pt-5 mb-8">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[13px] text-[#121212]/85"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D92B2B] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#121212]/10 flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] text-[#121212]/65">
                    Fokus: {service.references}
                  </span>
                  <a
                    href="#kontakt"
                    className="shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] text-[#121212] hover:text-[#D92B2B] inline-flex items-center gap-1"
                  >
                    <span>Anfragen</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. PROJEKTE / WERKAUSWAHL SECTION (#projekte)
      ===================================================================== */}
      <section id="projekte" className="scroll-mt-20 py-24 md:py-32">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
          {/* Header + Category Filter */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#121212]/15">
            <div>
              <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#121212]/70 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D92B2B]" />
                <span>02 · Ausgewählte Werke &amp; Referenzen</span>
              </div>
              <h2 className="text-[32px] sm:text-[42px] font-light leading-[1.12] tracking-[-0.025em] text-[#121212]">
                Gebaute <span className="font-medium">Referenzen</span> im Raum
                Zürich.
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Projekte nach Kategorie filtern"
            >
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] border transition-colors ${
                      active
                        ? "bg-[#121212] text-[#FAFAF9] border-[#121212]"
                        : "bg-transparent text-[#121212]/75 border-[#121212]/20 hover:border-[#121212]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Projects Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="group cursor-pointer border border-[#121212]/12 bg-[#FAFAF9] hover:border-[#121212]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E5E2DC]">
                    <img
                      src={project.image}
                      alt={`${project.title} — ${project.subtitle}`}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#FAFAF9]/92 backdrop-blur-sm px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#121212] border border-[#121212]/10">
                      {project.code} · {project.category}
                    </div>
                    {project.heritageOrYearBuilt && (
                      <div className="absolute bottom-3 right-3 bg-[#121212]/88 text-[#FAFAF9] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]">
                        {project.heritageOrYearBuilt}
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-4 font-mono text-[11px] text-[#121212]/65 mb-2">
                      <span>{project.location}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="text-[22px] sm:text-[26px] font-normal tracking-[-0.02em] text-[#121212] group-hover:text-[#D92B2B] transition-colors mb-1.5">
                      {project.title}
                    </h3>
                    <p className="font-mono text-[12px] text-[#121212]/70 mb-4">
                      {project.subtitle}
                    </p>
                    <p className="text-[14px] leading-[1.62] text-[#121212]/80 mb-6">
                      {project.summary}
                    </p>

                    {/* Material Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.materials.map((mat) => (
                        <span
                          key={mat}
                          className="font-mono text-[10px] px-2.5 py-1 bg-[#F2F0EC] text-[#121212]/78 border border-[#121212]/10"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 sm:px-8 py-4 border-t border-[#121212]/10 bg-[#F2F0EC]/40 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#121212]/70">
                    {project.scope}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#121212] group-hover:text-[#D92B2B] font-medium">
                    <span>Projektblatt</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Tabular Werkverzeichnis (Complete Reference List) */}
          <div className="mt-20 border-t border-[#121212]/15 pt-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#121212]/65 mb-1.5">
                  WERKVERZEICHNIS · AUSZUG SEIT 2012
                </div>
                <h3 className="text-[22px] sm:text-[26px] font-light tracking-[-0.02em] text-[#121212]">
                  Weiterführende Referenzobjekte in Zürich &amp; Region
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFullArchive((v) => !v)}
                className="self-start sm:self-auto font-mono text-[11px] uppercase tracking-[0.12em] px-4 py-2 border border-[#121212]/25 hover:border-[#121212] text-[#121212] transition-colors"
              >
                {showFullArchive
                  ? "Kompaktansicht"
                  : `Alle ${ARCHIVE_PROJECTS.length} Einträge anzeigen`}
              </button>
            </div>

            <div className="border-t border-[#121212]/15 divide-y divide-[#121212]/10">
              {(showFullArchive
                ? ARCHIVE_PROJECTS
                : ARCHIVE_PROJECTS.slice(0, 7)
              ).map((entry, idx) => (
                <div
                  key={`${entry.title}-${idx}`}
                  className="py-3.5 px-2 hover:bg-[#F2F0EC]/70 transition-colors grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-baseline text-[13px]"
                >
                  <div className="md:col-span-1 font-mono text-[11px] text-[#121212]/55">
                    {entry.year}
                  </div>
                  <div className="md:col-span-4 font-medium text-[#121212]">
                    {entry.title}
                  </div>
                  <div className="md:col-span-2 font-mono text-[11px] text-[#121212]/70">
                    {entry.location}
                  </div>
                  <div className="md:col-span-2 font-mono text-[11px] text-[#D92B2B]">
                    {entry.category}
                  </div>
                  <div className="md:col-span-3 text-[#121212]/75">
                    {entry.scope}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. VORGEHEN / SIA PROZESS SECTION (#vorgehen)
      ===================================================================== */}
      <section
        id="vorgehen"
        className="scroll-mt-20 border-t border-[#121212]/12 bg-[#121212] text-[#FAFAF9] py-24 md:py-32"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-14 border-b border-[#FAFAF9]/15 items-end">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#FAFAF9]/70 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D92B2B]" />
                <span>03 · Arbeitsweise &amp; SIA-Phasen</span>
              </div>
              <h2 className="text-[32px] sm:text-[40px] font-light leading-[1.12] tracking-[-0.025em] text-[#FAFAF9]">
                Vom ersten Gespräch bis zur{" "}
                <span className="font-medium">Schlüsselübergabe.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pl-8">
              <p className="text-[15px] leading-[1.65] text-[#FAFAF9]/75 max-w-2xl">
                Ein Umbau oder Neubau ist ein vielschichtiger Prozess. Wir
                strukturieren jedes Projekt klar nach den Phasen des
                Schweizerischen Ingenieur- und Architektenvereins (SIA 102) —
                damit Qualität, Kosten und Termine zu jedem Zeitpunkt
                nachvollziehbar bleiben.
              </p>
            </div>
          </div>

          {/* 5 SIA Steps */}
          <div className="divide-y divide-[#FAFAF9]/12 border-b border-[#FAFAF9]/15">
            {VORGEHEN_STEPS.map((item) => (
              <div
                key={item.step}
                className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-[#FAFAF9]/[0.02] transition-colors"
              >
                <div className="lg:col-span-3 flex items-baseline gap-4">
                  <span className="font-mono text-[22px] sm:text-[26px] font-light text-[#D92B2B]">
                    {item.step}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#FAFAF9]/65">
                    {item.sia}
                  </span>
                </div>

                <div className="lg:col-span-5">
                  <h3 className="text-[20px] sm:text-[23px] font-normal tracking-[-0.015em] text-[#FAFAF9] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] leading-[1.65] text-[#FAFAF9]/75">
                    {item.description}
                  </p>
                </div>

                <div className="lg:col-span-4 lg:pl-6 lg:border-l border-[#FAFAF9]/12">
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#FAFAF9]/50 mb-1.5">
                    Ergebnis für die Bauherrschaft
                  </div>
                  <p className="text-[13px] leading-[1.55] text-[#FAFAF9]/90 font-medium">
                    {item.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. BÜRO & PARTNER SECTION (#buero)
      ===================================================================== */}
      <section
        id="buero"
        className="scroll-mt-20 py-24 md:py-32 border-b border-[#121212]/12"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-[#121212]/15 items-end">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#121212]/70 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D92B2B]" />
                <span>04 · Das Architekturbüro</span>
              </div>
              <h2 className="text-[32px] sm:text-[40px] font-light leading-[1.12] tracking-[-0.025em] text-[#121212]">
                Marietta Tschander &amp;{" "}
                <span className="font-medium">Christian Keller.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pl-8">
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#121212]/78 max-w-2xl">
                Gegründet 2013 in Zürich, vereint Tschander.Keller Architekten
                jahrzehntelange Erfahrung im Entwurf, im Bauen im historischen
                Bestand und in der direkten Bauleitung. Seit 2015 befindet sich
                unser Atelier an der Dolderstrasse 30 in Zürich-Hottingen.
              </p>
            </div>
          </div>

          {/* Partner Cards */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {OFFICE_INFO.founders.map((founder, idx) => (
              <div
                key={founder.name}
                className="border border-[#121212]/15 bg-[#F2F0EC]/45 p-7 sm:p-10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-[#121212]/12">
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#D92B2B] mb-1">
                        0{idx + 1} · PARTNER/IN
                      </div>
                      <h3 className="text-[24px] sm:text-[28px] font-normal tracking-[-0.02em] text-[#121212]">
                        {founder.name}
                      </h3>
                    </div>
                    <span className="font-mono text-[11px] px-3 py-1.5 bg-[#FAFAF9] border border-[#121212]/15 text-[#121212]">
                      {founder.credentials}
                    </span>
                  </div>

                  <div className="font-mono text-[12px] text-[#121212]/70 mb-4">
                    {founder.role}
                  </div>

                  <p className="text-[14px] sm:text-[15px] leading-[1.68] text-[#121212]/80 mb-8">
                    {founder.bio}
                  </p>
                </div>

                <div className="border-t border-[#121212]/12 pt-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#121212]/55 mb-3">
                    Schwerpunkte
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {founder.focus.map((f) => (
                      <span
                        key={f}
                        className="font-mono text-[11px] px-3 py-1 bg-[#FAFAF9] border border-[#121212]/12 text-[#121212]/85"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Atelier & Engagement Strip */}
          <div className="mt-12 border border-[#121212]/15 bg-[#FAFAF9] p-7 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 text-[#D92B2B] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[15px] font-medium text-[#121212] mb-1">
                  Mitgliedschaft ETH / SIA
                </h4>
                <p className="text-[13px] leading-[1.6] text-[#121212]/75">
                  Verbindliche Qualitäts- und Honorarstandards nach dem
                  Schweizerischen Ingenieur- und Architektenverein sowie
                  Kommissionserfahrung im Kanton Zürich.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Building2 className="w-5 h-5 text-[#D92B2B] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[15px] font-medium text-[#121212] mb-1">
                  Ausbildungsbetrieb in Zürich
                </h4>
                <p className="text-[13px] leading-[1.6] text-[#121212]/75">
                  Neben unseren erfahrenen Architektinnen und Architekten bilden
                  wir kontinuierlich Lernende im Beruf Zeichner/in EFZ
                  Fachrichtung Architektur aus.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#D92B2B] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[15px] font-medium text-[#121212] mb-1">
                  Atelier an der Dolderstrasse 30
                </h4>
                <p className="text-[13px] leading-[1.6] text-[#121212]/75">
                  Persönliche Besprechungen und Materialbemusterungen finden in
                  unserem Atelier in Zürich-Hottingen oder direkt am Objekt
                  statt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. KONTAKT SECTION (#kontakt)
      ===================================================================== */}
      <section
        id="kontakt"
        className="scroll-mt-20 py-24 md:py-32 bg-[#F2F0EC]/70"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Office Contact & Location */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#121212]/70 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D92B2B]" />
                  <span>05 · Kontakt &amp; Erstgespräch</span>
                </div>
                <h2 className="text-[32px] sm:text-[40px] font-light leading-[1.12] tracking-[-0.025em] text-[#121212] mb-4">
                  Planen Sie ein Vorhaben in{" "}
                  <span className="font-medium">Zürich oder Umgebung?</span>
                </h2>
                <p className="text-[15px] leading-[1.65] text-[#121212]/78">
                  Gerne lernen wir Sie und Ihre Liegenschaft in einem
                  unverbindlichen Erstgespräch kennen — bei Ihnen vor Ort oder
                  in unserem Atelier an der Dolderstrasse 30.
                </p>
              </div>

              {/* Direct Contact Details Card */}
              <div className="border border-[#121212]/15 bg-[#FAFAF9] p-6 sm:p-8 space-y-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#121212]/55 mb-1">
                    Adresse
                  </div>
                  <div className="text-[16px] font-medium text-[#121212]">
                    Tschander.Keller Architekten
                  </div>
                  <div className="text-[14px] text-[#121212]/80">
                    Dolderstrasse 30 · CH-8032 Zürich
                  </div>
                  <div className="font-mono text-[11px] text-[#121212]/55 mt-1">
                    Quartier Hottingen / Römerhof · {OFFICE_INFO.address.coordinates}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#121212]/10">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#121212]/55 mb-1">
                      Telefon
                    </div>
                    <a
                      href={OFFICE_INFO.contact.phoneHref}
                      className="inline-flex items-center gap-2 text-[15px] font-medium text-[#121212] hover:text-[#D92B2B] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D92B2B]" />
                      <span>{OFFICE_INFO.contact.phoneDisplay}</span>
                    </a>
                  </div>

                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#121212]/55 mb-1">
                      E-Mail
                    </div>
                    <a
                      href={`mailto:${OFFICE_INFO.contact.email}`}
                      className="inline-flex items-center gap-2 text-[15px] font-medium text-[#121212] hover:text-[#D92B2B] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#D92B2B]" />
                      <span>{OFFICE_INFO.contact.email}</span>
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#121212]/10 flex items-center justify-between text-[12px] text-[#121212]/70">
                  <span>Ansprechpartner: M. Tschander &amp; Ch. Keller</span>
                  <a
                    href="https://maps.google.com/?q=Dolderstrasse+30,+8032+Zürich"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#121212] hover:text-[#D92B2B] inline-flex items-center gap-1"
                  >
                    <span>Karte öffnen</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Project Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="border border-[#121212]/15 bg-[#FAFAF9] p-7 sm:p-10 lg:p-12">
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#121212]/12">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#D92B2B] mb-1">
                      DIREKTANFRAGE AN DIE PARTNER
                    </div>
                    <h3 className="text-[22px] sm:text-[26px] font-normal tracking-[-0.02em] text-[#121212]">
                      Unverbindliches Erstgespräch vereinbaren
                    </h3>
                  </div>
                  <span className="hidden sm:inline-block font-mono text-[11px] text-[#121212]/55">
                    Antwort innert 1–2 Werktagen
                  </span>
                </div>

                {formSubmitted ? (
                  <div className="py-12 px-6 bg-[#F2F0EC]/70 border border-[#121212]/15 text-center space-y-4">
                    <div className="w-10 h-10 rounded-full bg-[#121212] text-[#FAFAF9] mx-auto flex items-center justify-center">
                      <Check className="w-5 h-5" />
                    </div>
                    <h4 className="text-[22px] font-normal text-[#121212]">
                      Vielen Dank für Ihre Nachricht.
                    </h4>
                    <p className="text-[14px] text-[#121212]/75 max-w-md mx-auto leading-relaxed">
                      Ihre Anfrage für{" "}
                      <strong className="font-medium text-[#121212]">
                        {formData.projectType}
                      </strong>{" "}
                      ist bei uns eingegangen. Marietta Tschander oder Christian
                      Keller melden sich zeitnah persönlich bei Ihnen.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setFormSubmitted(false)}
                        className="font-mono text-[11px] uppercase tracking-[0.12em] underline text-[#121212]/75 hover:text-[#121212]"
                      >
                        Weitere Nachricht verfassen
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="tk-name"
                          className="block font-mono text-[11px] uppercase tracking-[0.12em] text-[#121212]/75 mb-2"
                        >
                          Name / Bauherrschaft *
                        </label>
                        <input
                          id="tk-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Vorname Nachname"
                          className="w-full bg-[#F2F0EC]/50 border border-[#121212]/20 focus:border-[#121212] px-4 py-3 text-[14px] text-[#121212] outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="tk-email"
                          className="block font-mono text-[11px] uppercase tracking-[0.12em] text-[#121212]/75 mb-2"
                        >
                          E-Mail-Adresse *
                        </label>
                        <input
                          id="tk-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="name@beispiel.ch"
                          className="w-full bg-[#F2F0EC]/50 border border-[#121212]/20 focus:border-[#121212] px-4 py-3 text-[14px] text-[#121212] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="tk-phone"
                          className="block font-mono text-[11px] uppercase tracking-[0.12em] text-[#121212]/75 mb-2"
                        >
                          Telefonnummer
                        </label>
                        <input
                          id="tk-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+41 44 ..."
                          className="w-full bg-[#F2F0EC]/50 border border-[#121212]/20 focus:border-[#121212] px-4 py-3 text-[14px] text-[#121212] outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="tk-location"
                          className="block font-mono text-[11px] uppercase tracking-[0.12em] text-[#121212]/75 mb-2"
                        >
                          Ort / Gemeinde des Objekts
                        </label>
                        <input
                          id="tk-location"
                          type="text"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                          placeholder="z.B. 8032 Zürich, Meilen, Maur..."
                          className="w-full bg-[#F2F0EC]/50 border border-[#121212]/20 focus:border-[#121212] px-4 py-3 text-[14px] text-[#121212] outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-[0.12em] text-[#121212]/75 mb-2.5">
                        Art des Vorhabens
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          "Umbau / Sanierung im Bestand",
                          "Neubau / Weiterbau / Aufstockung",
                          "Raumgestaltung / Innenarchitektur",
                          "Machbarkeitsstudie / Kaufberatung",
                        ].map((type) => {
                          const selected = formData.projectType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() =>
                                setFormData({ ...formData, projectType: type })
                              }
                              className={`text-left px-3.5 py-2.5 border text-[13px] transition-colors flex items-center justify-between ${
                                selected
                                  ? "bg-[#121212] text-[#FAFAF9] border-[#121212]"
                                  : "bg-[#F2F0EC]/40 text-[#121212]/80 border-[#121212]/15 hover:border-[#121212]/40"
                              }`}
                            >
                              <span>{type}</span>
                              {selected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D92B2B]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="tk-message"
                        className="block font-mono text-[11px] uppercase tracking-[0.12em] text-[#121212]/75 mb-2"
                      >
                        Kurze Beschreibung Ihres Anliegens *
                      </label>
                      <textarea
                        id="tk-message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Liegenschaft, Baujahr, gewünschter Zeitraum oder Fragen..."
                        className="w-full bg-[#F2F0EC]/50 border border-[#121212]/20 focus:border-[#121212] px-4 py-3 text-[14px] text-[#121212] outline-none transition-colors"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                      <span className="font-mono text-[11px] text-[#121212]/60">
                        Vertrauliche Behandlung Ihrer Projektdaten garantiert.
                      </span>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-[#121212] text-[#FAFAF9] hover:bg-[#D92B2B] transition-colors text-[13px] font-medium px-7 py-3.5"
                      >
                        <span>Anfrage absenden</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. FOOTER
      ===================================================================== */}
      <footer className="border-t border-[#121212]/15 bg-[#FAFAF9] py-14">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#121212]/10">
            <div className="md:col-span-5">
              <div className="text-[16px] font-semibold tracking-[-0.02em] text-[#121212] mb-2">
                TSCHANDER<span className="text-[#D92B2B]">.</span>KELLER{" "}
                <span className="font-normal text-[#121212]/70">
                  Architekten
                </span>
              </div>
              <p className="text-[13px] text-[#121212]/70 max-w-sm leading-relaxed">
                Marietta Tschander (dipl. Architektin ETH/SIA) &amp; Christian
                Keller. Atmosphärisch und funktional gestalteter Wohnraum in
                Zürich seit 2013.
              </p>
            </div>

            <div className="md:col-span-4 font-mono text-[12px] text-[#121212]/75 space-y-1">
              <div className="text-[10px] uppercase tracking-[0.14em] text-[#121212]/50 mb-2">
                Atelier Zürich
              </div>
              <div>Dolderstrasse 30 · CH-8032 Zürich</div>
              <div>
                <a
                  href="tel:+41442528500"
                  className="hover:text-[#D92B2B] transition-colors"
                >
                  Tel. +41 44 252 85 00
                </a>
              </div>
              <div>
                <a
                  href="mailto:info@tschanderkeller.ch"
                  className="hover:text-[#D92B2B] transition-colors"
                >
                  info@tschanderkeller.ch
                </a>
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col justify-between md:items-end">
              <div className="flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[#121212]/75">
                <a href="#leistungen" className="hover:text-[#121212]">
                  Leistungen
                </a>
                <a href="#projekte" className="hover:text-[#121212]">
                  Projekte
                </a>
                <a href="#vorgehen" className="hover:text-[#121212]">
                  Vorgehen
                </a>
                <a href="#buero" className="hover:text-[#121212]">
                  Büro
                </a>
              </div>
              <a
                href="#top"
                className="mt-4 md:mt-0 font-mono text-[11px] uppercase tracking-[0.12em] text-[#121212]/60 hover:text-[#121212]"
              >
                Nach oben ↑
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-[#121212]/55">
            <div>
              © {new Date().getFullYear()} Tschander.Keller Architekten, Zürich.
              Alle Rechte vorbehalten.
            </div>
            <div>ETH / SIA · Dolderstrasse 30, 8032 Zürich</div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          PROJECT DETAIL MODAL (PROJEKTBLATT)
      ===================================================================== */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 bg-[#121212]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="bg-[#FAFAF9] border border-[#121212]/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="sticky top-0 z-10 bg-[#FAFAF9]/95 backdrop-blur-md px-6 py-4 border-b border-[#121212]/15 flex items-center justify-between">
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#121212]/75">
                <span className="text-[#D92B2B] font-semibold">
                  {activeProject.code}
                </span>
                <span>·</span>
                <span>{activeProject.category}</span>
                <span>·</span>
                <span>{activeProject.location}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="w-8 h-8 inline-flex items-center justify-center border border-[#121212]/20 hover:bg-[#121212] hover:text-[#FAFAF9] transition-colors"
                aria-label="Projektblatt schliessen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Project Hero Image */}
            <div className="aspect-[16/10] w-full bg-[#E5E2DC] overflow-hidden">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Content */}
            <div className="p-6 sm:p-10 space-y-8">
              <div>
                <h3
                  id="modal-project-title"
                  className="text-[28px] sm:text-[34px] font-light tracking-[-0.02em] text-[#121212] mb-2"
                >
                  {activeProject.title}
                </h3>
                <p className="font-mono text-[13px] text-[#121212]/70">
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Architectural Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-y border-[#121212]/15 py-5">
                {activeProject.highlights.map((h) => (
                  <div key={h.label}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#121212]/55 mb-1">
                      {h.label}
                    </div>
                    <div className="text-[13px] font-medium text-[#121212]">
                      {h.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed Architectural Description */}
              <div className="space-y-4 text-[15px] leading-[1.7] text-[#121212]/85">
                {activeProject.description.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Materials + CTA */}
              <div className="pt-6 border-t border-[#121212]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#121212]/55 mb-2">
                    Materialisierung &amp; Konstruktion
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.materials.map((m) => (
                      <span
                        key={m}
                        className="font-mono text-[11px] px-3 py-1 bg-[#F2F0EC] border border-[#121212]/12 text-[#121212]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#kontakt"
                  onClick={() => setActiveProject(null)}
                  className="shrink-0 inline-flex items-center gap-2 bg-[#121212] text-[#FAFAF9] hover:bg-[#D92B2B] transition-colors text-[12px] font-medium px-5 py-3"
                >
                  <span>Ähnliches Vorhaben besprechen</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
