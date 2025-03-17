<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import Button from "./Button.svelte";
  import BiereCommandeModale from "./BiereCommandeModale.svelte";

  let commandes = Array.from({ length: 10 }, (_, index) => ({
    id: `temp-${index}`,
    name: "",
    date: "",
    prix: "",
    status: "",
  }));

  let availableBieres = []; 
  export let barId;

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const formatted = date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formatted.replace(/\//g, "/");
  }

  const loadCommandes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/bars/${barId}/commandes`
      );
      const fetchedCommandes = response.data;
      fetchedCommandes.forEach((commande, index) => {
        if (index < commandes.length) {
          commandes[index] = commande;
          commandes[index].date = formatDate(commande.date);
        }
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des Commandes:", error);
    }
  };

  const loadBieres = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/bars/${barId}/biere`
      );
      availableBieres = response.data.rows || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des bières:", error);
    }
  };

  onMount(async () => {
    await Promise.all([loadCommandes(), loadBieres()]);
  });

  let showStep1Modal = false;
let showStep2Modal = false;
  let currentStep = 1;
  let currentCommande = {
    name: "",
    date: new Date().toISOString().split("T")[0],
    prix: "",
    status: "Brouillon",
    bieres: [], 
  };
  let modalMode = "add";
  let createdCommandeId = null;

  function openAddModal() {
    currentCommande = {
      name: "",
      date: new Date().toISOString().split("T")[0],
      prix: "",
      status: "Brouillon",
      bieres: [],
    };
    modalMode = "add";
    currentStep = 1;
    showStep1Modal = true;
    showStep2Modal = false;
  }

  async function openEditModal(id) {
  try {
    const response = await axios.get(`http://localhost:3000/commandes/${id}`);
    const commandeToEdit = response.data;

    const bieresResponse = await axios.get(
      `http://localhost:3000/commandes/${id}/biere`
    );
    
    console.log("Bières récupérées:", bieresResponse.data);
    const biereIds = bieresResponse.data
      .filter(biere => biere && biere.id !== undefined)
      .map(biere => biere.id);
    
    console.log("IDs des bières filtrés:", biereIds);

    currentCommande = {
      ...commandeToEdit,
      date: commandeToEdit.date.split("T")[0],
      bieres: biereIds,
    };

    modalMode = "edit";
    currentStep = 1;
    showStep1Modal = true;
    showStep2Modal = false;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de la commande:",
      error
    );
  }
}

  function closeModal() {
    showStep1Modal = false;
  showStep2Modal = false;
  currentStep = 1;
  createdCommandeId = null;
  }

  async function handleStep1Submit() {
    try {
      if (modalMode === "add") {

        const { bieres, ...commandeData } = currentCommande;
        const response = await axios.post(
          `http://localhost:3000/bars/${barId}/commandes`,
          commandeData
        );
        createdCommandeId = response.data.id;
        currentCommande.id = createdCommandeId;
      } else {

        const { bieres, ...commandeData } = currentCommande;
        await axios.put(
          `http://localhost:3000/commandes/${currentCommande.id}`,
          commandeData
        );
      }
      showStep1Modal = false;
    showStep2Modal = true;
    currentStep = 2;
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la commande:", error);
      alert("Erreur lors de la sauvegarde de la commande");
    }
  }

  async function handleStep2Submit() {
    try {
      const commandeId = currentCommande.id;
      console.log("CommandeId:", commandeId);
console.log("Bières à associer:", currentCommande.bieres);  

if (currentCommande.bieres.includes(undefined)) {
  console.error("ID de bière undefined détecté!");
  alert("Erreur: Certaines bières n'ont pas d'ID valide");
  return;
}

      for (const biereId of currentCommande.bieres) {
        await axios.post(
          `http://localhost:3000/commandes/${commandeId}/biere/${biereId}`
        );
      }

      await loadCommandes();
      closeModal();
    } catch (error) {
      console.error("Erreur lors de l'association des bières:", error);
      alert("Erreur lors de l'association des bières");
    }
  }

  async function deleteCommande(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
      try {
        await axios.delete(`http://localhost:3000/commandes/${id}`);
        await loadCommandes();
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  }

  function toggleBiere(biereId) {
    const index = currentCommande.bieres.indexOf(biereId);
    if (index === -1) {
      currentCommande.bieres = [...currentCommande.bieres, biereId]; 
    } else {
      currentCommande.bieres = currentCommande.bieres.filter(
        (id) => id !== biereId
      ); 
    }
  }

  function goToPreviousStep() {
    if (currentStep > 1) {
      currentStep -= 1;
    }
  }
</script>

<div class="flex flex-col items-center gap-8 w-5/10 my-[10vh]">
  <table class="w-full border-collapse text-[var(--clr-black)]">
    <thead>
      <tr>
        <th
          class="w-5/10 py-2 px-2 bg-[var(--clr-yellow)] text-xl rounded-tl-sm"
          >Commandes</th
        >
        <th class="w-2/10 py-2 px-2 bg-[var(--clr-yellow)] text-xl">Date</th>
        <th class="w-2/10 py-2 px-2 bg-[var(--clr-yellow)] text-xl">Prix</th>
        <th class="w-1/10 py-2 px-2 bg-[var(--clr-yellow)] text-xl">Status</th>
        <th
          class="w-1/10 py-2 px-2 bg-[var(--clr-yellow)] text-xl rounded-tr-sm"
        ></th>
      </tr>
    </thead>
    <tbody>
      {#each commandes as commande (commande.id)}
        <tr>
          <td
            class="h-12 px-2 border-b border-gray-300 bg-[var(--clr-white)] text-center"
            >{commande.name}</td
          >
          <td
            class="h-12 px-2 border-b border-gray-300 bg-[var(--clr-white)] text-center"
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
          <td
            class="h-12 px-2 border-b border-gray-300 bg-[var(--clr-white)] flex items-center justify-center gap-2"
          >
            {#if commande.name}
              <svg
                class="w-6 h-6 text-black cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                on:click={() => openEditModal(commande.id)}
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

  <Button text="Ajouter une commande" onClick={openAddModal} />
</div>
{#if currentStep === 1}
<BiereCommandeModale
  isOpen={showStep1Modal}
  title={modalMode === "add" ? "Ajouter une commande" : "Modifier la commande"}
  submitText={"Suivant"}
  item={currentCommande}
  mode={modalMode}
  on:close={closeModal}
  on:submit={handleStep1Submit}
>
  <div slot="content" class="flex flex-col gap-4">
    <div class="mb-4 flex items-center justify-end gap-12">
      <label for="name" class="block mb-2 font-medium text-left">Nom</label>
      <input
        id="name"
        name="name"
        type="text"
        bind:value={currentCommande.name}
        class="w-4/6 p-2 bg-[var(--clr-white)] rounded text-black"
      />
    </div>

    <div class="mb-4 flex items-center justify-end gap-12">
      <label for="date" class="block mb-2 font-medium text-left">Date</label>
      <input
        id="date"
        name="date"
        type="date"
        bind:value={currentCommande.date}
        class="w-4/6 p-2 bg-[var(--clr-white)] rounded text-black"
      />
    </div>

    <div class="mb-4 flex items-center justify-end gap-12">
      <label for="prix" class="block mb-2 font-medium">Prix</label>
      <input
        id="prix"
        name="prix"
        type="number"
        bind:value={currentCommande.prix}
        step="0.01"
        class="w-4/6 p-2 bg-[var(--clr-white)] rounded text-black"
      />
    </div>

    <div class="mb-4 flex items-center justify-end gap-12">
      <label for="status" class="block mb-2 font-medium">Status</label>
      <select
        id="status"
        name="status"
        bind:value={currentCommande.status}
        class="w-4/6 p-2 bg-[var(--clr-white)] rounded text-black"
      >
        <option value="Brouillon">Brouillon</option>
        <option value="En cours">En cours</option>
        <option value="Terminée">Terminée</option>
      </select>
    </div>
  </div>
</BiereCommandeModale>
{/if}

<!-- Étape 2: Sélection des bières -->
{#if currentStep === 2}
  <BiereCommandeModale
    isOpen={showStep2Modal}
    title={"Ajouter des bières"}
    submitText={modalMode === "add" ? "Valider" : "Mettre à jour"}
    item={currentCommande}
    mode={modalMode}
    on:close={closeModal}
    on:submit={handleStep2Submit}
  >
    <div slot="content" class="flex flex-col gap-4">
      {#if availableBieres.length === 0}
        <p class="text-gray-500 text-center py-2">Aucune bière disponible</p>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each availableBieres as biere (biere.id)}
            <label class="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-100">
              <input 
                type="checkbox" 
                checked={currentCommande.bieres.includes(biere.id)}
                on:change={() => toggleBiere(biere.id)} 
                class="form-checkbox h-5 w-5"
              />
              <span>{biere.name}</span>
            </label>
          {/each}
        </div>
      {/if}
    </div>
  </BiereCommandeModale>
{/if}
