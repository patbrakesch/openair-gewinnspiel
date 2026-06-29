import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase.from("participants").insert({
    first_name: body.first_name,
    last_name: body.last_name,
    birthdate: body.birthdate,
    address: body.address,
    zip: body.zip,
    city: body.city,
    email: body.email,
    phone: body.phone,
  });

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
