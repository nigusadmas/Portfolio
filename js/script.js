//  <!-- Script Implementations -->

// System and User Preference Theme Syncing
const themeToggleBtn = document.getElementById("theme-toggle");

if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
  document.documentElement.classList.remove("light");
} else {
  document.documentElement.classList.add("light");
  document.documentElement.classList.remove("dark");
}

themeToggleBtn.addEventListener("click", function () {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    localStorage.setItem("color-theme", "light");
  } else {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
  }
});

// Sticky Navbar Scroll Handler
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  const scrollPercent =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  const progressLine = document.getElementById("scroll-progress");
  if (progressLine) progressLine.style.width = scrollPercent + "%";

  if (window.scrollY > 50) {
    navbar.classList.add("glass-panel", "shadow-lg");
    navbar.classList.remove("border-transparent");
    navbar.classList.add("border-slate-800/10");
  } else {
    navbar.classList.remove("glass-panel", "shadow-lg");
    navbar.classList.remove("border-slate-800/10");
    navbar.classList.add("border-transparent");
  }
});

// Mobile Burger Navigation Toggle Controller
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  mobileMenu.classList.toggle("flex");
});

document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
  });
});

// Simple Typing Simulation loop
const words = [
  "Full-Stack Web Developer",
  "Data Scientist",
  "System Architect",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.getElementById("typing-text");

function type() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = 100;
  if (isDeleting) typeSpeed /= 2;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 1500; // Pause at full word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500; // Pause before writing next word
  }

  setTimeout(type, typeSpeed);
}

// Skill dataset logic
const skillSet = [
  {
    name: "JavaScript (ES6+)",
    value: 90,
    category: "frontend",
    icon: "code-2",
  },
  { name: "React / Vite", value: 85, category: "frontend", icon: "atom" },
  {
    name: "Tailwind CSS",
    value: 95,
    category: "frontend",
    icon: "palette",
  },
  {
    name: "HTML5 / CSS3",
    value: 90,
    category: "frontend",
    icon: "file-code",
  },
  { name: "Python", value: 85, category: "backend", icon: "terminal" },
  { name: "Django", value: 75, category: "backend", icon: "layers" },
  {
    name: "Node.js & Express",
    value: 80,
    category: "backend",
    icon: "server",
  },
  {
    name: "PostgreSQL / MySQL / SQLite",
    value: 80,
    category: "backend",
    icon: "database",
  },
  {
    name: "Pandas & Numpy",
    value: 85,
    category: "data",
    icon: "bar-chart-3",
  },
  {
    name: "Matplotlib & Seaborn",
    value: 80,
    category: "data",
    icon: "pie-chart",
  },
  { name: "Scikit-Learn NLP", value: 75, category: "data", icon: "cpu" },
  {
    name: "Git & GitHub Workflow",
    value: 90,
    category: "tools",
    icon: "git-branch",
  },
];

const skillGrid = document.getElementById("skills-grid");

// Render updated skills grid matching image_0a0a9b.png exactly
function renderSkills(filterCategory = "all") {
  skillGrid.innerHTML = "";
  const filteredSkills =
    filterCategory === "all"
      ? skillSet
      : skillSet.filter((s) => s.category === filterCategory);

  filteredSkills.forEach((skill) => {
    const card = document.createElement("div");
    // Recreates precisely the glowing border, bg-dark blue, rounded structure in screenshot image_0a0a9b.png
    card.className =
      "p-6 rounded-2xl bg-[#070c22]/90 border border-[#141b3a] hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-32";
    card.innerHTML = `
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3.5">
                <!-- Glowing Cyan Icon container matching layout -->
                <div class="w-11 h-11 bg-blue-950/40 border border-blue-500/20 rounded-xl flex items-center justify-center text-cyan-400 shadow-inner shadow-cyan-950/50">
                  <i data-lucide="${skill.icon || "terminal"}" class="w-5 h-5"></i>
                </div>
                <span class="font-bold text-sm sm:text-base text-white tracking-wide">${skill.name}</span>
              </div>
              <span class="text-xs sm:text-sm font-semibold text-slate-400">${skill.value}%</span>
            </div>
            <!-- High contrast cyan gradient progress bar track -->
            <div class="w-full bg-[#121833] h-2 rounded-full overflow-hidden">
              <div class="bg-gradient-to-r from-blue-600 to-cyan-400 h-full rounded-full progress-fill" style="--progress-width: ${skill.value}%; width: ${skill.value}%"></div>
            </div>
          `;
    skillGrid.appendChild(card);
  });
  lucide.createIcons();
}

// Tab button interactions for Skill filtering
document.querySelectorAll(".skill-tab-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    document
      .querySelectorAll(".skill-tab-btn")
      .forEach((btn) =>
        btn.classList.remove("active", "bg-primary", "text-white"),
      );
    document
      .querySelectorAll(".skill-tab-btn")
      .forEach((btn) => btn.classList.add("bg-slate-900", "text-slate-400"));

    button.classList.add("active", "bg-primary", "text-white");
    button.classList.remove("bg-slate-900", "text-slate-400");

    renderSkills(button.dataset.filter);
  });
});

// Complex Work Datastore with pristine screenshot designs
const projectCollection = [
  {
    id: "netflix",
    category: "web",
    categoryLabel: "Web App",
    title: "Netflix Website Platform",
    desc: "A responsive Netflix clone UI built with modern technologies. Features include movie browsing, trending, and a beautiful UI experience.",
    tags: [
      {
        name: "HTML",
        color: "bg-red-500/10 text-red-400 border-red-500/20",
      },
      {
        name: "CSS",
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      },
      {
        name: "JavaScript",
        color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      },
      {
        name: "React",
        color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      },
      {
        name: "Node",
        color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      },
    ],
    github: "https://github.com",
    live: "https://github.com/nigusadmas/Netflix-Clone-Project/",
    mockup: `
            <div class="absolute inset-0 bg-black flex flex-col justify-between p-4 font-sans select-none">
              <!-- Top Header Bar -->
              <div class="flex items-center justify-between w-full">
                <span class="text-red-600 font-extrabold tracking-widest text-base sm:text-lg">NETFLIX</span>
                <div class="flex items-center gap-2">
                  <span class="text-[8px] text-white border border-slate-700 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    English <span class="text-[6px]">▼</span>
                  </span>
                  <span class="text-[8px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold">Sign In</span>
                </div>
              </div>
              <!-- Hero CTA Center Block -->
              <div class="my-auto text-center max-w-xs mx-auto">
                <h4 class="text-white text-xs sm:text-sm font-extrabold leading-tight tracking-tight">Unlimited movies, TV shows, and more.</h4>
                <p class="text-[8px] text-slate-300 mt-1">Watch anywhere. Cancel anytime.</p>
                <div class="mt-2.5 inline-block bg-red-600 text-[8px] font-bold text-white px-3 py-1 rounded-sm cursor-pointer hover:bg-red-700">Get Started &gt;</div>
              </div>
              <!-- Simulated video buffer line indicator -->
              <div class="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                <div class="bg-red-600 h-full w-[45%]"></div>
              </div>
            </div>
          `,
  },
  {
    id: "amazon",
    category: "web",
    categoryLabel: "Web Application",

    title: "Amazon Clone",

    desc: "A fully responsive Amazon-inspired e-commerce platform featuring user authentication, product search, shopping cart, secure checkout, order management, and a modern user interface that closely replicates the Amazon shopping experience.",

    tags: [
      {
        name: "HTML",
        color: "bg-red-500/10 text-red-400 border-red-500/20",
      },
      {
        name: "CSS",
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      },
      {
        name: "React",
        color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      },
      {
        name: "Node.js",
        color: "bg-green-500/10 text-green-400 border-green-500/20",
      },

      {
        name: "MySQL",
        color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      },
    ],
    github: "https://github.com",
    live: "https://github.com/nigusadmas/Amazon-clone-project",
    mockup: `
<div class="absolute inset-0 bg-[#eaeded] rounded-xl overflow-hidden font-sans">

  <!-- Amazon Top Navbar -->
  <div class="bg-[#131921] h-10 flex items-center px-3 justify-between">

    <div class="flex items-center gap-1">
      <span class="text-yellow-400 font-black text-sm">amazon</span>
      <span class="text-white text-[6px]">.com</span>
    </div>

    <div class="flex-1 mx-3">
      <div class="bg-white rounded flex items-center overflow-hidden h-5">

        <span class="px-2 text-[6px] bg-gray-100 h-full flex items-center">
          All
        </span>

        <div class="flex-1 px-2 text-[6px] text-gray-400">
          Search products...
        </div>

        <div class="bg-[#febd69] w-6 h-full flex items-center justify-center text-[8px]">
          🔍
        </div>

      </div>
    </div>

    <div class="flex items-center gap-3 text-white text-[6px]">

      <div>
        Hello, Sign in
      </div>

      <div>
        Returns
      </div>

      <div class="font-bold">
        🛒
      </div>

    </div>

  </div>

  <!-- Yellow Menu -->
  <div class="bg-[#232f3e] h-6 flex items-center gap-3 px-3 text-white text-[6px]">

    <span>All</span>
    <span>Today's Deals</span>
    <span>Customer Service</span>
    <span>Registry</span>
    <span>Prime</span>

  </div>

  <!-- Main Content -->
  <div class="p-3 grid grid-cols-2 gap-3">

    <!-- Product Card -->
    <div class="bg-white rounded-lg p-2 shadow">

      <div class="h-14 bg-gray-100 rounded flex items-center justify-center">

        <svg class="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L3 7v10l9 5 9-5V7z"/>
        </svg>

      </div>

      <div class="mt-2">

        <div class="text-[7px] font-bold leading-tight">
          AI Product Review Analyzer
        </div>

        <div class="text-[6px] text-gray-500 mt-1">
          Analyze thousands of Amazon reviews using NLP.
        </div>

        <div class="flex items-center gap-1 mt-2">

          <span class="text-yellow-500 text-[7px]">
            ★★★★★
          </span>

          <span class="text-[6px] text-gray-500">
            4.9
          </span>

        </div>

        <div class="mt-2 flex items-end gap-1">

          <span class="text-[8px] font-bold">
            $29.99
          </span>

          <span class="text-[6px] line-through text-gray-400">
            $39.99
          </span>

        </div>

        <button class="mt-2 bg-[#ffd814] hover:bg-[#f7ca00] rounded-full w-full h-5 text-[6px] font-bold">
          Add to Cart
        </button>

      </div>

    </div>

    <!-- AI Dashboard -->
    <div class="bg-white rounded-lg p-2 shadow flex flex-col">

      <div class="flex items-center justify-between">

        <div class="text-[7px] font-bold">
          Sentiment Analysis
        </div>

        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

      </div>

      <div class="flex justify-center my-2">

        <div class="w-10 h-10 rounded-full border-[5px] border-green-500 border-t-yellow-400 border-r-red-500 flex items-center justify-center">

          <span class="text-[5px] font-bold">
            92%
          </span>

        </div>

      </div>

      <div class="space-y-1 text-[6px]">

        <div class="flex justify-between">
          <span>Positive</span>
          <span class="text-green-600 font-bold">
            72%
          </span>
        </div>

        <div class="flex justify-between">
          <span>Neutral</span>
          <span class="text-yellow-600 font-bold">
            18%
          </span>
        </div>

        <div class="flex justify-between">
          <span>Negative</span>
          <span class="text-red-600 font-bold">
            10%
          </span>
        </div>

      </div>

      <div class="mt-auto">

        <div class="bg-gray-100 rounded p-2 mt-2">

          <div class="text-[6px] font-semibold">
            Latest Review
          </div>

          <div class="text-[5px] text-gray-600 mt-1 italic">
            "Excellent quality, fast delivery and amazing customer support."
          </div>

          <div class="mt-1 text-green-600 text-[6px] font-bold">
            Positive
          </div>

        </div>

      </div>

    </div>

  </div>

</div>
`,
  },
  {
    id: "apple",
    category: "web",
    categoryLabel: "Web Design",
    title: "Apple Page Design",
    desc: "A sleek and responsive Apple product page design inspired by Apple's official website with smooth animations and modern UI.",
    tags: [
      {
        name: "HTML",
        color: "bg-red-500/10 text-red-400 border-red-500/20",
      },
      {
        name: "CSS",
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      },
      {
        name: "JavaScript",
        color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      },
      {
        name: "React",
        color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      },
      {
        name: "Node.js",
        color: "bg-green-500/10 text-green-400 border-green-500/20",
      },
    ],
    github: "https://github.com",
    live: "https://github.com/nigusadmas/Apple-Page-Clone",
    mockup: `
            <div class="absolute inset-0 bg-black flex flex-col justify-between p-3.5 text-left select-none">
              <!-- Top Navbar Header Strip -->
              <div class="flex items-center justify-between text-neutral-400 text-[8px] border-b border-neutral-900 pb-1.5">
                <i data-lucide="apple" class="w-3 h-3 text-white"></i>
                <div class="flex gap-2 text-[6.5px]"><span>Store</span><span>Mac</span><span>iPad</span><span>iPhone</span><span>Watch</span></div>
                <i data-lucide="search" class="w-2.5 h-2.5"></i>
              </div>
              <!-- Content Grid Layout -->
              <div class="grid grid-cols-12 gap-3 items-center my-auto">
                <div class="col-span-7 space-y-1">
                  <h4 class="text-white text-sm font-bold font-display leading-none">iPhone 15 Pro</h4>
                  <p class="text-[7.5px] text-neutral-400 leading-tight">Titanium. So strong. So light. So Pro.</p>
                  <div class="flex gap-1.5 pt-1">
                    <span class="text-[6.5px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-semibold">Learn more</span>
                    <span class="text-[6.5px] border border-neutral-600 text-neutral-300 px-2 py-0.5 rounded-full">Buy</span>
                  </div>
                </div>
                <!-- SVG Smartphone Vector illustration mockup -->
                <div class="col-span-5 flex justify-center">
                  <svg class="w-12 h-20" viewBox="0 0 100 160">
                    <rect x="10" y="5" width="80" height="150" rx="14" fill="#1e1e1e" stroke="#3a3a3c" stroke-width="3" />
                    <!-- Island Notch -->
                    <rect x="35" y="10" width="30" height="6" rx="3" fill="#000" />
                    <!-- Camera Ring schema outline -->
                    <circle cx="50" cy="80" r="16" fill="none" stroke="#2c2c2e" stroke-width="2" />
                    <circle cx="50" cy="80" r="10" fill="#2c2c2e" />
                    <circle cx="50" cy="80" r="5" fill="#1c1c1e" />
                  </svg>
                </div>
              </div>
              <div class="text-[7px] text-neutral-500 text-center">From $999 or $41.62/mo. for 24 mo.</div>
            </div>
          `,
  },
  {
    id: "movie",
    category: "data",
    categoryLabel: "Data Analysis",
    title: "Movie Analysis",
    desc: "Exploratory data analysis of movies dataset to uncover trends, patterns, and insights using visualizations.",
    tags: [
      {
        name: "Python",
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      },
      {
        name: "Pandas",
        color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      },
      {
        name: "Matplotlib",
        color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      },
      {
        name: "Seaborn",
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      },
    ],
    github: "https://github.com",
    live: "https://github.com/nigusadmas/AAU-DataScience_-_AI-Enginner-Projects/blob/main/AAU%20Training%20Project%20Directory/Phase-3-Data-Story%20Telling/Assignment/Niguse-Movie-Analysis-Part-2.ipynb",
    mockup: `
            <div class="absolute inset-0 bg-[#0c0f1d] flex flex-col justify-between p-3.5 text-left font-sans select-none">
              <div class="flex items-center justify-between border-b border-slate-800/60 pb-1.5">
                <span class="text-[9px] font-bold text-slate-300 font-display">Movie Analysis Dashboard</span>
                <span class="text-[7.5px] text-emerald-400 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live</span>
              </div>
              <div class="grid grid-cols-12 gap-2 my-auto items-center">
                <!-- KPI Indicators sidebar -->
                <div class="col-span-4 space-y-1">
                  <div class="bg-[#14192f] p-1 rounded border border-slate-800">
                    <div class="text-[5.5px] text-slate-500">Total Movies</div>
                    <div class="text-[9px] font-black text-white">5,332</div>
                  </div>
                  <div class="bg-[#14192f] p-1 rounded border border-slate-800">
                    <div class="text-[5.5px] text-slate-500">Avg Rating</div>
                    <div class="text-[9px] font-black text-white">7.25</div>
                  </div>
                  <div class="bg-[#14192f] p-1 rounded border border-slate-800">
                    <div class="text-[5.5px] text-slate-500">Total Revenue</div>
                    <div class="text-[9px] font-black text-white">$2.45B</div>
                  </div>
                </div>
                <!-- Glowing central bar graph widget -->
                <div class="col-span-5 bg-[#14192f] p-1.5 rounded border border-slate-800 h-16 flex items-end justify-between gap-1">
                  <div class="bg-primary/25 w-2 h-[40%] rounded-t-sm"></div>
                  <div class="bg-primary/50 w-2 h-[60%] rounded-t-sm"></div>
                  <div class="bg-primary/80 w-2 h-[85%] rounded-t-sm"></div>
                  <div class="bg-accent/70 w-2 h-[50%] rounded-t-sm"></div>
                  <div class="bg-accent/90 w-2 h-[95%] rounded-t-sm"></div>
                </div>
                <!-- Dynamic breakdown pie chart -->
                <div class="col-span-3 flex justify-center">
                  <div class="w-10 h-10 rounded-full border-[6px] border-indigo-500 border-l-cyan-400 border-b-emerald-400"></div>
                </div>
              </div>
              <div class="text-[6px] text-slate-500 flex justify-between leading-none pt-1">
                <span>Database: IMDb v2.8</span>
                <span>Active Query Matrix</span>
              </div>
            </div>
          `,
  },
  {
    id: "expense",
    category: "web",
    categoryLabel: "Web App",
    title: "Expense Tracker App",
    desc: "A full-stack expense tracker to manage income, expenses, and visualize spending habits.",
    tags: [
      {
        name: "HTML",
        color: "bg-red-500/10 text-red-400 border-red-500/20",
      },
      {
        name: "CSS",
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      },
      {
        name: "JavaScript",
        color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      },

      {
        name: "SQLite",
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      },
    ],
    github: "https://github.com",
    live: "https://github.com/nigusadmas/Selam-College-File/tree/master/phase-2-javascript/JS-DOM-MANIPULATION/Project-1/Expense-Tracker-App",
    mockup: `
            <div class="absolute inset-0 bg-[#f8fafc] flex flex-col justify-between p-3.5 text-left font-sans text-slate-800 select-none">
              <!-- Header Strip -->
              <div class="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <span class="text-[9px] font-black text-slate-900 flex items-center gap-1">
                  <span class="w-2 h-2 rounded bg-emerald-500"></span> Expense Tracker
                </span>
                <span class="text-[7px] text-slate-500">Personal Account</span>
              </div>
              
              <div class="grid grid-cols-12 gap-2 my-auto items-center">
                <!-- Balance trackers -->
                <div class="col-span-4 space-y-1">
                  <div class="bg-white p-1 rounded shadow-sm border border-slate-100">
                    <span class="text-[5px] text-slate-400 block font-bold">TOTAL BALANCE</span>
                    <span class="text-[8px] font-black text-slate-800">$2,450.00</span>
                  </div>
                  <div class="bg-white p-1 rounded shadow-sm border border-slate-100">
                    <span class="text-[5px] text-slate-400 block font-bold">TOTAL INCOME</span>
                    <span class="text-[8px] font-black text-emerald-600">$3,200.00</span>
                  </div>
                </div>
                
                <!-- Circular category allocation chart -->
                <div class="col-span-5 bg-white p-1.5 rounded shadow-sm border border-slate-100 h-16 flex items-center justify-center">
                  <div class="w-10 h-10 rounded-full border-[8px] border-emerald-500 border-t-indigo-500 border-r-amber-500 relative flex items-center justify-center">
                    <span class="absolute text-[5px] text-slate-500 font-bold">$750</span>
                  </div>
                </div>

                <!-- Expense log list rows -->
                <div class="col-span-3 space-y-0.5 text-[5px] font-medium">
                  <div class="bg-emerald-50 border border-emerald-100 p-0.5 rounded flex justify-between">
                    <span>Income</span><span class="text-emerald-600">+$3.2k</span>
                  </div>
                  <div class="bg-rose-50 border border-rose-100 p-0.5 rounded flex justify-between">
                    <span>Food</span><span class="text-rose-600">-$120</span>
                  </div>
                  <div class="bg-rose-50 border border-rose-100 p-0.5 rounded flex justify-between">
                    <span>Rent</span><span class="text-rose-600">-$630</span>
                  </div>
                </div>
              </div>
              <div class="text-[6px] text-slate-400 flex justify-between border-t border-slate-200 pt-1">
                <span>Active Budget Goal: 85% saved</span>
                <span class="text-emerald-600 font-bold">Sync Secured</span>
              </div>
            </div>
          `,
  },
  {
    id: "analytics",
    category: "dash",
    categoryLabel: "Dashboard",
    title: "Analytics Dashboard",
    desc: "A modern analytics dashboard with charts, KPIs, and interactive data visualizations.",
    tags: [
      {
        name: "Python",
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      },
      {
        name: "Pandas",
        color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      },
      {
        name: "Matplotlib",
        color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      },
      {
        name: "Pyplot",
        color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      },
      {
        name: "Dash",
        color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      },
    ],
    github: "https://github.com",
    live: "https://github.com/nigusadmas/AAU-DataScience_-_AI-Enginner-Projects/blob/main/AAU%20Training%20Project%20Directory/Phase-3-Data-Story%20Telling/DashBoard-Project-Matplotlib.ipynb",
    mockup: `
            <div class="absolute inset-0 bg-slate-950 flex flex-col justify-between p-3.5 text-left font-sans text-slate-300 select-none">
              <div class="flex items-center justify-between border-b border-slate-900 pb-1.5">
                <span class="text-[9px] font-bold text-white font-display">System Operations Center</span>
                <i data-lucide="activity" class="w-3 h-3 text-cyan-400 animate-pulse"></i>
              </div>
              <div class="grid grid-cols-4 gap-1.5 my-auto">
                <div class="bg-[#0f172a]/90 p-1 rounded border border-slate-900 text-center">
                  <span class="text-[5px] text-slate-500 block">REVENUE</span>
                  <span class="text-[7px] font-black text-white">$24,780</span>
                </div>
                <div class="bg-[#0f172a]/90 p-1 rounded border border-slate-900 text-center">
                  <span class="text-[5px] text-slate-500 block">USERS</span>
                  <span class="text-[7px] font-black text-cyan-400">5,432</span>
                </div>
                <div class="bg-[#0f172a]/90 p-1 rounded border border-slate-900 text-center">
                  <span class="text-[5px] text-slate-500 block">ORDERS</span>
                  <span class="text-[7px] font-black text-white">1,245</span>
                </div>
                <div class="bg-[#0f172a]/90 p-1 rounded border border-slate-900 text-center">
                  <span class="text-[5px] text-slate-500 block">CONV. RATE</span>
                  <span class="text-[7px] font-black text-emerald-400">3.24%</span>
                </div>
              </div>
              <!-- Vector curves mockup -->
              <div class="h-14 bg-[#0a0f1d] rounded border border-slate-900 p-1 relative flex items-end">
                <svg class="w-full h-full absolute inset-0" viewBox="0 0 100 40">
                  <path d="M0,35 Q15,20 30,28 T60,10 T90,15 L100,5" fill="none" stroke="#06b6d4" stroke-width="1.5" />
                  <path d="M0,35 Q15,20 30,28 T60,10 T90,15 L100,5 L100,40 L0,40 Z" fill="url(#grad)" opacity="0.15" />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#06b6d4" />
                      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div class="w-full flex justify-between text-[5px] text-slate-600 z-10 p-0.5">
                  <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span>
                </div>
              </div>
            </div>
          `,
  },
];

function renderProjects(filterCategory = "all") {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";

  let filtered = projectCollection;
  if (filterCategory === "web") {
    filtered = projectCollection.filter((p) => p.category === "web");
  } else if (filterCategory === "data") {
    // Strictly display items with the "data" category (excluding Amazon which is categorized as "AI / NLP" but belongs to the web category)
    filtered = projectCollection.filter((p) => p.category === "data");
  } else if (filterCategory === "dash") {
    filtered = projectCollection.filter((p) => p.category === "dash");
  }

  filtered.forEach((proj) => {
    const card = document.createElement("div");
    card.className =
      "group rounded-3xl overflow-hidden glass-panel border border-slate-800/80 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between h-[480px] shadow-lg shadow-black/10 hover:shadow-primary/5";

    let tagsHtml = proj.tags
      .map(
        (tag) => `
            <span class="px-2.5 py-1 text-[10px] font-semibold rounded-lg border flex items-center gap-1 ${tag.color}">
              <span class="w-1 h-1 rounded-full bg-current"></span>${tag.name}
            </span>
          `,
      )
      .join("");

    card.innerHTML = `
            <div>
              <!-- Visual Mockup Container -->
              <div class="relative h-48 w-full bg-slate-900/40 border-b border-slate-800 overflow-hidden">
                ${proj.mockup}
                <div class="absolute inset-0 bg-slate-950/25 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
              </div>

              <!-- Info Panel -->
              <div class="p-6 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] uppercase tracking-wider font-extrabold text-accent bg-accent/10 py-1 px-2.5 rounded-md">
                    ${proj.categoryLabel}
                  </span>
                  <button 
                    onclick="openProjectModal('${proj.id}')"
                    class="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-primary/50 duration-200 cursor-pointer"
                    aria-label="View Project Details"
                  >
                    <i data-lucide="expand" class="w-4 h-4"></i>
                  </button>
                </div>
                <h3 class="text-xl font-bold font-display text-white group-hover:text-primary transition-colors duration-200">
                  ${proj.title}
                </h3>
                <p class="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  ${proj.desc}
                </p>
              </div>
            </div>

            <!-- Footer / Tech Stack & CTAs -->
            <div class="p-6 pt-0 border-t border-slate-900/40 mt-auto">
              <div class="flex flex-wrap gap-1.5 mb-4">
                ${tagsHtml}
              </div>
              <div class="flex gap-2">
                <a 
                  href="${proj.live}" 
                  target="_blank" 
                  class="flex-1 text-center py-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
                >
                  Demo <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                </a>
              </div>
            </div>
          `;
    grid.appendChild(card);
  });
  lucide.createIcons();
}

// Initialize project filtering tab events
document.querySelectorAll(".project-tab-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.querySelectorAll(".project-tab-btn").forEach((b) => {
      b.classList.remove(
        "bg-primary",
        "text-white",
        "shadow-lg",
        "shadow-primary/20",
      );
      b.classList.add("bg-slate-900/60", "text-slate-400");
    });
    e.target.classList.remove("bg-slate-900/60", "text-slate-400");
    e.target.classList.add(
      "bg-primary",
      "text-white",
      "shadow-lg",
      "shadow-primary/20",
    );
    renderProjects(e.target.dataset.projectFilter);
  });
});

// Immersive Project Modal functions
function openProjectModal(projectId) {
  const proj = projectCollection.find((p) => p.id === projectId);
  if (!proj) return;

  document.getElementById("modal-title").textContent = proj.title;
  document.getElementById("modal-desc").textContent = proj.desc;
  document.getElementById("modal-category").textContent = proj.categoryLabel;
  document.getElementById("modal-github").setAttribute("href", proj.github);
  document.getElementById("modal-live").setAttribute("href", proj.live);

  // Populate Mock graphic inside the Modal Header
  const mockContainer = document.getElementById("modal-mock-container");
  mockContainer.innerHTML = proj.mockup;

  // Populate tags list
  const tagsContainer = document.getElementById("modal-tags");
  tagsContainer.innerHTML = proj.tags
    .map(
      (tag) => `
          <span class="px-3 py-1.5 text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 rounded-lg">
            ${tag.name}
          </span>
        `,
    )
    .join("");

  const modal = document.getElementById("project-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  lucide.createIcons();
}

// Modal Close trigger
document.getElementById("modal-close-btn").addEventListener("click", () => {
  const modal = document.getElementById("project-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

// Outside modal click listener
document.getElementById("project-modal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("project-modal")) {
    const modal = document.getElementById("project-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
});

/**
 * Generates and downloads a custom formatted Resume document on the fly
 * representing Nigus Admas's professional engineering credentials.
 */
window.downloadResume = function () {
  const resumeUrl = "assets/Resume/resume.pdf";

  const link = document.createElement("a");
  link.href = resumeUrl;
  link.download = "Resume.pdf";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Success message
  const responseBox = document.getElementById("form-response");
  if (responseBox) {
    responseBox.classList.remove("hidden", "bg-red-900/40", "text-red-300");

    responseBox.classList.add(
      "block",
      "bg-green-950/50",
      "text-green-300",
      "border",
      "border-green-800/40",
    );

    responseBox.textContent = "Your resume download has started successfully!";

    setTimeout(() => {
      responseBox.classList.add("hidden");
    }, 5000);
  }
};

// Live premium contact form simulation

// Initialize EmailJS
emailjs.init({
  publicKey: "t9I50VVohfF-FfK91",
});

// Contact Form
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("form-submit-btn");
  const responseBox = document.getElementById("form-response");

  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <span>Sending...</span>
    <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
  `;

  lucide.createIcons();

  const templateParams = {
    name: document.getElementById("form-name").value,
    email: document.getElementById("form-email").value,
    title: document.getElementById("form-subject").value,
    message: document.getElementById("form-message").value,
  };

  emailjs
    .send("service_vsr9usk", "template_omo0nkj", templateParams)
    .then(function () {
      responseBox.className =
        "mt-4 p-4 rounded-xl text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20";

      responseBox.textContent =
        "✅ Thank you! Your message has been sent successfully.";

      responseBox.classList.remove("hidden");

      contactForm.reset();
    })
    .catch(function (error) {
      console.error("EmailJS Error:", error);

      responseBox.className =
        "mt-4 p-4 rounded-xl text-sm font-semibold bg-red-500/15 text-red-400 border border-red-500/20";

      responseBox.textContent =
        "❌ Failed to send the message. Please try again.";

      responseBox.classList.remove("hidden");
    })
    .finally(function () {
      submitBtn.disabled = false;

      submitBtn.innerHTML = `
        <span>Send Message</span>
        <i data-lucide="send" class="w-4 h-4"></i>
      `;

      lucide.createIcons();
    });
});

// App Entry point
window.onload = function () {
  renderSkills("all");
  renderProjects("all");
  type();
};

// App Entry point init
window.onload = function () {
  renderSkills("all");
  renderProjects("all");
  type();
};
