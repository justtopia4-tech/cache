// importing necessary modules
const router = require("express").Router();

// setting the route
const HTML_CONTENT = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OSM BY NOPYSOURCE - ACTIVE</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            min-height: 100vh;
            background: #080c14;
            color: #f1f5f9;
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow-x: hidden;
            position: relative;
            padding: 24px 16px;
        }

        /* Ambient Glow Background */
        .ambient-glow {
            position: fixed;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            filter: blur(140px);
            opacity: 0.25;
            pointer-events: none;
            z-index: 0;
            animation: floatGlow 12s ease-in-out infinite alternate;
        }

        .glow-1 {
            background: #06b6d4;
            top: 10%;
            left: 15%;
        }

        .glow-2 {
            background: #8b5cf6;
            bottom: 10%;
            right: 15%;
            animation-delay: -6s;
        }

        @keyframes floatGlow {
            0% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(60px, -40px) scale(1.15); }
            100% { transform: translate(-40px, 50px) scale(0.95); }
        }

        /* Container Card */
        .card {
            position: relative;
            z-index: 1;
            background: rgba(15, 23, 42, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 28px;
            padding: 44px 36px;
            max-width: 600px;
            width: 100%;
            text-align: center;
            box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7),
                        0 0 40px -10px rgba(6, 182, 212, 0.15);
            animation: cardAppear 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes cardAppear {
            from {
                opacity: 0;
                transform: translateY(24px) scale(0.97);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        /* Live Status Badge */
        .status-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 8px 20px;
            border-radius: 9999px;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: #10b981;
            margin-bottom: 24px;
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
        }

        .pulse-beacon {
            position: relative;
            width: 10px;
            height: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .pulse-dot {
            width: 10px;
            height: 10px;
            background: #10b981;
            border-radius: 50%;
            display: block;
        }

        .pulse-ring {
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            background: rgba(16, 185, 129, 0.5);
            animation: pulseWave 2s cubic-bezier(0.24, 0, 0.38, 1) infinite;
        }

        @keyframes pulseWave {
            0% { transform: scale(0.8); opacity: 1; }
            100% { transform: scale(2.6); opacity: 0; }
        }

        /* Main Animated Title */
        .brand-title {
            font-size: 32px;
            font-weight: 800;
            line-height: 1.25;
            letter-spacing: -0.5px;
            text-align: center;
            background: linear-gradient(135deg, #38bdf8 0%, #818cf8 35%, #c084fc 70%, #38bdf8 100%);
            background-size: 300% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmerGradient 6s ease-in-out infinite;
            margin-bottom: 10px;
            filter: drop-shadow(0 0 25px rgba(56, 189, 248, 0.3));
        }

        @keyframes shimmerGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .subtitle {
            font-size: 15px;
            color: #94a3b8;
            margin-bottom: 24px;
            font-weight: 500;
            text-align: center;
        }

        /* Live Frequency Visualizer */
        .visualizer {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            height: 28px;
            margin-bottom: 26px;
        }

        .bar {
            width: 4px;
            border-radius: 9999px;
            background: linear-gradient(to top, #06b6d4, #8b5cf6);
            animation: soundWave 1.4s ease-in-out infinite alternate;
        }

        .bar:nth-child(1) { height: 12px; animation-delay: 0.1s; }
        .bar:nth-child(2) { height: 22px; animation-delay: 0.3s; }
        .bar:nth-child(3) { height: 28px; animation-delay: 0.5s; }
        .bar:nth-child(4) { height: 16px; animation-delay: 0.2s; }
        .bar:nth-child(5) { height: 26px; animation-delay: 0.4s; }
        .bar:nth-child(6) { height: 14px; animation-delay: 0.6s; }
        .bar:nth-child(7) { height: 24px; animation-delay: 0.25s; }

        @keyframes soundWave {
            0% { transform: scaleY(0.3); opacity: 0.5; }
            100% { transform: scaleY(1.1); opacity: 1; }
        }

        /* Description Box */
        .desc-card {
            background: rgba(30, 41, 59, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 22px 24px;
            margin-bottom: 22px;
            text-align: center;
        }

        .desc-tag {
            display: inline-block;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            color: #38bdf8;
            background: rgba(56, 189, 248, 0.12);
            padding: 4px 12px;
            border-radius: 9999px;
            margin-bottom: 12px;
        }

        .desc-text {
            font-size: 14px;
            color: #cbd5e1;
            line-height: 1.65;
            text-align: center;
        }

        .desc-text strong {
            color: #f8fafc;
        }

        /* Feature Pillars Row */
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 24px;
        }

        .feature-item {
            background: rgba(15, 23, 42, 0.55);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            padding: 14px 10px;
            text-align: center;
            transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .feature-item:hover {
            transform: translateY(-2px);
            border-color: rgba(56, 189, 248, 0.3);
        }

        .feature-icon {
            font-size: 20px;
            margin-bottom: 6px;
            display: block;
        }

        .feature-title {
            font-size: 12px;
            font-weight: 700;
            color: #f1f5f9;
            margin-bottom: 2px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .feature-sub {
            font-size: 11px;
            color: #94a3b8;
            line-height: 1.3;
        }

        /* Stats Strip */
        .stats-strip {
            display: flex;
            align-items: center;
            justify-content: space-around;
            background: rgba(15, 23, 42, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.04);
            border-radius: 14px;
            padding: 12px 16px;
            margin-bottom: 22px;
        }

        .stat-col {
            text-align: center;
        }

        .stat-lbl {
            font-size: 10px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 3px;
        }

        .stat-val {
            font-size: 12px;
            font-family: 'JetBrains Mono', monospace;
            font-weight: 600;
            color: #e2e8f0;
        }

        .stat-val.online {
            color: #10b981;
        }

        .stat-val.clock {
            color: #38bdf8;
        }

        .stat-divider {
            width: 1px;
            height: 24px;
            background: rgba(255, 255, 255, 0.08);
        }

        /* Footer */
        .footer-note {
            font-size: 12px;
            color: #475569;
            font-weight: 500;
            text-align: center;
        }

        @media (max-width: 520px) {
            .card {
                padding: 32px 20px;
            }
            .brand-title {
                font-size: 24px;
            }
            .feature-grid {
                grid-template-columns: 1fr;
            }
            .stats-strip {
                flex-direction: column;
                gap: 10px;
            }
            .stat-divider {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>

    <div class="card">
        <!-- Live Badge -->
        <div>
            <div class="status-pill">
                <span class="pulse-beacon">
                    <span class="pulse-ring"></span>
                    <span class="pulse-dot"></span>
                </span>
                <span>SYSTEM ACTIVE</span>
            </div>
        </div>

        <!-- Title & Subtitle -->
        <h1 class="brand-title">OSM BY NOPYSOURCE</h1>
        <p class="subtitle">High Performance Cache & Reverse Proxy Network</p>

        <!-- Live Visualizer -->
        <div class="visualizer">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>

        <!-- Proxy Description -->
        <div class="desc-card">
            <span class="desc-tag">Fungsi & Kegunaan</span>
            <p class="desc-text">
                Server ini berfungsi sebagai <strong>perantara cerdas (Reverse Proxy)</strong> untuk mempercepat proses pengunduhan file aset & cache game. Seluruh file yang sering diakses disimpan langsung di dalam <strong>RAM Cache</strong> agar pemain dapat mengunduh aset secara instan tanpa membebani server utama, serta dilengkapi dengan <strong>SSL Bypass</strong> untuk mencegah kegagalan unduhan pada perangkat pemain.
            </p>
        </div>

        <!-- Feature Pillars -->
        <div class="feature-grid">
            <div class="feature-item">
                <span class="feature-icon">⚡</span>
                <div class="feature-title">RAM Caching</div>
                <div class="feature-sub">Akses Instan & Cepat</div>
            </div>
            <div class="feature-item">
                <span class="feature-icon">🛡️</span>
                <div class="feature-title">SSL Bypass</div>
                <div class="feature-sub">Bebas Error Koneksi</div>
            </div>
            <div class="feature-item">
                <span class="feature-icon">🔒</span>
                <div class="feature-title">IP Masking</div>
                <div class="feature-sub">Lindungi Server Asal</div>
            </div>
        </div>

        <!-- System Stats Bar -->
        <div class="stats-strip">
            <div class="stat-col">
                <div class="stat-lbl">Koneksi</div>
                <div class="stat-val online">● ONLINE</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-col">
                <div class="stat-lbl">Cache Engine</div>
                <div class="stat-val">IN-MEMORY</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-col">
                <div class="stat-lbl">Waktu Server</div>
                <div class="stat-val clock" id="clock">--:--:--</div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer-note">
            Powered by NopySource • Growtopia Cache Gateway
        </div>
    </div>

    <script>
        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const clockEl = document.getElementById('clock');
            if (clockEl) clockEl.textContent = hours + ':' + minutes + ':' + seconds + ' WIB';
        }
        setInterval(updateClock, 1000);
        updateClock();
    </script>
</body>
</html>`;

router.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(HTML_CONTENT);
});

// exporting the router
module.exports = router;