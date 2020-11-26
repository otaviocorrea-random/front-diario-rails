<script>
  import Nested from './1-nestedComponents.svelte';
</script>

<div class="tutorial">
  <h2>Código Svelte: </h2>
  <textarea readonly>
    <style>
      p {"{color: grey;font-family: 'Comic Sans MS', cursive;font-size: 2em;}"}
    </style>
    
    <p>This is a paragraph.</p>
  </textarea>

  <h2>Saída: </h2>
  <div class="output">
    <p>This is a paragraph.</p>
    <Nested/>
  </div>
  
  <style>
    p{
      color: grey;
      font-family: 'Comic Sans MS', cursive;
      font-size: 2em;
    }
  </style>
</div>