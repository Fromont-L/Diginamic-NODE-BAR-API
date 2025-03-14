<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import Button from "./Button.svelte";

  let bieres = Array.from({ length: 10 }, (_, index) => ({
    id: `temp-${index}`,
    name: "",
    degree: "",
    prix: "",
  }));
  export let barId;

  onMount(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/bars/${barId}/biere`
      );
      const fetchedBieres = response.data.rows;

      fetchedBieres.forEach((biere, index) => {
        if (index < bieres.length) {
          bieres[index] = biere;
        }
      });

      console.log("bieres:", bieres);
    } catch (error) {
      console.error("Erreur lors de la récupération des bières:", error);
    }
  });

  function addBeer() {
    console.log("Ajouter une bière");
  }

  function deleteBeer(id) {
    console.log("Supprimer la bière avec l'ID:", id);
  }

  function editBeer(id) {
    console.log("Modifier la bière avec l'ID:", id);
  }
</script>

<div class="flex flex-col items-center gap-8 w-4/10 my-[10vh]">
  <table class="w-full border-collapse text-[var(--clr-black)]">
    <thead>
      <tr >
        <th class="w-5/10 py-2 px-2 bg-[var(--clr-yellow)] text-xl rounded-tl-sm">Bières</th>
        <th class="w-2/10 py-2 px-2 bg-[var(--clr-yellow)] text-xl">Degrés</th>
        <th class="w-2/10 py-2 px-2 bg-[var(--clr-yellow)] text-xl">Prix</th>
        <th class="w-1/10 py-2 px-2 bg-[var(--clr-yellow)] text-xl rounded-tr-sm"></th>
      </tr>
    </thead>
    <tbody>
      {#each bieres as biere (biere.id)}
        <tr>
          <td
            class=" h-12 px-2 border-b border-gray-300 bg-[var(--clr-white)] text-center"
            >{biere.name}</td
          >
          <td
            class=" h-12 px-2 border-b border-gray-300 bg-[var(--clr-white)] text-center"
            >{biere.degree}</td
          >
          <td
            class="h-12 px-2 border-b border-gray-300 bg-[var(--clr-white)] text-center"
            >{biere.prix}</td
          >
          <td class=" h-12 px-2 border-b border-gray-300 bg-[var(--clr-white)] flex items-center justify-center gap-2">
            {#if biere.name}
              <svg
                class="w-6 h-6 text-black cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                on:click={() => editBeer(biere.id)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
              </svg>
              <svg
                class="w-6 h- text-red-800 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                on:click={() => deleteBeer(biere.id)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>

            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <Button text="Ajouter une bière" onClick={addBeer} />
</div>
