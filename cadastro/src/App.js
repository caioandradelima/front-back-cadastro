import './index.css'
import axios from 'axios'
import { useState , useEffect } from 'react';
import CustomizedTables from './components/CustomizedTables.js';
import BuscarDados from './components/BarraDeBusca.js'
import Modal from './components/Modal.js';
import EditIcon from '@mui/icons-material/Edit';
import ModalVisualizar from './components/ModalVisualizar.js';
import SetaVoltar from '@mui/icons-material/ArrowBackIos';
import SetaProxima from '@mui/icons-material/ArrowForwardIos';
import CadastroPessoal from '@mui/icons-material/CoPresentSharp';
import ModalEditar from './components/ModalEditar.js';

function App() {
      //States Front-end
      const [alunos , setAlunos] = useState([])
      const [inputNome , setInputNome] = useState('')
      const [inputIdade,setInputIdade]=useState('')
      const [inputProfissao,setInputProfissao]=useState('')
      const [inputSexo ,setInputSexo] = useState ('')
      const [edita, setEdita] = useState('');
      const [indexEditado, setIndexEditado] = useState('');
      const [atualizar , setAtualizar]=useState()

      //States para filtro
      const [todosAlunos, setTodosAlunos] = useState([]);
      const [alunosFiltrados, setAlunosFiltrados] = useState([]);

      //States Modal
      const [openModal , setOpenModal] =useState(false)
      const [openModalVisualizar , setOpenModalVisualizar] = useState(false)
      const [openModalEditar , setOpenModalEditar] = useState(false)

      //States Paginação
      const [paginaAtual , setPaginaAtual]=useState(1)
      const itensPorPagina = 8;

      // Ordenação 
      const [tipoOrdenacao, setTipoOrdenacao] = useState('nome'); // Valor padrão: ordenação por ID

      
      
      useEffect(() => {
        axios.get('http://localhost:8080/usuarios')
          .then(response => {
            console.log('Dados recebidos:', response.data);
      
            let alunosOrdenados;
            if (tipoOrdenacao === 'id') {
              alunosOrdenados = response.data.sort((a, b) => a.id - b.id);
            } else if (tipoOrdenacao === 'recente') {
              alunosOrdenados = response.data.sort((a, b) => b.id - a.id);
            } else if (tipoOrdenacao === 'nome') {
              alunosOrdenados = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
            }
      
            setAlunos(alunosOrdenados);
            setTodosAlunos(alunosOrdenados);
          })
          .catch(error => {
            console.error('Erro ao buscar os dados:', error);
          });
      }, [tipoOrdenacao]); // Adicione 'tipoOrdenacao' como uma dependência do useEffect
      

      
     //Funções CRUD
     function cadastrar() {
      if (inputNome.length > 0 && inputIdade.length > 0 && inputProfissao.length > 0) {
        const novoAluno = {
          nome: inputNome,
          idade: inputIdade,
          profissao: inputProfissao,
          sexo: inputSexo
        };
        
        axios.post('http://localhost:8080/usuarios', novoAluno)
          .then(response => {
            console.log('Dados enviados com sucesso:', response.data);
            setAlunos([...alunos, novoAluno]);
            setAtualizar(response)
            setInputNome('');
            setInputIdade('');
            setInputProfissao('');
            setInputSexo('');

           window.location.reload();
          })
          .catch(error => {
            console.error('Erro ao enviar os dados:', error);
          });
      }
    }
    
    function deletar(aluno, index, e) {
      e.preventDefault();
      const indiceGlobal = (paginaAtual - 1) * itensPorPagina + index;
      const confirmacao = window.confirm("Tem certeza que deseja excluir o aluno?");
    
      if (confirmacao) {
        axios
          .delete(`http://localhost:8080/usuarios/${aluno.id}`)
          .then(response => {
            console.log('Aluno deletado com sucesso:', aluno);
            const novosAlunos = [...alunos];
            novosAlunos.splice(indiceGlobal, 1);
            setAlunos(novosAlunos);
            setIndexEditado(indiceGlobal);
          })
          .catch(error => {
            console.error('Erro ao deletar o aluno:', error);
          });
        } 
      }
    
   
      function editaClique(aluno, index, e) {
        e.preventDefault();
        const indiceGlobal = (paginaAtual - 1) * itensPorPagina + index;
      
        setOpenModalEditar(true);
        setInputNome(aluno.nome);
        setInputIdade(aluno.idade);
        setInputProfissao(aluno.profissao);
        setInputSexo(aluno.sexo);
        setIndexEditado(indiceGlobal);
        setEdita(true);
        setIndexEditado(aluno.id);
      }
      
      function salvaClique() { 
      
        const dadosAluno = {
          nome: inputNome,
          idade: inputIdade,
          profissao: inputProfissao,
          sexo: inputSexo
        };
      
        axios
          .put(`http://localhost:8080/usuarios/${indexEditado}`, dadosAluno)
          .then(response => {
            const alunosAtualizados = alunos.map(aluno => {
              if (aluno.id === indexEditado) {
                return {
                  id: aluno.id,
                  nome: inputNome,
                  idade: inputIdade,
                  profissao: inputProfissao,
                  sexo: inputSexo
                };
              }
              return aluno;
            });
      
            setOpenModalEditar(false);
            setInputNome('');
            setInputIdade('');
            setInputProfissao('');
            setInputSexo('');
            setIndexEditado(null);
            setAlunos(alunosAtualizados);
          })
          .catch(error => {
            console.error('Erro ao salvar os dados do aluno:', error);
          });
      }
      //-----------------------------------------------------------------------------------------------------------------------------
      
      // Funções de paginação 
          
      function irParaPaginaAnterior(e) {
        e.preventDefault()
        if (paginaAtual > 1) {
          setPaginaAtual(paginaAtual - 1);
        }
      }
      
      function irParaProximaPagina(e) {
        e.preventDefault()
        const numeroPaginas = Math.ceil(alunos.length / itensPorPagina);
        if (paginaAtual < numeroPaginas) {
          setPaginaAtual(paginaAtual + 1);
        }
         }
         function paginar(lista, itensPorPagina, numeroPagina) {
          const indiceInicio = (numeroPagina - 1) * itensPorPagina;
        const indiceFim = indiceInicio + itensPorPagina;
        return lista.slice(indiceInicio, indiceFim);
      }
    

      //----------------------------------------------------------------------------------------------------------------------------- 

          ///Função modal
      function visualizaClique(aluno, index ,e) {
        e.preventDefault();
        
        setOpenModalVisualizar(true)
        
        setInputNome (aluno.nome)
        setInputIdade (aluno.idade)
        setInputProfissao (aluno.profissao)
        setInputSexo (aluno.sexo)
        setIndexEditado(index)
        
}
//-----------------------------------------------------------------------------------------------------------------------------

    //Buttons da Paginaçao

function ParginarBotoes({ totalPages, currentPage, onPageChange }) {
  const handleClick = (pageNumber) => {
    if (pageNumber !== currentPage) {
      onPageChange(pageNumber);
    }
  };

  const botaoRenderizarPagina = (pageNumber) => {
    const isCurrentPage = pageNumber === currentPage;
    const buttonClassName = isCurrentPage ? '' : 'current-page-button';

    return (
      <button
        key={pageNumber}
        onClick={() => handleClick(pageNumber)}
        className={buttonClassName}
      >
        {pageNumber}
      </button>
    );
  };

  const renderizarBotao = () => {
    const buttons = [];
    const numButtonsToShow = 2;
    const startPage = Math.max(1, currentPage - numButtonsToShow);
    const endPage = Math.min(totalPages, currentPage + numButtonsToShow);

    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
      buttons.push(botaoRenderizarPagina(pageNumber));
    }

    return buttons;
  };

  return <div>{renderizarBotao()}</div>;
}

//-----------------------------------------------------------------------------------------------------------------------------

//FILTRO DE ALUNOS

function filtrarAlunos(e) {
  const valorBuscado = e.target.value.toLowerCase();

  if (valorBuscado === '') {
    setAlunos(todosAlunos); // Restaurar lista original
  } else {
    const alunosFiltrados = todosAlunos.filter (aluno => {
      const nomeAluno = aluno.nome.toLowerCase();
      const idadeAluno = aluno.idade.toString();
      const sexoAluno = aluno.sexo.toLowerCase();
      return (
        nomeAluno.includes(valorBuscado)|| 
        idadeAluno.includes(valorBuscado)||
        sexoAluno.includes(valorBuscado)
      );
    });
    setAlunos(alunosFiltrados);
  }
  setPaginaAtual(1); 
}

const numeroPaginas = Math.ceil((alunos.length || 0) / itensPorPagina);

    return (
      <div>
        <form>
        <BuscarDados filtrarAlunos={filtrarAlunos} />

        <button type='button' className='btnTela' onClick={() => setOpenModal(true)}>CADASTRAR<CadastroPessoal/></button>

        <div className= 'ordemTabela'>
          <label>
          <label>
            <input
              type="radio"
              value="nome"
              checked={tipoOrdenacao === 'nome'}
              onChange={() => setTipoOrdenacao('nome')}
            />
            Ordenar por nome
          </label>
            <input
              type="radio"
              value="id"
              checked={tipoOrdenacao === 'id'}
              onChange={() => setTipoOrdenacao('id')}
            />
            Cadastro mais antigo
          </label>
          <label>
            <input
              type="radio"
              value="recente"
              checked={tipoOrdenacao === 'recente'}
              onChange={() => setTipoOrdenacao('recente')}
            />
            Cadastro mais recente
          </label>
          
        </div>

            
        <CustomizedTables
          alunos={paginar(alunos, itensPorPagina, paginaAtual)}
          deletarAluno={deletar}
          salvaClique={salvaClique}
          editaClique={editaClique}
          visualizaClique={visualizaClique}
/>

          
          <div>
              {/* Botões de navegação */}
            <div className='buttons page'>

                <button
                  onClick={irParaPaginaAnterior}
                  disabled={paginaAtual === 1}
                  className={paginaAtual === 1 ? 'disabled' : ''}
                ><SetaVoltar/>
                </button>

                    <ParginarBotoes
                      totalPages={numeroPaginas}
                      currentPage={paginaAtual}
                      onPageChange={setPaginaAtual}
                    />

                <button
                    onClick={irParaProximaPagina}
                    disabled={paginaAtual === numeroPaginas}
                    className={paginaAtual === numeroPaginas ? 'disabled' : ''}
                  > <SetaProxima/>
                </button>


            </div>      
          </div>
          <Modal isOpen={openModal} setModalOpen={() => setOpenModal (!openModal)}>
                  <h3>Cadastrar aluno</h3>
                  
                  
                        <ul>
                          
                          <label>Dgite seu Nome :</label>
                        
                          <input   
                              className='inputs'
                              placeholder='Nome' 
                              type="text" 
                              value={inputNome} 
                              onChange={(e) => setInputNome(e.target.value)}/>
                        
                        <label>Dgite sua Idade :</label>
                             
                          <input 
                              className='inputs'
                              placeholder='Idade'
                              type="text"
                              value={inputIdade}
                              onChange={(e) => setInputIdade(e.target.value)}
                          />
                        
                          <label>Dgite sua Profissao :</label>
                           
                          <input 
                              className='inputs'
                              placeholder='Profissão'
                              type="text"
                              value={inputProfissao}
                              onChange={(e) => setInputProfissao(e.target.value)}
                          />
                        
                            <label>Informe seu Sexo:</label>

                          <select  className='inputs'
                                placeholder='Sexo'
                                type="text"
                                value={inputSexo}
                                onChange={(e) => setInputSexo(e.target.value)}>
                                  <option value='' >Selecione</option>
                                  <option value= "Masculino">Masculino</option>
                                  <option value="Feminino">Feminino</option>
                          
                            </select>
                         
                  
                  <button type='button' className='btnAddModal' onClick= {cadastrar} >Salvar</button>
    
                        </ul>
          
          </Modal> 
          <ModalVisualizar isOpen={openModalVisualizar} setModalVisualizarOpen={() => setOpenModalVisualizar (!openModalVisualizar)}>
            
          <h3>Visualizar aluno</h3> 
           <span className='spanNome'>Nome: {inputNome}</span>
           <span>Idade: {inputIdade}</span>
           <span>Profissao: {inputProfissao}</span>
           <span>Sexo: {inputSexo}</span>
            

          </ModalVisualizar>

          <ModalEditar isOpen={openModalEditar} setModalEditarOpen={() => setOpenModalEditar (!openModalEditar)}>
               <h3>Editar aluno</h3>
                  
                  <ul>
                          
                          <label>Dgite seu Nome :</label>
                      
                      <input   
                      
                          className='inputs'
                          placeholder='Nome' 
                          type="text" 
                          value={inputNome} 
                          onChange={(e) => setInputNome(e.target.value)}/>
                    
                    <label>Dgite sua Idade :</label>
                      <input 
                          className='inputs'
                          placeholder='Idade'
                          type="text"
                          value={inputIdade}
                          onChange={(e) => setInputIdade(e.target.value)}
                      />
                    
                    <label>Dgite sua Profissao :</label>
                      <input 
                          className='inputs'
                          placeholder='Profissão'
                          type="text"
                          value={inputProfissao}
                          onChange={(e) => setInputProfissao(e.target.value)}
                      />
                      
                        <label>Informe seu Sexo:</label>
                      <select  
                            placeholder='Sexo'
                            type="text"
                            value={inputSexo}
                            onChange={(e) => setInputSexo(e.target.value)}>
                              <option value='' >Selecione</option>
                              <option value= "Masculino">Masculino</option>
                              <option value="Feminino">Feminino</option>
                      
                        </select>
                  
 
                      {edita ? (
                <button className='btnModalSalvar' onClick={(e, aluno , index)=>salvaClique(e ,aluno , index)}>Salvar</button>
                ) : (
                  <button className='btnTabela' onClick={(e) =>editaClique(e)}><EditIcon/></button>
              )}
                </ul>

          </ModalEditar>
          
          
          </form>
        </div>
 
  );
      } 
export default App;

