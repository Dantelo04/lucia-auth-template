"use client"

import { useState } from "react";
import { login } from "./actions";
import { FiEye } from "react-icons/fi";
import classNames from "classnames";
import { useFormState, useFormStatus } from "react-dom";
import { CgSpinner } from "react-icons/cg";
import { FiAlertTriangle } from "react-icons/fi";

export default function LoginForm(){
    const [seePass, setSeePass] = useState(false)
	const [state, formAction] = useFormState(login, null)

    return(
        <div className="flex flex-col space-y-6 justify-center xl:border p-10 pb-40 rounded xl:w-3/12 w-full">
				<h1 className="text-center font-bold text-neutral-500 text-xl">Iniciar sesion</h1>
				<form action={formAction} className="flex flex-col space-y-3">
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
    )
}

function SubmitButton(){
	const {pending} = useFormStatus()

	return(
		<button disabled={pending} type="submit" className="flex justify-center p-3 rounded bg-blue-700 text-white uppercase text-sm font-bold">
			{pending ? <CgSpinner className="animate-spin w-5 h-5"></CgSpinner>:"Continuar"}
		</button>
	)
}