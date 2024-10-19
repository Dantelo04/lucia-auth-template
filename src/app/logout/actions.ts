import { redirect } from "next/navigation";
import { lucia } from "../lib/auth";
import { validateRequest } from "../lib/validate-request";
import { ActionResult } from "../signup/page";
import { cookies } from "next/headers";

export async function logout(): Promise<ActionResult> {
	"use server";
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
}