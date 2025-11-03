import React, { useState } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [modal, setModal] = useState({ open: false, key: null });
  const navigate = useNavigate();

  const openModal = (key) => setModal({ open: true, key });
  const closeModal = () => setModal({ open: false, key: null });

  const modalContent = {
    portable: {
      title: "Portable Builds — Docker & Podman",
      body: (
        <>
          <p className="leading-relaxed">
            Containerize your frontend to produce reproducible builds and reliable deployments.
            Recommended quick flow:
          </p>

          <ol className="list-decimal list-inside mt-3 space-y-2 text-sm">
            <li><strong>Build:</strong> <code>npm run build</code></li>
            <li><strong>Build image:</strong> <code>podman build -f Dockerfile -t reactdock_frontend .</code></li>
            <li><strong>Run:</strong> <code>podman run -d --name reactdock_app --network reactdock-net -p 8080:80 reactdock_frontend</code></li>
          </ol>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            Use Nginx in the container to serve static assets and proxy <code>/api/*</code> to your backend.
          </p>
        </>
      ),
    },

    api: {
      title: "API Server — Sample Endpoints",
      body: (
        <>
          <p className="leading-relaxed">
            The demo backend exposes a small REST API. Try these endpoints:
          </p>

          <ul className="list-disc list-inside mt-3 text-sm">
            <li><code>GET /api/health</code> — health check (returns JSON)</li>
            <li><code>GET /api/items</code> — list items</li>
            <li><code>POST /api/items</code> — create an item (body: {"{"} name: "string" {"}"})</li>
          </ul>

          <div className="mt-3">
            <button
              onClick={() => {
                // demo quick-check: navigate to dashboard where you can try items
                navigate("/dashboard");
                closeModal();
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Open Dashboard
            </button>
          </div>
        </>
      ),
    },

    cicd: {
      title: "Dev & CI/CD — GitHub Actions (example)",
      body: (
        <>
          <p className="leading-relaxed">
            Example GitHub Actions workflow to build and push your frontend image.
          </p>

          <pre className="mt-3 p-3 rounded bg-gray-100 dark:bg-gray-800 text-sm overflow-auto">
{`name: CI
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install deps & build
        run: |
          npm ci
          npm run build
      - name: Build and push image
        uses: docker/build-push-action@v4
        with:
          push: true
          tags: user/reactdock:latest`}
          </pre>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Adapt to Podman in CI by using a podman action or running Podman in your runner.
          </p>
        </>
      ),
    },
  };

  const current = modal.key ? modalContent[modal.key] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          Welcome to ReactDock 🚢
        </h1>
        <p className="text-gray-400 max-w-2xl mt-3">
          A containerized <strong>React + Node</strong> stack — ready for Podman, Docker, and CI/CD.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
        <Card title="Portable Builds" icon="📦" onOpen={() => openModal("portable")}>
          Build once and run anywhere. Frontend is served via Nginx in a container for consistent delivery.
        </Card>

        <Card title="API Server" icon="⚙️" onOpen={() => openModal("api")}>
          Lightweight Express API that demonstrates CRUD. Click Open to view endpoints & jump to the dashboard.
        </Card>

        <Card title="Dev & CI/CD" icon="🚀" onOpen={() => openModal("cicd")}>
          Ready for Podman Compose & GitHub Actions. Open shows an example workflow you can copy.
        </Card>
      </div>

      <section className="mt-12 max-w-3xl mx-auto bg-white/6 p-6 rounded-2xl">
        <h2 className="text-2xl font-semibold mb-3">Quick start</h2>
        <ul className="text-gray-300 list-disc list-inside">
          <li>Frontend: <code>http://localhost:8080</code></li>
          <li>Backend health: <code>/api/health</code></li>
          <li>Dashboard: <code>/dashboard</code></li>
        </ul>
      </section>

      <Modal open={modal.open} onClose={closeModal} title={current?.title}>
        {current?.body}
      </Modal>
    </div>
  );
}
