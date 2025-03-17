<script>
    import { createEventDispatcher } from 'svelte';
    import { fade, scale } from 'svelte/transition';
    import Button from './Button.svelte';

    export let title = ''; 
    export let submitText = 'Valider';
    export let cancelText = 'Annuler';
    export let item = {};
    export let mode = 'add';
    export let isOpen = false;  // Ajouté pour éviter les erreurs

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
        aria-hidden="true"
    >
        <div 
            class="bg-[var(--clr-blue)] rounded-md max-w-2xl max-h-11/12 shadow-lg overflow-y-auto p-6"
            transition:scale={{ start: 0.8, duration: 200 }}
        >
            <!-- Titre -->
            <div class="p-4 flex justify-center relative">
                <h2 class="text-2xl text-black font-bold">{title}</h2>
                <button 
                    class="cursor-pointer hover:scale-110 duration-300 ease-in-out absolute right-4 top-1/2 transform -translate-y-1/2" 
                    on:click={closeModal}
                >
                    ×
                </button>
            </div>

            <!-- Contenu du formulaire -->
            <div class="p-4">
                <slot name="content"></slot>
            </div>

            <!-- Boutons -->
            <div class="p-4 flex justify-between">
                <Button text={cancelText} color="bg-[var(--clr-orange)]" on:click={closeModal} />
                <Button text={submitText} on:click={handleSubmit} />
            </div>
        </div>
    </div>
{/if}

<Modal
    isOpen={isOpen}
    title={mode === 'add' ? 'Ajouter un bar' : 'Modifier le bar'}
    submitText={mode === 'add' ? 'Ajouter' : 'Mettre à jour'}
    item={item}
    mode={mode}
    on:close={closeModal}
    on:submit={handleSubmit}
>
    <div slot="content">
        <div class="space-y-4">
            {#each [
                { id: 'name', label: 'Nom', type: 'text' },
                { id: 'adresse', label: 'Adresse', type: 'text' },
                { id: 'tel', label: 'Téléphone', type: 'tel' },
                { id: 'email', label: 'Email', type: 'email' }
            ] as field}
                <div class="flex items-center">
                    <label for={field.id} class="w-1/3 text-white font-medium text-end mr-8">
                        {field.label} :
                    </label>
                    <input id={field.id} type={field.type} bind:value={item[field.id]} class="w-2/3 p-2 border rounded bg-white text-black" />
                </div>
            {/each}

            <div class="flex items-start">
                <label for="description" class="w-1/3 text-white font-medium text-end mr-8">Description :</label>
                <textarea id="description" bind:value={item.description} class="w-2/3 p-2 border rounded bg-white text-black h-24"></textarea>
            </div>
        </div>
    </div>
</Modal>

<style>
    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }
</style>
