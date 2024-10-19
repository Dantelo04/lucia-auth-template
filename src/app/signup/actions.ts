"use server";

import { db } from "../lib/db";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "../lib/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { ActionResult } from "./page";


export default async function Page() {}

export async function signup(state:any, formData: FormData): Promise<ActionResult> {
	const username = formData.get("username");

	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username"
		};
	}
	const password = formData.get("password");
    
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        return {
            error: "Ingrese una contraseña valida"
        }
    }

	const email = formData.get("email")

	if(typeof email !== "string"){
		return {
            error: "Ingrese un correo valido"
        }
	}

    const passwordHash = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });

	
	const userId = generateIdFromEntropySize(10); // 16 characters long

	// TODO: check if username is already used
	await db.user.create({
        data: {
            id: userId,
		    username: username,
			email: email,
		    password: passwordHash
        }
		
	});

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}