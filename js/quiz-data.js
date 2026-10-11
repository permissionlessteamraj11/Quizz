/**
 * Qubit Test Mock Exam Data Dataset
 * Contains tests for SSC CGL, Bihar Exams, General Science, and Banking PO.
 */

const QUIZ_DATA = {
  categories: [
    { id: "all", name: "All Exams", icon: "fa-layer-group" },
    { id: "ssc", name: "SSC CGL", icon: "fa-graduation-cap" },
    { id: "bihar", name: "Bihar Exams (BPSC/BSSC)", icon: "fa-building-columns" },
    { id: "science", name: "General Science", icon: "fa-flask" },
    { id: "banking", name: "Banking PO & Clerk", icon: "fa-piggy-bank" }
  ],

  tests: [
    {
      id: "ssc-cgl-tier1-01",
      categoryId: "ssc",
      title: "SSC CGL Tier-1 Grand Mock Test 2025",
      subtitle: "General Intelligence & Reasoning, Quantitative Aptitude & GS",
      totalQuestions: 10,
      timeLimitMinutes: 10, // 10 minutes total timer for 10 mock test questions
      difficulty: "Hard",
      attempts: 24500,
      avgSpeedSeconds: 42,
      peerAvgScore: 16.5,
      marksPerQuestion: 2,
      negativeMarks: 0.5,
      questions: [
        {
          id: 1,
          question: "Select the related number from the given alternatives: 12 : 144 :: 15 : ?",
          options: ["180", "225", "210", "250"],
          correctOption: 1,
          explanation: "The logic is n² (square of the number). 12² = 144, so 15² = 225."
        },
        {
          id: 2,
          question: "Who among the following was the founder of the Brahmo Samaj in 1828?",
          options: ["Swami Vivekananda", "Raja Ram Mohan Roy", "Dayananda Saraswati", "Ishwar Chandra Vidyasagar"],
          correctOption: 1,
          explanation: "Raja Ram Mohan Roy founded the Brahmo Sabha in 1828, which later became known as the Brahmo Samaj."
        },
        {
          id: 3,
          question: "If A : B = 3 : 4 and B : C = 8 : 9, then what is A : C?",
          options: ["1 : 2", "2 : 3", "3 : 2", "4 : 5"],
          correctOption: 1,
          explanation: "A/C = (A/B) × (B/C) = (3/4) × (8/9) = 24/36 = 2/3. So, A : C = 2 : 3."
        },
        {
          id: 4,
          question: "Which article of the Indian Constitution deals with the 'Right to Equality'?",
          options: ["Articles 12 to 18", "Articles 14 to 18", "Articles 19 to 22", "Articles 23 to 24"],
          correctOption: 1,
          explanation: "Articles 14 to 18 of the Constitution of India deal with the Right to Equality."
        },
        {
          id: 5,
          question: "A train running at 72 km/h crosses a pole in 15 seconds. What is the length of the train?",
          options: ["200 m", "250 m", "300 m", "350 m"],
          correctOption: 2,
          explanation: "Speed in m/s = 72 × (5/18) = 20 m/s. Length of train = Speed × Time = 20 × 15 = 300 meters."
        },
        {
          id: 6,
          question: "Find the odd word out from the given choices.",
          options: ["Copper", "Iron", "Brass", "Zinc"],
          correctOption: 2,
          explanation: "Brass is an alloy (copper + zinc), whereas Copper, Iron, and Zinc are pure elemental metals."
        },
        {
          id: 7,
          question: "Which gland in the human body is also known as the 'Master Gland'?",
          options: ["Thyroid Gland", "Adrenal Gland", "Pituitary Gland", "Pancreas"],
          correctOption: 2,
          explanation: "The Pituitary Gland is known as the Master Gland because it controls the functions of many other endocrine glands."
        },
        {
          id: 8,
          question: "The simple interest on a sum of money at 8% per annum for 3 years is ₹2,400. Find the principal sum.",
          options: ["₹8,000", "₹10,000", "₹12,000", "₹15,000"],
          correctOption: 1,
          explanation: "SI = (P × R × T) / 100 => 2400 = (P × 8 × 3) / 100 => 2400 = 24P / 100 => P = ₹10,000."
        },
        {
          id: 9,
          question: "Which enzyme is present in human saliva that breaks down starch into simple sugars?",
          options: ["Pepsin", "Trypsin", "Salivary Amylase (Ptyalin)", "Lipase"],
          correctOption: 2,
          explanation: "Salivary Amylase (also called Ptyalin) breaks down complex carbohydrates (starch) into simpler sugars in the mouth."
        },
        {
          id: 10,
          question: "Select the synonym of 'METICULOUS'.",
          options: ["Careless", "Painstaking / Careful", "Hasty", "Sloppy"],
          correctOption: 1,
          explanation: "'Meticulous' means showing great attention to detail; very careful and precise."
        }
      ]
    },

    {
      id: "bihar-bpsc-bssc-01",
      categoryId: "bihar",
      title: "Bihar Special (BPSC / BSSC) Combined Practice Test",
      subtitle: "Bihar History, Geography, Polity & General Awareness",
      totalQuestions: 10,
      timeLimitMinutes: 8,
      difficulty: "Medium",
      attempts: 18200,
      avgSpeedSeconds: 38,
      peerAvgScore: 15.0,
      marksPerQuestion: 2,
      negativeMarks: 0.5,
      questions: [
        {
          id: 1,
          question: "Where was the 1st Buddhist Council held under the patronage of King Ajatashatru?",
          options: ["Vaishali", "Rajgriha (Rajgir)", "Pataliputra", "Kundalvana"],
          correctOption: 1,
          explanation: "The First Buddhist Council was held at Saptaparni Cave in Rajgriha (Rajgir) around 483 BCE."
        },
        {
          id: 2,
          question: "Which river is popularly known as the 'Sorrow of Bihar' due to frequent flooding?",
          options: ["Gandak River", "Kosi River", "Bagmati River", "Son River"],
          correctOption: 1,
          explanation: "The Kosi River is known as the 'Sorrow of Bihar' because of its erratic course changes and severe annual flooding."
        },
        {
          id: 3,
          question: "Who led the 1857 Revolt in Bihar from Jagdishpur (Bhojpur district)?",
          options: ["Kunwar Singh", "Birsa Munda", "Pirat Ali", "Maulvi Ahmadullah"],
          correctOption: 0,
          explanation: "Veer Kunwar Singh, the landlord of Jagdishpur, led the Indian Rebellion of 1857 in Bihar at the age of nearly 80."
        },
        {
          id: 4,
          question: "Mahatma Gandhi launched his first Satyagraha in India at which place in Bihar in 1917?",
          options: ["Patna", "Gaya", "Champaran", "Muzaffarpur"],
          correctOption: 2,
          explanation: "Champaran Satyagraha in 1917 was Gandhi's first Satyagraha movement against the Tinkathia system imposed on indigo farmers."
        },
        {
          id: 5,
          question: "Barabar Hill Caves, the oldest surviving rock-cut caves in India, are located in which district of Bihar?",
          options: ["Gaya (Jehanabad)", "Nalanda", "Rohtas", "Bhagalpur"],
          correctOption: 0,
          explanation: "The Barabar Hill Caves are located in the Jehanabad district (near Gaya), Bihar, dating back to the Maurya Empire period."
        },
        {
          id: 6,
          question: "Which ancient university in Bihar was founded by Emperor Kumaragupta I in the 5th century CE?",
          options: ["Vikramashila University", "Nalanda University", "Odantapuri University", "Taxila University"],
          correctOption: 1,
          explanation: "Nalanda University was established by the Gupta ruler Kumaragupta I in the 5th century CE."
        },
        {
          id: 7,
          question: "What is the official state animal of Bihar?",
          options: ["Gaur (Mithun / Ox)", "One-horned Rhino", "Royal Bengal Tiger", "Elephant"],
          correctOption: 0,
          explanation: "The Gaur (Ox) is recognized as the state animal of Bihar."
        },
        {
          id: 8,
          question: "Valmiki National Park, the only national park in Bihar, is situated in which district?",
          options: ["East Champaran", "West Champaran", "Kaimur", "Purnia"],
          correctOption: 1,
          explanation: "Valmiki National Park and Tiger Reserve is located in the West Champaran district of Bihar."
        },
        {
          id: 9,
          question: "Who was the first Chief Minister of Bihar state?",
          options: ["Anugrah Narayan Sinha", "Sri Krishna Singh", "Jayaprakash Narayan", "Karpoori Thakur"],
          correctOption: 1,
          explanation: "Dr. Sri Krishna Sinha (known as Bihar Kesari) was the first Chief Minister of Bihar."
        },
        {
          id: 10,
          question: "The Kakolat Waterfall, a famous tourist destination, is located in which district of Bihar?",
          options: ["Nawada", "Nalanda", "Munger", "Banka"],
          correctOption: 0,
          explanation: "Kakolat Waterfall is situated in the Nawada district of Bihar."
        }
      ]
    },

    {
      id: "science-speed-01",
      categoryId: "science",
      title: "General Science & Tech Speed Quiz",
      subtitle: "Physics, Chemistry, Biology & Space Technology Basics",
      totalQuestions: 10,
      timeLimitMinutes: 6,
      difficulty: "Medium",
      attempts: 31000,
      avgSpeedSeconds: 28,
      peerAvgScore: 17.0,
      marksPerQuestion: 2,
      negativeMarks: 0.5,
      questions: [
        {
          id: 1,
          question: "What is the SI unit of Electric Power?",
          options: ["Joule", "Watt", "Volt", "Ampere"],
          correctOption: 1,
          explanation: "The SI unit of electric power is the Watt (W), equal to 1 Joule per second."
        },
        {
          id: 2,
          question: "Which gas is commonly known as 'Laughing Gas'?",
          options: ["Nitric Oxide (NO)", "Nitrous Oxide (N₂O)", "Nitrogen Dioxide (NO₂)", "Methane (CH₄)"],
          correctOption: 1,
          explanation: "Nitrous Oxide (N₂O) is known as laughing gas due to its euphoric anesthetic effects."
        },
        {
          id: 3,
          question: "Which cell organelle is known as the 'Powerhouse of the Cell'?",
          options: ["Ribosome", "Nucleus", "Mitochondria", "Golgi Apparatus"],
          correctOption: 2,
          explanation: "Mitochondria generate most of the cell's ATP supply, earning the nickname 'Powerhouse of the Cell'."
        },
        {
          id: 4,
          question: "What is the chemical formula of Washing Soda?",
          options: ["NaHCO₃", "Na₂CO₃·10H₂O", "NaOH", "CaOCl₂"],
          correctOption: 1,
          explanation: "Washing Soda is Sodium Carbonate Decahydrate (Na₂CO₃·10H₂O). NaHCO₃ is baking soda."
        },
        {
          id: 5,
          question: "Which light wavelength has the highest frequency in the visible spectrum?",
          options: ["Red", "Green", "Yellow", "Violet"],
          correctOption: 3,
          explanation: "Violet light has the shortest wavelength and highest frequency in the visible spectrum."
        },
        {
          id: 6,
          question: "Which element is present in liquid state at room temperature?",
          options: ["Mercury (Hg)", "Bromine (Br₂)", "Gallium (Ga)", "Both A and B"],
          correctOption: 3,
          explanation: "Mercury (metal) and Bromine (non-metal) are both liquids at standard room temperature."
        },
        {
          id: 7,
          question: "Which vitamin is synthesized in human skin when exposed to sunlight?",
          options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
          correctOption: 2,
          explanation: "Vitamin D3 (cholecalciferol) is produced in the skin upon exposure to UVB light."
        },
        {
          id: 8,
          question: "What causes sound to travel fastest through solids compared to liquids and gases?",
          options: ["Higher density and elasticity", "Low temperature", "Higher humidity", "Lower frequency"],
          correctOption: 0,
          explanation: "Solids have higher elastic modulus and closely packed molecules, enabling faster acoustic wave transmission."
        },
        {
          id: 9,
          question: "Which planet in our Solar System is known as the 'Red Planet'?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correctOption: 1,
          explanation: "Mars appears red due to the abundance of iron oxide (rust) on its surface."
        },
        {
          id: 10,
          question: "What is the escape velocity from the surface of Earth?",
          options: ["9.8 km/s", "11.2 km/s", "15.0 km/s", "25.2 km/s"],
          correctOption: 1,
          explanation: "The theoretical escape velocity required to break free from Earth's gravitational force is approximately 11.2 km/s."
        }
      ]
    },

    {
      id: "banking-po-01",
      categoryId: "banking",
      title: "SBI / IBPS PO Quantitative & Reasoning Speed Test",
      subtitle: "Data Interpretation, Number Series & Banking Awareness",
      totalQuestions: 10,
      timeLimitMinutes: 10,
      difficulty: "Hard",
      attempts: 15400,
      avgSpeedSeconds: 48,
      peerAvgScore: 14.2,
      marksPerQuestion: 2,
      negativeMarks: 0.5,
      questions: [
        {
          id: 1,
          question: "Find the missing term in the series: 4, 9, 25, 49, 121, ?",
          options: ["144", "169", "196", "225"],
          correctOption: 1,
          explanation: "The sequence represents squares of consecutive prime numbers: 2², 3², 5², 7², 11², so next is 13² = 169."
        },
        {
          id: 2,
          question: "What is the full form of 'NEFT' in banking system?",
          options: [
            "National Electronic Fund Transfer",
            "National Executive Finance Transaction",
            "New Electronic Financial Transfer",
            "Nominal Exchange Fund Transfer"
          ],
          correctOption: 0,
          explanation: "NEFT stands for National Electronic Funds Transfer, maintained by the Reserve Bank of India."
        },
        {
          id: 3,
          question: "Which institution is known as the 'Lender of Last Resort' in India?",
          options: ["State Bank of India (SBI)", "NABARD", "Reserve Bank of India (RBI)", "SEBI"],
          correctOption: 2,
          explanation: "RBI acts as the Lender of Last Resort to commercial banks during financial liquidity crunches."
        },
        {
          id: 4,
          question: "At what compound interest rate will ₹1,000 double itself in 2 years?",
          options: ["41.4%", "30%", "25%", "50%"],
          correctOption: 0,
          explanation: "A = P(1 + r/100)ⁿ => 2000 = 1000(1 + r/100)² => √2 = 1.414 = 1 + r/100 => r = 41.4%."
        },
        {
          id: 5,
          question: "What does 'CTS' stand for in clearing bank cheques?",
          options: ["Cheque Truncation System", "Central Transfer System", "Credit Truncation Service", "Cheque Processing Settlement"],
          correctOption: 0,
          explanation: "CTS stands for Cheque Truncation System, an image-based cheque clearing mechanism."
        },
        {
          id: 6,
          question: "If 'P × Q' means P is mother of Q and 'P + Q' means P is brother of Q, what does 'A × B + C' mean?",
          options: ["A is aunt of C", "A is mother of C", "A is sister of C", "C is mother of A"],
          correctOption: 1,
          explanation: "A × B (A is mother of B). B + C (B is brother of C). Therefore, A is the mother of C."
        },
        {
          id: 7,
          question: "What is the statutory minimum Liquidity Ratio (SLR) maintained in the form of liquid assets by commercial banks?",
          options: ["Cash, Gold or Approved Securities", "Foreign currency only", "Corporate Debt bonds", "Bitcoin"],
          correctOption: 0,
          explanation: "SLR is maintained in cash, gold, or government-approved securities before providing credit to customers."
        },
        {
          id: 8,
          question: "A, B and C enter into a partnership. A invests 3 times as much as B and B invests 2/3 of C's investment. What is the ratio of their capitals?",
          options: ["6 : 2 : 3", "3 : 2 : 1", "2 : 3 : 6", "4 : 2 : 3"],
          correctOption: 0,
          explanation: "Let C = 3 units. B = (2/3)×3 = 2 units. A = 3 × 2 = 6 units. Capital ratio A:B:C = 6 : 2 : 3."
        },
        {
          id: 9,
          question: "Where are the headquarters of the Asian Development Bank (ADB) located?",
          options: ["Geneva, Switzerland", "Mandaluyong, Manila (Philippines)", "Washington D.C., USA", "Beijing, China"],
          correctOption: 1,
          explanation: "The headquarters of ADB are located in Mandaluyong City, Metro Manila, Philippines."
        },
        {
          id: 10,
          question: "Which metric measures the speed at which a bank recovers non-performing assets (NPAs)?",
          options: ["Gross NPA Ratio", "Provision Coverage Ratio (PCR)", "Capital Adequacy Ratio", "Current Ratio"],
          correctOption: 1,
          explanation: "Provision Coverage Ratio (PCR) indicates the proportion of bad loans provided for against potential defaults."
        }
      ]
    }
  ],

  leaderboard: [
    { rank: 1, badge: "🥇", handle: "Aarav_Sharma_SSC", name: "Aarav Sharma", score: 20.0, accuracy: 100, avgSpeed: 18.4, targetExam: "SSC CGL" },
    { rank: 2, badge: "🥈", handle: "Priya_BPSC_Ace", name: "Priya Kumari", score: 20.0, accuracy: 100, avgSpeed: 21.2, targetExam: "Bihar PSC" },
    { rank: 3, badge: "🥉", handle: "Rohan_Banker24", name: "Rohan Mehta", score: 19.5, accuracy: 98, avgSpeed: 22.8, targetExam: "Banking PO" },
    { rank: 4, badge: "#4", handle: "Sneha_Verma_IAS", name: "Sneha Verma", score: 19.0, accuracy: 95, avgSpeed: 24.1, targetExam: "BPSC" },
    { rank: 5, badge: "#5", handle: "Vikram_Singh_99", name: "Vikram Singh", score: 18.5, accuracy: 94, avgSpeed: 26.5, targetExam: "SSC CGL" },
    { rank: 6, badge: "#6", handle: "Neha_Gupta_Sci", name: "Neha Gupta", score: 18.0, accuracy: 92, avgSpeed: 28.0, targetExam: "General Science" },
    { rank: 7, badge: "#7", handle: "Rajesh_Kumar_PAT", name: "Rajesh Kumar", score: 17.5, accuracy: 90, avgSpeed: 29.3, targetExam: "BSSC CGL" },
    { rank: 8, badge: "#8", handle: "Ananya_Banker_PO", name: "Ananya Roy", score: 17.0, accuracy: 88, avgSpeed: 31.0, targetExam: "IBPS PO" },
    { rank: 9, badge: "#9", handle: "Karan_Dev_SSC", name: "Karan Dev", score: 16.5, accuracy: 85, avgSpeed: 33.2, targetExam: "SSC CHSL" },
    { rank: 10, badge: "#10", handle: "Divya_BiharSpecial", name: "Divya Raj", score: 16.0, accuracy: 83, avgSpeed: 35.0, targetExam: "Bihar Police" }
  ],

  currentUserProfile: {
    handle: "User_Qubit_Student",
    name: "Aman Tripathi",
    currentRank: "#245",
    points: 1285,
    rankChange: "↑ 3 positions today",
    avgSpeed: "34s",
    overallAccuracy: 88,
    testsCompleted: 24
  }
};

if (typeof window !== "undefined") {
  window.QUIZ_DATA = QUIZ_DATA;
}
