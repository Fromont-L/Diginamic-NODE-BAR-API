<script>
    export let text = 'Cliquez ici';
    export let color = 'bg-[var(--clr-yellow)]'; 
    export let textColor = 'text-black'; 
    export let onClick = () => {};
  </script>
  
  <button
    class={`w-xs h-14 rounded ${textColor} ${color} text-2xl`}
    on:click={onClick}
  >
    {text}
  </button>
  