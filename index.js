// ================= REMOVE OLD DIALOGS =================

// Remove any dialogs
            document.querySelectorAll("dialog").forEach(d => d.remove());

            // Remove QR / simplelive backdrop
            const backdrop = document.getElementById("dialog-backdrop");
            if (backdrop) backdrop.remove();

            // REMOVE BANNER
            const banner = document.querySelector("div.---react-features-Banner-styles-module__banner--lcyZD.---react-features-Banner-styles-module__body--ryS8w");
            if (banner) {
                banner.remove()
            }
document.querySelectorAll("dialog").forEach(d => d.remove());
(function() {
    // --- USER DATA ---
    const user = "Ahmad Bhai";
    const id = "18131400";
    const email = "ahmadbhai@gmail.com";
    const flag = "pk";
    const inr__rate = 90;

    // 1. CLEANUP & INITIAL SETUP
    document.querySelectorAll("dialog").forEach(d => d.remove());
    document.title = "Live trading | Quotex";

    // 2. LEADERBOARD POSITION LOGIC
    const LEADER__POS = (sum) => {
        var pos__el = document.querySelector("div.---react-features-Sidepanel-LeaderBoard-Position-styles-module__footer--iKtL6");
        if (!pos__el) return;
        var pos;
        var my__orig__pos = 60962;
        if (sum > 0) {
            pos = Math.floor(my__orig__pos / (sum / 2));
        } else if (sum < 0) {
            pos = my__orig__pos - Math.floor(Math.random() * 100 + 1);
        } else {
            pos = Math.floor(my__orig__pos);
        }
        if (pos < 21) pos = pos + 20;
        pos__el.innerHTML = `<div class="---react-features-Sidepanel-LeaderBoard-Position-styles-module__title--ocuJC">Your position:</div>${Math.abs(pos)}`;
    };

    // 3. LEADERBOARD LIST MANIPULATION
    const LEADER__PLACE = (sum) => {
        const leaders = document.querySelectorAll("div.---react-features-Sidepanel-LeaderBoard-styles-module__items--LTZTE > div");
        if (!leaders.length) return;
        
        const total = sum.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2 });

        Array.from(leaders).some((l, i) => {
            const leader_profit = l.querySelector("div.---react-features-Sidepanel-LeaderBoard-styles-module__money--jJUGd");
            if (!leader_profit) return false;
            
            const leader_profit_simplify = parseFloat(leader_profit.innerHTML.replace(/\$|\,/g, ""));
            
            if (leader_profit_simplify <= sum) {
                const leader__flag = l.querySelector("div.---react-features-Sidepanel-LeaderBoard-styles-module__block--zCluU svg use");
                if (leader__flag) leader__flag.setAttribute("xlink:href", `/profile/images/flags.svg#flag-${flag}`);
                
                const leader_name = l.querySelector("div.---react-features-Sidepanel-LeaderBoard-styles-module__name--MrPOZ");
                if (leader_name) leader_name.innerHTML = user;

                leader_profit.innerHTML = sum >= 30000 ? `$30,000.00+` : `$${total}`;
                
                const REAL_POS = l.querySelector("div.---react-features-Sidepanel-LeaderBoard-styles-module__key--mvqBr div").innerHTML;
                const footerPos = document.querySelector("div.---react-features-Sidepanel-LeaderBoard-Position-styles-module__footer--iKtL6");
                if (footerPos) footerPos.innerHTML = `<div class="---react-features-Sidepanel-LeaderBoard-Position-styles-module__title--ocuJC">Your position:</div>${REAL_POS}`;
                return true;
            }
        });
    };

    // 4. DAILY TRADES CALCULATION
    const TradesCalc = () => {
        var trades = document.querySelectorAll("#root > div > div.page.app__page > main > div.page__sidebar > div.deal-list.active > div.deal-list__items.active > div:not(.trades-list__date)");
        
        if (trades.length > 0) {
            var results = [];
            trades.forEach(trade => {
                var delta = trade.querySelector(".trades-list-item__delta");
                if (delta) {
                    var pl_str = delta.querySelector("div")?.innerText || "0";
                    var inv_str = delta.innerText.split(" ")[0] || "0";
                    var pl = parseFloat(pl_str.replace(/,|\$|\s|\₹/g, ""));
                    var inv = parseFloat(inv_str.replace(/,|\$|\s|\₹/g, ""));
                    results.push(pl - inv);
                }
            });

            var sum = results.reduce((a, b) => a + b, 0);
            const total = sum.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2 });

            LEADER__POS(sum);
            LEADER__PLACE(sum);

            var pl__leader = document.querySelector("div.---react-features-Sidepanel-LeaderBoard-Position-styles-module__money--BwWCZ");
            var pl__line = document.querySelector("div.---react-features-Sidepanel-LeaderBoard-Position-styles-module__loading--h38TV > span");

            if (pl__leader) {
                pl__leader.innerText = (sum >= 0 ? "$" : "-") + total.replace(/-/g, "") + (sum < 0 ? "$" : "");
                pl__leader.className = `---react-features-Sidepanel-LeaderBoard-Position-styles-module__money--BwWCZ ${sum >= 0 ? "---react-features-Sidepanel-LeaderBoard-Position-styles-module__green--LD4pW" : "---react-features-Sidepanel-LeaderBoard-Position-styles-module__red--qUPWg"}`;
            }
            if (pl__line) {
                let width = sum > 0 ? 95 : 10;
                pl__line.style = `width:${width}%;background:#0faf59`;
            }
        }
    };

    // 5. IMPROVED RESPONSIVE UI (Fix for Desktop "LIVE ACCOUNT")
    const updateUI = () => {
        const levelText = document.querySelector(".---react-features-Usermenu-styles-module__demo--TmWTp");
        if (levelText) {
            // Screen width check: Desktop mode typically > 991px or laptop > 768px
            const isDesktop = window.innerWidth > 991 || window.matchMedia("(min-width: 992px)").matches;
            const targetText = isDesktop ? "LIVE ACCOUNT" : "LIVE";
            
            if (levelText.innerText !== targetText) {
                levelText.innerText = targetText;
                levelText.style.color = "#0faf59";
            }
        }

        const balanceEl = document.querySelector(".---react-features-Usermenu-styles-module__infoBalance--pVBHU");
        if (balanceEl) {
            const balance = parseFloat(balanceEl.innerText.replace(/[^0-9.-]+/g, ""));
            let level = balance >= 10000 ? "vip" : (balance >= 5000 ? "pro" : "standart");
            const icon = document.querySelector(".---react-features-Usermenu-styles-module__infoLevels--ePf8T use");
            if (icon) icon.setAttribute("xlink:href", `/profile/images/spritemap.svg#icon-profile-level-${level}`);
        }
    };

    // 6. FAST EXECUTION LOOP
    setInterval(() => {
        updateUI();
        if (document.querySelector(".---react-features-Sidepanel-LeaderBoard-styles-module__items--LTZTE")) {
            TradesCalc();
        }
    }, 200);

    // Dropdown ID/Email Inversion
    document.addEventListener('click', (e) => {
        if (e.target.closest(".---react-features-Usermenu-styles-module__usermenu--rymiA")) {
            setTimeout(() => {
                const dEmail = document.querySelector(".---react-features-Usermenu-Dropdown-styles-module__block--OZX4_ div div");
                const dId = document.querySelector(".---react-features-Usermenu-Dropdown-styles-module__block--OZX4_ span");
                if (dEmail) dEmail.innerText = email;
                if (dId) dId.innerText = `ID: ${id}`;
            }, 50);
        }
    });

    updateUI();
    console.log("Ahmad Bhai! Daily Heavy Script Fixed for Desktop.");
})();
