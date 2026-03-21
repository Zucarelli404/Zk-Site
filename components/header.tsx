"use client";

import { useState } from "react";
import Link from "next/link";
import { navigation } from "@/lib/site";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <nav className="header-nav" aria-label="Principal">
          <Link href="/" className="brand" aria-label="ZK Solutions">
            <img src="/images/zk-icon.png" alt="ZK" className="brand-mark" style={{ border: "none", background: "none", boxShadow: "none" }} />
            <span>ZK Solutions</span>
          </Link>

          <button 
            className={`menu-toggle ${isOpen ? 'active' : ''}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/contato" className="btn btn-nav" onClick={() => setIsOpen(false)}>
              Agendar diagnostico
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
