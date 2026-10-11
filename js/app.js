/**
 * Qubit Test Platform Application Engine
 * Handles view routing, quiz state management, countdown timer, question palette,
 * scorecard calculation, and leaderboard interactivity.
 */

class QubitApp {
  constructor() {
    this.currentView = 'home';
    this.selectedCategory = 'all';
    this.activeTest = null;
    this.currentQuestionIndex = 0;
    this.userAnswers = {}; // { questionId: selectedOptionIndex }
    this.markedForReview = new Set(); // Set of questionIds
    this.timerInterval = null;
    this.timeRemainingSeconds = 0;
    this.totalTimerSeconds = 0;
    this.quizStartTime = null;

    this.init();
  }

  init() {
    this.renderCategoryTabs();
    this.renderTestCards();
    this.renderLeaderboardPreview();
    this.renderFullLeaderboard();
    this.renderPodiumCards();
    this.setupEventListeners();
  }

  /* ================= NAVIGATION ROUTER ================= */
  navigateTo(viewId) {
    this.currentView = viewId;

    // Hide all view sections
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));

    // Reset navbar button styles
    document.querySelectorAll('nav button').forEach(btn => {
      btn.classList.remove('text-azure-400', 'bg-slate-800/60', 'border', 'border-azure-500/30');
      btn.classList.add('text-slate-300');
    });

    // Highlight active nav button if present
    const activeNavBtn = document.getElementById(`nav-${viewId}`);
    if (activeNavBtn) {
      activeNavBtn.classList.remove('text-slate-300');
      activeNavBtn.classList.add('text-azure-400', 'bg-slate-800/60', 'border', 'border-azure-500/30');
    }

    // Show selected view section
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
      targetView.classList.remove('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
  }

  /* ================= CATEGORY & TEST CARDS RENDER ================= */
  renderCategoryTabs() {
    const container = document.getElementById('category-tabs');
    const mockContainer = document.getElementById('mock-page-category-tabs');
    if (!container) return;

    const html = QUIZ_DATA.categories.map(cat => {
      const isActive = cat.id === this.selectedCategory;
      const activeClasses = isActive
        ? 'bg-azure-600 text-white shadow-lg shadow-azure-600/30 border-azure-400 font-bold'
        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white font-medium';

      return `
        <button onclick="app.setCategory('${cat.id}')" class="px-4 py-2.5 rounded-xl border text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${activeClasses}">
          <i class="fa-solid ${cat.icon}"></i> ${cat.name}
        </button>
      `;
    }).join('');

    container.innerHTML = html;
    if (mockContainer) mockContainer.innerHTML = html;
  }

  setCategory(catId) {
    this.selectedCategory = catId;
    this.renderCategoryTabs();
    this.renderTestCards();
  }

  renderTestCards() {
    const grid = document.getElementById('tests-grid');
    const mockGrid = document.getElementById('mock-page-tests-grid');

    const filteredTests = this.selectedCategory === 'all'
      ? QUIZ_DATA.tests
      : QUIZ_DATA.tests.filter(t => t.categoryId === this.selectedCategory);

    const cardsHtml = filteredTests.map(test => {
      const categoryObj = QUIZ_DATA.categories.find(c => c.id === test.categoryId);
      const categoryName = categoryObj ? categoryObj.name : 'Competitive Exam';

      return `
        <div class="glass-panel p-6 rounded-2xl border border-slate-800 glass-card-hover flex flex-col justify-between space-y-5 relative group">

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="px-2.5 py-1 rounded bg-azure-500/15 text-azure-400 border border-azure-500/30 text-[11px] font-extrabold uppercase">
                ${categoryName}
              </span>
              <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px] font-semibold">
                ${test.difficulty}
              </span>
            </div>

            <h3 class="text-lg font-bold text-white group-hover:text-azure-400 transition-colors">
              ${test.title}
            </h3>

            <p class="text-xs text-slate-400 line-clamp-2">
              ${test.subtitle}
            </p>

            <div class="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-300 font-medium">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-circle-question text-azure-400"></i>
                <span>${test.totalQuestions} Questions</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-clock text-gold-400"></i>
                <span>${test.timeLimitMinutes} Minutes</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-user-group text-purple-400"></i>
                <span>${(test.attempts / 1000).toFixed(1)}k Taken</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-bolt text-amber-400"></i>
                <span>Avg ${test.avgSpeedSeconds}s/qn</span>
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
            <div class="text-[11px] text-slate-400">
              Pattern: <span class="text-slate-200 font-semibold">+${test.marksPerQuestion} / -${test.negativeMarks}</span>
            </div>
            <button onclick="app.launchQuiz('${test.id}')" class="px-4 py-2.5 rounded-xl font-bold text-white gradient-btn-primary text-xs flex items-center gap-2 shadow-md">
              Start Test <i class="fa-solid fa-play text-[10px]"></i>
            </button>
          </div>

        </div>
      `;
    }).join('');

    if (grid) grid.innerHTML = cardsHtml;
    if (mockGrid) mockGrid.innerHTML = cardsHtml;
  }

  startFreeMockTest() {
    // Launch the first mock test in dataset
    if (QUIZ_DATA.tests.length > 0) {
      this.launchQuiz(QUIZ_DATA.tests[0].id);
    }
  }

  /* ================= QUIZ ENGINE LAUNCH & LIFECYCLE ================= */
  launchQuiz(testId) {
    const test = QUIZ_DATA.tests.find(t => t.id === testId);
    if (!test) return;

    this.activeTest = test;
    this.currentQuestionIndex = 0;
    this.userAnswers = {};
    this.markedForReview.clear();
    this.timeRemainingSeconds = test.timeLimitMinutes * 60;
    this.totalTimerSeconds = test.timeLimitMinutes * 60;
    this.quizStartTime = new Date();

    // Set UI Header Info
    document.getElementById('quiz-title-display').innerText = test.title;
    document.getElementById('quiz-subtitle-display').innerText =
      `${test.totalQuestions} Questions • +${test.marksPerQuestion} Marks • -${test.negativeMarks} Negative`;

    // Render Quiz Question and Palette
    this.renderCurrentQuestion();
    this.renderQuestionPalette();

    // Start Timer
    this.startTimer();

    // Navigate to Quiz View Section
    this.navigateTo('quiz-interface');
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    const timerBox = document.getElementById('timer-box');
    const timerText = document.getElementById('quiz-timer-text');

    timerBox.classList.remove('timer-warning');

    const updateDisplay = () => {
      const minutes = Math.floor(this.timeRemainingSeconds / 60);
      const seconds = this.timeRemainingSeconds % 60;
      timerText.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      // Warning animation for last 1 minute (<= 60 seconds)
      if (this.timeRemainingSeconds <= 60 && this.timeRemainingSeconds > 0) {
        timerBox.classList.add('timer-warning');
      } else {
        timerBox.classList.remove('timer-warning');
      }

      if (this.timeRemainingSeconds <= 0) {
        clearInterval(this.timerInterval);
        alert("Time is up! Submitting your test automatically...");
        this.submitQuiz();
      } else {
        this.timeRemainingSeconds--;
      }
    };

    updateDisplay();
    this.timerInterval = setInterval(updateDisplay, 1000);
  }

  renderCurrentQuestion() {
    if (!this.activeTest) return;

    const qn = this.activeTest.questions[this.currentQuestionIndex];
    const total = this.activeTest.totalQuestions;

    // Update Badge & Controls
    document.getElementById('qn-number-badge').innerText = `Question ${this.currentQuestionIndex + 1} of ${total}`;
    document.getElementById('btn-prev-qn').disabled = this.currentQuestionIndex === 0;

    const nextBtn = document.getElementById('btn-next-qn');
    if (this.currentQuestionIndex === total - 1) {
      nextBtn.innerHTML = `Finish <i class="fa-solid fa-check ml-1"></i>`;
    } else {
      nextBtn.innerHTML = `Next <i class="fa-solid fa-chevron-right ml-1"></i>`;
    }

    // Render Question Text
    document.getElementById('qn-text-container').innerHTML = `
      <div class="text-slate-100 flex items-start gap-3">
        <span class="text-azure-400 font-extrabold text-lg">Q${this.currentQuestionIndex + 1}.</span>
        <span>${qn.question}</span>
      </div>
    `;

    // Render Options Cards
    const selectedOption = this.userAnswers[qn.id];
    const optionsContainer = document.getElementById('qn-options-container');

    optionsContainer.innerHTML = qn.options.map((optText, optIdx) => {
      const isSelected = selectedOption === optIdx;
      const borderClass = isSelected
        ? 'border-azure-400 bg-azure-600/20 text-white shadow-lg shadow-azure-500/10 glow-border-azure'
        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60';

      const radioBg = isSelected ? 'bg-azure-400 border-azure-400' : 'border-slate-600 bg-slate-800';

      return `
        <div onclick="app.selectOption(${optIdx})" class="p-4 rounded-xl border ${borderClass} cursor-pointer transition-all flex items-center justify-between group">
          <div class="flex items-center gap-3">
            <span class="w-7 h-7 rounded-lg ${radioBg} border flex items-center justify-center text-xs font-bold text-slate-900 transition-colors">
              ${String.fromCharCode(65 + optIdx)}
            </span>
            <span class="text-sm font-medium">${optText}</span>
          </div>
          ${isSelected ? '<i class="fa-solid fa-circle-check text-azure-400 text-base"></i>' : ''}
        </div>
      `;
    }).join('');

    this.renderQuestionPalette();
  }

  selectOption(optIdx) {
    if (!this.activeTest) return;
    const qn = this.activeTest.questions[this.currentQuestionIndex];
    this.userAnswers[qn.id] = optIdx;
    this.renderCurrentQuestion();
  }

  clearResponse() {
    if (!this.activeTest) return;
    const qn = this.activeTest.questions[this.currentQuestionIndex];
    delete this.userAnswers[qn.id];
    this.renderCurrentQuestion();
  }

  markForReview() {
    if (!this.activeTest) return;
    const qn = this.activeTest.questions[this.currentQuestionIndex];
    if (this.markedForReview.has(qn.id)) {
      this.markedForReview.delete(qn.id);
    } else {
      this.markedForReview.add(qn.id);
    }
    this.renderCurrentQuestion();
  }

  nextQuestion() {
    if (!this.activeTest) return;
    if (this.currentQuestionIndex < this.activeTest.totalQuestions - 1) {
      this.currentQuestionIndex++;
      this.renderCurrentQuestion();
    } else {
      this.confirmSubmitQuiz();
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.renderCurrentQuestion();
    }
  }

  jumpToQuestion(index) {
    this.currentQuestionIndex = index;
    this.renderCurrentQuestion();
  }

  renderQuestionPalette() {
    if (!this.activeTest) return;

    const paletteGrid = document.getElementById('palette-grid');
    const summaryText = document.getElementById('palette-summary');

    const answeredCount = Object.keys(this.userAnswers).length;
    if (summaryText) {
      summaryText.innerText = `${answeredCount} / ${this.activeTest.totalQuestions} Answered`;
    }

    paletteGrid.innerHTML = this.activeTest.questions.map((qn, idx) => {
      const isCurrent = idx === this.currentQuestionIndex;
      const isAnswered = this.userAnswers.hasOwnProperty(qn.id);
      const isMarked = this.markedForReview.has(qn.id);

      let statusClass = 'bg-slate-800 text-slate-300 border-slate-700';

      if (isMarked) {
        statusClass = 'palette-marked';
      } else if (isAnswered) {
        statusClass = 'palette-answered';
      } else {
        statusClass = 'palette-unanswered';
      }

      const ringClass = isCurrent ? 'palette-current ring-2 ring-azure-400' : '';

      return `
        <button onclick="app.jumpToQuestion(${idx})" class="palette-btn w-full h-10 border flex items-center justify-center text-xs shadow-sm ${statusClass} ${ringClass}">
          ${idx + 1}
        </button>
      `;
    }).join('');
  }

  confirmSubmitQuiz() {
    if (confirm("Are you sure you want to submit your mock test?")) {
      this.submitQuiz();
    }
  }

  submitQuiz() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    // Calculate score metrics
    const test = this.activeTest;
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    test.questions.forEach(qn => {
      if (this.userAnswers.hasOwnProperty(qn.id)) {
        if (this.userAnswers[qn.id] === qn.correctOption) {
          correctCount++;
        } else {
          wrongCount++;
        }
      } else {
        unattemptedCount++;
      }
    });

    const totalMarks = (correctCount * test.marksPerQuestion) - (wrongCount * test.negativeMarks);
    const maxMarks = test.totalQuestions * test.marksPerQuestion;
    const attemptedCount = correctCount + wrongCount;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

    const timeSpentSeconds = this.totalTimerSeconds - this.timeRemainingSeconds;
    const avgSpeedPerQn = attemptedCount > 0 ? Math.round(timeSpentSeconds / attemptedCount) : 0;

    // Render Scorecard View Section
    this.renderScorecard({
      testTitle: test.title,
      totalScore: Math.max(0, totalMarks).toFixed(1),
      maxMarks: maxMarks,
      accuracy: accuracy,
      speedSeconds: avgSpeedPerQn,
      peerSpeedSeconds: test.avgSpeedSeconds,
      correctCount: correctCount,
      wrongCount: wrongCount,
      unattemptedCount: unattemptedCount,
      questions: test.questions,
      userAnswers: this.userAnswers
    });

    this.navigateTo('scorecard');
  }

  /* ================= SCORECARD & SOLUTIONS RENDER ================= */
  renderScorecard(results) {
    document.getElementById('scorecard-test-title').innerText = results.testTitle;
    document.getElementById('scorecard-score-val').innerText = `${results.totalScore} / ${results.maxMarks}`;
    document.getElementById('scorecard-accuracy-val').innerText = `${results.accuracy}%`;
    document.getElementById('scorecard-accuracy-bar').style.width = `${results.accuracy}%`;

    document.getElementById('scorecard-speed-val').innerText = `${results.speedSeconds}s / qn`;
    document.getElementById('scorecard-peer-speed-val').innerText = `Peer Avg: ${results.peerSpeedSeconds}s (${results.speedSeconds < results.peerSpeedSeconds ? 'Faster' : 'Slower'})`;

    document.getElementById('scorecard-correct-count').innerText = `${results.correctCount} Correct`;
    document.getElementById('scorecard-wrong-count').innerText = `${results.wrongCount} Wrong`;
    document.getElementById('scorecard-unattempted-count').innerText = `${results.unattemptedCount} Unattempted`;

    // Render Detailed Solutions
    const accordionContainer = document.getElementById('solutions-accordion-list');
    accordionContainer.innerHTML = results.questions.map((qn, idx) => {
      const userSelectedOpt = results.userAnswers[qn.id];
      const isCorrect = userSelectedOpt === qn.correctOption;
      const isUnanswered = userSelectedOpt === undefined;

      let statusBadge = '';
      if (isUnanswered) {
        statusBadge = `<span class="px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 text-xs font-bold">Unattempted</span>`;
      } else if (isCorrect) {
        statusBadge = `<span class="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold"><i class="fa-solid fa-check mr-1"></i> Correct (+2.0)</span>`;
      } else {
        statusBadge = `<span class="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold"><i class="fa-solid fa-xmark mr-1"></i> Incorrect (-0.5)</span>`;
      }

      return `
        <div class="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">

          <div class="flex items-center justify-between gap-3">
            <span class="text-xs font-bold text-azure-400">Question ${idx + 1}</span>
            ${statusBadge}
          </div>

          <div class="text-sm font-semibold text-white">
            ${qn.question}
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            ${qn.options.map((optText, optIdx) => {
              let optStyle = 'bg-slate-800/50 border-slate-700/60 text-slate-300';
              let icon = '';

              if (optIdx === qn.correctOption) {
                optStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold';
                icon = '<i class="fa-solid fa-circle-check text-emerald-400 ml-auto"></i>';
              } else if (optIdx === userSelectedOpt && !isCorrect) {
                optStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-300 font-bold';
                icon = '<i class="fa-solid fa-circle-xmark text-rose-400 ml-auto"></i>';
              }

              return `
                <div class="p-3 rounded-xl border ${optStyle} flex items-center justify-between">
                  <span><strong>${String.fromCharCode(65 + optIdx)}.</strong> ${optText}</span>
                  ${icon}
                </div>
              `;
            }).join('')}
          </div>

          <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 space-y-1">
            <div class="font-bold text-gold-400 flex items-center gap-1">
              <i class="fa-solid fa-lightbulb"></i> Solution Explanation:
            </div>
            <p>${qn.explanation}</p>
          </div>

        </div>
      `;
    }).join('');
  }

  retakeCurrentQuiz() {
    if (this.activeTest) {
      this.launchQuiz(this.activeTest.id);
    } else {
      this.startFreeMockTest();
    }
  }

  /* ================= LEADERBOARD RENDER & FILTERING ================= */
  renderLeaderboardPreview() {
    const tableBody = document.getElementById('leaderboard-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = QUIZ_DATA.leaderboard.slice(0, 5).map(item => `
      <tr class="hover:bg-slate-800/40 transition-colors">
        <td class="py-3 px-4 font-black ${item.rank <= 3 ? 'text-gold-400 text-base' : 'text-slate-400'}">
          ${item.badge}
        </td>
        <td class="py-3 px-4">
          <div class="font-bold text-white">${item.handle}</div>
          <div class="text-[11px] text-slate-400">${item.name}</div>
        </td>
        <td class="py-3 px-4 text-xs font-semibold text-azure-400">
          ${item.targetExam}
        </td>
        <td class="py-3 px-4 text-center font-bold text-emerald-400">
          ${item.accuracy}%
        </td>
        <td class="py-3 px-4 text-center text-slate-300">
          ${item.avgSpeed}s
        </td>
        <td class="py-3 px-4 text-right font-black text-gold-400">
          ${item.score.toFixed(1)}
        </td>
      </tr>
    `).join('');
  }

  renderPodiumCards() {
    const podiumContainer = document.getElementById('podium-cards');
    if (!podiumContainer) return;

    const top3 = QUIZ_DATA.leaderboard.slice(0, 3);
    const podiumOrder = [top3[1], top3[0], top3[2]]; // #2, #1, #3

    podiumContainer.innerHTML = podiumOrder.map((user, idx) => {
      const isFirst = user.rank === 1;
      const borderGlow = isFirst ? 'border-gold-500 glow-border-gold' : 'border-slate-800';
      const badgeBg = isFirst ? 'bg-gold-500/20 text-gold-400' : 'bg-slate-800 text-slate-300';

      return `
        <div class="glass-panel p-6 rounded-3xl border ${borderGlow} text-center space-y-4 relative ${isFirst ? '-mt-2' : ''}">
          <div class="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-2xl font-black ${badgeBg} border border-gold-500/30">
            ${user.badge}
          </div>
          <div>
            <div class="text-lg font-bold text-white">${user.handle}</div>
            <div class="text-xs text-slate-400">${user.name} • <span class="text-azure-400 font-semibold">${user.targetExam}</span></div>
          </div>
          <div class="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-slate-800">
            <div>
              <span class="text-slate-400 block">Accuracy</span>
              <strong class="text-emerald-400 text-sm font-black">${user.accuracy}%</strong>
            </div>
            <div>
              <span class="text-slate-400 block">Avg Speed</span>
              <strong class="text-azure-400 text-sm font-black">${user.avgSpeed}s</strong>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderFullLeaderboard(filterText = '') {
    const tableBody = document.getElementById('full-leaderboard-body');
    if (!tableBody) return;

    const query = filterText.toLowerCase().trim();
    const list = QUIZ_DATA.leaderboard.filter(item =>
      item.handle.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query) ||
      item.targetExam.toLowerCase().includes(query)
    );

    tableBody.innerHTML = list.map(item => `
      <tr class="hover:bg-slate-800/40 transition-colors">
        <td class="py-3.5 px-4 font-black ${item.rank <= 3 ? 'text-gold-400 text-base' : 'text-slate-400'}">
          ${item.badge}
        </td>
        <td class="py-3.5 px-4">
          <div class="font-bold text-white">${item.handle}</div>
          <div class="text-xs text-slate-400">${item.name}</div>
        </td>
        <td class="py-3.5 px-4 text-xs font-semibold text-azure-400">
          ${item.targetExam}
        </td>
        <td class="py-3.5 px-4 text-center font-bold text-emerald-400">
          ${item.accuracy}%
        </td>
        <td class="py-3.5 px-4 text-center text-slate-300">
          ${item.avgSpeed}s
        </td>
        <td class="py-3.5 px-4 text-right font-black text-gold-400">
          ${item.score.toFixed(1)} pts
        </td>
      </tr>
    `).join('');
  }

  filterLeaderboard(val) {
    this.renderFullLeaderboard(val);
  }

  setupEventListeners() {
    // Keyboard shortcut controls in quiz mode (Arrow keys, 1-4 option select)
    document.addEventListener('keydown', (e) => {
      if (this.currentView === 'quiz-interface') {
        if (e.key === 'ArrowRight') {
          this.nextQuestion();
        } else if (e.key === 'ArrowLeft') {
          this.prevQuestion();
        } else if (['1', '2', '3', '4'].includes(e.key)) {
          this.selectOption(parseInt(e.key, 10) - 1);
        }
      }
    });
  }
}

// Instantiate global app engine
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new QubitApp();
  window.app = app;
});
