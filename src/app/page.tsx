import Image from "next/image";
import { validateRequest } from "./lib/validate-request";
import Link from "next/link";

export default async function Home() {
  const {user} = await validateRequest()

  return (
    <main className="flex min-h-screen flex-col items-center space-y-5 p-24">
      <div>Hola</div>
      {user && <div>Bienvenido, {user.id}</div>}
      {user && <Link href="/logout">Cerrar sesion</Link>}
      {!user && <Link href="/login">Iniciar sesion</Link>}
      <Link href="/signup">Crear cuenta</Link>
    </main>
  );
}
