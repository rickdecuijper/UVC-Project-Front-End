<script>
    let gekozenGeslacht = "Man";
    let gekozenRas = "White";
    let gekozenGewicht = 100
    let gekozenHaarKleur = "Black"
</script>

<div class="bg-sky-200" style="position: absolute; width: 700px; height: 555px; top: 140px; left: 40px; display: flex; justify-content: center; align-items: center; border-radius: 20px;">
    <svg width={400 * 2} height={400 * 2}>
        <circle cx={350} cy={450} r={gekozenGewicht} fill="Blue" />
        <circle cx={350} cy={300} r={100} fill={gekozenRas} />
        {#if gekozenRas == "White"}
            <circle cx={400} cy={300} r={5} fill="Blue" />
            <circle cx={300} cy={300} r={5} fill="Blue" />
        {/if}
        {#if gekozenRas == "Black"}
            <circle cx={400} cy={300} r={5} fill="blue" />
            <circle cx={300} cy={300} r={5} fill="blue" />
        {/if}
        {#if gekozenRas == "Yellow"}
            <circle cx={400} cy={300} r={5} fill="blue" />
            <circle cx={300} cy={300} r={5} fill="blue" />
        {/if}
        <rect x="260" y="190" width={180} height={70} fill={gekozenHaarKleur} rx="10" />
    </svg>
</div>

<div class="bg-sky-200" style="position: absolute; width: 700px; height: 555px; top: 140px; left: 965px; border-radius: 20px;">
    <h1 style="position: absolute; left: 20px; font-size: 40px;">Pas je avatar aan</h1>

    <h1 style="font-size: 30px; position: absolute; left: 20px; top: 60px;">Huidskleur:</h1>
    <button style="width: 170px; height: 70px; font-size: 35px; position: absolute; left: 40px; top: 130px; background-color: wheat; border-radius: 10px;" on:click={() => {gekozenRas = "White"}}></button>
    <button style="width: 170px; height: 70px; font-size: 35px; position: absolute; left: 250px; top: 130px; background-color: black; border-radius: 10px;" on:click={() => {gekozenRas = "Black"}}></button>
    <button style="width: 170px; height: 70px; font-size: 35px; position: absolute; left: 460px; top: 130px; background-color: yellow; border-radius: 10px;" on:click={() => {gekozenRas = "Yellow"}}></button>

    <h1 style="font-size: 30px; position: absolute; left: 20px; top: 210px;">Dikheid:</h1>
    <button style="width: 170px; height: 70px; font-size: 35px; position: absolute; left: 40px; top: 280px; border-radius: 10px;" on:click={() => {gekozenGewicht = 100}}>Dun</button>
    <button style="width: 170px; height: 70px; font-size: 35px; position: absolute; left: 250px; top: 280px; border-radius: 10px;" on:click={() => {gekozenGewicht = 140}}>Normaal</button>
    <button style="width: 170px; height: 70px; font-size: 35px; position: absolute; left: 460px; top: 280px; border-radius: 10px;" on:click={() => {gekozenGewicht = 200}}>Dik</button>

    <h1 style="font-size: 30px; position: absolute; left: 20px; top: 360px;">Haarkleur:</h1>
    <button style="width: 170px; height: 70px; font-size: 35px; position: absolute; left: 40px; top: 430px; border-radius: 10px;" on:click={() => {gekozenHaarKleur = "Black"}}>Zwart</button>
    <button style="width: 170px; height: 70px; font-size: 35px; position: absolute; left: 250px; top: 430px; border-radius: 10px;" on:click={() => {gekozenHaarKleur = "Brown"}}>Bruin</button>
    <button style="width: 170px; height: 70px; font-size: 35px; position: absolute; left: 460px; top: 430px; border-radius: 10px;" on:click={() => {gekozenHaarKleur = "Red"}}>Ginger</button>
</div>