import "./App.css";
import { FiTrash } from "react-icons/fi";

export default function App() {
  return (
    <>
      <div className="bg-blue-950 w-full min-h-screen flex justify-center px-5">
        <main className="my-10 w-full max-w-2xl p-10">
          <h1 className="text-white font-semibold text-2xl">Clientes</h1>
          <form action="" className="flex flex-col">
            <label className="flex flex-col p-3 text-white gap-2">
              Nome:
              <input
                type="text"
                placeholder="Digite seu nome aqui..."
                className="w-full p-2 rounded-md text-black"
              />
            </label>
            <label className="flex flex-col p-3 text-white gap-2">
              Email:
              <input
                type="email"
                placeholder="Digite seu e-mail aqui..."
                className="w-full p-2 rounded-md text-black"
              />
            </label>
            <label className="flex flex-col p-3 text-white gap-2">
              Senha:
              <input
                type="password"
                placeholder="Digite sua senha aqui..."
                className="w-full p-2 rounded-md text-black"
              />
            </label>
            <input
              type="submit"
              value="Cadastrar"
              className="cursor-pointer bg-green-500 py-1 px-20 m-auto font-medium text-white rounded-lg"
            />
          </form>

          <article className="w-full bg-white rounded m-auto my-10 p-2 relative hover:scale-110 duration-150">
            <p>
              <samp className="font-medium">Nome:</samp>André
            </p>
            <p>
              <samp className="font-medium">Email:</samp>andre@mail.com
            </p>
            <p>
              <samp className="font-medium">Status:</samp>Ativo
            </p>
            <button className="bg-red-600 h-8 w-8 flex items-center justify-center rounded-full absolute -right-2 -top-4">
              <FiTrash size={18} color="#ffff" />
            </button>
          </article>
        </main>
      </div>
    </>
  );
}
