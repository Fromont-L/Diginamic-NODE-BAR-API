<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import axios from 'axios';
  import imagePub from "../../../assets/image.png";
  import BiereTable from '../../../components/BiereTable.svelte';
  import CommandeTable from '../../../components/CommandeTable.svelte';
  import BarModal from '../../../components/BarModal.svelte';

  let barData = null;
  let error = false;
  let showEditModal = false;
  let currentBar = {};

  onMount(async () => {
      loadBar();
  });

  const loadBar = async () => {
    const barId = $page.params.id;
      try {
          const response = await axios.get(`http://localhost:3000/bars/${barId}`);
          barData = response.data;
      } catch (err) {
          console.error('Erreur lors de la récupération du bar:', err);
          error = true;
      }
  }

  function openEditModal() {
      currentBar = { ...barData };
      showEditModal = true;
  }

  async function deleteBar() {
      if (confirm("Voulez-vous vraiment supprimer ce bar ?")) {
          try {
              await axios.delete(`http://localhost:3000/bars/${barData.id}`);
              alert("Bar supprimé avec succès !");
              goto('/bars');
          } catch (err) {
              console.error("Erreur lors de la suppression du bar:", err);
              alert("Erreur lors de la suppression du bar.");
          }
      }
  }

  async function handleUpdate(event) {
      try {
          const updatedBar = event.detail.item;
          const response = await axios.put(`http://localhost:3000/bars/${barData.id}`, updatedBar);
          loadBar();
          showEditModal = false;
      } catch (err) {
          console.error("Erreur lors de la mise à jour du bar:", err);
      }
  }
</script>

{#if barData}
  <div class="flex flex-col items-center p-6">
      <h1 class="text-4xl font-bold text-white-800 mb-6 text-center">{barData.name}</h1>
      <div class="flex flex-col md:flex-row gap-8 items-center md:items-start shadow-lg rounded-xl p-6 max-w-8xl w-full">
          <div class="md:w-1/3 flex justify-center">
              <div class="border-8 border-white rounded-xl shadow-md">
                  <img src={imagePub} alt={barData.name} class="rounded-lg shadow-md max-h-60"/>
              </div>
          </div>
          <div class="md:w-2/3 shadow-md rounded-xl p-6" style="background-color: var(--clr-blue);">
              <div class="p-1">
                  <p class="text-white-700"><strong>Adresse :</strong> {barData.adresse}</p>
                  <p class="text-white-700"><strong>Téléphone :</strong> {barData.tel}</p>
                  <p class="text-white-700"><strong>Email :</strong> {barData.email}</p>
              </div>
              <div class="p-1 mt-4">
                  <p class="text-white-700 mt-2">{barData.description}</p>
              </div>
              <div class="p-1 mt-4 flex gap-4">
                  <button class="bg-[var(--clr-yellow)] text-black px-4 py-2 rounded" on:click={openEditModal}>
                      Modifier Bar
                  </button>
                  <button class="bg-[var(--clr-red)] text-black px-4 py-2 rounded" on:click={deleteBar}>
                      Supprimer Bar
                  </button>
              </div>
          </div>
      </div>
  </div>
  <div class="flex justify-between flex-col md:flex-row">
      <BiereTable barId={$page.params.id}/>
      <CommandeTable barId={$page.params.id}/>
  </div>

  <BarModal 
  isOpen={showEditModal} 
  modalMode="edit" currentBar={currentBar} 
  on:close={() => showEditModal = false} 
  on:submit={handleUpdate} />
{:else if error}
  <p class="text-red-500 text-lg font-semibold">Erreur lors du chargement des données</p>
{:else}
  <p class="text-gray-500">Chargement en cours...</p>
{/if}
