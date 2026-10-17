"use client";

import { Card } from "@heroui/react";
import React from "react";

export default function StatsGrid({ stats = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;

        return (
          <Card 
            key={index} 
            className="bg-[#18181b] border border-neutral-800/80 text-white p-5 rounded-xl shadow-sm flex flex-col justify-between gap-6 transition-all hover:border-neutral-700"
          >
            {/* Icon Box Container */}
            <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300">
              {/* Render the icon component directly */}
              {IconComponent && (
                <span className="w-5 h-5 flex items-center justify-center">
                  <IconComponent className="w-5 h-5" />
                </span>
              )}
            </div>

            {/* Label and Value */}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-neutral-400">{stat.title}</span>
              <h3 className="text-3xl font-semibold tracking-tight text-white">{stat.value}</h3>
            </div>
          </Card>
        );
      })}
    </div>
  );
}