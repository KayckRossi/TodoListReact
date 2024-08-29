import 'chart.js/auto';
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]); 
  const [novaTarefa, setNovaTarefa] = useState(''); 

  const adicionarTarefa = () => {
    if (novaTarefa.trim()) {
      setTarefas([...tarefas, { texto: novaTarefa, concluida: false }]);
      setNovaTarefa('');
    }
  };

  const alternarConclusaoTarefa = (indice) => {
    const tarefasAtualizadas = tarefas.map((tarefa, i) =>
      i === indice ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    );
    setTarefas(tarefasAtualizadas);
  };

  const removerTarefa = (indice) => {
    const tarefasAtualizadas = tarefas.filter((_, i) => i !== indice);
    setTarefas(tarefasAtualizadas);
  };

  const contagemTarefas = {
    concluidas: tarefas.filter(tarefa => tarefa.concluida).length,
    pendentes: tarefas.filter(tarefa => !tarefa.concluida).length,
  };

  const dados = {
    labels: ['Concluídas', 'Pendentes'],
    datasets: [
      {
        data: [contagemTarefas.concluidas, contagemTarefas.pendentes],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <div className="input-container">
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Digite uma nova tarefa"
          className="task-input"
        />
        <button onClick={adicionarTarefa} className="add-button">Adicionar Tarefa</button>
      </div>
      <ul className="task-list">
        {tarefas.map((tarefa, indice) => (
          <li key={indice} className="task-item">
            <input
              type="checkbox"
              checked={tarefa.concluida}
              onChange={() => alternarConclusaoTarefa(indice)}
              className="task-checkbox"
            />
            <span className={tarefa.concluida ? 'task-text completed' : 'task-text'}>
              {tarefa.texto}
            </span>
            <button onClick={() => removerTarefa(indice)} className="remove-button">Remover</button>
          </li>
        ))}
      </ul>
      <div className="chart-container">
        <h2>Progresso das Tarefas</h2>
        <Doughnut data={dados} />
      </div>
    </div>
  );
}

export default App;
