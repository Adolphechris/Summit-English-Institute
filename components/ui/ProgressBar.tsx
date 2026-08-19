'use client';

import React from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow';
}

export function ProgressBar({
  value,
  size = 'md',
  showLabel = true,
  label,
  color = 'blue',
}: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colors = {
    blue: 'bg-blue-900',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-500',
  };

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
          {showLabel && (
            <span className="text-sm font-medium text-slate-900">{clampedValue}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-slate-200 rounded-full ${sizes[size]}`}>
        <div
          className={`${colors[color]} ${sizes[size]} rounded-full transition-all duration-500`}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
