//    <!-- Active Navigation and Theme Script Setup -->

// System and User Preference Theme Syncing
const themeToggleBtn = document.getElementById("theme-toggle");

// Load initial state or system configuration
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
  document.getElementById("scroll-progress").style.width = scrollPercent + "%";

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

// Advanced Typing Animation Effect Core
const strings = [
  "Full-Stack Developer",
  "React 19 Engineer",
  "Python Data Scientist",
  "AI Architect",
];
let stringIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenStrings = 2000;
const typingTarget = document.getElementById("typing-text");

function typeLoop() {
  const currentString = strings[stringIndex];
  if (isDeleting) {
    typingTarget.textContent = currentString.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingTarget.textContent = currentString.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentString.length) {
    isDeleting = true;
    setTimeout(typeLoop, delayBetweenStrings);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    stringIndex = (stringIndex + 1) % strings.length;
    setTimeout(typeLoop, 500);
  } else {
    setTimeout(typeLoop, isDeleting ? deletingSpeed : typingSpeed);
  }
}
typeLoop();

// Skill dataset logic
const skillSet = [
  { name: "React 19 / JSX", value: 95, category: "frontend" },
  { name: "TypeScript", value: 90, category: "frontend" },
  { name: "Tailwind CSS", value: 95, category: "frontend" },
  { name: "NodeJS / Express", value: 85, category: "backend" },
  { name: "Python / Core Engine", value: 92, category: "data" },
  { name: "Pandas & NumPy", value: 88, category: "data" },
  { name: "Machine Learning (Scikit)", value: 80, category: "data" },
  { name: "SQL & Database Schema", value: 85, category: "backend" },
  { name: "Git & CI Pipelines", value: 85, category: "tools" },
];

const skillGrid = document.getElementById("skills-grid");

function renderSkills(filterCategory = "all") {
  skillGrid.innerHTML = "";
  const filteredSkills =
    filterCategory === "all"
      ? skillSet
      : skillSet.filter((s) => s.category === filterCategory);

  filteredSkills.forEach((skill) => {
    const card = document.createElement("div");
    card.className =
      "p-6 rounded-2xl glass-panel space-y-3 hover:border-primary/20 transition-all duration-300";
    card.innerHTML = `
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-bold text-white">${skill.name}</span>
                        <span class="text-xs font-semibold text-accent">${skill.value}%</span>
                    </div>
                    <div class="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                        <div class="progress-fill bg-gradient-to-r from-primary to-accent h-full rounded-full" style="--progress-width: ${skill.value}%; width: ${skill.value}%"></div>
                    </div>
                `;
    skillGrid.appendChild(card);
  });
}
renderSkills();

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

// Complex Work Datastore and Projects Filtering engine
const projectCollection = [
  {
    id: "p1",
    title: "Premium E-Commerce Platform",
    desc: "An enterprise-grade headless application using React 19, tailwind interfaces, custom search indexing, and deep responsive design structures.",
    category: "web",
    tech: ["React 19", "Tailwind CSS", "Local API Integrations"],
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com",
    live: "https://github.com",
  },
  {
    id: "p2",
    title: "Statistical Python Visual Platform",
    desc: "An analytical dashboard processing real-time system metrics using Pandas. Visualizing data with high-fidelity custom SVG gauges and graphs.",
    category: "dash",
    tech: ["Python", "Pandas", "Dash UI"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com",
    live: "https://github.com",
  },
  {
    id: "p3",
    title: "AI NLP Sentiment Integrator",
    desc: "Predictive sentiment classification server parsing large volumes of social logs. Generates classification metrics via lightweight machine learning.",
    category: "data",
    tech: ["Python", "Scikit-Learn", "FastAPI"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    github: "https://github.com",
    live: "https://github.com",
  },
];

const projectsGrid = document.getElementById("projects-grid");

function renderProjects(filter = "all") {
  projectsGrid.innerHTML = "";
  const list =
    filter === "all"
      ? projectCollection
      : projectCollection.filter((p) => p.category === filter);

  list.forEach((project) => {
    const card = document.createElement("div");
    card.className =
      "group rounded-2xl overflow-hidden glass-panel hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between";
    card.innerHTML = `
                    <div class="relative h-48 bg-slate-900 overflow-hidden">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 duration-300">
                        <span class="absolute top-4 left-4 px-3 py-1 bg-darkBg/95 backdrop-blur-md rounded-full text-xs font-semibold text-accent uppercase tracking-wider">${project.category}</span>
                    </div>
                    <div class="p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="text-lg font-bold text-white mb-2 group-hover:text-primary duration-150">${project.title}</h3>
                            <p class="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">${project.desc}</p>
                        </div>
                        <div>
                            <div class="flex flex-wrap gap-1.5 mb-5">
                                ${project.tech.map((t) => `<span class="px-2 py-0.5 bg-slate-900 rounded text-[10px] text-slate-300 font-semibold">${t}</span>`).join("")}
                            </div>
                            <div class="flex gap-3 pt-3 border-t border-slate-900">
                                <button class="flex-1 text-center py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer" onclick="openProjectModal('${project.id}')">Details</button>
                                <a href="${project.live}" target="_blank" class="flex-1 text-center py-2 bg-gradient-to-r from-primary to-accent hover:opacity-95 rounded-xl text-xs font-bold text-white transition-opacity flex items-center justify-center gap-1">Live <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i></a>
                            </div>
                        </div>
                    </div>
                `;
    projectsGrid.appendChild(card);
  });
  // Update icons for any newly injected content dynamically
  lucide.createIcons();
}
renderProjects();

// Project filter tabs logic
document.querySelectorAll(".project-tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".project-tab-btn")
      .forEach((b) => b.classList.remove("active", "bg-primary", "text-white"));
    document
      .querySelectorAll(".project-tab-btn")
      .forEach((b) => b.classList.add("bg-slate-900", "text-slate-400"));

    btn.classList.add("active", "bg-primary", "text-white");
    btn.classList.remove("bg-slate-900", "text-slate-400");

    renderProjects(btn.dataset.projectFilter);
  });
});

// Detail Modal Engine Controllers
const projectModal = document.getElementById("project-modal");

window.openProjectModal = function (id) {
  const project = projectCollection.find((p) => p.id === id);
  if (!project) return;

  document.getElementById("modal-img").src = project.image;
  document.getElementById("modal-category").textContent = project.category;
  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-desc").textContent = project.desc;
  document.getElementById("modal-github").href = project.github;
  document.getElementById("modal-live").href = project.live;

  const tagsBox = document.getElementById("modal-tags");
  tagsBox.innerHTML = "";
  project.tech.forEach((t) => {
    const tag = document.createElement("span");
    tag.className =
      "px-3 py-1 bg-slate-900 rounded-lg text-xs font-bold text-slate-300";
    tag.textContent = t;
    tagsBox.appendChild(tag);
  });

  projectModal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
  lucide.createIcons();
};

function closeModal() {
  projectModal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

document
  .getElementById("modal-close-btn")
  .addEventListener("click", closeModal);
projectModal.addEventListener("click", (e) => {
  if (e.target === projectModal) closeModal();
});

// Production-quality Form Action Validation & Toast notifications mockup
const contactForm = document.getElementById("contact-form");
const formResponse = document.getElementById("form-response");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("form-submit-btn");
  const originalContent = submitBtn.innerHTML;

  // UI state loading animation trigger
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending Message...</span>
            `;

  // Mocked API integration flow matching target production latency
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalContent;

    // Show Success Message Box
    formResponse.classList.remove("hidden", "bg-red-900/40", "text-red-300");
    formResponse.classList.add(
      "block",
      "bg-green-950/50",
      "text-green-300",
      "border",
      "border-green-800/40",
    );
    formResponse.textContent =
      "Thank you! Your message was sent successfully. Nigus will reach back shortly.";

    // Form reset
    contactForm.reset();

    setTimeout(() => {
      formResponse.classList.add("hidden");
    }, 7000);
  }, 1800);
});

// Auto-initialize Icons
lucide.createIcons();

/**
 * Generates and downloads a custom formatted Resume document on the fly
 * representing Nigus Admase's professional engineering credentials.
 */
window.downloadResume = function () {
  const resumeContent = `================================================================
NIGUS ADMASE - SENIOR FULL-STACK DEVELOPER & AI ARCHITECT
================================================================
Email: nigus.admase@gmail.com | Location: Addis Ababa, Ethiopia
Portfolio: Live Web-based Production Stack

----------------------------------------------------------------
PROFESSIONAL PROFILE
----------------------------------------------------------------
Experienced Full-Stack Developer specializing in React 19 UI systems,
TypeScript optimization, Python deep analytics, and ML model design.
Dedicated to delivering robust, elegant visual platforms and analytical code.

----------------------------------------------------------------
CORE SKILLS
----------------------------------------------------------------
* Frontend: React 19, TypeScript, Tailwind CSS, ES6+, Bootstrap
* Backend & Databases: NodeJS, Express, SQL Schema, PostgreSQL, FastAPI
* Python & AI: Pandas, NumPy, Scikit-Learn, TensorFlow, Dash
* Tools: Git, CI/CD, AWS Deployment, Figma Architectures

----------------------------------------------------------------
CAREER SUMMARY
----------------------------------------------------------------
* Senior Full Stack Architect | Enterprise Tech (2024 - Present)
  - Spearheading React modular architecture workflows.
  - Designing visual performance tracks to boost Lighthouse scores to 95+.
  
* Lead Python & Frontend Specialist | Global Solution Labs (2022 - 2023)
  - Constructed ML classification programs and analytical dashboards.
  - Synthesized structured dataset processing utilizing Pandas/NumPy pipelines.

----------------------------------------------------------------
EDUCATION & CREDENTIALS
----------------------------------------------------------------
* B.Sc. in Computer Science & Engineering - Addis Ababa University
* Meta Advanced State Architectures (Professional Credential)
* DeepLearning.AI Machine Learning Specialization

================================================================
Generated and verified via Nigus Admase Digital Portfolio Workspace.
================================================================`;

  const blob = new Blob([resumeContent], {
    type: "text/plain;charset=utf-8",
  });
  const downloadUrl = URL.createObjectURL(blob);
  const hiddenAnchor = document.createElement("a");

  hiddenAnchor.href = downloadUrl;
  hiddenAnchor.download = "Nigus_Admase_Resume.txt";
  document.body.appendChild(hiddenAnchor);
  hiddenAnchor.click();

  // Clean up resources immediately
  document.body.removeChild(hiddenAnchor);
  URL.revokeObjectURL(downloadUrl);

  // Display positive toast feedback to user using existing response pipeline
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
    responseBox.textContent =
      "Your download of 'Nigus_Admase_Resume.txt' was successfully initialized!";
    window.scrollTo({
      top: document.getElementById("contact").offsetTop - 100,
      behavior: "smooth",
    });
    setTimeout(() => {
      responseBox.classList.add("hidden");
    }, 6000);
  }
};
