"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import "../globals.css";

export default function Home() {
  const [sent, setSent] = useState(false);

  async function submitForm(e: any) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const birthdate = new Date(form.get("birthdate") as string);
    const today = new Date();

    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      alert("Du musst mindestens 18 Jahre alt sein, um teilzunehmen.");
      return;
    }
    const data = {
      ...Object.fromEntries(form.entries()),
      campaign: "migros",
    };

    const res = await fetch("/api/submit-migros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

  if (res.ok) {
  setSent(true);
  } else {
  const result = await res.json();

    if (
      result.code === "23505" ||
      result.error?.toLowerCase().includes("duplicate") ||
      result.error?.toLowerCase().includes("unique")
    ) {
      alert("Du hast bereits am Gewinnspiel teilgenommen. Pro Person ist nur eine Teilnahme möglich.");
    } else {
      alert("Es gab ein Problem. Bitte versuche es nochmals.");
    }
  }
    
  }

  if (sent) {
    return (
      <main className="page thankYouPage">
        <div className="thankYouCard">
          <div className="checkmark">✓</div>
          <h1>Danke!</h1>
          <p>Du nimmst jetzt an der Verlosung teil.</p>
          <p>Viel Glück!</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
     <section className="heroImage">
      <img src="/hero2.png" alt="Gewinnspiel Openair Frauenfeld" />
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
            <span>
              Ich akzeptiere die{" "}
              <a href="/teilnahmebedingungen-migros" target="_blank" rel="noopener noreferrer">
                Teilnahmebedingungen
              </a>.
            </span>
          </label>

          <button type="submit">TEILNEHMEN</button>
        </form>
      </section>

      
    </main>
  );
}
