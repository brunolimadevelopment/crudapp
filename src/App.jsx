import GlobalStyle from "./styles/global"
import { styled } from "styled-components"
import Form from "./components/Form"
import Grid from "./components/Grid"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);


  // async pois vamos ter que esperar o banco retornar esses dados.
  const getUsers = async () => {

    try {
      const res = await axios.get("https://apicrud-3hx00809u-brunolimadevelopment.vercel.app"); // o await é para espera o axios fazer um get
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1))); // ordena os nomes por ordem alfabetica
    } catch (error) {
      toast.error(error);
    }

  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container><Title>CADASTRE SEUS USUÁRIOS</Title></Container>
      <Form OnEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  )
}

export default App
