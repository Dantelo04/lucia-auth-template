"use server";

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "../lib/auth";
import { db } from "../lib/db";
import { redirect } from "next/navigation";
import { ActionResult } from "./page";

export default async function Page() {}

export async function login(state:any, formData: FormData): Promise<ActionResult> {
	
	const username = formData.get("email");
	if (typeof username !== "string") {
		return {
			error: "Invalid email"
		};
	}
	const password = formData.get("password");
	if (typeof password !== "string") {
		return {
			error: "Invalid password"
		};
	}

	const existingUser = await db.user.findFirst({
        where: {
            email: username
        }
    })
	if (!existingUser) {
		// NOTE:
		// Returning immediately allows malicious actors to figure out valid usernames from response times,
		// allowing them to only focus on guessing passwords in brute-force attacks.
		// As a preventive measure, you may want to hash passwords even for invalid usernames.
		// However, valid usernames can be already be revealed with the signup page among other methods.
		// It will also be much more resource intensive.
		// Since protecting against this is non-trivial,
		// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
		// If usernames are public, you may outright tell the user that the username is invalid.
		return {
			error: "Correo o contraseña incorrectos"
		};
	}

	const validPassword = await verify(existingUser.password, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
	if (!validPassword) {
		return {
			error: "Correo o contraseña incorrectos"
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}