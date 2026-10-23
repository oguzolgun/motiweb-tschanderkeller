export interface ProjectItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: 'Umbau & Renovation' | 'Neubau & Weiterbau' | 'Raumgestaltung';
  location: string;
  year: string;
  heritageOrYearBuilt?: string;
  scope: string;
  materials: string[];
  image: string;
  summary: string;
  description: string[];
  highlights: { label: string; value: string }[];
}

export interface ArchiveEntry {
  year: string;
  title: string;
  location: string;
  category: 'Umbau & Renovation' | 'Neubau & Weiterbau' | 'Raumgestaltung';
  scope: string;
}

export const OFFICE_INFO = {
  name: 'Tschander.Keller Architekten',
  shortName: 'TSCHANDER.KELLER',
  tagline: 'Architektur & Raumgestaltung · ETH / SIA',
  founded: '2013',
  dolderSince: '2015',
  founders: [
    {
      name: 'Marietta Tschander',
      credentials: 'dipl. Architektin ETH / SIA',
      role: 'Partnerin · Entwurf, Denkmalpflege & Gesamtprojektleitung',
      bio: 'Studium der Architektur an der ETH Zürich. Vor der Gründung von Tschander.Keller Architekten war sie über viele Jahre Partnerin im Büro Tschander Schär Tschander Architekten sowie langjähriges Mitglied der kantonalen Wohnbaukommission Zürich. Ihr Schwerpunkt liegt im präzisen Weiterbauen historischer Bausubstanz, der architektonischen Konzeption und der persönlichen Begleitung privater Bauherrschaften.',
      focus: ['Bauen im Bestand & Denkmalpflege', 'Architektonischer Entwurf', 'Wohnbaukommission & Beratung'],
    },
    {
      name: 'Christian Keller',
      credentials: 'Architekt · Gründer Architekturatelier 1990',
      role: 'Partner · Konstruktion, Raumgestaltung & Bauleitung',
      bio: 'Gründete 1990 das Christian Keller Architekturatelier in Zürich, bevor 2013 der Zusammenschluss zu Tschander.Keller Architekten erfolgte. Mit über drei Jahrzehnten Erfahrung in konstruktiver Detaillierung, Innenarchitektur, Materialisierung und direkter Bauleitung vor Ort steht er für handwerkliche Präzision sowie verlässliche Kosten- und Terminführung.',
      focus: ['Konstruktive Detaillierung (1:20 – 1:1)', 'Innenarchitektur & Massmöbel', 'Bauleitung & Kostenkontrolle'],
    },
  ],
  address: {
    street: 'Dolderstrasse 30',
    postalCode: '8032',
    city: 'Zürich',
    quarter: 'Zürich-Hottingen / Zürichberg',
    country: 'Schweiz',
    coordinates: '47.3728° N, 8.5612° E',
  },
  contact: {
    phoneDisplay: '+41 44 252 85 00',
    phoneHref: 'tel:+41442528500',
    email: 'info@tschanderkeller.ch',
    website: 'tschanderkeller.ch',
  },
} as const;

export const LEISTUNGEN = [
  {
    index: '01',
    title: 'Umbau & Renovation',
    subtitle: 'Respektvoller Weiterbau historischer und schützenswerter Bausubstanz',
    description:
      'Historische Gebäude in Zürich und Umgebung tragen eine eigene räumliche und handwerkliche Identität. Wir analysieren Tragwerk, Schichten und Proportionen im Detail und entwickeln Eingriffe, die den Charakter des Hauses stärken und gleichzeitig heutige Ansprüche an Licht, Haustechnik und Wohnkomfort erfüllen.',
    deliverables: [
      'Denkmalpflegerische Bestandsaufnahme & Machbarkeitsstudien',
      'Sanierung von Gründerzeit-Stadtvillen, Altstadthäusern & historischen Bauernhäusern',
      'Energetische & haustechnische Erneuerung im Bestand',
      'Grundrissoptimierung, Dachausbauten & Eingriffe in die Tragstruktur',
    ],
    references: 'Stadtvilla Freiestrasse · Bauernhaus Maur (1526) · EFH Hauserstrasse · MFH Narzissenstrasse',
  },
  {
    index: '02',
    title: 'Neubau & Weiterbau',
    subtitle: 'Massgeschneiderte Wohnbauten im Dialog mit Topografie und Kontext',
    description:
      'Ob freistehendes Einfamilienhaus am Zürichsee, städtische Aufstockung oder kleineres Mehrfamilienhaus: Unsere Neubauten fügen sich präzise in ihre Umgebung ein. Wir entwerfen von innen nach aussen — mit wohlproportionierten Räumen, klaren Sichtbezügen und langlebigen, natürlich alternden Materialien.',
    deliverables: [
      'Einfamilienhäuser, Landhäuser & Villen im Raum Zürich und Zürichsee',
      'Aufstockungen, Anbauten & Nachverdichtung im Bestand',
      'Mehrfamilienhäuser & Reihen-Einfamilienhäuser mit hoher Wohnqualität',
      'Nachhaltige Holz-, Hybrid- und Massivbauweisen',
    ],
    references: 'Landhaus Meilen / Uetikon · Aufstockung Affoltern · EFH Zumikon, Zollikon & Uitikon',
  },
  {
    index: '03',
    title: 'Raumgestaltung & Innenarchitektur',
    subtitle: 'Atmosphäre, Lichtführung und handwerklich gefertigte Einbauten',
    description:
      'Erst im Zusammenspiel von Oberfläche, Akustik, Licht und Einbaumöbel entsteht jene Ruhe, die einen Wohnraum unverwechselbar macht. Wir entwerfen Küchen, Bäder, Bibliotheken, Treppen und Einzelmöbel bis zum Massstab 1:1 und realisieren sie mit ausgewählten Schweizer Handwerksbetrieben.',
    deliverables: [
      'Innenarchitektonische Gesamtkonzepte, Material- & Farbcollagen',
      'Massgefertigte Küchen-, Bad- und Schrankeinbauten',
      'Lichtplanung, Raumakustik & baubiologische Oberflächen',
      'Ausgewählte Hospitality-, Praxis- und Ladenbauprojekte',
    ],
    references: 'Hotel Spirgarten Zürich · Wohnung Seldwyla Zumikon · Goldschmiedladen Lenzburg',
  },
  {
    index: '04',
    title: 'Gesamtabwicklung & Bauleitung',
    subtitle: 'Persönliche Betreuung von A bis Z — alles aus einer Hand',
    description:
      'Bei Tschander.Keller gibt es keinen Bruch zwischen Entwurf und Baustelle. Wir begleiten Ihr Vorhaben persönlich über sämtliche SIA-Phasen hinweg: vom ersten Gespräch am Küchentisch über das Bewilligungsverfahren und die Werkplanung bis zur täglichen Präsenz auf der Baustelle und der Schlüsselübergabe.',
    deliverables: [
      'Direkte Betreuung durch die Partner Marietta Tschander & Christian Keller',
      'Bewilligungsverfahren & Abstimmung mit Zürcher Baubehörden / Denkmalpflege',
      'Ausschreibung, Vergabe & Koordination bewährter regionaler Unternehmer',
      'Verbindliche Kosten-, Termin- und Qualitätskontrolle vor Ort',
    ],
    references: 'SIA 102 Phasen 11–53 vollständig im eigenen Büro',
  },
] as const;

export const FEATURED_PROJECTS: ReadonlyArray<ProjectItem> = [
  {
    id: 'stadtvilla-freiestrasse',
    code: 'TK · 01',
    title: 'Stadtvilla Freiestrasse',
    subtitle: 'Innenrenovation einer Gründerzeit-Stadtvilla von 1894',
    category: 'Umbau & Renovation',
    location: '8032 Zürich-Hottingen',
    year: 'Realisiert · Etappen ab 2012',
    heritageOrYearBuilt: 'Bestand 1894',
    scope: 'Entwurf, Ausführungsplanung, Innenarchitektur & Bauleitung',
    materials: ['Fischgrat-Eichenparkett', 'Historische Brusttäfer', 'Naturstein', 'Kalkputz'],
    image: '/images/projects/stadtvilla-freiestrasse.png',
    summary:
      'Behutsame Innenrenovation von drei grosszügigen Etagenwohnungen in einem repräsentativen Mehrfamilienhaus von 1894 an der Freiestrasse in Zürich-Hottingen.',
    description: [
      'Die herrschaftliche Stadtvilla aus dem Jahr 1894 im Zürcher Hottingerquartier zeichnet sich durch hohe Räume, originale Brusttäferungen, feine Deckenstuckaturen und klassische Kastenfenster aus. Ziel des Eingriffs war es, die drei grosszügigen Wohnungen technisch und funktional in die Gegenwart zu überführen, ohne ihre historische Aura anzutasten.',
      'Küche und Bäder wurden als ruhige, monolithische Einbauten neu konzipiert, die sich selbstverständlich in die historische Raumfolge einfügen. Sämtliche neuen Schreinerarbeiten, Beschläge und Natursteinoberflächen wurden im Detail auf den Bestand abgestimmt.',
    ],
    highlights: [
      { label: 'Objekt', value: '3 Etagenwohnungen in Stadtvilla (1894)' },
      { label: 'Standort', value: 'Freiestrasse, 8032 Zürich' },
      { label: 'Leistung', value: 'Gesamtleistung SIA 31–53 & Raumgestaltung' },
      { label: 'Fokus', value: 'Denkmalgerechte Erneuerung & Massschreinerarbeiten' },
    ],
  },
  {
    id: 'bauernhaus-maur',
    code: 'TK · 02',
    title: 'Bauernhaus & Scheune Maur',
    subtitle: 'Denkmalgeschützter Umbau eines Ensembles mit Tragstruktur von 1526',
    category: 'Umbau & Renovation',
    location: '8124 Maur am Greifensee',
    year: 'Realisiert · 2016',
    heritageOrYearBuilt: 'Tragwerk 1526 · Denkmalgeschützt',
    scope: 'Konzept, Denkmalpflege, Ausführungsplanung & Bauleitung',
    materials: ['Altholz 16. Jh.', 'Weisskalkputz', 'Heimische Weisstanne', 'Baubiologische Dämmung'],
    image: '/images/projects/bauernhaus-maur.png',
    summary:
      'Transformation eines denkmalgeschützten Ensembles aus historischem Bauernhaus und Scheune zu einem zeitgemässen Wohnhaus mit Einliegerwohnung, Gartenfassade und Wellnessbereich.',
    description: [
      'Die Primärtragstruktur dieses aussergewöhnlichen Ensembles aus Bauernhaus und Scheune in Maur reicht bis ins Jahr 1526 zurück. In enger Zusammenarbeit mit der kantonalen Denkmalpflege wurde das historische Tragwerk freigelegt, gesichert und durch präzise ablesbare, zeitgenössische Einbauten ergänzt.',
      'Durch die Öffnung der ehemaligen Scheune und die Neugestaltung von Gartenfassade, Vorraum und Wohnbereich entstand ein lichtdurchflutetes Raumkontinuum. Natürliche, baubiologische Materialien sowie ein fein in das Altholzgefüge integrierter Saunabereich verbinden fünfhundertjährige Baugeschichte mit höchstem heutigem Wohnkomfort.',
    ],
    highlights: [
      { label: 'Objekt', value: 'Bauernhaus & Scheune mit Einliegerwohnung' },
      { label: 'Historie', value: 'Primärtragstruktur von 1526 (Denkmalschutz)' },
      { label: 'Standort', value: '8124 Maur ZH' },
      { label: 'Fokus', value: 'Weiterbau im Baudenkmal & Baubiologie' },
    ],
  },
  {
    id: 'landhaus-meilen',
    code: 'TK · 03',
    title: 'Landhaus am Zürichsee',
    subtitle: 'Neubau und Weiterbau an Hanglage mit Seeblick',
    category: 'Neubau & Weiterbau',
    location: 'Meilen / Uetikon am See',
    year: 'Realisiert',
    heritageOrYearBuilt: 'Neubau & Raumgestaltung',
    scope: 'Architektur, Innenarchitektur, Umgebung & Bauleitung',
    materials: ['Brettschalungs-Sichtbeton', 'Vorvergraute Lärche', 'Raumhohe Verglasung', 'Eiche'],
    image: '/images/projects/landhaus-meilen.png',
    summary:
      'Grosszügiges Wohnhaus an privilegierter Hanglage über dem Zürichsee mit präzise gefügter Volumetrie, weit auskragendem Vordach und durchgehender Innenarchitektur.',
    description: [
      'An den Hängen des rechten Zürichseeufers (Raum Meilen, Uetikon am See und Zollikon) realisierte Tschander.Keller mehrere anspruchsvolle Einfamilien- und Landhäuser. Die Architektur entwickelt sich aus der Topografie des Hangs und inszeniert den Blick über den See und in die Glarner Alpen.',
      'Ein ruhiger Sockel aus handwerklich geschaltem Sichtbeton trägt das leicht wirkende Obergeschoss mit vertikaler Holzschalung. Im Inneren schaffen massgefertigte Schreinereinbauten, flächenbündige Türen und warme Natursteinböden eine zeitlose, zurückhaltende Wohnatmosphäre.',
    ],
    highlights: [
      { label: 'Typologie', value: 'Einfamilien- & Landhausbau am Zürichsee' },
      { label: 'Region', value: 'Meilen · Uetikon am See · Zollikon' },
      { label: 'Leistung', value: 'Gesamtplanung SIA 102 inkl. Innenausbau' },
      { label: 'Fokus', value: 'Topografische Einbettung & Sichtbezüge' },
    ],
  },
  {
    id: 'efh-hauserstrasse',
    code: 'TK · 04',
    title: 'Wohnhaus Hauserstrasse',
    subtitle: 'Gesamterneuerung und räumliche Öffnung am Zürichberg',
    category: 'Umbau & Renovation',
    location: '8032 Zürichberg',
    year: 'Realisiert · 2023 / 2024',
    heritageOrYearBuilt: 'Bestand Zürichberg',
    scope: 'Umbau, Fassaden- & Innenraumgestaltung, Bauleitung',
    materials: ['Geölte Eiche', 'Travertin', 'Eloxiertes Bronze-Aluminium', 'Mineralputz'],
    image: '/images/projects/efh-hauserstrasse.png',
    summary:
      'Umfassende Renovation und räumliche Neuorganisation eines Wohnhauses an der Hauserstrasse in unmittelbarer Nachbarschaft unseres Ateliers am Zürichberg.',
    description: [
      'An ruhiger Südhanglage am Zürichberg wurde das bestehende Gebäude umfassend saniert und räumlich geklärt. Durch gezielte statische Eingriffe konnten die Wohnräume grosszügig zum eingewachsenen Terrassengarten geöffnet werden.',
      'Raumhohe Schrankfronten in geölter Eiche übernehmen gleichzeitig dienende und raumbildende Funktionen. Zusammen mit offenporigem Naturstein und einer präzisen Lichtführung entsteht ein ruhiges, lichtdurchflutetes Zuhause mitten in der Stadt.',
    ],
    highlights: [
      { label: 'Objekt', value: 'Wohnhaus-Umbau & Gesamtrenovation' },
      { label: 'Standort', value: 'Hauserstrasse, 8032 Zürich' },
      { label: 'Realisierung', value: '2023 – 2024' },
      { label: 'Fokus', value: 'Gartenbezug, Grundrissklärung & Innenausbau' },
    ],
  },
  {
    id: 'mfh-narzissenstrasse',
    code: 'TK · 05',
    title: 'MFH Narzissenstrasse',
    subtitle: 'Sorgfältige Sanierung eines städtischen Mehrfamilienhauses',
    category: 'Umbau & Renovation',
    location: '8006 Zürich-Oberstrass',
    year: 'Realisiert',
    heritageOrYearBuilt: 'Städtischer Wohnungsbau',
    scope: 'Sanierungskonzept, Ausführungsplanung & Bauleitung',
    materials: ['Mineralischer Kratzputz', 'Metallfenster in Bronzeton', 'Eichenriemen', 'Terrazzo'],
    image: '/images/projects/mfh-narzissenstrasse.png',
    summary:
      'Qualitätsvolle Gesamtsanierung eines Mehrfamilienhauses in Zürich-Oberstrass unter Wahrung des städtischen Ausdrucks und Aufwertung sämtlicher Wohnungsgrundrisse.',
    description: [
      'Der Weiterbau städtischer Mehrfamilienhäuser in gewachsenen Zürcher Quartieren erfordert ein feines Gleichgewicht zwischen baulicher Erneuerung, Wirtschaftlichkeit und Respekt vor dem Strassenbild.',
      'An der Narzissenstrasse wurden Gebäudehülle, Haustechnik und Innenräume integral erneuert. Tief gesetzte Fensterlaibungen, mineralische Putzoberflächen und sorgfältig detaillierte Geländer bewahren die architektonische Würde des Hauses für die nächsten Jahrzehnte.',
    ],
    highlights: [
      { label: 'Typologie', value: 'Mehrfamilienhaus · Städtischer Bestand' },
      { label: 'Standort', value: 'Narzissenstrasse, 8006 Zürich' },
      { label: 'Leistung', value: 'Sanierung, Weiterbau & Bauleitung' },
      { label: 'Fokus', value: 'Fassadenkultur & Wohnwertsteigerung' },
    ],
  },
  {
    id: 'raumgestaltung-spirgarten',
    code: 'TK · 06',
    title: 'Hotel Spirgarten & Raumgestaltung',
    subtitle: 'Innenarchitektur, Akustik-, Licht- und Möbelkonzepte',
    category: 'Raumgestaltung',
    location: 'Zürich-Altstetten / Zumikon',
    year: 'Realisiert',
    heritageOrYearBuilt: 'Innenarchitektur & Massmöbel',
    scope: 'Raumkonzept, Detailplanung 1:1, Möblierung & Realisierung',
    materials: ['Massivholz-Akustiklamellen', 'Jurakalkstein', 'Gebürstete Bronze', 'Naturleinen'],
    image: '/images/projects/raumgestaltung-spirgarten.png',
    summary:
      'Atmosphärische Raumgestaltung und handwerkliche Detaillierung für Gastronomie, Hotellerie sowie anspruchsvolle Privatwohnungen wie in der Siedlung Seldwyla in Zumikon.',
    description: [
      'Neben klassischen Hochbau- und Umbauaufgaben bildet die Raumgestaltung eine eigenständige Säule von Tschander.Keller Architekten. Für das traditionsreiche Haus Spirgarten in Zürich, für den Umbau einer Wohnung in der berühmten Siedlung Seldwyla in Zumikon sowie für ausgewählte Ladenbauten entstanden massgeschneiderte Innenräume.',
      'Jedes Detail — von der Profilierung der Wandverkleidungen über die Haptik der Türgriffe bis zur Lichtfarbe am Abend — wird im Atelier an Handmustern geprüft und mit spezialisierten Handwerksbetrieben umgesetzt.',
    ],
    highlights: [
      { label: 'Referenzen', value: 'Hotel Spirgarten Zürich · Wohnung Seldwyla Zumikon' },
      { label: 'Spezialgebiet', value: 'Innenarchitektur, Bäder, Küchen & Ladenbau' },
      { label: 'Planungstiefe', value: 'Detail- & Werkplanung im Massstab 1:10 bis 1:1' },
      { label: 'Fokus', value: 'Haptik, Raumakustik & zeitlose Atmosphäre' },
    ],
  },
];

export const ARCHIVE_PROJECTS: ReadonlyArray<ArchiveEntry> = [
  {
    year: '2023/24',
    title: 'Wohnhaus Hauserstrasse',
    location: '8032 Zürich',
    category: 'Umbau & Renovation',
    scope: 'Gesamtrenovation, Grundrissöffnung & Gartenbezug',
  },
  {
    year: 'Bestand',
    title: 'Mehrfamilienhaus Narzissenstrasse',
    location: '8006 Zürich-Oberstrass',
    category: 'Umbau & Renovation',
    scope: 'Sanierung Gebäudehülle, Wohnungen & Bauleitung',
  },
  {
    year: 'Bestand',
    title: 'Aufstockung Affoltern',
    location: '8046 Zürich-Affoltern',
    category: 'Neubau & Weiterbau',
    scope: 'Holzbau-Aufstockung & energetische Erneuerung',
  },
  {
    year: '2016',
    title: 'Bauernhaus und Scheune Maur (Tragwerk 1526)',
    location: '8124 Maur ZH',
    category: 'Umbau & Renovation',
    scope: 'Denkmalgeschützter Umbau, Einliegerwohnung & Wellness',
  },
  {
    year: 'Bestand',
    title: 'Stadthaus Oberstrass',
    location: '8006 Zürich',
    category: 'Umbau & Renovation',
    scope: 'Umbau, Innenarchitektur & Bauleitung',
  },
  {
    year: 'Bestand',
    title: 'Gemeindehaus Embrach',
    location: '8424 Embrach',
    category: 'Umbau & Renovation',
    scope: 'Öffentlicher Bau · Umbau & Sanierung',
  },
  {
    year: 'ab 2012',
    title: 'Stadtvilla Freiestrasse (Baujahr 1894)',
    location: '8032 Zürich-Hottingen',
    category: 'Umbau & Renovation',
    scope: 'Innenrenovation von 3 Etagenwohnungen',
  },
  {
    year: 'Neubau',
    title: 'Einfamilienhäuser & Landhäuser Zürichsee',
    location: 'Meilen · Uetikon am See · Zollikon',
    category: 'Neubau & Weiterbau',
    scope: 'Neubau, Weiterbau & Raumgestaltung',
  },
  {
    year: 'Neubau',
    title: 'Wohnbauten Zumikon, Forch & Uitikon',
    location: 'Region Zürich / Pfannenstiel',
    category: 'Neubau & Weiterbau',
    scope: 'Einfamilienhäuser & Reihen-Einfamilienhäuser (REFH)',
  },
  {
    year: 'Innenraum',
    title: 'Wohnung Siedlung Seldwyla',
    location: '8126 Zumikon',
    category: 'Raumgestaltung',
    scope: 'Innenarchitektur, Küche, Bad & Schreinerarbeiten',
  },
  {
    year: 'Hospitality',
    title: 'Hotel Spirgarten Zürich',
    location: '8048 Zürich-Altstetten',
    category: 'Raumgestaltung',
    scope: 'Raumgestaltung, Beleuchtungs- & Materialkonzept',
  },
  {
    year: 'Ladenbau',
    title: 'Goldschmiedladen Lenzburg',
    location: '5600 Lenzburg',
    category: 'Raumgestaltung',
    scope: 'Ladenbau, Vitrinen- & Lichtgestaltung im Massstab 1:1',
  },
];

export const VORGEHEN_STEPS = [
  {
    step: '01',
    sia: 'SIA Phase 11–21 · Vorstudie',
    title: 'Bestandsaufnahme & Machbarkeit',
    description:
      'Jedes Projekt beginnt mit einem persönlichen Gespräch vor Ort oder in unserem Atelier an der Dolderstrasse. Wir hören zu, lesen die bestehende Bausubstanz, prüfen Bauordnung sowie Denkmalpflege und klären das räumliche und finanzielle Potenzial Ihres Vorhabens.',
    outcome: 'Klare Entscheidungsgrundlage, Raumanalyse & erste Machbarkeitseinschätzung',
  },
  {
    step: '02',
    sia: 'SIA Phase 31 · Vorprojekt',
    title: 'Entwurf, Modell & Raumkonzept',
    description:
      'In enger Abstimmung mit Ihnen entwickeln wir massgeschneiderte Entwurfsvarianten. Anhand von Grundrissen, Schnitten, Arbeitsmodellen und ersten Materialcollagen werden Raumfluss, Lichtführung und Atmosphäre konkret erlebbar.',
    outcome: 'Abgestimmtes Vorprojekt, Materialkonzept & fundierte Kostenschätzung',
  },
  {
    step: '03',
    sia: 'SIA Phase 32–33 · Bauprojekt & Bewilligung',
    title: 'Projektierung & Baubewilligung',
    description:
      'Wir arbeiten Konstruktion, Statik, Bauphysik und Haustechnik gemeinsam mit spezialisierten Fachplanern im Detail durch. Gleichzeitig übernehmen wir die gesamte Abstimmung mit den Zürcher Baubehörden und der Denkmalpflege bis zur rechtskräftigen Baubewilligung.',
    outcome: 'Vollständiges Bauprojekt, detaillierter Kostenvoranschlag & Baubewilligung',
  },
  {
    step: '04',
    sia: 'SIA Phase 41–51 · Ausschreibung & Werkplanung',
    title: 'Detailplanung 1:20 bis 1:1 & Vergabe',
    description:
      'Gute Architektur entscheidet sich an der Fuge. Wir zeichnen präzise Werk- und Detailpläne für Rohbau, Fassade, Küchen, Bäder und Einbaumöbel und holen vergleichbare Offerten bei bewährten regionalen Handwerksbetrieben ein.',
    outcome: 'Verbindliche Werkverträge, Ausführungspläne & Bemusterung im Atelier',
  },
  {
    step: '05',
    sia: 'SIA Phase 52–53 · Ausführung & Abschluss',
    title: 'Persönliche Bauleitung & Übergabe',
    description:
      'Während der gesamten Bauzeit sind wir regelmässig persönlich auf der Baustelle präsent. Wir leiten die Handwerker, überwachen Ausführungsqualität, Termine sowie Baukosten transparent und begleiten Sie bis zum Einzug und der Garantieabnahme.',
    outcome: 'Schlüsselfertige Übergabe, lückenlose Baudokumentation & Kostenabrechnung',
  },
] as const;
