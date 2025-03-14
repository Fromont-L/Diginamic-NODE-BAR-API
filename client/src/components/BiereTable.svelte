<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import Button from "./Button.svelte";
  import BiereCommandeModale from "./BiereCommandeModale.svelte";

  let bieres = Array.from({ length: 10 }, (_, index) => ({
    id: `temp-${index}`,
    name: "",
    degree: "",
    prix: "",
  }));
  export let barId;

  const loadBieres = async () =>  {
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
      
    } catch (error) {
      console.error("Erreur lors de la récupération des bières:", error);
    }
  };

  onMount(async () => {
    loadBieres()
  });

  let showModal = false;
  let currentBiere = { name: "", degree: "", prix: "", description : "" };
  let modalMode = "add";

  function openAddModal() {
    currentBiere = { name: "", degree: "", prix: "", description : "" };
    modalMode = "add";
    showModal = true;
  }

  function openEditModal(id) {
    const biereToEdit = bieres.find(b => b.id === id);
    if (biereToEdit) {
      currentBiere = { ...biereToEdit };
      modalMode = "edit";
      showModal = true;
    }
  }
  
  function closeModal() {
    showModal = false;
  }

  async function handleSubmit(event) {
    const { item, mode } = event.detail;
    
    try {
      console.log(item)
      if (mode === "add") {
        await axios.post(`http://localhost:3000/bars/${barId}/biere`, item);
      } else {
        await axios.put(`http://localhost:3000/bars/${barId}/biere/${item.id}`, item);
      }
      await loadBieres();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    }
  }

  async function deleteBeer(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette bière ?")) {
      try {
        await axios.delete(`http://localhost:3000/biere/${id}`);
        await loadBieres();
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
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
                on:click={() => openEditModal(biere.id)}
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

  <Button text="Ajouter une bière" onClick={openAddModal} />
</div>

<BiereCommandeModale
  isOpen={showModal}
    title={modalMode === "add" ? "Ajouter une bière" : "Modifier la bière"}
    submitText={modalMode === "add" ? "Ajouter" : "Mettre à jour"}
    item={currentBiere}
    mode={modalMode}
    on:close={closeModal}
    on:submit={handleSubmit}
  >
    <div slot="content" class="flex flex-col gap-4">
      <div class="mb-4 flex items-center justify-end gap-12">
        <label for="name" class="block mb-2 font-medium text-left">Nom</label>
        <input 
          id="name" 
          name="name"
          type="text" 
          bind:value={currentBiere.name} 
          class="w-4/6 p-2 bg-[var(--clr-white)] rounded text-black"
        />
      </div>

      <div class="mb-4 flex items-center justify-end gap-12">
        <label for="description" class="block mb-2 font-medium text-left">Description</label>
        <textarea 
          id="description" 
          name="description"
          type="text" 
          bind:value={currentBiere.description} 
          class="w-4/6 p-2 bg-[var(--clr-white)] rounded text-black"
        ></textarea>
      </div>
      
      <div class="mb-4 flex items-center justify-end gap-12">
        <label for="degree" class="block mb-2 font-medium text-left">Degrés</label>
        <input 
          id="degree" 
          name="degree"
          type="text" 
          bind:value={currentBiere.degree} 
          class="w-4/6 p-2 bg-[var(--clr-white)] rounded text-black"
        />
      </div>
      
      <div class="mb-4 flex items-center justify-end gap-12">
        <label for="prix" class="block mb-2 font-medium ">Prix</label>
        <input 
          id="prix" 
          name="prix"
          type="number" 
          bind:value={currentBiere.prix} 
          step="0.01" 
          class="w-4/6 p-2 bg-[var(--clr-white)] rounded text-black"
        />
      </div>
    </div>
</BiereCommandeModale>