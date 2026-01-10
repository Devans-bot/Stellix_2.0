import { useRef, useState } from "react";
import React from "react";

export default function PullToRefresh({ onRefresh, children }) {
  const startY = useRef(0);
  const pulling = useRef(false);
  const refreshing = useRef(false);

  const [offset, setOffset] = useState(0);

  const MAX_PULL = 180;        // how far you can pull
  const TRIGGER_PULL = 140;    // refresh threshold

  const onTouchStart = (e) => {
    if (e.currentTarget.scrollTop === 0 && !refreshing.current) {
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    }
  };

  const onTouchMove = (e) => {
    if (!pulling.current || refreshing.current) return;

    const diff = e.touches[0].clientY - startY.current;
    if (diff > 0) {
      // resistance curve (iOS-like)
      const resisted = Math.min(diff * 0.6, MAX_PULL);
      setOffset(resisted);
    }
  };

  const onTouchEnd = async () => {
    if (!pulling.current) return;

    if (offset >= TRIGGER_PULL) {
      refreshing.current = true;
      navigator.vibrate?.(20); // haptic
      setOffset(TRIGGER_PULL);

      try {
        await onRefresh();
      } finally {
        refreshing.current = false;
        setOffset(0);
      }
    } else {
      setOffset(0);
    }

    pulling.current = false;
  };

  const progress = Math.min(offset / TRIGGER_PULL, 1);

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        transform: `translateY(${offset}px)`,
        transition: pulling.current ? "none" : "transform 0.3s ease",
      }}
    >
      {/* 🔄 Pull Indicator */}
      <div
        style={{
          height: 50,
          marginTop: -50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: offset > 10 ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.3)",
            borderTopColor: "white",
            transform: `rotate(${progress * 360}deg)`,
            transition: refreshing.current ? "transform 0.6s linear infinite" : "none",
          }}
          className={refreshing.current ? "spin" : ""}
        />
      </div>

      {children}

      {/* spinner animation */}
      <style>{`
        .spin {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
