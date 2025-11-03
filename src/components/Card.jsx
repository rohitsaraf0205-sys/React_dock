import React from "react";

export default function Card({ title, icon, children, onOpen }) {
  return (
    <div className="relative bg-white/90 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-2xl transition-all duration-200">
      <div className="flex items-center gap-3">
        {icon && <div className="text-2xl">{icon}</div>}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      </div>

      <div className="mt-3 text-gray-700 dark:text-gray-300">
        {children}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onOpen}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Open
        </button>
      </div>
    </div>
  );
}
