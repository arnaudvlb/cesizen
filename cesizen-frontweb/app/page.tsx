import Link from "next/link";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenue sur CESIZen</h1>

      <div className="home-buttons">
        <Link href="/emotions">
          <button className="home-button">Découvrez les émotions</button>
        </Link>

        <Link href="/login">
          <button className="home-button">Connectez-vous</button>
        </Link>
      </div>
    </div>
  );
}