<script>
    import { onMount } from 'svelte';
    import Avatar from '$lib/components/avatar/Avatar.svelte';

    let onderdelen = [];
    
    let selectie = {
        huidskleur: "#FFDBAC",
        haarvorm: "kort",
        haarkleur: "#442200",
        kleding: "shirt_basis.png",
        accessoire: ""
    };

    onMount(async () => {
        const res = await fetch('http://localhost:3011/avatar/onderdelen');
        onderdelen = await res.json();
    });

    function kies(item) {
        if (item.categorie === 'huid') {
            selectie.huidskleur = item.hex_kleur;
        } else if (item.categorie === 'haarstijl') {
            selectie.haarvorm = item.afbeelding;
        } else if (item.categorie === 'haarkleur') {
            selectie.haarkleur = item.hex_kleur;
        } else if (item.categorie === 'kleding') {
            selectie.kleding = item.afbeelding;
        } else if (item.categorie === 'accessoire') {
            selectie.accessoire = item.afbeelding;
        }
    }

    $: categorieen = ["huid", "haarstijl", "haarkleur", "kleding", "accessoire"];
</script>

<div class="creator-root">
    <div class="avatar-preview">
        <Avatar 
            huid={selectie.huidskleur}
            haarVorm={selectie.haarvorm}
            haarKleur={selectie.haarkleur}
            kleding={selectie.kleding}
            extra={selectie.accessoire}
        />
    </div>

    <div class="shop-panel">
        {#each categorieen as cat}
            <div class="category-section">
                <h3>Kies {cat}</h3>
                <div class="button-grid">
                    {#each onderdelen.filter(i => i.categorie === cat) as item}
                        <button 
                            class="item-btn" 
                            class:active={
                                (cat === 'huid' && selectie.huidskleur === item.hex_kleur) ||
                                (cat === 'haarkleur' && selectie.haarkleur === item.hex_kleur) ||
                                (cat === 'haarstijl' && selectie.haarvorm === item.afbeelding) ||
                                (cat === 'kleding' && selectie.kleding === item.afbeelding) ||
                                (cat === 'accessoire' && selectie.accessoire === item.afbeelding)
                            }
                            on:click={() => kies(item)}
                        >
                            {#if item.hex_kleur && item.hex_kleur !== ""}
                                <span class="color-dot" style="background: {item.hex_kleur}"></span>
                            {/if}
                            <span class="btn-text">{item.naam}</span>
                        </button>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .creator-root { 
        display: flex; 
        gap: 40px; 
        padding: 40px; 
        max-width: 1200px; 
        margin: 0 auto; 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .avatar-preview { 
        flex: 1; 
        position: sticky; 
        top: 20px; 
        height: 500px;
        background: #f1f5f9;
        border-radius: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .shop-panel { flex: 1.5; }

    .category-section { margin-bottom: 32px; }

    h3 { 
        text-transform: capitalize; 
        font-size: 1.2rem; 
        color: #334155;
        margin-bottom: 16px;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 8px;
    }

    .button-grid { 
        display: grid; 
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); 
        gap: 12px; 
    }

    .item-btn { 
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 16px; 
        border: 2px solid #e2e8f0; 
        cursor: pointer; 
        border-radius: 12px; 
        background: white; 
        transition: all 0.2s;
        text-align: left;
    }

    .item-btn:hover { 
        background: #f8fafc; 
        border-color: #cbd5e1; 
    }

    .item-btn.active { 
        border-color: #3b82f6; 
        background: #eff6ff; 
    }

    .color-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid rgba(0,0,0,0.1);
        flex-shrink: 0;
    }

    .btn-text {
        font-size: 0.95rem;
        color: #1e293b;
    }
</style>