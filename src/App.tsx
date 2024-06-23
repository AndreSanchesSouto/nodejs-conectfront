import "./App.css";
import { FiTrash } from "react-icons/fi";
import { api } from "./services/api";
import { useEffect, useState, useRef, FormEvent } from "react";

interface CustomerProps {
  id: string,
  name: string,
  email: string,
  password: string,
  status: boolean,
  created_at: string,
  updated_at: string
}

export default function App() {

  const [customers, setCustomers] = useState<CustomerProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadCustomers()
  }, [])
  
  async function loadCustomers() {
      const response = await api.get("/customers")
      setCustomers(response.data)
    }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if(!nameRef.current?.value || !emailRef.current?.value || !passwordRef.current?.value) {
      console.log("aiai mamae")
      return
    }

    const response = await api.post("/customer", {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value 
    })

    setCustomers(allCustomers => [...allCustomers, response.data])

    nameRef.current.value = ""
    emailRef.current.value = ""
    passwordRef.current.value = ""

  }

  async function handleDelete(id: string) {
    try {
      await api.delete("/customer-delete", {
        params: {
          id: id
        }
      })

      const allCustomers = customers.filter( (customer) => customer.id != id)

      setCustomers(allCustomers)

    } catch(error) {
      console.log("Error")
    }

  }

  return (
    <>
      <div className="bg-indigo-950 w-full min-h-screen flex justify-center px-5">
        <main className="my-10 w-full max-w-2xl p-10">
          <h1 className="text-white font-semibold text-4xl">Clientes</h1>
          <form 
          className="flex flex-col"
          onSubmit={handleSubmit}
          >
            <label className="flex flex-col p-3 text-white gap-2">
              Nome:
              <input
                type="text"
                placeholder="Digite seu nome aqui..."
                className="w-full p-2 rounded-md text-black"
                ref={nameRef}
              />
            </label>
            <label className="flex flex-col p-3 text-white gap-2">
              Email:
              <input
                type="email"
                placeholder="Digite seu e-mail aqui..."
                className="w-full p-2 rounded-md text-black"
                ref={emailRef}
              />
            </label>
            <label className="flex flex-col p-3 text-white gap-2">
              Senha:
              <input
                type="password"
                placeholder="Digite sua senha aqui..."
                className="w-full p-2 rounded-md text-black"
                ref={passwordRef}
              />
            </label>
            <input
              type="submit"
              value="Cadastrar"
              className="cursor-pointer bg-green-500 py-1 px-20 m-auto font-medium text-white rounded-lg hover:bg-yellow-400 duration-200"
            />
          </form>

          {
            customers.map((customer) => (
              <article 
              key={customer.id}
              className="w-full bg-white rounded m-auto my-5 p-2 relative hover:scale-110 duration-150"
              >
              <p>
                <samp className="font-medium">Nome:</samp>{customer.name}
              </p>
              <p>
                <samp className="font-medium">Email:</samp>{customer.email}
              </p>
              <p>
                <samp className="font-medium">Status:</samp>{customer.status?"ATIVO":"INATIVO"}
              </p>
              <button 
              className="bg-red-600 h-8 w-8 flex items-center justify-center rounded-full absolute -right-2 -top-4"
              onClick={() => handleDelete(customer.id)}
              >
                <FiTrash size={18} color="#ffff" />
              </button>
            </article>
            ))
          }
        </main>
      </div>
    </>
  );
}
