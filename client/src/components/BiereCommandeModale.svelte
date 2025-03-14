<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import Button from './Button.svelte';
  
  export let isOpen = false;        
  export let title = ''; 
  export let submitText = 'Valider';
  export let cancelText = 'Annuler';
  export let item = {};
  export let mode = 'add';
  
  const dispatch = createEventDispatcher();
  
  function closeModal() {
    dispatch('close');
  }
  
  function handleSubmit() {
    dispatch('submit', { item, mode });
    closeModal();
  }
  
  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  }
  
</script>

  

{#if isOpen}
  <div 
    class="fixed top-0 left-0 w-full h-full bg-opacity-custom flex justify-center items-center z-[1000]" 
    on:click={handleOutsideClick}
    transition:fade={{ duration: 200 }}
    aria-hidden=true
  >
    <div 
      class="bg-[var(--clr-blue)] rounded-md max-w-2/4 max-h-11/12 shadow-lg overflow-y-auto"
      transition:scale={{ start: 0.8, duration: 200 }}
    >
      <div class="p-4 flex justify-center relative">
        <h2 class="text-4xl text-black">{title}</h2>
        <button class="cursor-pointer hover:scale-140 duration-300 ease-in-out absolute right-4 top-1/2 transform -translate-y-1/2" on:click={closeModal}>×</button>
      </div>
      
      <div class="p-4">
        <slot name="content"></slot>
      </div>
      
      <div class="p-4 flex justify-around gap-8">
        <Button  text={cancelText} color="bg-[var(--clr-orange)]" onClick={closeModal}/>
        <Button  text={submitText} onClick={handleSubmit}/>
      </div>
    </div>
  </div>
{/if}

<style>
  .bg-opacity-custom {
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>