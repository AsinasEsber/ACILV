
import { auth } from "@/lib/auth";

export async function GET() {
    const response = await auth.api.signUpEmail({
        body:{
            email: "asinas@mail.com",
            password:"pass",
            name:"Asinas Esber"
        }
    });
    return Response.json(response);
}