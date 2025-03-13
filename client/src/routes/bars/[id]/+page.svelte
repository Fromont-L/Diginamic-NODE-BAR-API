   <script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import axios from 'axios';
    import imagePub from "../../../assets/image.png";
    
    let barData = null;
    let error = false;
  
    onMount(async () => {
      const barId = $page.params.id;
      try {
        const response = await axios.get(`http://localhost:3000/bars/${barId}`);
        barData = response.data;
      } catch (err) {
        console.error('Erreur lors de la récupération du bar:', err);
        error = true;
      }
    });
  </script>
  
  {#if barData}
    <div>
      <h1>{barData.name}</h1>
      <p>{barData.adresse}</p>
      <p>{barData.tel}</p>
      <p>{barData.email}</p>
      <p>{barData.description}</p>
      <img src={imagePub} alt={barData.name} />
    </div>

  {:else if error}
    <p>Erreur lors du chargement des données</p>

  {:else}
    <p>Chargement en cours...</p>
  {/if}