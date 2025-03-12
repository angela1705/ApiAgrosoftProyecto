import React from 'react';
import DefaultLayout from "@/layouts/default";

const Dashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div style={{ textAlign: 'center' }}>
          {/* Aquí tienen que agregar contenido útil para el Dashboard creo que asi dijo mauro */}
          <h1>Panel Principal</h1>
          <p>Este es el panel principal. Aquí pueden agregar más contenido para que sea más útil le toca a mauro creo.</p>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Dashboard;