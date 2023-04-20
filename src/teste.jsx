import { useReducer, useState } from 'react';

function Appx() {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'changeInput':
                return { ...state, selectvalue: action.payload }
        }
    }, {
        selectvalue: ''
    });

    const handleStatus = (event) => {
        dispatch({type: 'changeInput', payload: event.target.value})
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (state.selectvalue) {
            alert(` estado civil ${state.selectvalue}`);
        } else {
            alert('Por favor, selecione um estado civil');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='status'>Estado Civil:</label>
            <select id='status' value={state.selectvalue} onChange={handleStatus}>
                <option value=''>- selecione...</option>
                <option value='solteiro'>Solteiro</option>
                <option value='casado'>Casado</option>
                <option value='divorciado'>Divorciado</option>
            </select>
            <button type='submit'>Enviar</button>
        </form>
    );
}

export default Appx;
