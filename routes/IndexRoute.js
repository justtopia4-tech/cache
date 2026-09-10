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
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
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
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 28px;
            padding: 48px 40px;
            max-width: 520px;
            width: 90%;
            text-align: center;
            box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7),
                        0 0 40px -10px rgba(6, 182, 212, 0.15);
            animation: cardAppear 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes cardAppear {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.96);
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
            gap: 10px;
            padding: 8px 18px;
            border-radius: 9999px;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: #10b981;
            margin-bottom: 28px;
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
        }

        .pulse-beacon {
            position: relative;
            width: 10px;
            height: 10px;
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
            background: linear-gradient(135deg, #38bdf8 0%, #818cf8 35%, #c084fc 70%, #38bdf8 100%);
            background-size: 300% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmerGradient 6s ease-in-out infinite;
            margin-bottom: 12px;
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
            margin-bottom: 30px;
            font-weight: 500;
        }

        /* Live Frequency Visualizer */
        .visualizer {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            height: 32px;
            margin-bottom: 30px;
        }

        .bar {
            width: 4px;
            border-radius: 9999px;
            background: linear-gradient(to top, #06b6d4, #8b5cf6);
            animation: soundWave 1.4s ease-in-out infinite alternate;
        }

        .bar:nth-child(1) { height: 12px; animation-delay: 0.1s; }
        .bar:nth-child(2) { height: 24px; animation-delay: 0.3s; }
        .bar:nth-child(3) { height: 32px; animation-delay: 0.5s; }
        .bar:nth-child(4) { height: 18px; animation-delay: 0.2s; }
        .bar:nth-child(5) { height: 28px; animation-delay: 0.4s; }
        .bar:nth-child(6) { height: 16px; animation-delay: 0.6s; }
        .bar:nth-child(7) { height: 26px; animation-delay: 0.25s; }

        @keyframes soundWave {
            0% { transform: scaleY(0.3); opacity: 0.5; }
            100% { transform: scaleY(1.1); opacity: 1; }
        }

        /* Status Grid */
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 28px;
        }

        .info-box {
            background: rgba(30, 41, 59, 0.45);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            padding: 14px;
            text-align: left;
            transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .info-box:hover {
            transform: translateY(-2px);
            border-color: rgba(56, 189, 248, 0.3);
        }

        .info-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            color: #64748b;
            font-weight: 600;
            margin-bottom: 4px;
        }

        .info-val {
            font-size: 13px;
            font-family: 'JetBrains Mono', monospace;
            color: #e2e8f0;
            font-weight: 600;
        }

        .clock-val {
            color: #38bdf8;
        }

        /* Footer */
        .footer-note {
            font-size: 12px;
            color: #475569;
            font-weight: 500;
        }

        @media (max-width: 480px) {
            .card {
                padding: 36px 20px;
            }
            .brand-title {
                font-size: 24px;
            }
            .info-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>

    <div class="card">
        <div class="status-pill">
            <span class="pulse-beacon">
                <span class="pulse-ring"></span>
                <span class="pulse-dot"></span>
            </span>
            <span>SYSTEM ACTIVE</span>
        </div>

        <h1 class="brand-title">OSM BY NOPYSOURCE</h1>
        <p class="subtitle">High Performance Reverse Proxy & Cache Gateway</p>

        <div class="visualizer">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>

        <div class="info-grid">
            <div class="info-box">
                <div class="info-label">Cache Engine</div>
                <div class="info-val">In-Memory RAM</div>
            </div>
            <div class="info-box">
                <div class="info-label">SSL Tunnel</div>
                <div class="info-val">Bypass Active</div>
            </div>
            <div class="info-box">
                <div class="info-label">Network Status</div>
                <div class="info-val" style="color:#10b981;">● Online</div>
            </div>
            <div class="info-box">
                <div class="info-label">Realtime Clock</div>
                <div class="info-val clock-val" id="clock">--:--:--</div>
            </div>
        </div>

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