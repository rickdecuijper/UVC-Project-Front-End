<script>
    import { onMount } from 'svelte';
    import VoortgangsHeader from '$lib/components/schatkaart/VoortgangsHeader.svelte';
    import MissiePunt from '$lib/components/schatkaart/MissiePunt.svelte';

    const DEFAULT_MISSIES = [
        { id: 1, naam: "Zandbak harken", status: "Nog niet gedaan", locatie: { top: '30%', left: '20%' }, beschrijving: "Zandbak harken en schoonmaken." },
        { id: 2, naam: "Puzzelbakken", status: "Nog niet gedaan", locatie: { top: '45%', left: '40%' }, beschrijving: "Puzzels verzamelen en schoonmaken." },
        { id: 3, naam: "Speeltoestellen checken", status: "Nog niet gedaan", locatie: { top: '35%', left: '60%' }, beschrijving: "Veiligheidscontrole toestellen." },
        { id: 4, naam: "Hekwerk repareren", status: "Nog niet gedaan", locatie: { top: '55%', left: '75%' }, beschrijving: "Hekwerk herstellen." },
        { id: 5, naam: "Gras maaien", status: "Nog niet gedaan", locatie: { top: '70%', left: '55%' }, beschrijving: "Gras maaien rondom speelveld." },
        { id: 6, naam: "Schatkist verbergen", status: "Nog niet gedaan", locatie: { top: '80%', left: '85%' }, beschrijving: "Schat verstoppen." }
    ];

    const SVG_LIJNEN = [
        { x: 20, y: 30 },
        { x: 40, y: 45 },
        { x: 60, y: 35 },
        { x: 75, y: 55 },
        { x: 55, y: 70 },
        { x: 85, y: 80 },
        { x: 90, y: 95 }
    ];

    const MISSIES_KEY = 'schatkaartMissies';
    const BG_KEY = 'schatkaart-bg-url';
    const DEFAULT_BG = '/img/jouw-speeltuin-kaart.jpg';

    let missies = DEFAULT_MISSIES;
    let openMissieId = null;
    let kaartAchtergrondUrl = DEFAULT_BG;

    onMount(() => {
        try {
            const stored = localStorage.getItem(MISSIES_KEY);
            if (stored) missies = JSON.parse(stored);
        } catch {}

        kaartAchtergrondUrl = localStorage.getItem(BG_KEY) || DEFAULT_BG;
    });

    $: polylinePoints = SVG_LIJNEN.map(p => `${p.x},${p.y}`).join(' ');
    $: totaalAantal = missies.length;
    $: aantalVoltooid = missies.filter(m => m.status === 'Voltooid').length;
    $: lijnKleur = aantalVoltooid === totaalAantal ? '#FACC15' : '#A855F7';

    function saveMissies() {
        if (typeof window !== 'undefined') {
            localStorage.setItem(MISSIES_KEY, JSON.stringify(missies));
        }
    }

    function handleToggle(id) {
        openMissieId = openMissieId === id ? null : id;
    }

    function handleVoltooi(event) {
        const id = event.detail;
        missies = missies.map(m =>
            m.id === id ? { ...m, status: 'Voltooid' } : m
        );
        saveMissies();
        openMissieId = null;
    }

    function handleBackgroundUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            kaartAchtergrondUrl = reader.result;
            localStorage.setItem(BG_KEY, reader.result);
        };
        reader.readAsDataURL(file);
    }
    function resetMissies() {
    if (!confirm('Weet je zeker dat je alle missies opnieuw wilt starten?')) return;

    missies = missies.map(m => ({
        ...m,
        status: 'Nog niet gedaan'
    }));

    openMissieId = null;
    saveMissies();
}
</script>

<div class="schatkaart-container min-h-screen bg-sky-200 pb-10">
    <VoortgangsHeader
        missiesVoltooid={aantalVoltooid}
        totaalMissies={totaalAantal}
    />

<div class="flex justify-center gap-4 mt-2 mb-4">
    <label class="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2 rounded-full shadow-lg">
        📷 Achtergrond wijzigen
        <input type="file" accept="image/*" class="hidden" on:change={handleBackgroundUpload} />
    </label>

    <button
        on:click={resetMissies}
        class="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded-full shadow-lg"
    >
        🔄 Reset missies
    </button>
</div>


    <div class="kaart-vlak relative w-full max-w-[1200px] h-[600px] mx-auto mt-2 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border-8 border-yellow-400 bg-gray-50">
        <img src={kaartAchtergrondUrl} class="absolute inset-0 w-full h-full object-cover z-0" />

        <svg class="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
                points={polylinePoints}
                fill="none"
                stroke={lijnKleur}
                stroke-width="3"
                stroke-dasharray="2,3"
            />
        </svg>

        {#each missies as missie (missie.id)}
            <MissiePunt
                class="absolute z-20"
                missie={missie}
                isGeopend={openMissieId === missie.id}
                on:click={() => handleToggle(missie.id)}
                on:voltooi={handleVoltooi}
            />
        {/each}

        {#if aantalVoltooid === totaalAantal}
    <div
        class="absolute z-30 pointer-events-none"
        style="
            top: 91%;
            left: 92%;
            transform: translate(-50%, -50%);
            width: clamp(64px, 8vw, 120px);
            height: clamp(64px, 8vw, 120px);
        "
    >
        <img
            src="src\lib\assets\schatkist.png"
            alt="Schatkist"
            class="w-full h-full object-contain drop-shadow-xl"
        />
    </div>
{/if}

    </div>
</div>
