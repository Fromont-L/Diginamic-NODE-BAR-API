<script>
    import imagePub from "../assets/image.png"
    export let bars = [];
</script>
  
  {#each bars as bar}
  <a href={`/bars/${bar.id}`} class="cursor-pointer">
    <div class="bg-[var(--clr-white)] w-[360px] h-[360px] rounded-xl flex flex-col justify-around items-center">
      <img src={imagePub} alt={bar.name} class="" />
      <hr class="text-[var(--clr-black)] w-[80%]" />
      <h3 class="text-[var(--clr-black)] text-3xl pb-2 font-medium">{bar.name}</h3>
    </div>
  </a>
  {/each}
  