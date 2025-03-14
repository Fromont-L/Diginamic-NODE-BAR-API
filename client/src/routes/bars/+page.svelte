<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import BarCards from '../../components/BarCards.svelte';
  import Button from '../../components/Button.svelte';
  
    let bars = [];
  
    onMount(async () => {
      try {
        const response = await axios.get('http://localhost:3000/bars');
        bars = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des bars:', error);
      }
    });

    function onClick() {
    alert('Bouton cliqué !');
    // Mettre ici l'ouverture de la modale pour ajout d'un bar
  }


  </script>
  <div class="flex flex-col items-center gap-4 pb-[5vh]">
      <h2 class="text-7xl pb-[5vh]">Les David’s Pub</h2>
      <Button text="Ajouter un bar" textColor="text-white" color="bg-[var(--clr-blue)]" {onClick} />
  </div>
  <section class="grid grid-cols-2 gap-16 m-auto justify-items-center py-[5vh] w-[80%]">
      <BarCards {bars} />
  </section>
  