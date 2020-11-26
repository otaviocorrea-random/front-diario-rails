<script>
	let src = 'https://www.showmetech.com.br/wp-content/uploads/2015/09/happy-minion-gif.gif';
</script>

<div class="tutorial">
  <h2>Código Svelte: </h2>
  <textarea readonly>
    <script>
      let src = 'https://www.showmetech.com.br/wp-content/uploads/2015/09/happy-minion-gif.gif';
    </script>
    
    <img {"{src}"} alt="A man dances.">
  </textarea>

  <h2>Saída: </h2>
  <div class="output">
    <img {src} alt="A man dances.">
  </div>
  
</div>