<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import BarCards from '../../components/BarCards.svelte';
  
    let bars = [];
  
    onMount(async () => {
      try {
        const response = await axios.get('http://localhost:3000/bars');
        bars = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des bars:', error);
      }
    });
  </script>
  <h2 class="text-7xl text-center pb-[5vh]">Les Bars</h2>

  <section class="grid grid-cols-2 gap-16 m-auto justify-items-center py-[5vh] w-[80%]">
      <BarCards {bars} />
  </section>
  