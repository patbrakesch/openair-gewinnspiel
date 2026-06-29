"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import "./globals.css";

export default function Home() {
  const [sent, setSent] = useState(false);

  async function submitForm(e: any) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

  if (res.ok) {
  setSent(true);
  } else {
  const result = await res.json();

    if (result.error?.includes("duplicate key")) {
      alert("Du hast bereits am Gewinnspiel teilgenommen. Pro Person ist nur eine Teilnahme möglich.");
    } else {
      alert("Es gab ein Problem. Bitte versuche es nochmals.");
    }
  }
    
  }

  if (sent) {
    return (
      <main className="page success">
        <CheckCircle size={80} />
        <h1>Danke!</h1>
        <p>Du nimmst jetzt an der Verlosung teil.</p>
        <p>Viel Glück!</p>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="hero">
        <h2>GEWINNE</h2>
        <h1>Tickets fürs Openair</h1>
        <h3>FRAUENFELD</h3>
      </section>

      <section className="formCard">
        <form onSubmit={submitForm}>
          <input name="first_name" placeholder="Vorname" required />
          <input name="last_name" placeholder="Nachname" required />
          <input name="birthdate" type="date" required />
          <input name="address" placeholder="Adresse" required />
          <input name="zip" placeholder="PLZ" required />
          <input name="city" placeholder="Ort" required />
          <input name="email" type="email" placeholder="E-Mail" required />
          <input name="phone" placeholder="Telefonnummer" required />

          <label className="check">
            <input type="checkbox" required />
            <span>Ich akzeptiere die Teilnahmebedingungen.</span>
          </label>

          <label className="check">
            <input type="checkbox" required />
            <span>Ich akzeptiere die Datenschutzerklärung.</span>
          </label>

          <button type="submit">TEILNEHMEN</button>
        </form>
      </section>

      <footer>Teilnahme bis: xx.xx.2026 · Datenschutz · Teilnahmebedingungen</footer>
    </main>
  );
}
