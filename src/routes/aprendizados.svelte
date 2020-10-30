<script>
    import { onMount } from 'svelte';

    const handleDateParse = (date, type) => {
        let d = new Date(date);
        let locale = d.toLocaleString('pt-BR', { timeZone: 'UTC' })
        locale = locale.split(" ")[0].split("/")

        let dia = locale[0], mes = locale[1], ano = locale[2];

        if (type === 'br') {
            return dia+"/"+mes+"/"+ano;
        }
        return ano+"-"+mes+"-"+dia;
    }

    const apiUrl = 'https://api-diario-rails-otavio.herokuapp.com';
    var newContent = '', newDate = handleDateParse(new Date()), aprendizadoId = null;
    var list = [];

    const DoWhiteSpace = (text) => {
        let reg1 = /\x20/g, reg2 = /\n/g;
        return text.replace(reg1, " ").replace(reg2, "<br>");
    };

    const handleGetList = (async () => {
        await fetch(apiUrl+'/aprendizados.json', 
        {
            method: 'GET',
        })
        .then(async resp => (
           list = resp.json()
        ))
        .catch(err => (console.log(err)))
    });

    const handleGetItem = (async (id) => {
        let r = '';
        const response = await fetch(apiUrl+'/aprendizados/'+id+'.json', 
        {
            method: 'GET',
        })
        .then(async resp => (
            r = await resp.json(),
            newDate = handleDateParse(r.date),
            newContent = r.content,
            aprendizadoId = r.id
        ))
        .catch(err => (console.log(err)))
    });

    const handleRemove = (async (id) => {
        if(!confirm("Deseja realmente remover o item selecionado?")){return ""}

        const response = await fetch(apiUrl+'/aprendizados/'+id+'.json', 
        {
            method: 'DELETE',
        })
        .then(async resp => (
            handleGetList(),
            console.log(`Removido aprendizado id: ${id}`)
        ))
        .catch(err => (console.log(err)))
    });

    const handleCreate = (async (e) => {
        if (newContent.length < 1){return alert("O Conteúdo não pode estar vazio!")}

        let method = aprendizadoId === null ? 'POST' : 'PUT';
        let endPoint = aprendizadoId === null ? '/aprendizados.json' : '/aprendizados/'+aprendizadoId+'.json';
        let requestBody = { 
            date: newDate,
            content: newContent
        }

        await fetch(apiUrl+endPoint, 
        {
            method: method,
            body: JSON.stringify(requestBody),
            headers: {"Content-Type": "application/json"}
        })
        .then(async resp => (
            newContent = '', newDate = handleDateParse(new Date()), aprendizadoId = null, handleGetList()
        ))
        .catch(err => (console.log(err)))
    });

    onMount(async () => {
        handleGetList();
        console.log("iniciou");
	});
</script>

<style>
    .form{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "form-content form-content"
            "form-date form-enviar"
        ;
        /* gap: 10px; */
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

<svelte:head>
	<title>Diário de Aprendizados</title>
</svelte:head>

<form class="form" on:submit|preventDefault={handleCreate} >
    <textarea bind:value={newContent} name="content"></textarea>
    <input type="date" bind:value={newDate}>
    <button type="submit">{aprendizadoId === null ? 'Registrar' : 'Atualizar'}</button>
</form>

{#await list}
	<p>...carregando lista de Aprendizados</p>
{:then aprendizados}
    <div class="list">
        {#each aprendizados as aprendizado}
            <div class="list-item">
                <span class="list-item-date">
                    <i class="material-icons">today</i> {handleDateParse(aprendizado.date, 'br')}
                </span>
                <span class="list-item-content">{@html DoWhiteSpace(aprendizado.content)}</span>
                <span class="list-item-buttons"><button on:click={handleRemove(aprendizado.id)}>
                    <i class="material-icons">delete_forever</i>
                </button><button on:click={handleGetItem(aprendizado.id)}>
                    <i class="material-icons">create</i>
                </button></span>
            </div>
        {/each}
    </div>
{:catch error}
    {error}
{/await}
