/** @type {import('./$types').PageServerLoad} */
export async function load() {
  await new Promise((r) => setTimeout(r, 200));

  const today = new Date();

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - 7);

  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate());

  const morningTimeSlots = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00"];

  const baseTasks = [
    { title: 'Afval rapen op schoolplein', description: 'Losliggend afval verzamelen op het hele schoolplein', subtasks: ['Handschoenen uitdelen', 'Vuilniszakken pakken', 'Afval scheiden'], status: 'Nog niet gestart', people: ['Emma', 'Liam'] },
    { title: 'Speeltoestellen schoonmaken', description: 'Reinigen van schommels en klimrekken', subtasks: ['Emmers vullen', 'Schoonmaakmiddel gebruiken'], status: 'Nog niet gestart', people: ['Sophie'] },
    { title: 'Bladeren vegen', description: 'Bladeren verwijderen van het plein', subtasks: ['Bezem pakken', 'Bladeren verzamelen'], status: 'In progress', people: ['Emma'] },
    { title: 'Zandbak controleren', description: 'Zandbak schoon en veilig maken', subtasks: ['Afval verwijderen', 'Zand egaliseren'], status: 'Nog niet gestart', people: ['Liam'] },
    { title: 'Bankjes afnemen', description: 'Alle zitbankjes schoonmaken', subtasks: ['Doekjes pakken'], status: 'Nog niet gestart', people: ['Sophie'] },
    { title: 'Fietsenrek opruimen', description: 'Los afval bij het fietsenrek verwijderen', subtasks: ['Papier verzamelen', 'Plastic weggooien'], status: 'Nog niet gestart', people: ['Emma', 'Sophie'] },
    { title: 'Afvalcontainers legen', description: 'Alle prullenbakken legen', subtasks: ['Nieuwe zakken plaatsen'], status: 'In progress', people: ['Liam'] },
    { title: 'Stoep vegen', description: 'Stoep rondom schoolplein schoonvegen', subtasks: [], status: 'Nog niet gestart', people: ['Emma'] },
    { title: 'Onkruid verwijderen', description: 'Onkruid langs hekwerk weghalen', subtasks: ['Handschoenen aantrekken'], status: 'Nog niet gestart', people: ['Sophie'] },
    { title: 'Hekwerk schoonmaken', description: 'Hekwerk afspoelen en afnemen', subtasks: [], status: 'Nog niet gestart', people: ['Liam'] },
    { title: 'Schoolplein inspecteren', description: 'Controleren of alles schoon en veilig is', subtasks: ['Checklist nalopen'], status: 'Nog niet gestart', people: ['Emma'] },
    { title: 'Glas verzamelen', description: 'Eventueel glas veilig opruimen', subtasks: ['Handschoenen gebruiken'], status: 'Nog niet gestart', people: ['Liam', 'Sophie'] },
    { title: 'Grote afvalstukken verwijderen', description: 'Grote stukken afval afvoeren', subtasks: ['Kar gebruiken'], status: 'In progress', people: ['Emma'] },
    { title: 'Materialen opruimen', description: 'Schoonmaakmaterialen terugleggen', subtasks: [], status: 'Nog niet gestart', people: ['Sophie'] },
    { title: 'Eindcontrole uitvoeren', description: 'Laatste controle van het schoolplein', subtasks: ['Foto’s maken', 'Rapportage afronden'], status: 'Nog niet gestart', people: ['Emma', 'Liam'] }
  ];

  // Duplicate baseTasks to generate 100 more tasks with small variations
  const generatedTasks = [];
  for (let i = 0; i < 100; i++) {
    const base = baseTasks[i % baseTasks.length];
    generatedTasks.push({
      title: `${base.title} #${i + 1}`,
      description: base.description,
      subtasks: base.subtasks,
      status: base.status,
      people: base.people
    });
  }

  const allDates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(lastMonday);
    d.setDate(d.getDate() + i);
    allDates.push(new Date(d));
  }
  for (let i = 0; i < 7; i++) {
    const d = new Date(nextMonday);
    d.setDate(d.getDate() + i);
    allDates.push(new Date(d));
  }

  const scheduledTasks = generatedTasks.map((task, index) => {
    const date = allDates[index % allDates.length];
    const time = morningTimeSlots[index % morningTimeSlots.length];
    return {
      id: crypto.randomUUID(),
      ...task,
      date: date.toISOString().split('T')[0],
      time
    };
  });

  return { tasks: scheduledTasks };
}