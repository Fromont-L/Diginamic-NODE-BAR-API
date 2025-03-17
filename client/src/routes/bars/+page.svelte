<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  import BarCards from '../../components/BarCards.svelte';
  import Button from '../../components/Button.svelte';
  import BarModal from '../../components/BarModal.svelte';
  
  let bars = [];
  let showModal = false;
  let currentBar = {
    name: '',
    adresse: '',
    tel: '',
    email: '',
    description: ''
  };
  let modalMode = 'add';
  
  onMount(async () => {
    await loadBars();
  });
  
  async function loadBars() {
    try {
      const response = await axios.get('http://localhost:3000/bars');
      bars = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des bars:', error);
    }
  }
  
  function openAddModal() {
    currentBar = {
      name: '',
      adresse: '',
      tel: '',
      email: '',
      description: ''
    };
    modalMode = 'add';
    showModal = true;
  }
  
  function closeModal() {
    showModal = false;
  }
  
  async function handleSubmit(event) {
    const { item, mode } = event.detail;
    
    try {
      if (mode === 'add') {
        await axios.post('http://localhost:3000/bars', item);
      } else {
        await axios.put(`http://localhost:3000/bars/${item.id}`, item);
      }
      await loadBars();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  }
</script>

<div class="flex flex-col items-center gap-4 pb-[5vh]">
  <h2 class="text-7xl pb-[5vh]">Les David's Pub</h2>
  <Button text="Ajouter un bar" textColor="text-white" color="bg-[var(--clr-blue)]" onClick={openAddModal} />
</div>

<section class="grid grid-cols-2 gap-16 m-auto justify-items-center py-[5vh] w-[80%]">
  <BarCards {bars} />
</section>

<BarModal
  isOpen={showModal}
  {modalMode}
  currentBar={currentBar}
  on:close={closeModal}
  on:submit={handleSubmit}
/>
