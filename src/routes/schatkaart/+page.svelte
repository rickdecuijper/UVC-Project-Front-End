<script>
    import VoortgangsHeader from '$lib/components/schatkaart/VoortgangsHeader.svelte';
    import MissiePunt from '$lib/components/schatkaart/MissiePunt.svelte';
    // VERWIJDERD: import AchtergrondUploader is weggehaald!

    // *** FAKE DATA & STATUS BEHEER ***
    
    // De standaardlijst van taken
    const DEFAULT_MISSIES = [
        { id: 1, naam: "Zandbak harken", status: "Nog niet gedaan", locatie: { top: '30%', left: '20%' }, beschrijving: "Zandbak harken en schoonmaken, concentreert op vuil en rommel." },
        { id: 2, naam: "Puzzelbakken", status: "Nog niet gedaan", locatie: { top: '45%', left: '40%' }, beschrijving: "Alle puzzelstukken in de speeltuin liggen en schoonmaken." },
        { id: 3, naam: "Speeltoestellen checken", status: "Nog niet gedaan", locatie: { top: '35%', left: '60%' }, beschrijving: "Veiligheidscontrole van schommels, glijbanen en klimrekken." },
        { id: 4, naam: "Hekwerk repareren", status: "Nog niet gedaan", locatie: { top: '55%', left: '75%' }, beschrijving: "Vernieuwd hekwerk opbouw schilderen. Mag nog niet gebeuren." },
        { id: 5, naam: "Gras maaien", status: "Nog niet gedaan", locatie: { top: '70%', left: '55%' }, beschrijving: "Het groen rondom het speelveld maaien. Nog niet meedoen." },
        { id: 6, naam: "Schatkist verbergen", status: "Nog niet gedaan", locatie: { top: '80%', left: '85%' }, beschrijving: "Zoek een goede plek om de uiteindelijke schat te verbergen." },
    ];
    
    // Coördinaten voor de SVG (X en Y waarden tussen 0 en 100)
    const SVG_LIJNEN = [
        { x: 20, y: 30 }, // Punt 1
        { x: 40, y: 45 }, // Punt 2
        { x: 60, y: 35 }, // Punt 3
        { x: 75, y: 55 }, // Punt 4
        { x: 55, y: 70 }, // Punt 5
        { x: 85, y: 80 }, // Punt 6
        { x: 90, y: 95 }, // Schatkist locatie
    ];

    // FIX: Genereert de punt-coördinaten string ZONDER percentage tekens.
    $: polylinePoints = SVG_LIJNEN.map(p => `${p.x},${p.y}`).join(' ');

    let missies;
    
    // Laad missies uit localStorage of gebruik de standaardlijst
    if (typeof window !== 'undefined' && localStorage.getItem('schatkaartMissies')) {
        try {
             missies = JSON.parse(localStorage.getItem('schatkaartMissies'));
        } catch (e) {
             console.error("Fout bij het laden van lokale opslag, gebruik standaarddata.", e);
             missies = DEFAULT_MISSIES;
        }
    } else {
        missies = DEFAULT_MISSIES;
    }

    // *** ACHTERGROND URL STATUS (AANGEPAST OM DIRECT UIT STORAGE TE LEZEN) ***
    let kaartAchtergrondUrl; 
    const DEFAULT_KAART_URL = '/img/jouw-speeltuin-kaart.jpg';
    const LOCAL_STORAGE_KEY = 'schatkaart-bg-url'; // Dezelfde sleutel als in de Uploader Component

    if (typeof window !== 'undefined') {
        // Lees de opgeslagen URL of val terug op de standaard URL
        kaartAchtergrondUrl = localStorage.getItem(LOCAL_STORAGE_KEY) || DEFAULT_KAART_URL;
    } else {
        kaartAchtergrondUrl = DEFAULT_KAART_URL;
    }
    
    // FUNCTIE handleBackgroundUpload IS VERWIJDERD!
    
    // *** MISSIE STATUS ***

    let openMissieId = null; 
    let totaalAantal = missies.length;
    
    $: aantalVoltooid = missies.filter(m => m.status === 'Voltooid').length;

    // Dynamische lijnkleur: Geen hex-codes meer, we gebruiken veilige Tailwind klassen!
    $: lijnKleur = aantalVoltooid === totaalAantal ? '#FACC15' : '#A855F7'; // Amber-400 vs Purple-500 hex


    $: if (missies && typeof window !== 'undefined') {
        localStorage.setItem('schatkaartMissies', JSON.stringify(missies));
    }
    
    // *** FUNCTIES ***

    function handleToggle(id) {
        openMissieId = openMissieId === id ? null : id;
    }
    
    function handleVoltooi(event) {
        const id = event.detail; 
        
        missies = missies.map(m => {
            if (m.id === id) {
                return { ...m, status: 'Voltooid' };
            }
            return m;
        });
        
        openMissieId = null; 
    }
</script>

<div class="schatkaart-container min-h-screen bg-sky-200 pb-10"> 
    <VoortgangsHeader missiesVoltooid={aantalVoltooid} totaalMissies={totaalAantal} /> 

    <div class="kaart-vlak relative w-full max-w-[1200px] h-[600px] mx-auto mt-2 
                 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden 
                 border-8 border-yellow-400 bg-gray-50"> 
        
        <img src={kaartAchtergrondUrl} alt="Achtergrond van de schatkaart" class="absolute inset-0 w-full h-full object-cover z-0">

        <svg class="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none" style="pointer-events: none;">
            <polyline 
                points={polylinePoints} 
                fill="none" 
                stroke={lijnKleur}          
                stroke-width="3" 
                stroke-dasharray="2, 3" 
            />
        </svg>

        {#each missies as missie (missie.id)}
            <MissiePunt 
                missie={missie} 
                isGeopend={openMissieId === missie.id} 
                on:click={() => handleToggle(missie.id)}
                on:voltooi={handleVoltooi}
            />
        {/each}
        
        {#if aantalVoltooid === totaalAantal}
            <div class="absolute w-28 h-28 z-30 transform -translate-x-1/2 -translate-y-1/2 
                        animate-pulse drop-shadow-2xl" 
                 style="top: 95%; left: 90%;">
                
                <img src="/img/schatkist.png" alt="Schatkist" class="w-full h-full object-contain" />
            </div>
        {/if}
    </div>
</div>