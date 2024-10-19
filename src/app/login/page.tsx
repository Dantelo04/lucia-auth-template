"use server"

import { redirect } from "next/navigation";
import { validateRequest } from "../lib/validate-request";
import LoginForm from "./loginForm";

export default async function Page() {
	const {user} = await validateRequest()

	if(!user){
		return (
			<div className="flex flex-col xl:p-20 items-center justify-start h-screen w-screen">
				<LoginForm></LoginForm>
			</div>
		);
	} else {
		redirect("/")
	}
	
}

export interface ActionResult {
	error: string;
}