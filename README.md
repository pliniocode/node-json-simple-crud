# [ESTUDOS DE NODE.JS] CRUD de arquivo JSON local 

Este é um pequeno exercício no qual a tarefa é criar um CRUD de arquivos locais, coma a capacidade de criar, ler, atualizar e deletar informações de um determinado arquivo. 
Nesse caso, o será um arquivo JSON. 

Um software com operações CRUD é aquele que disponibiliza para o usuário as quatro seguintes operações: 
1. CREATE: Criar ou adicionar novas informações em uma persistência de dados.
2. READ: Ler, recuperar as informações armazenadas.
3. UPDATE: Atualizar ou editar as informações já persistidas.
4. DELETE: Apagar uma determinada informação. 

## Lendo o conteúdo de um arquivo `.json`.

Para começar o CRUD, por escolha, primeiro será implementado a função de leitura do arquivo e devolução dos dados constantes no `json file`. 
Quer dizer, a função seguinte `readJson()` estará implementando o **READ** do **CRUD**. 

O primeiro passo é abrir o arquivo. Para isso utilizarei o método `fs.open()` do módulo `fs/promises`. 

```js
import { open } from 'node:fs/promises';

export async function readJson(path) {
	let file;
	try {
		file = await open(path);
	} catch (error) {
		return error;
	} finally {
		await file?.close();
	}
}
```

Após importar o módulo, declaramos a função que chamaremos para devolver os dados do `json file`, no qual recebe como parâmetro o caminho para o arquivo `json` que desejamos ler. 
Em seguida é declarada um variável `file` no qual receberá um objeto que representará o arquivo aberto, por meio do `File Descriptor`.
Esse objeto é retornado pelo método `fs.open()`, a qual é uma instância da `class FileHandle`. 
O `File Handle` é uma abstração que armazena informações sobre o arquivo que estamos manipulando, tais como: nome, modo de abertura, posicionamento dos ponteiros de leitura ou escrita, dentre outras. 
Em seguida temos uma tratativa de error, recorrendo à estrutura `try/catch`.

Antes de adentrar no `try`, explico desde logo que, além da possibilidade do `catch`, quando houver um lançamento de error e por fim o `finally` que fecha o arquivo ao final da operação desejada, caso tenha aberto e arquivo. 

No corpo do `try` temos a abertura do arquivo e retorno do `FileHandle` por meio do `fs.open()`.

Com o arquivo aberto, caso não haja nenhum erro, vamos ler o conteúdo do arquivo.  

```js
const { size } = await file.stat()
    // Buffer of the file data
    const buff = Buffer.alloc(size);
    // Read data from file e save on buffer
    await file.read(buff, 0, buff.byteLength, 0);
    // Convert data from buffer in JSON format
    const dataJson = JSON.parse(buff);
    return dataJson;
```

Para termos acesso às informações de arquivo aberto, chamaremos o método `read()`, pertencente ao `File Handle`. Esse método exige quatro parâmetros. 
A um: `buff`, um *buffer* no qual será armazenado os dados lidos do arquivo. 
A dois: `offset`, o local no *buffer* em que iniciará o preenchimento dos dados.
A três: `length`, o quantitativo de dados em bytes a ser lido.
A quatro: `position`, o local no arquivo em que será iniciado a leitura dos dados. 

Como estamos armazenando as informações em *Buffer* do Node, temos que converter os dados nele armazenado para um formato mais amigável de manipular. Nesse caso: objeto `javascript`. 
Para fazermos isso, utilizamos a chamada do `JSON.parse()`, passando a variável `buf` como argumento. A que devolve o conteúdo a ser armazenado na variável `dataJson`. 
Uma observação é que para este método ler os dados do *Buffer*, exige-se que os dados armazenados no *buffer* estejam estruturados como um `json`. 
Caso não haja erro, a variável é retornada, encerrando o escopo da função.

## Adicionando dados/informações ao arquivo `.json`.

A implementação da função que adiciona informações no arquivo `json` é mais simples. Ressalta que aqui não estamos alterando algum dado já armazenado. 
Estamos, com esta função, implementando o **CREATE** do nosso **CRUD**. 

```js
import { writeFile } from 'node:fs/promises';
import { readJson } from './readJson.js';

export async function createDataInJson(path, newData) {
  try {
    let dataJson = await readJson(path) ?? [];
    dataJson = JSON.stringify([...dataJson, newData]);
    return writeFile(path, dataJson);
  } catch (error) {
    return error;
  }
}
```

Essa função tem dois parâmetros: o caminho do arquivo e o novo dado a ser persistido. 
Como podemos observar, essa função é mais simples. Com um `try/catch`, e dentro do `try`, corpo principal, temos a lógica de escrita de dados no arquivo. 
O primeiro passo foi carregar os dados já persistidos em memória. Para isso, é feito uso da, já escrita, função `readJson()`. Detalhe: como visto nos escritos sobre está função, ela já devolve os dados no formato de um objeto `javscript`. 
Uma vez com os dados em memória, chamamos o `JSON.stringfy`, passando como argumento um *array* que é construído espalhando os dados armazenados na variável `dataJson` mais o a ser adicionado.
Por fim, escrevemos os dados no nosso arquivo `json`, por meio do `fs.writeFile()`.

Nesta implementação eu quebrei a cabeça na chamada do método `fs.writeFile()`. O motivo é que eu simplesmente chamava ele, sem ser no contexto do `return`. Assim, acabou por causar erro no fluxo de execução. Por manter a chamada da função ativa, juntamento com a chamada da minha função `readJson`. Essa que eu chamava novamente para abrir o mesmo arquivo que, ainda, estava sendo manuseado pela chamada do `fs.writeFile()`. 
Bem, é o que acho que motivava o erro, talvez eu esteja errado. 