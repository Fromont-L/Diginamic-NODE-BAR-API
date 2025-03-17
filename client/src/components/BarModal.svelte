<!-- BarModal.svelte - Composant à créer pour réutiliser dans les deux pages -->
<script>
    import Modal from './BiereCommandeModale.svelte';
    import { createEventDispatcher } from 'svelte';
    
    export let isOpen = false;
    export let modalMode = 'add';
    export let currentBar = {
      name: '',
      adresse: '',
      tel: '',
      email: '',
      description: ''
    };
    
    const dispatch = createEventDispatcher();
    
    function handleClose() {
      dispatch('close');
    }
    
    function handleSubmit(event) {
      dispatch('submit', event.detail);
      dispatch('close');
    }
  </script>
  
  <Modal
    isOpen={isOpen}
    title={modalMode === 'add' ? 'Ajouter un bar' : 'Modifier le bar'}
    submitText={modalMode === 'add' ? 'Ajouter' : 'Mettre à jour'}
    item={currentBar}
    mode={modalMode}
    on:close={handleClose}
    on:submit={handleSubmit}
  >
    <div slot="content">
      <div class="form-group">
        <label for="name">Nom</label>
        <input id="name" name="name" type="text" bind:value={currentBar.name} class="w-full p-2 border rounded" />
      </div>
      
      <div class="form-group">
        <label for="adresse">Adresse</label>
        <input id="adresse" name="adresse" type="text" bind:value={currentBar.adresse} class="w-full p-2 border rounded" />
      </div>
      
      <div class="form-group">
        <label for="tel">Téléphone</label>
        <input id="tel" name="tel" type="tel" bind:value={currentBar.tel} class="w-full p-2 border rounded" />
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" bind:value={currentBar.email} class="w-full p-2 border rounded" />
      </div>
      
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" name="description" bind:value={currentBar.description} class="w-full p-2 border rounded h-24"></textarea>
      </div>
    </div>
  </Modal>
  
  <style>
    .form-group {
      margin-bottom: 15px;
    }
    
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
  </style>
  