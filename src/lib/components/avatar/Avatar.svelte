<script>
    export let huid = "#FFDBAC";
    export let haarVorm = "kort";
    export let haarKleur = "#442200";
    export let kleding = "shirt_basis.png";
    export let extra = "jas_arts.png";

    import { base } from "$app/paths";

const pad = `${base}/img/`;
</script>

<div class="avatar-master-container">
    {#if kleding && kleding !== 'leeg'}
        <img src="{pad}{kleding}" alt="kleding" class="overlay clothes" />
    {/if}

    <svg viewBox="0 0 500 500" class="svg-base">
        <circle cx="250" cy="250" r="100" fill={huid} /> 
        
        <circle cx="220" cy="230" r="6" fill="black" />
        <circle cx="280" cy="230" r="6" fill="black" />
        <path d="M210,280 Q250,310 290,280" stroke="black" fill="none" stroke-width="3" stroke-linecap="round" />

        <g fill={haarKleur}>
            {#if haarVorm === 'kort'}
                <path d="M150,250 Q150,150 250,150 Q350,150 350,250 L350,230 Q250,200 150,230 Z" />
            {:else if haarVorm === 'mohawk'}
                <path d="M230,130 L270,130 L270,200 L230,200 Z" />
            {:else if haarVorm === 'lang'}
                <path d="M150,250 Q150,140 250,140 Q350,140 350,250 L360,400 Q250,380 140,400 Z" />
            {/if}
        </g>
    </svg>

    {#if extra && extra !== 'leeg'}
        <img src="{pad}{extra}" alt="" class="overlay accessory" />
    {/if}
</div>

<style>
    .avatar-master-container { 
        position: relative; 
        width: 450px; 
        height: 450px; 
        margin: auto;
    }

    .svg-base { 
        width: 100%; 
        height: 100%; 
        position: relative;
        z-index: 10; /* Hoger getal = meer naar voren */
    }

    .overlay { 
        position: absolute; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        pointer-events: none; 
        object-fit: contain;
    }

    .clothes { 
        top: 100px;   /* Iets lager gezet zodat het onder het hoofd uitkomt */
        z-index: 5;    /* Lager dan de SVG, dus het staat erachter */
        transform: scale(1.2); /* Iets breder maken voor de schouders */
    }

.accessory { 
        /* 'top' bepaalt de hoogte: een lager getal (of negatief) zet hem hoger */
        top: -10px; 
        
        z-index: 20;
        
        /* 'scale' bepaalt de grootte: 0.8 is 80% van de originele grootte */
        /* 'translateY' helpt ook om hem omhoog te duwen (-30px) */
        transform: scale(0.6) translateY(-30px);
        
        transform-origin: center top; 
        
        position: absolute; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        pointer-events: none; 
        object-fit: contain;
    }
</style>