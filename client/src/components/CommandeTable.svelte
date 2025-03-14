<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import Button from "./Button.svelte";

  let commandes = Array.from({ length: 10 }, (_, index) => ({
    id: `temp-${index}`,
    name: "",
    date: "",
    prix: "",
    status: "",
  }));
  export let barId;

  // 2 méthodes pour changer le format de date ISO :
  
  // function formatDate(isoDate) {
  //   const date = new Date(isoDate);
  //   const jour = date.getDate().toString().padStart(2, '0');
  //   const mois = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const annee = date.getFullYear();
  //   return `${jour}/${mois}/${annee}`;
  // }

  function formatDate(isoDate) {
  const date = new Date(isoDate);
  const formatted = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  return formatted.replace(/\//g, '/');
}

  onMount(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/bars/${barId}/commandes`
      );
      console.log('commandes depuis bdd:', response.data)

      const fetchedCommandes = response.data;
      fetchedCommandes.forEach((commande, index) => {
        if (index < commandes.length) {
          commandes[index] = commande;
          commandes[index].date = formatDate(commande.date);
        }
      });

      console.log("commandes:", commandes);
    } catch (error) {
      console.error("Erreur lors de la récupération des Commandes:", error);
    }
  });

  function addCommande() {
    console.log("Ajouter une commande");
  }

  function deleteCommande(id) {
    console.log("Supprimer la commande avec l'ID:", id);
  }

  function editCommande(id) {
    console.log("Modifier la commande avec l'ID:", id);
  }
</script>

<div class="flex flex-col items-center gap-8 w-5/10 my-[10vh]">
  <table class="w-full border-collapse text-[var(--clr-black)]">
    <thead>
      <tr >
        <th class="w-5/10 py-2 px-2 bg-[var(--clr-yellow)] text-xl rounded-tl-sm">Commandes</th>
        <th class="w-2/10 py-2 px-2 bg-[var(--clr-yellow)] text-xl">Date</th>
        <th class="w-2/10 py-2 px-2 bg-[var(--clr-yellow)] text-xl">Prix</th>
        <th class="w-1/10 py-2 px-2 bg-[var(--clr-yellow)] text-xl">Status</th>
        <th class="w-1/10 py-2 px-2 bg-[var(--clr-yellow)] text-xl rounded-tr-sm"></th>
      </tr>
    </thead>
    <tbody>
      {#each commandes as commande (commande.id)}
        <tr>
          <td
            class=" h-12 px-2 border-b border-gray-300 bg-[var(--clr-white)] text-center"
            >{commande.name}</td
          >
          <td
            class=" h-12 px-2 border-b border-gray-300 bg-[var(--clr-white)] text-center"
            >{commande.date}</td
          >
          <td
            class="h-12 px-2 border-b border-gray-300 bg-[var(--clr-white)] text-center"
            >{commande.prix}</td
          >
          <td
            class="h-12 px-2 border-b border-gray-300 bg-[var(--clr-white)] text-center"
            >{commande.status}</td
          >
          <td class=" h-12 px-2 border-b border-gray-300 bg-[var(--clr-white)] flex items-center justify-center gap-2">
            {#if commande.name}
              <svg
                class="w-6 h-6 text-black cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                on:click={() => editCommande(commande.id)}
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
                on:click={() => deleteCommande(commande.id)}
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

  <Button text="Ajouter une commande" onClick={addCommande} />
</div>
