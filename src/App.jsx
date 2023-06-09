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
import { Orbit } from '@uiball/loaders'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useReducer, useRef, useState } from "react";
function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const disableRadio = useRef(null)
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'changeName':
        return { ...state, inputValueName: action.payload };
      case 'changeEmail':
        return { ...state, inputValueEmail: action.payload };
      case 'changeStatus':
        return { ...state, status: action.payload };
      case 'changeBoolean':
        return { ...state, genreisTrue: true };
      case 'Isrequesting':
        return { ...state, isRequestingBolean: true };
      case 'resetFields':
        return {
          inputValueName: '',
          inputValueEmail: '',
          status: '',
          genreisTrue: false,
          isRequestingBolean: false
        };
      default:
        return 'err0r';
    }
  }, {
    inputValueName: '',
    inputValueEmail: '',
    status: '',
    genreisTrue: false,
    isRequestingBolean: false
  });


  const handleInputChange = (event, currentField) => {
    if (currentField === 'name') {
      dispatch({ type: 'changeName', payload: event.target.value });
    } if (currentField === 'email') {
      dispatch({ type: 'changeEmail', payload: event.target.value });
    } if (currentField === 'status') {
      dispatch({ type: 'changeStatus', payload: event.target.value });
    } if (currentField === 'radio') {
      dispatch({ type: 'changeBoolean' })
    }
  };

  const handleProgressbar = () => {
    let progress = 0;
    const increaseProgress = 25;
    const emailValue = state.inputValueEmail.trim();
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (state.inputValueName.trim().split(' ').length > 1) {
      progress += increaseProgress;
    }
    if (regex.test(emailValue)) {
      progress += increaseProgress;
    }
    if (state.status) {
      progress += increaseProgress;
    }
    if (state.genreisTrue) {
      progress += increaseProgress;
    }
    return progress;
  };

  const handleSubmitLogin = () => {
    const awaintResponse = (1.5 + Math.random() * 3) * 1000
    dispatch({ type: 'Isrequesting' });
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Submitted!',{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      dispatch({ type: 'resetFields' });
      setIsSubmitting(false);
    }, awaintResponse)
  };

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
          <select onChange={(event) => handleInputChange(event, 'status')} value={state.status}>
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
              <input type='radio' id='male' name='genre' onChange={(event) => handleInputChange(event, 'radio')} ref={disableRadio}/>
              <label htmlFor='male'>Masculino</label>
            </span>
            <span>
              <input type='radio' id='female' name='genre' onChange={(event) => handleInputChange(event, 'radio')} ref={disableRadio}/>
              <label htmlFor='female'>Feminino</label>
            </span>
          </div>
        </div>
        <button className='btnSbmtt' disabled={state.isRequestingBoolean || handleProgressbar() !== 100} onClick={handleSubmitLogin}>{isSubmitting ? (<span id='loader'><Orbit size={35} color="#231F20" /></span>) : 'Enviar Formulário'}</button>
      </main>
      <ToastContainer/>
    </div>
  );
}

export default App;
