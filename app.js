/* 程式學院：前端互動與 Supabase 整合
   1. 在本檔案頂端填入 Supabase Project URL 與 anon/publishable key。
   2. 未設定時可用訪客模式；進度儲存在目前瀏覽器。
   3. 不要將 service_role key 放在前端。
*/
const SUPABASE_URL = ""; // 例如 https://你的專案.supabase.co
const SUPABASE_ANON_KEY = ""; // Supabase anon / publishable key
const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase);
const db = supabaseReady ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const courses = [
  {id:"python",name:"Python",short:"PY",category:"入門",level:"初學入門",duration:"6 堂課",description:"語法簡潔易讀，適合學習程式邏輯、自動化與資料處理。",iconClass:"python",lessonTitle:"Python：你的第一個程式",lessonDescription:"認識 print()，把文字顯示在螢幕上。",lessonHtml:`<h3>本課學習目標</h3><p>了解程式會按照指令執行，並使用 <code>print()</code> 顯示文字。</p><pre>print("Hello, world!")\nprint("我開始學 Python 了！")</pre><h3>觀念說明</h3><p><code>print()</code> 是 Python 常用的輸出函式。文字通常放在引號內，括號用來包住要輸出的內容。</p><p>試著把範例中的文字改成自己的名字，再執行看看。</p>`,quiz:"在 Python 中，哪個函式可以把文字輸出到畫面？",options:["input()","print()","writeLine()","show()"],answer:1,explanation:"print() 是 Python 用來輸出文字或其他資料的常用函式。"},
  {id:"cpp",name:"C++",short:"C++",category:"進階基礎",level:"基礎語法",duration:"8 堂課",description:"學習變數、條件判斷、迴圈、函式與資料結構。",iconClass:"cpp",lessonTitle:"C++：輸出你的第一句話",lessonDescription:"認識 main() 與 cout，理解最基本的程式架構。",lessonHtml:`<h3>本課學習目標</h3><p>了解 C++ 程式的基本結構，並使用 <code>cout</code> 輸出文字。</p><pre>#include &lt;iostream&gt;\nusing namespace std;\n\nint main() {\n    cout &lt;&lt; "Hello, world!" &lt;&lt; endl;\n    return 0;\n}</pre><h3>觀念說明</h3><p><code>#include &lt;iostream&gt;</code> 引入輸入輸出功能；<code>main()</code> 是程式的主要進入點；<code>cout</code> 負責輸出。</p><p>這個網站目前不會直接執行 C++，請使用本機編譯器或之後整合安全的線上執行服務。</p>`,quiz:"在 C++ 中，通常從哪個函式開始執行？",options:["start()","run()","main()","cout()"],answer:2,explanation:"C++ 程式通常從 main() 函式開始執行。"},
  {id:"html",name:"HTML",short:"HTML",category:"網頁",level:"網頁入門",duration:"5 堂課",description:"建立網頁的結構，學會標題、段落、連結與圖片。",iconClass:"html",lessonTitle:"HTML：建立網頁結構",lessonDescription:"使用標籤描述網頁內容。",lessonHtml:`<h3>本課學習目標</h3><p>認識 HTML 標籤，建立標題和段落。</p><pre>&lt;h1&gt;我的第一個網頁&lt;/h1&gt;\n&lt;p&gt;歡迎來到我的網站！&lt;/p&gt;</pre><h3>觀念說明</h3><p><code>&lt;h1&gt;</code> 是主要標題，<code>&lt;p&gt;</code> 是段落。多數 HTML 元素有開始標籤與結束標籤。</p><p>可以在下方編輯器修改內容，按執行程式查看成果。</p>`,quiz:"HTML 的主要用途是什麼？",options:["設計資料庫","描述網頁內容結構","執行作業系統","只負責動畫"],answer:1,explanation:"HTML 用來描述網頁內容與結構；CSS 負責樣式，JavaScript 負責互動。"},
  {id:"css",name:"CSS",short:"CSS",category:"網頁",level:"網頁入門",duration:"5 堂課",description:"調整顏色、字體、間距、排版，打造好看的響應式網站。",iconClass:"css",lessonTitle:"CSS：讓網頁變得更漂亮",lessonDescription:"用選擇器和屬性控制元素的外觀。",lessonHtml:`<h3>本課學習目標</h3><p>了解 CSS 規則由選擇器、屬性與值組成。</p><pre>h1 {\n  color: royalblue;\n  font-size: 32px;\n}</pre><h3>觀念說明</h3><p><code>h1</code> 是選擇器；<code>color</code> 設定文字顏色；<code>font-size</code> 設定文字大小。</p><p>請在練習區切換 CSS 分頁，改變標題顏色或字體大小。</p>`,quiz:"CSS 中，哪個屬性用來設定文字顏色？",options:["font-style","background-image","color","text-size"],answer:2,explanation:"color 屬性設定文字前景色。背景色通常使用 background-color。"},
  {id:"js",name:"JavaScript",short:"JS",category:"網頁",level:"網頁入門",duration:"7 堂課",description:"為網頁加入互動、事件處理、資料操作與動態效果。",iconClass:"js",lessonTitle:"JavaScript：宣告常數",lessonDescription:"使用 const 儲存不重新指派的變數值。",lessonHtml:`<h3>本課學習目標</h3><p>使用 <code>const</code> 宣告常數，並透過 <code>console.log()</code> 在開發者主控台輸出資料。</p><pre>const learner = "新手工程師";\nconsole.log("你好，" + learner);</pre><h3>觀念說明</h3><p><code>const</code> 宣告的變數不能重新指派。若需要重新指派，可考慮使用 <code>let</code>。</p><p>到下方 JavaScript 分頁，試著修改字串，再執行看看。</p>`,quiz:"在 JavaScript 中，哪個關鍵字可宣告不能重新指派的變數？",options:["varies","const","change","static"],answer:1,explanation:"const 宣告的繫結不能重新指派；但若值是物件，物件內部屬性仍可能改變。"}
];

const quizQuestions = [
  {category:"JavaScript 基礎",question:"在 JavaScript 中，哪個關鍵字可以宣告一個不能重新指派的變數？",options:["input","const","echo","define"],answer:1,explanation:"const 宣告的變數不能重新指派；若需要重新指派，可以使用 let。"},
  {category:"HTML 基礎",question:"哪個 HTML 標籤通常用來建立主要標題？",options:["<p>","<img>","<h1>","<footer>"],answer:2,explanation:"h1 通常用來表示頁面或區塊的主要標題。"},
  {category:"CSS 基礎",question:"哪個 CSS 屬性可以設定文字顏色？",options:["color","font-weight","padding","display"],answer:0,explanation:"color 設定文字顏色；background-color 設定背景顏色。"},
  {category:"Python 基礎",question:"Python 中要把 Hello 顯示在畫面上，應使用哪個指令？",options:["print('Hello')","say('Hello')","cout << 'Hello'","console('Hello')"],answer:0,explanation:"Python 常用 print() 將資料輸出到畫面。"},
  {category:"C++ 基礎",question:"C++ 中 main() 函式通常代表什麼？",options:["註解區塊","程式主要進入點","資料庫名稱","迴圈指令"],answer:1,explanation:"一般 C++ 程式從 main() 函式開始執行。"}
];

const starterCode = {
  html: `<main class="card">\n  <p class="label">我的第一個網頁</p>\n  <h1>你好，世界！</h1>\n  <p>修改這段文字，打造自己的網頁。</p>\n  <button onclick="document.querySelector('h1').textContent='你成功了！'">點我試試</button>\n</main>`,
  css: `body {\n  font-family: system-ui, sans-serif;\n  background: #f0f4ff;\n  padding: 32px;\n  color: #202b46;\n}\n.card {\n  max-width: 420px;\n  margin: 20px auto;\n  padding: 28px;\n  border-radius: 18px;\n  background: white;\n  box-shadow: 0 12px 35px #253b7020;\n}\nh1 { color: #5268ed; }\nbutton {\n  padding: 10px 16px;\n  border: 0;\n  border-radius: 9px;\n  background: #5268ed;\n  color: white;\n  cursor: pointer;\n}`,
  js: `// 點擊按鈕後，標題會改變\nconsole.log("歡迎來到程式學院！");`
};
let activeCourse = courses[0];
let activeFilter = "全部";
let activeTab = "html";
let codeValues = {...starterCode};
let completedIds = new Set();
let currentUser = null;
let authMode = "login";
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function showToast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}

function renderCourses() {
  const search = $("#course-search").value.trim().toLowerCase();
  const filtered = courses.filter(course => {
    const matchesFilter = activeFilter === "全部" || course.category === activeFilter;
    const matchesSearch = `${course.name} ${course.description} ${course.level}`.toLowerCase().includes(search);
    return matchesFilter && matchesSearch;
  });
  const grid = $("#course-grid");
  if (!filtered.length) {
    grid.innerHTML = `<div class="course-empty">找不到符合條件的課程，試試其他關鍵字。</div>`;
    return;
  }
  grid.innerHTML = filtered.map(course => `
    <article class="course-card ${activeCourse.id === course.id ? "selected" : ""}" data-course="${course.id}" tabindex="0" role="button" aria-label="開啟 ${course.name} 課程">
      <div class="course-icon ${course.iconClass}">${escapeHtml(course.short)}</div>
      <h3>${escapeHtml(course.name)}</h3><p>${escapeHtml(course.description)}</p>
      <div class="course-meta"><span>${escapeHtml(course.duration)}</span><span class="level-tag">${escapeHtml(course.level)}</span></div>
    </article>`).join("");
  $$(".course-card").forEach(card => {
    const select = () => selectCourse(card.dataset.course);
    card.addEventListener("click", select);
    card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(); }});
  });
}

function selectCourse(id) {
  activeCourse = courses.find(course => course.id === id) || courses[0];
  $("#lesson-title").textContent = activeCourse.lessonTitle;
  $("#lesson-description").textContent = activeCourse.lessonDescription;
  $("#lesson-content").innerHTML = activeCourse.lessonHtml;
  $("#lesson-progress-note").textContent = completedIds.has(id) ? "這堂課已完成 ✓" : `目前課程：${activeCourse.name}`;
  $("#lesson-complete").textContent = completedIds.has(id) ? "取消完成標記 ↺" : "標記為已完成 ✓";
  renderCourses();
  $("#lesson").scrollIntoView({behavior:"smooth",block:"start"});
}

function renderProgress() {
  const count = completedIds.size;
  const percent = Math.round(count / courses.length * 100);
  $("#completed-count").textContent = count;
  $("#progress-bar").style.width = `${percent}%`;
  $("#progress-percent").textContent = `${percent}%`;
  $("#progress-caption").textContent = count === courses.length ? "太棒了！完成所有入門課程！" : count ? "做得好，繼續保持！" : "開始第一堂課吧！";
  $("#lesson-progress-note").textContent = completedIds.has(activeCourse.id) ? "這堂課已完成 ✓" : `目前課程：${activeCourse.name}`;
  $("#lesson-complete").textContent = completedIds.has(activeCourse.id) ? "取消完成標記 ↺" : "標記為已完成 ✓";
  renderCourses();
}

function localProgressKey() {
  return currentUser ? `pls-progress:${currentUser.id}` : "pls-progress:guest";
}

function loadLocalProgress() {
  try {
    const ids = JSON.parse(localStorage.getItem(localProgressKey()) || "[]");
    completedIds = new Set(ids.filter(id => courses.some(course => course.id === id)));
  } catch { completedIds = new Set(); }
  renderProgress();
}

async function loadProgress() {
  if (!db || !currentUser) { loadLocalProgress(); return; }
  const {data,error} = await db.from("lesson_progress").select("course_id, completed").eq("user_id", currentUser.id);
  if (error) {
    console.error("讀取雲端進度失敗：", error.message);
    loadLocalProgress();
    showToast("雲端進度讀取失敗，先顯示本機紀錄。");
    return;
  }
  completedIds = new Set((data || []).filter(row => row.completed).map(row => row.course_id));
  renderProgress();
}

async function toggleLessonComplete() {
  const id = activeCourse.id;
  const wasCompleted = completedIds.has(id);
  if (wasCompleted) completedIds.delete(id); else completedIds.add(id);
  localStorage.setItem(localProgressKey(), JSON.stringify([...completedIds]));
  renderProgress();
  if (db && currentUser) {
    const {error} = await db.from("lesson_progress").upsert({
      user_id: currentUser.id, course_id: id, completed: !wasCompleted, updated_at: new Date().toISOString()
    }, {onConflict:"user_id,course_id"});
    if (error) {
      console.error("儲存雲端進度失敗：", error.message);
      showToast("本機已更新，但雲端儲存失敗，請檢查資料庫設定。");
      return;
    }
  }
  showToast(wasCompleted ? "已取消完成標記。" : "課程完成！學習進度已更新。");
}

function openAuth() {
  $("#auth-modal").classList.remove("hidden");
  $("#auth-message").textContent = "";
  $("#auth-email").focus();
}
function closeAuth() { $("#auth-modal").classList.add("hidden"); }
function setAuthMode(mode) {
  authMode = mode;
  $$(".auth-mode").forEach(button => button.classList.toggle("active", button.dataset.mode === mode));
  $("#auth-title").textContent = mode === "login" ? "歡迎回到程式學院" : "建立你的學習帳號";
  $("#auth-submit").textContent = mode === "login" ? "登入" : "建立帳號";
  $("#auth-password").autocomplete = mode === "login" ? "current-password" : "new-password";
  $("#auth-message").textContent = "";
}

function renderAuthState() {
  $("#user-status").textContent = currentUser ? (currentUser.email || "已登入") : (supabaseReady ? "訪客模式" : "本機訪客模式");
  $("#auth-open").classList.toggle("hidden", Boolean(currentUser));
  $("#signout").classList.toggle("hidden", !currentUser);
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  const email = $("#auth-email").value.trim();
  const password = $("#auth-password").value;
  const message = $("#auth-message");
  message.classList.remove("success");
  if (!db) {
    message.textContent = "尚未連接 Supabase。請先建立 Supabase 專案，並在 app.js 填入 Project URL 與 anon/publishable key。";
    return;
  }
  $("#auth-submit").disabled = true;
  $("#auth-submit").textContent = "處理中…";
  try {
    if (authMode === "signup") {
      const {data,error} = await db.auth.signUp({email,password});
      if (error) throw error;
      if (data.session) {
        currentUser = data.user;
        message.textContent = "註冊成功，已登入。";
      } else {
        message.textContent = "註冊申請已送出。請查看電子郵件完成驗證，再登入。";
      }
      message.classList.add("success");
    } else {
      const {data,error} = await db.auth.signInWithPassword({email,password});
      if (error) throw error;
      currentUser = data.user;
      message.textContent = "登入成功！正在載入學習進度。";
      message.classList.add("success");
    }
    renderAuthState();
    if (currentUser) await loadProgress();
    if (currentUser && authMode === "login") setTimeout(closeAuth, 800);
  } catch (error) {
    message.textContent = error.message || "操作失敗，請稍後再試。";
  } finally {
    $("#auth-submit").disabled = false;
    $("#auth-submit").textContent = authMode === "login" ? "登入" : "建立帳號";
  }
}

async function signOut() {
  if (db && currentUser) {
    const {error} = await db.auth.signOut();
    if (error) { showToast("登出失敗：" + error.message); return; }
  }
  currentUser = null;
  loadLocalProgress();
  renderAuthState();
  showToast("已登出，現在使用訪客模式。");
}

function renderEditor() {
  $("#code-editor").value = codeValues[activeTab];
  $$(".editor-tab").forEach(button => button.classList.toggle("active", button.dataset.tab === activeTab));
}
function buildPreviewDocument() {
  const html = codeValues.html;
  const css = codeValues.css;
  const js = codeValues.js;
  // iframe 使用 sandbox="allow-scripts"，不允許存取父頁面或 same-origin。
  // 使用者撰寫的程式仍可能在 iframe 中造成不良體驗，請勿用來執行不受信任程式。
  return `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}\n</style></head><body>${html}<script>\ntry {\n${js}\n} catch (error) { document.body.insertAdjacentHTML('beforeend','<pre style="color:#b91c1c;white-space:pre-wrap">JavaScript 錯誤：'+String(error.message).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))+'</pre>'); }\n<\/script></body></html>`;
}
function runCode() {
  $("#preview-frame").srcdoc = buildPreviewDocument();
  $("#run-message").textContent = "已執行。若結果沒有改變，請檢查 HTML、CSS 與 JavaScript。";
}
function resetCode() {
  codeValues = {...starterCode};
  renderEditor();
  runCode();
  showToast("已還原起始範例。");
}

function renderQuiz() {
  const question = quizQuestions[quizIndex];
  quizAnswered = false;
  $("#quiz-category").textContent = question.category;
  $("#quiz-counter").textContent = `QUESTION ${String(quizIndex+1).padStart(2,"0")} / ${String(quizQuestions.length).padStart(2,"0")}`;
  $("#quiz-question").textContent = question.question;
  $("#quiz-options").innerHTML = question.options.map((option,index) => `<button class="quiz-option" data-answer="${index}"><span class="option-letter">${String.fromCharCode(65+index)}</span><span>${escapeHtml(option)}</span></button>`).join("");
  $$(".quiz-option").forEach(button => button.addEventListener("click", () => answerQuiz(Number(button.dataset.answer))));
  $("#quiz-feedback").className = "quiz-feedback hidden";
  $("#quiz-feedback").textContent = "";
  $("#quiz-next").disabled = true;
  $("#quiz-next").textContent = quizIndex === quizQuestions.length - 1 ? "重新挑戰 ↻" : "下一題 →";
  $("#quiz-score").textContent = `答對 ${quizScore} 題`;
}
function answerQuiz(index) {
  if (quizAnswered) return;
  quizAnswered = true;
  const question = quizQuestions[quizIndex];
  const correct = index === question.answer;
  if (correct) quizScore++;
  $$(".quiz-option").forEach((button,i) => {
    button.disabled = true;
    if (i === question.answer) button.classList.add("correct");
    if (i === index && !correct) button.classList.add("wrong");
  });
  const feedback = $("#quiz-feedback");
  feedback.className = `quiz-feedback ${correct ? "good" : "bad"}`;
  feedback.textContent = `${correct ? "答對了！" : "再接再厲！"} ${question.explanation}`;
  $("#quiz-score").textContent = `答對 ${quizScore} 題`;
  $("#quiz-next").disabled = false;
}
function nextQuiz() {
  if (!quizAnswered) return;
  if (quizIndex === quizQuestions.length - 1) {
    showToast(`測驗完成！你答對 ${quizScore} / ${quizQuestions.length} 題。`);
    quizIndex = 0;
    quizScore = 0;
  } else quizIndex++;
  renderQuiz();
}

function attachEvents() {
  $("#course-search").addEventListener("input", renderCourses);
  $$("#course-filters .filter-chip").forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    $$("#course-filters .filter-chip").forEach(item => item.classList.toggle("active", item === button));
    renderCourses();
  }));
  $("#lesson-complete").addEventListener("click", toggleLessonComplete);
  $$(".editor-tab").forEach(button => button.addEventListener("click", () => {
    codeValues[activeTab] = $("#code-editor").value;
    activeTab = button.dataset.tab;
    renderEditor();
  }));
  $("#code-editor").addEventListener("input", () => { codeValues[activeTab] = $("#code-editor").value; });
  $("#run-code").addEventListener("click", runCode);
  $("#reset-code").addEventListener("click", resetCode);
  $("#quiz-next").addEventListener("click", nextQuiz);
  $("#auth-open").addEventListener("click", openAuth);
  $("#auth-close").addEventListener("click", closeAuth);
  $("#auth-modal").addEventListener("click", event => { if (event.target.dataset.close === "true") closeAuth(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeAuth(); });
  $$(".auth-mode").forEach(button => button.addEventListener("click", () => setAuthMode(button.dataset.mode)));
  $("#auth-form").addEventListener("submit", handleAuthSubmit);
  $("#signout").addEventListener("click", signOut);
}

async function init() {
  $("#year").textContent = new Date().getFullYear();
  renderCourses();
  selectCourse(activeCourse.id);
  renderEditor();
  runCode();
  renderQuiz();
  attachEvents();
  renderAuthState();
  loadLocalProgress();
  if (db) {
    const {data:{session}} = await db.auth.getSession();
    currentUser = session?.user || null;
    renderAuthState();
    if (currentUser) await loadProgress();
    db.auth.onAuthStateChange((_event, session) => {
      currentUser = session?.user || null;
      renderAuthState();
      if (currentUser) loadProgress();
    });
  }
}
document.addEventListener("DOMContentLoaded", init);
