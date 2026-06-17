// ─────────────────────────────────────────────────────────────────────────
// Single source of truth for the resume site AND the downloadable PDF.
// Edit here once — both the animated page and the PDF update together.
// ─────────────────────────────────────────────────────────────────────────

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type Experience = {
  org: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  points: string[];
  links?: { label: string; href: string }[];
};

export type Project = {
  name: string;
  blurb: string;
  tags: string[];
  href?: string;
};

export type SkillGroup = {
  group: string;
  items: string[];
};

export type Resume = {
  profile: {
    name: string;
    role: string;
    headline: string;
    location: string;
    about: string;
  };
  links: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    site: string;
  };
  metrics: Metric[];
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  awards: string[];
};

export const resume: Resume = {
  profile: {
    name: "Paarth Rajpal",
    role: "Computer Vision · Robotics · Edge AI",
    headline:
      "I build computer-vision and robotics systems that run in real time on edge hardware.",
    location: "San Jose, CA",
    about:
      "A computer-vision engineer focused on real-time perception. I lead vision & AI for FRC Team 254, founded Hyperform, and spend most of my time getting models to run fast and reliably on small hardware — from stereo 3D pose to on-field robot localization.",
  },

  links: {
    email: "paarth.rajpal@gmail.com",
    phone: "+1 669 282 0617",
    github: "https://github.com/paarth-r",
    linkedin: "https://www.linkedin.com/in/paarth-rajpal-9404472a5/",
    site: "https://paarth-r.vercel.app",
  },

  // Refined, understated — not a cheesy stat bar.
  metrics: [
    {
      value: 2,
      prefix: "#",
      label: "in the world — FRC Team 254, by Statbotics EPA (~3,700 teams)",
    },
    { value: 120, suffix: " fps", label: "real-time multi-camera vision pipelines" },
    { value: 1, prefix: "~", suffix: " ms", label: "perception latency on the edge" },
  ],

  experience: [
    {
      org: "Hyperform",
      role: "Founder & Lead Engineer",
      period: "2025 — Present",
      location: "San Jose, CA",
      summary:
        "Real-time multi-camera computer vision that reconstructs 3D human pose for athletic form analysis and automated coaching.",
      points: [
        "Built a synchronized multi-camera 3D pose pipeline — three ChArUco-calibrated cameras (~0.3 px RMS) at up to 120 fps with N-view triangulation and interchangeable RTMPose / ViTPose / BlazePose backends.",
        "Built a ~3,000-line form-correction engine (291 tests) — body metrics, a phase state machine, and five rule types streaming live cues over WebSocket, with exercises defined as markdown specs (no code to add one). Sole engineer across vision, hardware, custom CAD rigs, and a React Native (Expo) app on Firebase.",
      ],
    },
    {
      org: "FRC Team 254 — The Cheesy Poofs",
      role: "Vision & AI Lead",
      period: "2025 — Present",
      location: "San Jose, CA",
      summary:
        "Lead vision & AI for one of the most decorated teams in FIRST Robotics, building edge perception for a championship-level robot.",
      points: [
        "Architected a custom AOS-based perception system on an NVIDIA Jetson Orin Nano: 4 synchronized cameras at 120 fps, ~1 ms latency, delivering centimetre-precise on-field localization.",
        "Robot “Overload” finished the 2026 season 65–6–0 (91% win rate) and ranked #2 in the world by Statbotics EPA (~3,700 teams); team honors during my tenure include Excellence in Engineering and District Championship Winner.",
      ],
      links: [
        { label: "Team 254 open-source (AOS)", href: "https://github.com/Team254/aos-public" },
      ],
    },
    {
      org: "Mashgin",
      role: "Computer Vision Research Intern",
      period: "Summer 2026",
      location: "Palo Alto, CA",
      summary:
        "AI-checkout unicorn (~$1.5B). Independent research building a real-time queue-analytics vision system from store security-camera footage — “How Busy Is the Line?”",
      points: [
        "Built storePose, a real-time multi-person tracking pipeline — YOLOX detection → RTMPose 17-keypoint pose → SORT tracking with Kalman boxes and One-Euro smoothing — on real store footage via CoreML, with appearance-based re-identification for stable IDs through occlusion.",
        "Decomposed each person's time into waiting vs. serving with per-camera queue zones, and shipped a live web dashboard comparing checkout speeds across registers.",
      ],
    },
    {
      org: "Solo Tech",
      role: "Robotics & ML Intern",
      period: "2025",
      location: "Mountain View, CA",
      summary:
        "Meta-backed robotics startup. Led development of DexGrasp, a dynamic zero-shot grasping system on an open-source 6-DOF arm.",
      points: [
        "Led development of DexGrasp — dynamic zero-shot grasping on an open-source 6-DOF robotic arm, grasping novel objects with no object-specific training.",
        "Presented DexGrasp at an internal company conference.",
      ],
    },
  ],

  projects: [
    {
      name: "Hyperform 3D Pose Engine",
      blurb:
        "Stereo cameras → a calibrated 17-keypoint 3D skeleton in metric space, smoothed and rendered in real time. The technical core of Hyperform.",
      tags: ["Stereo Vision", "RTMPose / ViTPose", "Calibration", "Real-time"],
    },
    {
      name: "FRC 254 Edge Perception",
      blurb:
        "Multi-camera localization on a Jetson Orin Nano with TensorRT/CUDA — millisecond latency for a competition robot. Built on Team 254's open-source AOS.",
      tags: ["Jetson Orin", "TensorRT", "CUDA", "C++"],
      href: "https://github.com/Team254/aos-public",
    },
    {
      name: "Jarvis",
      blurb:
        "Event-driven runtime that turns a stereo camera pair into a 3D hand interface — MediaPipe tracking triangulated to metric 3D, driving cursor, pinch-click, and pointing, with a live 2D + 3D visualizer.",
      tags: ["Python", "Stereo Vision", "MediaPipe", "asyncio", "Triangulation"],
      href: "https://github.com/paarth-r/jarvis",
    },
    {
      name: "dum-e",
      blurb:
        "Smooth IK teleoperation controller for the LeRobot SO-101 arm. Eliminated jitter by tracking a commanded reference instead of noisy servo feedback (damped-least-squares IK + jerk limit). PyBullet sim rig with a synthetic depth camera for hardware-free testing; scaffolding a diffusion-policy imitation-learning pipeline on top.",
      tags: ["Python", "Pinocchio / placo", "PyBullet", "IK", "Robotics"],
      href: "https://github.com/paarth-r/Dum-E",
    },
    {
      name: "Personal Blog",
      blurb:
        "Writing on computer vision, robotics, and building things — a fast MDX site I designed and ship myself.",
      tags: ["Next.js", "MDX", "Tailwind", "Vercel"],
      href: "https://paarth-r.vercel.app",
    },
    {
      name: "…and many more",
      blurb:
        "Campus (a browser climbing game), Odin, Impostor, and a long tail of other experiments across vision, robotics, tools, and games — all on GitHub.",
      tags: ["Open source"],
      href: "https://github.com/paarth-r",
    },
  ],

  skills: [
    { group: "Languages", items: ["Python", "C++", "Java", "TypeScript", "JavaScript", "SQL"] },
    {
      group: "ML / Vision",
      items: ["PyTorch", "TensorFlow", "Keras", "mmcv", "OpenCV", "Pillow", "MediaPipe", "YOLO", "RTMPose", "ViTPose"],
    },
    {
      group: "Edge / Inference",
      items: ["TensorRT", "CUDA", "ONNX", "NVIDIA Jetson Orin Nano"],
    },
    {
      group: "Scientific Computing",
      items: ["NumPy", "Pandas", "SciPy"],
    },
    {
      group: "Build & App",
      items: ["React Native (Expo)", "Firebase", "Git", "CAD"],
    },
  ],

  awards: [
    "Excellence in Engineering Award — FRC Silicon Valley Event (2026, with Team 254)",
    "District Event Winner — Silicon Valley & Central Valley Events (2026, with Team 254)",
    "District Championship Winner & Quality Award — FIRST California (2026, with Team 254)",
    "Madtown Throwdown Champion — off-season (2025, with Team 254)",
  ],
};
