/** @type {import('./$types').PageServerLoad} */
export async function load() {
  // Fake backend delay (optional, for realism)
  await new Promise((r) => setTimeout(r, 200));

  const tasks = [
  {
    id: crypto.randomUUID(),
    title: 'Afval rapen op schoolplein',
    description: 'Losliggend afval verzamelen op het hele schoolplein',
    subtasks: ['Handschoenen uitdelen', 'Vuilniszakken pakken', 'Afval scheiden'],
    status: 'Nog niet gestart',
    people: ['Emma', 'Liam'],
    date: '2026-01-06',
    time: '08:30'
  },
  {
    id: crypto.randomUUID(),
    title: 'Speeltoestellen schoonmaken',
    description: 'Reinigen van schommels en klimrekken',
    subtasks: ['Emmers vullen', 'Schoonmaakmiddel gebruiken'],
    status: 'Nog niet gestart',
    people: ['Sophie'],
    date: '2026-01-06',
    time: '09:00'
  },
  {
    id: crypto.randomUUID(),
    title: 'Bladeren vegen',
    description: 'Bladeren verwijderen van het plein',
    subtasks: ['Bezem pakken', 'Bladeren verzamelen'],
    status: 'In progress',
    people: ['Emma'],
    date: '2026-01-06',
    time: '09:30'
  },
  {
    id: crypto.randomUUID(),
    title: 'Zandbak controleren',
    description: 'Zandbak schoon en veilig maken',
    subtasks: ['Afval verwijderen', 'Zand egaliseren'],
    status: 'Nog niet gestart',
    people: ['Liam'],
    date: '2026-01-06',
    time: '10:00'
  },
  {
    id: crypto.randomUUID(),
    title: 'Bankjes afnemen',
    description: 'Alle zitbankjes schoonmaken',
    subtasks: ['Doekjes pakken'],
    status: 'Nog niet gestart',
    people: ['Sophie'],
    date: '2026-01-06',
    time: '10:30'
  },
  {
    id: crypto.randomUUID(),
    title: 'Fietsenrek opruimen',
    description: 'Los afval bij het fietsenrek verwijderen',
    subtasks: ['Papier verzamelen', 'Plastic weggooien'],
    status: 'Nog niet gestart',
    people: ['Emma', 'Sophie'],
    date: '2026-01-06',
    time: '11:00'
  },
  {
    id: crypto.randomUUID(),
    title: 'Afvalcontainers legen',
    description: 'Alle prullenbakken legen',
    subtasks: ['Nieuwe zakken plaatsen'],
    status: 'In progress',
    people: ['Liam'],
    date: '2026-01-06',
    time: '11:30'
  },
  {
    id: crypto.randomUUID(),
    title: 'Stoep vegen',
    description: 'Stoep rondom schoolplein schoonvegen',
    subtasks: [],
    status: 'Nog niet gestart',
    people: ['Emma'],
    date: '2026-01-06',
    time: '12:00'
  },
  {
    id: crypto.randomUUID(),
    title: 'Onkruid verwijderen',
    description: 'Onkruid langs hekwerk weghalen',
    subtasks: ['Handschoenen aantrekken'],
    status: 'Nog niet gestart',
    people: ['Sophie'],
    date: '2026-01-07',
    time: '08:30'
  },
  {
    id: crypto.randomUUID(),
    title: 'Hekwerk schoonmaken',
    description: 'Hekwerk afspoelen en afnemen',
    subtasks: [],
    status: 'Nog niet gestart',
    people: ['Liam'],
    date: '2026-01-07',
    time: '09:00'
  },
  {
    id: crypto.randomUUID(),
    title: 'Schoolplein inspecteren',
    description: 'Controleren of alles schoon en veilig is',
    subtasks: ['Checklist nalopen'],
    status: 'Nog niet gestart',
    people: ['Emma'],
    date: '2026-01-07',
    time: '09:30'
  },
  {
    id: crypto.randomUUID(),
    title: 'Glas verzamelen',
    description: 'Eventueel glas veilig opruimen',
    subtasks: ['Handschoenen gebruiken'],
    status: 'Nog niet gestart',
    people: ['Liam', 'Sophie'],
    date: '2026-01-07',
    time: '10:00'
  },
  {
    id: crypto.randomUUID(),
    title: 'Grote afvalstukken verwijderen',
    description: 'Grote stukken afval afvoeren',
    subtasks: ['Kar gebruiken'],
    status: 'In progress',
    people: ['Emma'],
    date: '2026-01-07',
    time: '10:30'
  },
  {
    id: crypto.randomUUID(),
    title: 'Materialen opruimen',
    description: 'Schoonmaakmaterialen terugleggen',
    subtasks: [],
    status: 'Nog niet gestart',
    people: ['Sophie'],
    date: '2026-01-07',
    time: '11:00'
  },
  {
    id: crypto.randomUUID(),
    title: 'Eindcontrole uitvoeren',
    description: 'Laatste controle van het schoolplein',
    subtasks: ['Foto’s maken', 'Rapportage afronden'],
    status: 'Nog niet gestart',
    people: ['Emma', 'Liam'],
    date: '2026-01-07',
    time: '11:30'
  }
];

  return {
    tasks
  };
}
