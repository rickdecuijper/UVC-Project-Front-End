<script>
    let gekozenGeslacht = "Man";
    let gekozenRas = "Wit";
</script>

<div style="position: absolute; width: 100%; height: 100px; background-color: grey; left: 0px; top: 0px;">
    <h1 style="position: absolute; left: 20px; color: white; font-size: 40px;">Avatar Project</h1>
</div>

<div style="position: absolute; width: 700px; height: 755px; background-color: lightgrey; top: 140px; left: 40px; display: flex; justify-content: center; align-items: center">
    <img src={`${gekozenGeslacht}${gekozenRas}.webp`} style="width: 400px;">
</div>

<div style="position: absolute; width: 700px; height: 755px; background-color: lightgrey; top: 140px; left: 965px;">
    <h1 style="font-size: 50px; position: absolute; left: 20px;">Geslacht:</h1>
    <button style="width: 170px; height: 70px; font-size: 35px; position: absolute; left: 40px; top: 120px;" on:click={() => {gekozenGeslacht = "Man"}}>Man</button>
    <button style="width: 170px; height: 70px; font-size: 35px; position: absolute; left: 250px; top: 120px;" on:click={() => {gekozenGeslacht = "Vrouw"}}>Vrouw</button>

    <h1 style="font-size: 50px; position: absolute; left: 20px; top: 200px;">Ras:</h1>
    <button style="width: 170px; height: 70px; font-size: 35px; position: absolute; left: 40px; top: 320px;" on:click={() => {gekozenRas = "Wit"}}>Wit</button>
    <button style="width: 170px; height: 70px; font-size: 35px; position: absolute; left: 250px; top: 320px;" on:click={() => {gekozenRas = "Zwart"}}>Zwart</button>
    <button style="width: 170px; height: 70px; font-size: 35px; position: absolute; left: 460px; top: 320px;" on:click={() => {gekozenRas = "Chinees"}}>Chinees</button>
</div>