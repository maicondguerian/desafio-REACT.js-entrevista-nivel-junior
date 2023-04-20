/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

import { useEffect, useReducer, useRef, useState } from "react";
function App() {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'changeName':
        return { ...state, inputValueName: action.payload };
      case 'changeEmail':
        return { ...state, inputValueEmail: action.payload };
        case 'changeStatus':
        return {...state, status: action.payload };
        case 'changeBoolean':
          return {...state, genreisTrue: true}
          case 'resetFields':
        return {
          inputValueName: '',
          inputValueEmail: '',
          status: '',
          genreisTrue: false,
        };
        default:
          return 'err0r';
    } 
  }, {
    inputValueName: '',
    inputValueEmail: '',
    status: '',
    genreisTrue: false,
  });

  
  const handleInputChange = (event, currentField) => {
    if (currentField === 'name') {
      dispatch({ type: 'changeName', payload: event.target.value });
    }  if (currentField === 'email') {
      dispatch({ type: 'changeEmail', payload: event.target.value });
    } if (currentField === 'status') {
      dispatch({ type: 'changeStatus', payload: event.target.value });
    } if(currentField === 'radio'){
      dispatch({type: 'changeBoolean'})
    }
  };
  
  const handleProgressbar = () => {
    let progress = 0;
    const increaseProgress = 25;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (state.inputValueName.trim().split(' ').length > 1) {
      progress += increaseProgress;
    }
    if (regex.test(state.inputValueEmail)){
      progress += increaseProgress;
    }
    if(state.status ){
      progress += increaseProgress;
    }
    if(state.genreisTrue){
      progress += increaseProgress;
    }
    return progress;
  };
  
  const handleSubmitLogin = () =>{
    alert('Submitted')
   dispatch({type: 'resetFields'})
  }
  return (
    <div className='App'>
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>
      <main>
        <div className='bar-container'>
          <div className='bar' style={{ width: `${handleProgressbar()}%` }}></div>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Nome Completo</label>
          <input onChange={(event) => handleInputChange(event, 'name')} value={state.inputValueName} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>E-mail</label>
          <input onChange={(event) => handleInputChange(event, 'email')} value={state.inputValueEmail} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>Estado Civil</label>
          <select  onChange={(event) => handleInputChange(event, 'status')} value={state.status}>
            <option value=''>- selecione...</option>
            <option value='solteiro'>Solteiro</option>
            <option value='casado'>Casado</option>
            <option value='divorciado'>Divorciado</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Gênero</label>
          <div className='radios-container'>
            <span>
              <input type='radio' name='genre' onChange={(event) => handleInputChange(event, 'radio')}/> Masculino
            </span>
            <span>
              <input type='radio' name='genre'  onChange={(event) => handleInputChange(event, 'radio')}/> Feminino
            </span>
          </div>
        </div>
        <button disabled={handleProgressbar() > 100} onClick={handleSubmitLogin}>Enviar Formulário</button>
      </main>
    </div>
  );
}

export default App;
