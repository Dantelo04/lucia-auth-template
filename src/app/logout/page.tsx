import { redirect } from "next/navigation";
import { validateRequest } from "../lib/validate-request";
import { logout } from "./actions";

export default async function Page() {
	const {user} = await validateRequest()

	if(user) {
		return (
			<form action={logout} className="flex flex-col w-screen h-screen p-10 items-center space-y-4">
				<h1 className=" font-semibold text-neutral-500">Estas seguro?</h1>
				<button className="rounded border border-red-500 bg-red-500/15 text-red-500 p-3 xl:w-3/12 w-full">Cerrar sesion</button>
			</form>
		)
	} else {
		redirect("/")
	}
	
}