// ==========================================
// Saket — Interview Journey
// ==========================================

var D = [

    ["p1-01","NICE","Software Engineer","Aptitude","Rejected","Assessment",0,"2021-11-05",0,"",0],
    ["p1-02","Blazeclan","Software Engineer","Coding Assessment","Rejected","Assessment",0,"2021-11-15",0,"",0],
    ["p1-03","Oracle","Associate Consultant","Technical Interview","Rejected","Interview",0,"2021-11-25",0,"",0],
    ["p1-04","Infosys","Software Engineer","Aptitude","Not Cleared","Assessment",0,"2021-12-01",0,"",1],
    ["p1-05","IBM","Software Engineer","Coding Assessment","Not Cleared","Assessment",0,"2021-12-08",0,"",0],
    ["p1-06","Coditas","Software Engineer","Aptitude","Rejected","Assessment",0,"2021-12-12",0,"",0],
    ["p1-07","Mini Orange","Software Engineer","Technical Round","Rejected","Interview",0,"2021-12-18",0,"Described as the most favorable position.",0],
    ["p1-08","Cognizant","Base+/++","Technical Round (2 rounds)","Rejected","Interview",0,"2021-12-22",0,"",1],
    ["p1-09","Harman","Associate Engineer","Communication Assessment","Rejected","Assessment",0,"2022-02-05",0,"",1],
    ["p1-10","Cognologix","Software Engineer","Aptitude","Not Cleared","Assessment",0,"2022-01-10",0,"",0],
    ["p1-11","Rudder Analytics","Associate Analyst","Test","Not Cleared","Assessment",0,"2022-01-15",0,"",1],
    ["p1-12","Persistent","Software Engineer","Aptitude","Not Cleared","Assessment",0,"2022-01-20",0,"",1],
    ["p1-13","Saama Technologies","Software Engineer","Aptitude","Not Cleared","Assessment",0,"2022-02-10",0,"Missed due to my lazyness while giving aptitude",1],
    ["p1-14","Tata Elxsi","Software Engineer","Recruitment","No Response","Other",0,"2022-01-25",0,"",1],
    ["p1-15","Sokratis","Software Engineer","Aptitude","Not Cleared","Assessment",0,"2022-03-05",0,"",0],
    ["p1-16","Sankey Solutions","Software Engineer","Aptitude","Not Cleared","Assessment",0,"2022-03-15",0,"",0],
    ["p1-17","Accenture","Software Engineer","Interview (5 out of 6 Rounds Cleared)","Interrupted","Interview",0,"2022-04-05",0,"Network disconnection lost the opportunity.",1],
    ["p1-18","Wipro","Project Engineer","Off-campus Recruitment","Selected","Offer",1,"2022-04-20",0,"",1],

    ["p2-01","TechMainstay / TMBill","Junior Full Stack Developer","Recruitment Process","Entered","Opportunity",0,"2023-02-05",0,"",0],
    ["p2-02","LeadToRev","Frontend Developer (ReactJS)","Recruitment Process","Entered","Opportunity",0,"2023-03-01",0,"",0],
    ["p2-03","Tech Mahindra","Java Full Stack / Testing","Selection Process","Entered","Opportunity",0,"2023-03-20",0,"",0],
    ["p2-04","AIT Global","Java / Python / Data Science / MEAN / MERN","Selection Process","Entered","Opportunity",0,"2023-04-15",0,"",0],
    ["p2-05","Accion Labs","Developer (Java preferred)","Interview Process","Entered","Opportunity",0,"2023-05-10",0,"",0],
    ["p2-06","Codemines Solutions","App Support / Jr. Developer","Interview Process","Entered","Opportunity",0,"2023-06-05",0,"",0],
    ["p2-07","OMFYS Technologies","Trainee → Jr. Software Engineer","Screening → Technical → HR","Selected / Joined","Offer",1,"2023-07-25",0,"Chatbot / Oracle Digital Assistant role; 6-month training period.",1],

    ["cal-3","Care Compose","Full-stack Developer","Interview","Selected","Interview",1,"2025-11-21",30,"",1],
    ["cal-4","Accenure","LLM Operations Engineer","Interview","Selected/Joined","Interview",1,"2025-12-18",60,"",1],
    ["cal-5","NICE","Prof. Services Engineer (Chatbot)","Interview","Attended","Interview",0,"2026-01-29",60,"",1],
    ["cal-7","NICE","Software Engineer (AI)","Interview","Attended","Interview",0,"2026-02-26",60,"",1]

];


// ==========================================
// STATUS COLOR
// Color is based on OUTCOME / STATUS
// ==========================================

function getStatusColor(status) {

    var s = status.toLowerCase();

    if (
        s.includes("selected") ||
        s.includes("joined") ||
        s.includes("offer")
    ) {
        return "var(--gr)";
    }

    if (
        s.includes("rejected") ||
        s.includes("not cleared")
    ) {
        return "var(--rd)";
    }

    if (
        s.includes("attended") ||
        s.includes("entered")
    ) {
        return "var(--ac)";
    }

    if (s.includes("interrupted")) {
        return "#ffb454";
    }

    return "var(--mu)";
}


// ==========================================
// DATE FORMATTING
// ==========================================

function fmt(date, exact) {

    if (!date) {
        return "Date not recorded";
    }

    var formatted =
        new Date(date + "T00:00:00Z")
            .toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    timeZone: "UTC"
                }
            );

    return exact
        ? formatted
        : "~" + formatted;
}


// ==========================================
// STATUS CLASS
// ==========================================

function statusClass(status) {

    var s = status.toLowerCase();

    if (
        s.includes("selected") ||
        s.includes("joined") ||
        s.includes("offer")
    ) {
        return "sel";
    }

    if (
        s.includes("rejected") ||
        s.includes("not cleared")
    ) {
        return "rej";
    }

    if (
        s.includes("attended") ||
        s.includes("entered")
    ) {
        return "att";
    }

    if (s.includes("interrupted")) {
        return "int";
    }

    return "";
}


// ==========================================
// STAT CARD
// ==========================================

function stat(value, label, className) {

    return `
        <div class="st ${className || ""}">
            <b>${value}</b>
            <span>${label}</span>
        </div>
    `;

}


// ==========================================
// TOP STATISTICS
//
// ONLY THREE STATS:
// 1. Interviews Attended = D.length
// 2. Selections = selected / joined
// 3. Success Rate = selections / total
// ==========================================

function renderStats() {

    // ------------------------------------------
    // 1. INTERVIEWS ATTENDED
    // Every record is counted.
    // ------------------------------------------

    var interviewsAttended =
        D.length;


    // ------------------------------------------
    // 2. SELECTIONS
    //
    // Any status containing "selected"
    // or "joined" counts as a success.
    // ------------------------------------------

    var selections =
        D.filter(function (r) {

            var status =
                r[4].toLowerCase();

            return (
                status.includes("selected") ||
                status.includes("joined")
            );

        }).length;


    // ------------------------------------------
    // 3. SUCCESS RATE
    // ------------------------------------------

    var successRate =
        interviewsAttended > 0
            ? (
                selections /
                interviewsAttended *
                100
            ).toFixed(1)
            : "0.0";


    // ------------------------------------------
    // Main heading
    // ------------------------------------------

    document
        .getElementById("hEv")
        .textContent =
        interviewsAttended;


    // ------------------------------------------
    // Render ONLY three cards
    // ------------------------------------------

    document
        .getElementById("stats")
        .innerHTML =

        stat(
            interviewsAttended,
            "interviews attended"
        )

        +

        stat(
            selections,
            "selections",
            "g"
        )

        +

        stat(
            successRate + "%",
            "success rate",
            "a"
        );

}


// ==========================================
// DYNAMIC RECORD COUNT
// ==========================================

function renderRecordCount() {

    var count =
        D.length;


    document
        .getElementById("tlCount")
        .textContent =
        count +
        " raw records · data-driven";


    document
        .getElementById("recordFooter")
        .textContent =
        count +
        " raw records · data-driven";

}


// ==========================================
// TIMELINE
// ==========================================

function renderTimeline() {

    var datedEvents =
        D
            .filter(function (r) {
                return r[7];
            })
            .sort(function (a, b) {
                return a[7].localeCompare(b[7]);
            });


    var timeline =
        document.getElementById("tl");


    // Clear existing timeline
    timeline.innerHTML =
        '<div class="baseline"></div>';


    // Dynamic timeline width
    timeline.style.minWidth =
        Math.max(
            900,
            datedEvents.length * 74
        ) + "px";


    datedEvents.forEach(function (r, index) {

        var node =
            document.createElement("div");


        node.className =
            "tnode " +
            (
                index % 2 === 0
                    ? "up"
                    : "down"
            ) +
            (
                r[6]
                    ? " final"
                    : ""
            );


        var label =
            document.createElement("div");

        label.className =
            "tlabel";


        var company =
            document.createElement("span");

        company.className =
            "co2";

        company.textContent =
            r[1];


        var date =
            document.createElement("span");

        date.className =
            "dt2";


        var month =
            new Date(r[7] + "T00:00:00Z")
                .toLocaleDateString(
                    "en-GB",
                    {
                        month: "short",
                        year: "2-digit",
                        timeZone: "UTC"
                    }
                );


        date.textContent =
            month +
            (
                r[10]
                    ? ""
                    : " ~"
            ) +
            (
                r[6]
                    ? " · final"
                    : ""
            );


        label.append(
            company,
            date
        );


        var dot =
            document.createElement("div");


        dot.className =
            "tdot";


        // Dot color follows STATUS
        dot.style.background =
            getStatusColor(r[4]);


        node.append(
            label,
            dot
        );


        timeline.appendChild(node);

    });

}


// ==========================================
// RECORD LIST
// ==========================================

function renderRows() {

    var query =
        document
            .getElementById("q")
            .value
            .trim()
            .toLowerCase();


    var filter =
        document
            .getElementById("f")
            .value;


    var records =
        D.filter(function (r) {

            var matchesFilter =
                filter === "All" ||
                r[5] === filter;


            var text =
                (
                    r[1] +
                    " " +
                    r[2] +
                    " " +
                    r[3] +
                    " " +
                    r[4]
                )
                    .toLowerCase();


            var matchesSearch =
                !query ||
                text.includes(query);


            return (
                matchesFilter &&
                matchesSearch
            );

        });


    records.sort(function (a, b) {

        return (
            a[7] || ""
        ).localeCompare(
            b[7] || ""
        );

    });


    var container =
        document.getElementById("rows");


    container.innerHTML =
        "";


    if (!records.length) {

        container.innerHTML =
            `
                <div
                    class="small"
                    style="padding:14px 2px"
                >
                    No matches.
                </div>
            `;

        return;

    }


    records.forEach(function (r) {

        var row =
            document.createElement("div");


        row.className =
            "row";


        var dot =
            document.createElement("span");


        dot.className =
            "dot";


        // Dot color follows STATUS
        dot.style.background =
            getStatusColor(r[4]);


        var main =
            document.createElement("div");


        main.className =
            "rm";


        var company =
            document.createElement("div");


        company.className =
            "co";

        company.textContent =
            r[1];


        var role =
            document.createElement("div");


        role.className =
            "rl";

        role.textContent =
            r[2] +
            " · " +
            r[3];


        main.append(
            company,
            role
        );


        if (r[9]) {

            var note =
                document.createElement("div");


            note.className =
                "no";


            note.textContent =
                r[9];


            main.append(
                note
            );

        }


        var meta =
            document.createElement("div");


        meta.className =
            "mt";


        var status =
            document.createElement("span");


        status.className =
            "stx " +
            statusClass(r[4]);


        status.textContent =
            r[4];


        var date =
            document.createElement("span");


        date.textContent =
            fmt(
                r[7],
                r[10]
            );


        meta.append(
            status,
            date
        );


        if (r[8]) {

            var duration =
                document.createElement("span");


            duration.textContent =
                r[8] + "m";


            meta.append(
                duration
            );

        }


        row.append(
            dot,
            main,
            meta
        );


        container.appendChild(
            row
        );

    });

}


// ==========================================
// SEARCH
// ==========================================

document
    .getElementById("q")
    .addEventListener(
        "input",
        renderRows
    );


// ==========================================
// FILTER
// ==========================================

document
    .getElementById("f")
    .addEventListener(
        "change",
        renderRows
    );


// ==========================================
// INITIAL RENDER
// ==========================================

renderStats();

renderRecordCount();

renderTimeline();

renderRows();