<script>
  import { onMount } from 'svelte';
  import { dateParse } from '../helpers/date.js';
  import { api, apiSubmit, apiUrl } from '../helpers/api.js';
  
  var newContent = '', newDate = dateParse(new Date()), aprendizadoId = null;
  var aprendizados = [];
  
  const getList = (async () => {
    api('/aprendizados.json', async resp => {aprendizados = resp.json()})
  });
  
  const getItem = (async (id) => {api('/aprendizados/'+id+'.json', getItemResponse)});
  
  const remove = (async (id) => {
    if(!confirm("Deseja realmente remover o item selecionado?")){return}
    api('/aprendizados/'+id+'.json', getList, 'DELETE')
  });
  
  const createOrUpdate = (async (e) => {
    if (newContent.length < 1){return alert("O Conteúdo não pode estar vazio!")}
    let body = JSON.stringify({ date: newDate, content: newContent });
    apiSubmit(createOrUpdateUrl(), clearFieldsAndGetList, { method: methodType(), body})
  });

  // Metodos Private 

  const clearFieldsAndGetList = async () => {
    newContent = ''; 
    newDate = dateParse(new Date()); 
    aprendizadoId = null; 
    
    getList()
  };

  const getItemResponse = async resp => {
    let resposta = await resp.json()
    newDate = dateParse(resposta.date) 
    newContent = resposta.content
    aprendizadoId = resposta.id
  }

  const methodType = () => (aprendizadoId === null ? 'POST' : 'PUT');
  
  const createOrUpdateUrl = () => (
    aprendizadoId === null ? 
      '/aprendizados.json' : 
      '/aprendizados/'+aprendizadoId+'.json'
  )  

  const DoWhiteSpace = (text) => {
    const spacesRegexp = /\x20/g, newLinesRegexp  = /\n/g;
    return text.replace(spacesRegexp, " ").replace(newLinesRegexp, "<br>");
  };

  onMount(getList);
</script>

<svelte:head>
  <title>Diário de Aprendizados</title>
</svelte:head>

<form class="form" on:submit|preventDefault={createOrUpdate} >
  <textarea bind:value={newContent} name="content"></textarea>
  <input type="date" bind:value={newDate}>
  <button type="submit">{aprendizadoId === null ? 'Registrar' : 'Atualizar'}</button>
</form>

{#await aprendizados}
  <p>...carregando lista de Aprendizados</p>
{:then aprendizadosResult}
  <div class="list">
    {#each aprendizadosResult as aprendizado}
      <div class="list-item">
        <span class="list-item-date">
          <i class="material-icons">today</i> {dateParse(aprendizado.date, 'br')}
        </span>
        <span class="list-item-content">{@html DoWhiteSpace(aprendizado.content)}</span>
        <span class="list-item-buttons"><button on:click={remove(aprendizado.id)}>
          <i class="material-icons">delete_forever</i>
        </button><button on:click={getItem(aprendizado.id)}>
          <i class="material-icons">create</i>
        </button></span>
      </div>
    {/each}
  </div>
{:catch error}
  {error}
{/await}

<style>
  .form{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
    "form-content form-content"
    "form-date form-enviar"
    ;
  }
  .form textarea{
    grid-area: form-content;
    height: 150px;
    padding: 15px;
    border-radius: 10px 10px 0 0;
    border: none;
    resize: none;
  }
  .form input{
    grid-area: form-date;
    height: 35px;
    padding: 5px;
    padding-left: 20px;
    border-radius: 0 0 0 10px;
    border: none;
    background: #171e86;
    color: white;
  }
  .form button{
    grid-area: form-enviar;
    background:#1b066b;
    border-radius: 0 0 10px 0;
    border: none;
    cursor: pointer;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    color: white;
  }
  .form button:hover{background-color: #2700bb;}
  .form button:active{background-color: #2f0eab;}
  
  .list{
    margin-top: 25px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .list-item{
    display: grid;
    grid-template-columns: 1fr;
    height: fit-content;
    color: #17006d;
  }
  .list-item-date{
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1b066b;
    color: white;
    font-weight: bold;
    font-size: 18px;
    padding: 7px;
    text-align: center;
    border-radius: 10px 10px 0 0;
  }
  .list-item-date i{margin-right: 5px;}
  .list-item-content{
    background: white;
    padding: 14px;
    border-left: solid 4px #1b066b;
    border-right: solid 4px #1b066b;
    overflow-x: auto;
  }
  .list-item-buttons{
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .list-item-buttons button{
    background: #1b066b;
    color: white;
    font-weight: bold;
    font-size: 14px;
    padding: 7px;
    text-align: center;
    border: none;
    cursor: pointer;
  }
  .list-item-buttons button:first-child{border-radius: 0 0 0 10px}
  .list-item-buttons button:last-child{border-radius: 0 0 10px 0}
  .list-item-buttons button:hover{background-color: #2700bb;}
  .list-item-buttons button:active{background-color: #2f0eab;}
</style>
