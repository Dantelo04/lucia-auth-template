"use client"

import { redirect } from "next/navigation";
import { validateRequest } from "../lib/validate-request";
import { signup } from "./actions";
import { FiAlertTriangle, FiEye } from "react-icons/fi";
import { useState } from "react";
import classNames from "classnames";
import { useFormState, useFormStatus } from "react-dom";
import { CgSpinner } from "react-icons/cg";

export default function Page() {
	const [seePass, setSeePass] = useState(false)
	const [state, formAction] = useFormState(signup, null)

	return (
		<div className="flex flex-col xl:p-20 items-center justify-start h-screen w-screen">
			<div className="flex flex-col space-y-6 justify-center xl:border p-10 pb-40 rounded xl:w-3/12 w-full">
				<h1 className="text-center font-bold text-neutral-500 text-xl">Crea una cuenta</h1>
				<form action={formAction} className="flex flex-col space-y-3">
					<input name="username" placeholder="Ingrese su nombre de usuario" id="username" className="py-2 outline-none border-b focus:border-blue-700 focus:border-b-2 duration-150 ease-in"/>
					<br />
					<input name="email" placeholder="Ingrese su correo electronico" id="email" className="py-2 outline-none border-b focus:border-blue-700 focus:border-b-2 duration-150 ease-in"/>
					<br />
					<div className="flex relative items-center">
						<input type={seePass? "text" : "password"} name="password" placeholder="Ingrese su contraseña" id="password" className="grow py-2 border-b focus:border-blue-700 focus:border-b-2 duration-150 ease-in outline-none"/>
						<button type="button" onClick={()=> setSeePass(!seePass)} className={classNames("right-0 absolute bg-white p-1 rounded-full duration-150 ease-in", {"bg-blue-500 text-white":seePass})}>
							<FiEye className="text-neutral-400"></FiEye>
						</button>
					</div>
					<br />
					<SubmitButton></SubmitButton>
				</form>
				{state ? <div className="flex justify-between rounded-md p-3 bg-red-500/15 text-red-500 items-center">{state.error}<FiAlertTriangle className="w-5 h-5"/></div>:<></>}
			</div>
		</div>
	);
}

function SubmitButton(){
	const {pending} = useFormStatus()

	return(
		<button disabled={pending} type="submit" className="flex justify-center p-3 rounded bg-blue-700 text-white uppercase text-sm font-bold">
			{pending ? <CgSpinner className="animate-spin w-5 h-5"></CgSpinner>:"Continuar"}
		</button>
	)
}

export interface ActionResult {
	error: string;
}