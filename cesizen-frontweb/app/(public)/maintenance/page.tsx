export default function MaintenancePage() {
  return (
    <main className="maintenancePage">
      <section className="maintenanceCard">
        <div className="maintenanceIcon" aria-hidden="true">
          <span className="maintenanceIconDot" />
        </div>

        <p className="maintenanceBrand">CESIZEN</p>

        <h1 className="maintenanceTitle">
          Une petite pause s’impose
        </h1>

        <p className="maintenanceText">
          Cesizen est actuellement en maintenance afin de vous offrir
          la meilleure expérience possible.
        </p>

        <div className="maintenanceStatus">
          <span className="maintenanceStatusDot" />
          Maintenance en cours
        </div>

        <p className="maintenanceHint">
          Le service sera de nouveau disponible prochainement.
          Merci de votre compréhension.
        </p>
      </section>
    </main>
  );
}