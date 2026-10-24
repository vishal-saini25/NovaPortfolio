/* EDIT PORTFOLIO CONTENT HERE. This file contains the current active portfolio data. */
const DEFAULT_PORTFOLIO_DATA = {
      profile: {
        name: "Nova",
        role: "AI/ML Developer & Software Engineer",
        eyebrow: "AI / MACHINE LEARNING / SOFTWARE",
        statement: "I build software and explore machine learning to solve meaningful real-world problems.",
        supporting: "Focused on Python, machine learning pipelines, data-driven systems, and turning mathematical concepts into clean, reliable software.",
        motto: "Building · Learning · Experimenting",
        bioParagraphs: [
          "I'm Nova, a developer building my foundation in software engineering and artificial intelligence. I enjoy understanding how systems work under the hood, experimenting with data and models, and translating technical concepts into practical applications.",
          "I'm particularly interested in machine learning, Python-based development, and projects that connect strong mathematical foundations with real-world usefulness.",
          "My goal is to keep learning through building, testing ideas, studying the fundamentals, and documenting what I discover along the way."
        ],
        focus: "Python engineering, classical ML pipelines, and deep learning with PyTorch",
        interests: "Artificial Intelligence, Machine Learning, Data Systems, Algorithms",
        location: "Open to collaborations & internships (Editable)"
      },
      socials: {
        email: "nova.dev@example.com",
        github: "https://github.com/nova-ml",
        linkedin: "https://linkedin.com/in/nova-dev"
      },
      projects: [
        {
          id: "proj-tabular-ml-pipeline",
          featured: true,
          title: "Tabular ML Pipeline & Cross-Validation Harness",
          category: "AI / ML",
          status: "v1.2 · Blueprint",
          summary: "Modular Python & Scikit-learn workflow for leak-free feature engineering, stratified cross-validation, and automated diagnostic plots.",
          stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
          problem: "Preventing data leakage and inconsistent feature scaling across training and validation folds.",
          approach: "Encapsulated custom transformers inside Scikit-learn Pipelines with out-of-fold metric logging.",
          githubUrl: "https://github.com/nova-ml/tabular-ml-harness",
          demoUrl: ""
        },
        {
          id: "proj-pytorch-training-lab",
          featured: false,
          title: "PyTorch Autograd & Custom Training Loop Lab",
          category: "AI / ML",
          status: "Research · Blueprint",
          summary: "Clean PyTorch implementations exploring tensor operations, custom Dataset loaders, cosine annealing schedules, and gradient norm tracking.",
          stack: ["Python", "PyTorch", "NumPy", "Matplotlib"],
          problem: "High-level wrappers often obscure vanishing gradients and layer-wise activation dynamics.",
          approach: "Built explicit epoch loops with forward hooks to log activation distributions and loss landscapes.",
          githubUrl: "https://github.com/nova-ml/pytorch-training-lab",
          demoUrl: ""
        },
        {
          id: "proj-eda-visualization-toolkit",
          featured: false,
          title: "Automated EDA & Statistical Diagnostics Toolkit",
          category: "Data Science",
          status: "Utility · Blueprint",
          summary: "Reusable Python toolkit built on Pandas and Matplotlib for rapid dataset profiling, missingness analysis, and correlation diagnostics.",
          stack: ["Python", "Pandas", "NumPy", "Matplotlib"],
          problem: "Repetitive boilerplate plotting code slows down initial exploratory data analysis.",
          approach: "Designed composable profiling functions with a unified dark-mode Matplotlib style sheet.",
          githubUrl: "https://github.com/nova-ml/eda-diagnostics",
          demoUrl: ""
        },
        {
          id: "proj-systems-algorithms-cpp",
          featured: false,
          title: "High-Performance Data Structures & Matrix Ops in C++",
          category: "Software Development",
          status: "Systems · Blueprint",
          summary: "From-scratch implementations of cache-friendly matrix multiplication, priority queues, and graph algorithms in modern C++.",
          stack: ["C++", "C", "Python", "NumPy"],
          problem: "Understanding vectorized numerical libraries requires mastering contiguous memory layouts and pointers.",
          approach: "Implemented contiguous arena allocators and benchmarked against NumPy baselines.",
          githubUrl: "https://github.com/nova-ml/cpp-matrix-core",
          demoUrl: ""
        },
        {
          id: "proj-classical-ml-from-scratch",
          featured: false,
          title: "Core ML Estimators from Scratch in Pure NumPy",
          category: "Experiments",
          status: "Study · Blueprint",
          summary: "Vectorized NumPy implementations of Linear/Logistic Regression, PCA, and Decision Trees verified against Scikit-learn.",
          stack: ["Python", "NumPy", "Scikit-learn", "Matplotlib"],
          problem: "Bridging mathematical derivations with numerically stable, loop-free array code.",
          approach: "Replaced explicit loops with NumPy broadcasting and SVD/eigenvalue decompositions.",
          githubUrl: "https://github.com/nova-ml/numpy-ml-scratch",
          demoUrl: ""
        }
      ],
      experience: [
        {
          id: "exp-1",
          type: "Independent Projects",
          role: "AI/ML & Python Systems Builder",
          organization: "Self-Directed Engineering Portfolio",
          dates: "2025 — Present",
          location: "Remote",
          description: "Designing end-to-end machine learning workflows, exploratory data analysis toolkits, and neural network training experiments in Python.",
          technologies: ["Python", "PyTorch", "Scikit-learn", "Pandas", "NumPy"]
        },
        {
          id: "exp-2",
          type: "Technical Learning Milestones",
          role: "Machine Learning & Statistical Foundations",
          organization: "Algorithmic Implementation & Study",
          dates: "2024 — Present",
          location: "Independent",
          description: "Implementing core estimators from scratch in NumPy and studying cross-validation design, regularization, and optimization dynamics.",
          technologies: ["Python", "NumPy", "Scikit-learn", "Matplotlib"]
        },
        {
          id: "exp-3",
          type: "Research & Exploration",
          role: "Systems Programming & Data Structures",
          organization: "Computer Science Fundamentals",
          dates: "2023 — 2024",
          location: "Academic / Self-Paced",
          description: "Built a strong programming foundation in C, C++, and SQL focusing on memory management, algorithmic complexity, and clean modular code.",
          technologies: ["C++", "C", "SQL", "Python"]
        }
      ],
      blogs: [
        {
          id: "blog-draft-1",
          title: "Vectorizing Gradient Descent in Pure NumPy",
          summary: "Translating multivariable calculus equations into fast, loop-free NumPy array broadcasting with loss contour visualizations.",
          dateLabel: "Note #01 · Draft",
          readingTime: "6 min read",
          topics: ["NumPy", "Optimization"]
        },
        {
          id: "blog-draft-2",
          title: "Preventing Data Leakage in Cross-Validation Pipelines",
          summary: "Why fitting scalers or imputers outside fold splits silently inflates validation scores, and how Pipeline objects solve it.",
          dateLabel: "Note #02 · Draft",
          readingTime: "5 min read",
          topics: ["Scikit-learn", "Best Practices"]
        },
        {
          id: "blog-draft-3",
          title: "Inside PyTorch Autograd & Computational Graphs",
          summary: "Understanding how dynamic computation graphs track tensor operations, why zero_grad() matters, and inspecting gradient flow.",
          dateLabel: "Note #03 · Draft",
          readingTime: "7 min read",
          topics: ["PyTorch", "Deep Learning"]
        }
      ]
    };
