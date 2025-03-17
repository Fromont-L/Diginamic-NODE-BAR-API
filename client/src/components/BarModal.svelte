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
    <div slot="content" class="flex flex-col gap-4">
      <div class="mb-4 flex items-center justify-end gap-12">
        <label for="name" class="block mb-2 font-medium text-left">Nom</label>
        <input id="name" name="name" type="text" bind:value={currentBar.name} class="w-4/6 p-2 bg-[var(--clr-white)] rounded text-black" />
      </div>
      
      <div class="mb-4 flex items-center justify-end gap-12">
        <label for="adresse" class="block mb-2 font-medium text-left">Adresse</label>
        <input id="adresse" name="adresse" type="text" bind:value={currentBar.adresse} class="w-4/6 p-2 bg-[var(--clr-white)] rounded text-black" />
      </div>
      
      <div class="mb-4 flex items-center justify-end gap-12">
        <label for="tel" class="block mb-2 font-medium text-left">Téléphone</label>
        <input id="tel" name="tel" type="tel" bind:value={currentBar.tel} class="w-4/6 p-2 bg-[var(--clr-white)] rounded text-black" />
      </div>
      
      <div class="mb-4 flex items-center justify-end gap-12">
        <label for="email" class="block mb-2 font-medium text-left">Email</label>
        <input id="email" name="email" type="email" bind:value={currentBar.email} class="w-4/6 p-2 bg-[var(--clr-white)] rounded text-black" />
      </div>
      
      <div class="mb-4 flex items-center justify-end gap-12">
        <label for="description" class="block mb-2 font-medium text-left">Description</label>
        <textarea id="description" name="description" bind:value={currentBar.description} class="w-4/6 p-2 bg-[var(--clr-white)] rounded text-black h-24"></textarea>
      </div>
    </div>
    
  </Modal>

  