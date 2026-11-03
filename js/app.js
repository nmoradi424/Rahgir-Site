(() => {
const fa = (n, d = 1) => Number(n).toLocaleString('fa-IR', { maximumFractionDigits: d });
const pct = n => fa(n) + '٪';
const $ = s => document.querySelector(s);
const ico = {
  check: '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  arrow: '<svg width="22" height="14" viewBox="0 0 22 14" aria-hidden="true"><path d="M21 7H3M8 2L3 7l5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};
const glyph = p => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;

/* ---------- hero board ---------- */
const people = [['ن','#2a78d6'],['س','#eb6834'],['م','#1baf7a'],['ر','#6250d6'],['آ','#d03b3b']];
let seq = 214;
const titles = [
  ['story','پرداخت با یک لمس در صفحه سبد',5],['bug','تکرار تراکنش هنگام قطع شبکه',3],['task','افزودن لاگ به سرویس تسویه',2],
  ['story','نمایش وضعیت تراکنش به کاربر',3],['story','ذخیره کارت برای خرید بعدی',8],['bug','خطای زمان‌سنج در صفحه رمز پویا',2],
  ['task','به‌روزرسانی کتابخانه رمزنگاری',1],['story','رسید دیجیتال قابل اشتراک',5],['bug','نمایش اشتباه مبلغ با کارمزد',3]
];
const mk = i => { const t = titles[i % titles.length]; return { key: 'PAY-' + (seq++), type: t[0], title: t[1], sp: t[2], p: people[i % people.length] }; };
const cols = [[mk(0), mk(1), mk(2), mk(3)], [mk(4), mk(5)], [mk(6), mk(7)]];
let next = 8, done = 14, day = 7, fresh = null;
function drawBoard() {
  document.querySelectorAll('.col').forEach((c, ci) => {
    c.querySelectorAll('.ticket').forEach(t => t.remove());
    c.querySelector('.cnt').textContent = fa(cols[ci].length);
    cols[ci].forEach(t => {
      const el = document.createElement('div');
      el.className = 'ticket' + (t === fresh ? ' in' : '');
      el.innerHTML = `<div class="row"><span style="display:flex;align-items:center;gap:6px"><i class="ttype t-${t.type}" title="${t.type === 'bug' ? 'باگ' : t.type === 'story' ? 'استوری' : 'تسک'}"></i><span class="key">${t.key}</span></span><span class="sp">${fa(t.sp)}</span></div><div>${t.title}</div><div class="row"><span></span><span class="av" style="background:${t.p[1]}">${t.p[0]}</span></div>`;
      c.appendChild(el);
    });
  });
  $('#bdDone').textContent = fa(done);
  $('#bdDay').textContent = fa(day);
}
drawBoard();
let step = 0;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce) setInterval(() => {
  step++;
  if (step % 2) { const t = cols[1].shift(); if (t) { cols[2].unshift(t); done += t.sp; fresh = t; } if (cols[2].length > 3) cols[2].pop(); }
  else { const t = cols[0].shift(); if (t) { cols[1].push(t); fresh = t; } cols[0].push(mk(next++)); }
  if (done > 46) { done = 14; }
  day = 7 + (Math.floor(step / 4) % 4);
  drawBoard();
}, 2600);

/* ---------- capabilities ---------- */
const caps = [
  ['بورد و گردش‌کار اسکرام و کانبان', 'برای هر تیم بورد و گردش‌کاری طراحی می‌کنیم که با روش کار واقعی‌اش جور باشد، نه گردش‌کار پیش‌فرض جیرا.',
   ['وضعیت‌ها و انتقال‌ها بر اساس تعریف «انجام شد» تیم','محدودیت WIP و ستون‌های انتظار برای دیدن گلوگاه','انواع کار: استوری، باگ، تسک فنی، اسپایک','قالب استاندارد استوری با معیار پذیرش'],
   ['Jira Software','Workflow','Screens'], '<rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="10" rx="1.5"/><rect x="17" y="4" width="4" height="7" rx="1.5"/>'],
  ['اتوماسیون کارهای تکراری', 'کارهایی که تیم هر روز دستی انجام می‌دهد را به قانون اتوماسیون تبدیل می‌کنیم.',
   ['جابه‌جایی خودکار تیکت با ادغام Merge Request','هشدار تیکت‌هایی که بیش از N روز تکان نخورده‌اند','ساخت خودکار ساب‌تسک‌های استاندارد','اعلان در Slack یا Mattermost برای باگ بحرانی'],
   ['Jira Automation','Webhooks'], '<path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z"/>'],
  ['داشبورد و گزارش', 'گجت‌های بومی جیرا را با گزارش‌های eazyBI ترکیب می‌کنیم تا برای هر نقش یک داشبورد خوانا داشته باشید.',
   ['برن‌داون، ولاسیتی و تغییر اسکوپ اسپرینت','نمودار جریان تجمعی و کنترل‌چارت زمان چرخه','گزارش ماهانه خودکار برای مدیریت','JQL و فیلترهای ذخیره‌شده مستند'],
   ['Dashboards','eazyBI','Rich Filters'], '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'],
  ['نقشه راه و پورتفولیو', 'کار چند تیم را در یک نما می‌بینید: اپیک‌ها، وابستگی‌ها و ظرفیت هر فصل.',
   ['سلسله‌مراتب ابتکار ← اپیک ← استوری','نقشه راه فصلی با وابستگی بین تیم‌ها','سناریوسازی ظرفیت در Plans','نمای درختی پیشرفت با Structure'],
   ['Advanced Roadmaps','Structure','Easy Agile Roadmaps'], '<path d="M3 6h10M7 12h12M3 18h8"/><circle cx="16" cy="6" r="2"/><circle cx="15" cy="18" r="2"/>'],
  ['OKR متصل به کار واقعی', 'نتایج کلیدی را مستقیم به اپیک‌ها وصل می‌کنیم تا پیشرفت OKR از خود کار محاسبه شود، نه از اسلاید.',
   ['اهداف شرکت و تیم با وزن و مالک','اتصال KR به اپیک و محاسبه خودکار پیشرفت','چک‌این دوهفتگی با سطح اطمینان','گزارش پایان فصل و امتیازدهی'],
   ['OKR Board','Jira Plans'], '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>'],
  ['ثبت زمان و ظرفیت', 'می‌بینید وقت تیم واقعاً صرف چه می‌شود: ویژگی جدید، باگ، بدهی فنی یا جلسه.',
   ['ثبت زمان روی تیکت با دسته‌بندی کار','زمان در هر وضعیت برای پیدا کردن انتظارها','گزارش ظرفیت در برابر برنامه هر اسپرینت','خروجی برای حسابداری پروژه'],
   ['Timepiece','Time Tracking'], '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>'],
  ['کیفیت و مدیریت باگ', 'باگ‌ها با اولویت و SLA مشخص پیگیری می‌شوند و باگ‌های فرار کرده به محیط عملیاتی جدا شمرده می‌شوند.',
   ['گردش‌کار باگ با تریاژ و SLA بر اساس اولویت','باگ ایجاد‌شده در برابر حل‌شده در هر هفته','نسخه‌ها و یادداشت انتشار از روی Fix Version','میانگین زمان رفع (MTTR)'],
   ['SLA','Releases','Components'], '<path d="M8 8a4 4 0 018 0v6a4 4 0 01-8 0V8zM4 12h4M16 12h4M5 6l3 2M19 6l-3 2M5 19l3-2M19 19l-3-2"/>'],
  ['یکپارچگی با ابزارهای تیم', 'کد، مستندات و گفت‌وگوی تیم را به تیکت وصل می‌کنیم تا هیچ اطلاعاتی بیرون از جیرا گم نشود.',
   ['پنل توسعه: برنچ، کامیت و MR روی هر تیکت','اتصال Confluence برای مستندات و رترو','اعلان‌های هدفمند در پیام‌رسان تیم','ورود یکپارچه با LDAP یا SSO'],
   ['GitLab','GitHub','Confluence','Mattermost'], '<path d="M9 7H6a4 4 0 000 8h3M15 7h3a4 4 0 010 8h-3M8 11h8"/>']
];
$('#capList').innerHTML = caps.map(c => `<article class="cap"><div class="cap-ico">${glyph(c[4])}</div><div><h3>${c[0]}</h3><p>${c[1]}</p><ul>${c[2].map(x => `<li>${x.replace(/([A-Za-z][A-Za-z ]*[A-Za-z]|[A-Z]+)/g, '<span class="lat">$1</span>')}</li>`).join('')}</ul><div class="tags">${c[3].map(t => `<span class="tag lat">${t}</span>`).join('')}</div></div></article>`).join('');

/* ---------- chart kit (SVG, LTR, sized to container) ---------- */
const H = 210;
function frame(w, o) {
  const p = Object.assign({ t: 14, r: 12, b: 28, l: 34 }, o.pad || {});
  const h = o.h || H, iw = w - p.l - p.r, ih = h - p.t - p.b;
  const y = v => p.t + ih - (v / o.ymax) * ih;
  let g = '';
  for (let v = 0; v <= o.ymax + 1e-9; v += o.ytick) {
    const yy = y(v).toFixed(1);
    g += `<line class="${v === 0 ? 'base' : 'grid'}" x1="${p.l}" x2="${w - p.r}" y1="${yy}" y2="${yy}"/><text x="${p.l - 6}" y="${+yy + 4}" text-anchor="end">${(o.yfmt || fa)(v)}</text>`;
  }
  return { p, h, iw, ih, y, g };
}
function xlabs(labels, xpos, f) {
  const n = labels.length, step = Math.max(1, Math.ceil(n * 44 / f.iw));
  return labels.map((l, i) => (i % step && i !== n - 1) ? '' : `<text x="${xpos(i).toFixed(1)}" y="${f.h - 8}" text-anchor="middle">${l}</text>`).join('');
}
const barP = (x, y, w, h, r = 4) => { if (h <= 0.5) return ''; r = Math.min(r, w / 2, h); return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`; };
const svg = (w, h, inner, label) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label || ''}">${inner}</svg>`;

function lineChart(w, o) {
  const f = frame(w, o), n = o.labels.length;
  const x = i => f.p.l + i * f.iw / (n - 1);
  let s = f.g;
  o.series.forEach(se => {
    const pts = se.data.map((v, i) => v == null ? null : [x(i), f.y(v)]).filter(Boolean);
    const d = pts.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ',' + q[1].toFixed(1)).join('');
    if (se.area) s += `<path d="${d}L${pts[pts.length - 1][0]},${f.y(0)}L${pts[0][0]},${f.y(0)}Z" style="fill:${se.color};opacity:.12"/>`;
    s += `<path d="${d}" fill="none" style="stroke:${se.color}" stroke-width="2" ${se.dash ? 'stroke-dasharray="5 5"' : ''} stroke-linejoin="round" stroke-linecap="round"/>`;
    if (se.end) { const q = pts[pts.length - 1]; s += `<circle cx="${q[0]}" cy="${q[1]}" r="4.5" style="fill:${se.color};stroke:var(--surface)" stroke-width="2"/>`; }
  });
  if (o.ref) { const yy = f.y(o.ref.v); s += `<line class="ref" x1="${f.p.l}" x2="${w - f.p.r}" y1="${yy}" y2="${yy}"/><text class="reflab" x="${w - f.p.r}" y="${yy - 6}" text-anchor="end">${o.ref.label}</text>`; }
  if (o.marks) o.marks.forEach(m => { const xx = x(m.i); s += `<line class="ref" x1="${xx}" x2="${xx}" y1="${f.p.t}" y2="${f.y(0)}"/><text class="reflab" x="${xx + 5}" y="${f.p.t + 10}">${m.label}</text>`; });
  const bw = f.iw / (n - 1);
  o.labels.forEach((l, i) => {
    const tip = `<b>${o.tipTitle ? o.tipTitle(i) : l}</b>|` + o.series.filter(se => se.data[i] != null).map(se => `${se.name}: ${(o.fmt || fa)(se.data[i])}`).join('|');
    s += `<rect class="band" x="${Math.max(f.p.l, x(i) - bw / 2)}" y="${f.p.t}" width="${Math.min(bw, f.iw)}" height="${f.ih}" data-tip="${tip}"/>`;
  });
  s += xlabs(o.labels, x, f);
  return svg(w, f.h, s, o.aria);
}
function barChart(w, o) {
  const f = frame(w, o), n = o.labels.length, k = o.series.length;
  const slot = f.iw / n, gap = 2, bw = Math.min(28, (slot * 0.66 - gap * (k - 1)) / k);
  const cx = i => f.p.l + slot * (i + .5);
  let s = f.g;
  o.labels.forEach((l, i) => {
    const total = bw * k + gap * (k - 1);
    o.series.forEach((se, j) => {
      const v = se.data[i]; const xx = cx(i) - total / 2 + j * (bw + gap); const yy = f.y(v);
      const col = se.colorAt ? se.colorAt(v, i) : se.color;
      s += `<path d="${barP(xx, yy, bw, f.y(0) - yy)}" style="fill:${col}" data-tip="<b>${l}</b>|${se.name}: ${(o.fmt || fa)(v)}"/>`;
      if (o.values) s += `<text class="val" x="${xx + bw / 2}" y="${yy - 5}" text-anchor="middle">${(o.fmt || fa)(v)}</text>`;
    });
  });
  if (o.ref) { const yy = f.y(o.ref.v); s += `<line class="ref" x1="${f.p.l}" x2="${w - f.p.r}" y1="${yy}" y2="${yy}"/><text class="reflab" x="${w - f.p.r}" y="${yy - 6}" text-anchor="end">${o.ref.label}</text>`; }
  s += xlabs(o.labels, cx, f);
  return svg(w, f.h, s, o.aria);
}
function stackBar(w, o) {
  const f = frame(w, o), n = o.labels.length, slot = f.iw / n, bw = Math.min(46, slot * .55);
  const cx = i => f.p.l + slot * (i + .5);
  let s = f.g;
  o.labels.forEach((l, i) => {
    let acc = 0; const last = o.series.length - 1;
    o.series.forEach((se, j) => {
      const v = se.data[i]; const y0 = f.y(acc), y1 = f.y(acc + v); acc += v;
      const hgt = y0 - y1 - (j ? 2 : 0);
      const tip = `<b>${l}</b>|${se.name}: ${fa(v)} ساعت (${pct(Math.round(v / o.series.reduce((a, q) => a + q.data[i], 0) * 100))})`;
      s += j === last ? `<path d="${barP(cx(i) - bw / 2, y1, bw, hgt)}" style="fill:${se.color}" data-tip="${tip}"/>`
                      : `<rect x="${cx(i) - bw / 2}" y="${y1 + (j ? 0 : 0)}" width="${bw}" height="${Math.max(0, y0 - y1 - (j ? 2 : 0))}" style="fill:${se.color}" data-tip="${tip}"/>`;
    });
  });
  s += xlabs(o.labels, cx, f);
  return svg(w, f.h, s, o.aria);
}
function areaStack(w, o) {
  const f = frame(w, o), n = o.labels.length, x = i => f.p.l + i * f.iw / (n - 1);
  let s = f.g; const cum = o.labels.map(() => 0);
  const layers = o.series.map(se => { const lo = cum.slice(); se.data.forEach((v, i) => cum[i] += v); return { se, lo, hi: cum.slice() }; });
  layers.forEach(L => {
    const top = L.hi.map((v, i) => `${x(i).toFixed(1)},${f.y(v).toFixed(1)}`);
    const bot = L.lo.map((v, i) => `${x(i).toFixed(1)},${f.y(v).toFixed(1)}`).reverse();
    s += `<polygon points="${top.concat(bot).join(' ')}" style="fill:${L.se.color};stroke:var(--surface)" stroke-width="1.5"/>`;
  });
  const bw = f.iw / (n - 1);
  o.labels.forEach((l, i) => {
    const tip = `<b>${l}</b>|` + o.series.slice().reverse().map(se => `${se.name}: ${fa(se.data[i])}`).join('|');
    s += `<rect class="band" x="${Math.max(f.p.l, x(i) - bw / 2)}" y="${f.p.t}" width="${bw}" height="${f.ih}" data-tip="${tip}"/>`;
  });
  s += xlabs(o.labels, x, f);
  return svg(w, f.h, s, o.aria);
}
function scatter(w, o) {
  const f = frame(w, o);
  const x = d => f.p.l + (d / o.xmax) * f.iw;
  let s = f.g;
  o.refs.forEach(r => { const yy = f.y(r.v); s += `<line class="ref" x1="${f.p.l}" x2="${w - f.p.r}" y1="${yy}" y2="${yy}"/><text class="reflab" x="${w - f.p.r}" y="${yy - 6}" text-anchor="end">${r.label}</text>`; });
  o.points.forEach(pt => s += `<circle cx="${x(pt.d).toFixed(1)}" cy="${f.y(pt.v).toFixed(1)}" r="5" style="fill:${pt.v > o.refs[1].v ? 'var(--s2)' : 'var(--s1)'};stroke:var(--surface)" stroke-width="2" data-tip="<b>${pt.key}</b>|زمان چرخه: ${fa(pt.v)} روز|تکمیل: هفته ${fa(Math.ceil(pt.d / 7) || 1)}"/>`);
  const lab = []; for (let wk = 1; wk <= o.xmax / 7; wk++) lab.push(wk);
  lab.forEach(wk => { if (wk % 2 && wk !== 1) return; s += `<text x="${x(wk * 7 - 3.5)}" y="${f.h - 8}" text-anchor="middle">هفته ${fa(wk)}</text>`; });
  return svg(w, f.h, s, o.aria);
}
function donut(w, o) {
  const h = o.h || H, R = Math.min(h / 2 - 6, 88), r = R - 22, cx = w / 2, cy = h / 2;
  const tot = o.data.reduce((a, d) => a + d.v, 0); let a0 = -Math.PI / 2, s = '';
  const gapA = 0.035;
  o.data.forEach(d => {
    const a1 = a0 + d.v / tot * Math.PI * 2, s0 = a0 + gapA / 2, s1 = a1 - gapA / 2, big = s1 - s0 > Math.PI ? 1 : 0;
    const P = (rad, a) => `${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`;
    s += `<path d="M${P(R, s0)}A${R},${R} 0 ${big} 1 ${P(R, s1)}L${P(r, s1)}A${r},${r} 0 ${big} 0 ${P(r, s0)}Z" style="fill:${d.c}" data-tip="<b>${d.n}</b>|${fa(d.v)} تیکت (${pct(Math.round(d.v / tot * 100))})"/>`;
    a0 = a1;
  });
  s += `<text class="ctr" x="${cx}" y="${cy + 4}" text-anchor="middle">${fa(tot)}</text><text x="${cx}" y="${cy + 24}" text-anchor="middle">تیکت</text>`;
  return svg(w, h, s, o.aria);
}
const charts = [];
const ro = new ResizeObserver(es => es.forEach(e => { const c = charts.find(q => q.el === e.target); if (c) draw(c); }));
function draw(c) { const w = Math.floor(c.el.clientWidth); if (!w || w === c.w) return; c.w = w; c.el.innerHTML = c.fn(w); }
function chart(id, fn) { const el = document.getElementById(id); const c = { el, fn }; charts.push(c); ro.observe(el); }
const legend = items => `<div class="legend">${items.map(i => `<span><i class="${i.dash ? 'dash' : ''}" style="${i.dash ? '' : 'background:' + i.c}"></i>${i.n}</span>`).join('')}</div>`;
const hbars = (rows, max, fmt = fa) => `<div class="hbars">${rows.map(r => `<div class="hb" data-tip="<b>${r.n}</b>|${r.tip || fmt(r.v)}"><span class="lab">${r.n}</span><span class="track"><span class="fill" style="width:${r.v / max * 100}%;background:${r.c}"></span></span><span class="num">${fmt(r.v)}</span></div>`).join('')}</div>`;
const stat = (l, v, d, cls) => `<div class="stat"><span class="l">${l}</span><span class="v">${v}</span><span class="d ${cls}">${d}</span></div>`;
const gadget = (cls, title, src, ask, body, insight) => `<div class="g ${cls}"><div class="g-head"><h4>${title}</h4><span>${src}</span></div><p class="ask">${ask}</p>${body}${insight ? `<p class="insight">${insight}</p>` : ''}</div>`;

/* seeded data */
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const ctPoints = []; for (let i = 0; i < 46; i++) { const d = 1 + rnd() * 82; const v = Math.max(1, Math.round((Math.pow(rnd(), 2.2) * 15 + 1.5 - d / 40) * 2) / 2); ctPoints.push({ d, v, key: 'PAY-' + (120 + i) }); }
const sorted = ctPoints.map(p => p.v).sort((a, b) => a - b), pctl = q => sorted[Math.min(sorted.length - 1, Math.floor(q * sorted.length))];
const p50 = pctl(.5), p85 = pctl(.85);
const weeks = Array.from({ length: 12 }, (_, i) => 'هفته ' + fa(i + 1));

/* ---------- dashboards ---------- */
const dashes = [
  { id: 'sprint', tab: 'اسپرینت', who: 'برای اسکرام‌مستر و تیم', title: 'داشبورد اسپرینت · تیم پرداخت', chips: [['پروژه', 'PAY'], ['اسپرینت', '۴۲'], ['روز', '۷ از ۱۰']],
    html: () => `<div class="stats">${stat('امتیاز تعهدشده', fa(48), 'در برنامه‌ریزی اسپرینت', 'neutral')}${stat('اضافه‌شده بعد از شروع', '+' + fa(6), '▲ ۱۲٪ تغییر اسکوپ', 'down-bad')}${stat('تکمیل‌شده', fa(14), '۲۹٪ از کل، روز ۷ از ۱۰', 'down-bad')}${stat('هدف اسپرینت', 'در خطر', 'با روند فعلی ~۱۲ امتیاز باقی می‌ماند', 'neutral')}</div>
      ${gadget('w8', 'برن‌داون اسپرینت', 'Sprint Burndown', 'کار باقی‌مانده (امتیاز) در هر روز، در برابر خط ایده‌آل.', '<div class="chart" id="c-burn"></div>' + legend([{ n: 'باقی‌مانده', c: 'var(--s1)' }, { n: 'خط ایده‌آل', dash: 1 }]), 'در <b>روز ۵</b> شش امتیاز به اسپرینت اضافه شد و فاصله از خط ایده‌آل از آن روز بیشتر شده است.')}
      ${gadget('w4', 'وضعیت تیکت‌ها', 'Issue Statistics', 'تیکت‌های اسپرینت به تفکیک وضعیت.', '<div class="chart" id="c-donut"></div>' + legend([{ n: 'برای انجام', c: 'var(--s4)' }, { n: 'در حال انجام', c: 'var(--s1)' }, { n: 'بازبینی کد', c: 'var(--s7)' }, { n: 'انجام شد', c: 'var(--s3)' }]), '')}
      ${gadget('w8', 'ولاسیتی شش اسپرینت اخیر', 'Velocity Chart', 'امتیاز تعهدشده در برابر امتیاز تحویل‌شده در هر اسپرینت.', '<div class="chart" id="c-vel"></div>' + legend([{ n: 'تعهدشده', c: 'var(--s1)' }, { n: 'تحویل‌شده', c: 'var(--s2)' }]), 'میانگین تحویل <b>۴۰ امتیاز</b> است؛ تعهد ۴۸ امتیازی این اسپرینت از ظرفیت واقعی تیم بیشتر بوده.')}
      ${gadget('w4', 'موانع باز', 'Filter Results', 'تیکت‌های دارای پرچم «مسدود» در این اسپرینت.', `<div class="list">${[['PAY-219', 'منتظر دسترسی به محیط تست بانک', 'p-crit', '۴ روز'], ['PAY-224', 'نیاز به تأیید تیم امنیت', 'p-warn', '۲ روز'], ['PAY-230', 'وابسته به API تیم کیف پول', 'p-warn', '۱ روز']].map(r => `<div class="li"><span class="key">${r[0]}</span><span>${r[1]}</span><span class="pill ${r[2]}">${r[3]}</span></div>`).join('')}</div>`, '')}`,
    charts: () => {
      chart('c-burn', w => lineChart(w, { labels: Array.from({ length: 11 }, (_, i) => 'روز ' + fa(i)), ymax: 60, ytick: 15, aria: 'برن‌داون اسپرینت', series: [{ name: 'خط ایده‌آل', color: 'var(--ink-2)', dash: 1, data: Array.from({ length: 11 }, (_, i) => +(48 - 4.8 * i).toFixed(1)) }, { name: 'باقی‌مانده', color: 'var(--s1)', area: 1, end: 1, data: [48, 47, 44, 44, 39, 45, 40, 34, null, null, null] }], marks: [{ i: 5, label: '+۶ امتیاز' }] }));
      chart('c-donut', w => donut(w, { aria: 'وضعیت تیکت‌ها', data: [{ n: 'برای انجام', v: 9, c: 'var(--s4)' }, { n: 'در حال انجام', v: 6, c: 'var(--s1)' }, { n: 'بازبینی کد', v: 4, c: 'var(--s7)' }, { n: 'انجام شد', v: 11, c: 'var(--s3)' }] }));
      chart('c-vel', w => barChart(w, { labels: ['۳۶', '۳۷', '۳۸', '۳۹', '۴۰', '۴۱'].map(x => 'اسپرینت ' + x), ymax: 50, ytick: 10, aria: 'ولاسیتی', series: [{ name: 'تعهدشده', color: 'var(--s1)', data: [42, 45, 40, 48, 46, 44] }, { name: 'تحویل‌شده', color: 'var(--s2)', data: [36, 41, 39, 44, 40, 41] }], ref: { v: 40, label: 'میانگین تحویل' } }));
    } },
  { id: 'flow', tab: 'جریان کار', who: 'برای تیم‌های کانبان و مدیر تحویل', title: 'داشبورد جریان کار · کانبان پلتفرم', chips: [['پروژه', 'PLT'], ['بازه', '۱۲ هفته اخیر']],
    html: () => `<div class="stats">${stat('زمان چرخه (میانه)', fa(p50) + ' روز', '▼ ۱.۵ روز نسبت به فصل قبل', 'up-good')}${stat('۸۵٪ کارها کمتر از', fa(p85) + ' روز', 'عددی برای قول دادن به مشتری', 'neutral')}${stat('توان عملیاتی', fa(8.3) + ' در هفته', '▲ ۲۲٪ نسبت به فصل قبل', 'up-good')}${stat('کار در جریان', fa(14), '۴ مورد بیش از ۱۰ روز', 'down-bad')}</div>
      ${gadget('w12', 'نمودار جریان تجمعی', 'Cumulative Flow Diagram', 'تعداد تیکت‌ها در هر وضعیت در طول زمان؛ پهن شدن یک نوار یعنی صف در آن مرحله.', '<div class="chart" id="c-cfd"></div>' + legend([{ n: 'انجام شد', c: 'var(--s1)' }, { n: 'بازبینی کد', c: 'var(--s2)' }, { n: 'در حال انجام', c: 'var(--s3)' }, { n: 'برای انجام', c: 'var(--s4)' }]), 'از <b>هفته ۸</b> نوار بازبینی کد پهن‌تر شده؛ بازبینی کد گلوگاه جدید تیم است.')}
      ${gadget('w8', 'کنترل‌چارت زمان چرخه', 'Control Chart', 'هر نقطه یک تیکت تکمیل‌شده است؛ ارتفاع آن تعداد روز از شروع تا پایان کار.', '<div class="chart" id="c-ct"></div>' + legend([{ n: 'تیکت', c: 'var(--s1)' }, { n: 'بالاتر از صدک ۸۵', c: 'var(--s2)' }, { n: 'صدک ۵۰ و ۸۵', dash: 1 }]), '')}
      ${gadget('w4', 'کارهای در جریان بر اساس سن', 'Aging WIP', 'چند روز است که هر تیکت شروع شده و هنوز تمام نشده.', hbars([{ n: 'PLT-88 کش توزیع‌شده', v: 13, c: 'var(--crit)' }, { n: 'PLT-91 مهاجرت صف', v: 11, c: 'var(--crit)' }, { n: 'PLT-95 پایش هزینه ابر', v: 7, c: 'var(--serious)' }, { n: 'PLT-97 لاگ متمرکز', v: 5, c: 'var(--serious)' }, { n: 'PLT-102 به‌روزرسانی K8s', v: 3, c: 'var(--good)' }, { n: 'PLT-104 اسکریپت پشتیبان', v: 1, c: 'var(--good)' }], 14, v => fa(v) + ' روز'), '')}
      ${gadget('w12', 'توان عملیاتی هفتگی', 'Throughput', 'تعداد تیکت‌های تکمیل‌شده در هر هفته.', '<div class="chart" id="c-thr"></div>', '')}`,
    charts: () => {
      const done = [4, 9, 15, 22, 26, 35, 42, 50, 60, 66, 75, 86];
      chart('c-cfd', w => areaStack(w, { labels: weeks, ymax: 125, ytick: 25, aria: 'نمودار جریان تجمعی', series: [{ name: 'انجام شد', color: 'var(--s1)', data: done }, { name: 'بازبینی کد', color: 'var(--s2)', data: [3, 3, 4, 3, 4, 4, 5, 8, 10, 11, 12, 13] }, { name: 'در حال انجام', color: 'var(--s3)', data: [8, 9, 8, 10, 9, 10, 9, 10, 9, 8, 9, 8] }, { name: 'برای انجام', color: 'var(--s4)', data: [16, 15, 17, 14, 16, 15, 17, 14, 15, 16, 14, 15] }] }));
      chart('c-ct', w => scatter(w, { xmax: 84, ymax: 20, ytick: 5, points: ctPoints, refs: [{ v: p50, label: 'صدک ۵۰' }, { v: p85, label: 'صدک ۸۵' }], aria: 'کنترل‌چارت', h: 230 }));
      chart('c-thr', w => barChart(w, { labels: weeks, ymax: 12, ytick: 4, aria: 'توان عملیاتی', values: 1, series: [{ name: 'تکمیل‌شده', color: 'var(--s1)', data: [4, 5, 6, 7, 4, 9, 7, 8, 10, 6, 9, 11] }], h: 180 }));
    } },
  { id: 'quality', tab: 'کیفیت', who: 'برای مدیر فنی و QA', title: 'داشبورد کیفیت · همه تیم‌ها', chips: [['نوع', 'Bug'], ['بازه', '۱۲ هفته اخیر']],
    html: () => `<div class="stats">${stat('باگ باز', fa(47), '▼ ۹ نسبت به ماه قبل', 'up-good')}${stat('میانگین زمان رفع', fa(2.4) + ' روز', '▼ از ۳.۸ روز', 'up-good')}${stat('رعایت SLA', pct(91), 'هدف: ۹۵٪', 'neutral')}${stat('باگ فرار کرده به عملیات', fa(2), 'در نسخه ۴.۳', 'up-good')}</div>
      ${gadget('w8', 'باگ ایجادشده در برابر حل‌شده', 'Created vs Resolved', 'وقتی خط حل‌شده بالای خط ایجادشده باشد، صف باگ‌ها کوچک می‌شود.', '<div class="chart" id="c-cvr"></div>' + legend([{ n: 'ایجادشده', c: 'var(--s2)' }, { n: 'حل‌شده', c: 'var(--s1)' }]), 'از <b>هفته ۶</b> تیم هر هفته بیشتر از باگ‌های جدید، باگ حل کرده است.')}
      ${gadget('w4', 'باگ‌های باز بر اساس اولویت', 'Two-Dimensional Filter', 'باگ‌های باز و وضعیت SLA در هر اولویت.', hbars([{ n: 'بحرانی', v: 3, c: 'var(--crit)', tip: '۳ باگ · SLA: ۴ ساعت · ۱ مورد عبور از SLA' }, { n: 'بالا', v: 9, c: 'var(--serious)', tip: '۹ باگ · SLA: ۲ روز' }, { n: 'متوسط', v: 21, c: 'var(--warn)', tip: '۲۱ باگ · SLA: ۱۰ روز' }, { n: 'پایین', v: 14, c: 'var(--muted)', tip: '۱۴ باگ · بدون SLA' }], 24) + `<div class="list" style="margin-top:8px">${[['بحرانی', '۴ ساعت', 'p-crit', '۱ عبور'], ['بالا', '۲ روز', 'p-good', 'در محدوده'], ['متوسط', '۱۰ روز', 'p-warn', '۳ نزدیک']].map(r => `<div class="li"><span>${r[0]}</span><span style="color:var(--muted)">SLA ${r[1]}</span><span class="pill ${r[2]}">${r[3]}</span></div>`).join('')}</div>`, '')}
      ${gadget('w12', 'باگ‌های فرار کرده در هر نسخه', 'Escaped Defects by Fix Version', 'باگ‌هایی که بعد از انتشار، در محیط عملیاتی پیدا شدند.', '<div class="chart" id="c-esc"></div>', 'از وقتی تست خودکار پرداخت به خط CI اضافه شد (<b>نسخه ۴.۱</b>)، باگ‌های فرار کرده نصف شده‌اند.')}`,
    charts: () => {
      chart('c-cvr', w => lineChart(w, { labels: weeks, ymax: 20, ytick: 5, aria: 'باگ ایجادشده و حل‌شده', series: [{ name: 'ایجادشده', color: 'var(--s2)', data: [14, 11, 16, 13, 18, 12, 10, 15, 9, 11, 8, 10], end: 1 }, { name: 'حل‌شده', color: 'var(--s1)', data: [9, 12, 13, 15, 14, 16, 12, 16, 12, 13, 11, 12], end: 1 }] }));
      chart('c-esc', w => barChart(w, { labels: ['۳.۸', '۳.۹', '۴.۰', '۴.۱', '۴.۲', '۴.۳'].map(v => 'نسخه ' + v), ymax: 8, ytick: 2, values: 1, aria: 'باگ‌های فرار کرده', h: 180, series: [{ name: 'باگ فرار کرده', color: 'var(--s1)', data: [7, 5, 6, 3, 4, 2] }] }));
    } },
  { id: 'okr', tab: 'اهداف و نقشه راه', who: 'برای مدیر محصول و مدیران', title: 'داشبورد OKR و نقشه راه · پاییز ۱۴۰۵', chips: [['فصل', 'پاییز ۱۴۰۵'], ['واحد', 'محصول پرداخت']],
    html: () => `${gadget('w6', 'نتایج کلیدی فصل', 'OKR Board', 'پیشرفت هر نتیجه کلیدی از اپیک‌های متصل به آن محاسبه می‌شود.', `<div class="krs"><div class="obj">هدف: پرداخت در اپ ما سریع‌ترین تجربه پرداخت بازار باشد</div>${[['کاهش زمان تکمیل پرداخت از ۹ به ۴ ثانیه', 55, 'p-good', 'روی مسیر', '۶.۲ ثانیه'], ['افزایش نرخ موفقیت تراکنش از ۹۶٪ به ۹۹٪', 40, 'p-warn', 'در خطر', '۹۷.۲٪'], ['افزایش NPS پرداخت از ۲۸ به ۴۰', 20, 'p-crit', 'خارج از مسیر', '۳۰']].map(k => `<div class="kr" data-tip="<b>${k[0]}</b>|مقدار فعلی: ${k[4]}|پیشرفت: ${pct(k[1])}"><div class="kr-top"><span>${k[0].replace('NPS', '<span class="lat">NPS</span>')}</span><span class="pill ${k[2]}">${k[3]}</span></div><div class="kr-bar"><span style="width:${k[1]}%"></span></div><div class="kr-meta"><span>فعلی: ${k[4]}</span><span>${pct(k[1])}</span></div></div>`).join('')}</div>`, 'چک‌این دوهفتگی: نتیجه کلیدی NPS دو بار پشت سر هم «خارج از مسیر» بوده؛ موضوع جلسه بعدی.')}
      ${gadget('w6', 'پیشرفت اپیک‌ها', 'Epic Progress', 'تیکت‌های هر اپیک به تفکیک وضعیت.', `<div style="display:grid;gap:12px">${[['پرداخت یک‌لمسی', 18, 6, 4], ['بازطراحی صفحه رمز پویا', 9, 5, 8], ['تلاش مجدد هوشمند تراکنش', 6, 4, 10], ['رسید دیجیتال', 12, 2, 1], ['نظرسنجی بعد از پرداخت', 2, 1, 9]].map(e => { const t = e[1] + e[2] + e[3]; return `<div class="epic-row" data-tip="<b>${e[0]}</b>|انجام شد: ${fa(e[1])}|در حال انجام: ${fa(e[2])}|برای انجام: ${fa(e[3])}"><span class="lab" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e[0]}</span><span class="seg"><span style="flex:${e[1]};background:var(--s1)"></span><span style="flex:${e[2]};background:var(--s2)"></span><span style="flex:${e[3]};background:var(--surface-2)"></span></span><span class="num" style="font-weight:800;text-align:left">${pct(Math.round(e[1] / t * 100))}</span></div>`; }).join('')}</div>` + legend([{ n: 'انجام شد', c: 'var(--s1)' }, { n: 'در حال انجام', c: 'var(--s2)' }, { n: 'برای انجام', c: 'var(--surface-2)' }]), '')}
      ${gadget('w12', 'نقشه راه فصل', 'Advanced Roadmaps', 'اپیک‌ها روی خط زمان فصل؛ خط قرمز امروز است.', `<div class="gantt"><div class="gr"><span></span><div class="months"><span>مهر</span><span>آبان</span><span>آذر</span></div></div>${[['پرداخت یک‌لمسی', 0, 48, 'var(--s1)', 'تیم پرداخت'], ['بازطراحی صفحه رمز پویا', 20, 62, 'var(--s1)', 'تیم پرداخت'], ['تلاش مجدد هوشمند تراکنش', 30, 75, 'var(--s3)', 'تیم پلتفرم'], ['رسید دیجیتال', 5, 40, 'var(--s7)', 'تیم اپ موبایل'], ['نظرسنجی بعد از پرداخت', 55, 88, 'var(--s7)', 'تیم اپ موبایل']].map(g => `<div class="gr"><span class="gl">${g[0]}</span><div class="gt"><span class="gb" style="left:${g[1] / 90 * 100}%;width:${(g[2] - g[1]) / 90 * 100}%;background:${g[3]}" data-tip="<b>${g[0]}</b>|${g[4]}">${g[4]}</span><span class="today" style="left:${42 / 90 * 100}%" aria-hidden="true"></span></div></div>`).join('')}</div>`, 'اپیک «تلاش مجدد هوشمند» به تیم پلتفرم وابسته است و نتیجه کلیدی نرخ موفقیت تراکنش منتظر آن است.')}`,
    charts: () => {} },
  { id: 'exec', tab: 'مدیریتی', who: 'برای مدیر فنی و مدیرعامل', title: 'داشبورد مدیریتی · واحد فنی', chips: [['تیم‌ها', '۴'], ['بازه', '۶ ماه اخیر']],
    html: () => `<div class="stats">${stat('پیش‌بینی‌پذیری تحویل', pct(79), 'هدف: ۸۰٪', 'neutral')}${stat('زمان تحویل (میانه)', fa(13) + ' روز', '▼ از ۲۱ روز در ۶ ماه', 'up-good')}${stat('انتشار در این فصل', fa(9), '▲ ۳ نسبت به فصل قبل', 'up-good')}${stat('سهم بدهی فنی از زمان', pct(14), 'هدف: ۲۰٪', 'down-bad')}</div>
      ${gadget('w6', 'نسبت گفته به انجام هر تیم', 'Say / Do Ratio', 'چند درصد از امتیازی که هر تیم در اسپرینت قول داده، تحویل شده (میانگین ۳ اسپرینت).', '<div class="chart" id="c-say"></div>', 'تیم اپ موبایل زیر هدف است؛ ولاسیتی‌اش ثابت است اما تعهدها ۳۰٪ بیشتر از ظرفیت بسته می‌شوند.')}
      ${gadget('w6', 'زمان صرف‌شده هر تیم', 'Time Tracking Report', 'ساعت ثبت‌شده در ماه گذشته به تفکیک نوع کار.', '<div class="chart" id="c-time"></div>' + legend([{ n: 'ویژگی جدید', c: 'var(--s1)' }, { n: 'رفع باگ', c: 'var(--s2)' }, { n: 'بدهی فنی', c: 'var(--s3)' }, { n: 'جلسات', c: 'var(--s4)' }]), '')}
      ${gadget('w12', 'روند زمان تحویل', 'Lead Time Trend', 'میانه روزها از ثبت درخواست تا انتشار در محیط عملیاتی.', '<div class="chart" id="c-lead"></div>', 'زمان تحویل در شش ماه <b>۳۸٪</b> کوتاه‌تر شده؛ بیشترین افت بعد از محدود کردن کار در جریان در شهریور بود.')}`,
    charts: () => {
      chart('c-say', w => barChart(w, { labels: ['پرداخت', 'کیف پول', 'پلتفرم', 'اپ موبایل'], ymax: 100, ytick: 25, values: 1, fmt: pct, aria: 'نسبت گفته به انجام', series: [{ name: 'گفته به انجام', color: 'var(--s1)', data: [82, 76, 91, 64] }], ref: { v: 80, label: 'هدف ۸۰٪' }, pad: { l: 40 } }));
      chart('c-time', w => stackBar(w, { labels: ['پرداخت', 'کیف پول', 'پلتفرم', 'اپ موبایل'], ymax: 800, ytick: 200, aria: 'زمان صرف‌شده', series: [{ name: 'ویژگی جدید', color: 'var(--s1)', data: [410, 360, 220, 380] }, { name: 'رفع باگ', color: 'var(--s2)', data: [140, 120, 90, 190] }, { name: 'بدهی فنی', color: 'var(--s3)', data: [60, 70, 230, 40] }, { name: 'جلسات', color: 'var(--s4)', data: [90, 80, 70, 110] }] }));
      chart('c-lead', w => lineChart(w, { labels: ['اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر'], ymax: 25, ytick: 5, aria: 'روند زمان تحویل', h: 190, fmt: v => fa(v) + ' روز', series: [{ name: 'زمان تحویل', color: 'var(--s1)', area: 1, end: 1, data: [21, 19.5, 18, 17, 14.5, 13] }] }));
    } }
];
$('#tabs').innerHTML = dashes.map((d, i) => `<button class="tab" role="tab" id="t-${d.id}" aria-controls="p-${d.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${d.tab}<small>${d.who}</small></button>`).join('');
$('#panels').innerHTML = dashes.map((d, i) => `<div class="dash" role="tabpanel" id="p-${d.id}" aria-labelledby="t-${d.id}" ${i ? 'hidden' : ''}><div class="dash-bar"><div><h3>${d.title.replace('OKR', '<span class="lat">OKR</span>')}</h3><span class="who">${d.who}</span></div><div class="chips">${d.chips.map(c => `<span class="chip">${c[0]}: <b>${c[1]}</b></span>`).join('')}<span class="sample">داده نمونه</span></div></div><div class="gadgets">${d.html()}</div></div>`).join('');
dashes.forEach(d => d.charts());
function selectTab(id, focus) {
  dashes.forEach(d => { const on = d.id === id; const t = $('#t-' + d.id); t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; $('#p-' + d.id).hidden = !on; if (on && focus) t.focus(); });
  try { localStorage.setItem('rahgir-tab', id); } catch (e) {}
}
$('#tabs').addEventListener('click', e => { const b = e.target.closest('.tab'); if (b) selectTab(b.id.slice(2)); });
$('#tabs').addEventListener('keydown', e => {
  const i = dashes.findIndex(d => $('#t-' + d.id).getAttribute('aria-selected') === 'true');
  if (e.key === 'ArrowLeft') selectTab(dashes[(i + 1) % dashes.length].id, 1);
  if (e.key === 'ArrowRight') selectTab(dashes[(i - 1 + dashes.length) % dashes.length].id, 1);
});
const hashTab = location.hash.slice(1);
if (dashes.some(d => d.id === hashTab)) { selectTab(hashTab); }
else { try { const s = localStorage.getItem('rahgir-tab'); if (s && dashes.some(d => d.id === s)) selectTab(s); } catch (e) {} }

/* tooltip */
const tip = $('#tip');
document.addEventListener('pointerover', e => { const t = e.target.closest('[data-tip]'); if (!t) { tip.hidden = true; return; } tip.innerHTML = t.getAttribute('data-tip').split('|').join('<br>'); tip.hidden = false; });
document.addEventListener('pointermove', e => { if (tip.hidden) return; const r = tip.getBoundingClientRect(); let x = e.clientX + 14, y = e.clientY + 14; if (x + r.width > innerWidth - 8) x = e.clientX - r.width - 14; if (y + r.height > innerHeight - 8) y = e.clientY - r.height - 14; tip.style.left = Math.max(8, x) + 'px'; tip.style.top = Math.max(8, y) + 'px'; });
document.addEventListener('pointerleave', () => tip.hidden = true);
addEventListener('scroll', () => tip.hidden = true, { passive: true });

/* ---------- pricing ---------- */
const sizes = ['تا ۱۵ نفر', '۱۶ تا ۵۰ نفر', '۵۱ تا ۱۵۰ نفر'];
const plans = [
  { id: 'start', name: 'شروع', for: 'برای یک تیم که تازه جیرا را جدی گرفته یا از ابزار دیگری مهاجرت می‌کند.', price: [35, 55, 80], time: 'تحویل در ۲ هفته',
    feats: ['طراحی بورد اسکرام یا کانبان برای ۱ تا ۲ تیم', 'گردش‌کار، انواع تیکت و فیلدهای استاندارد', '۵ قانون اتوماسیون پرتکرار', 'داشبورد اسپرینت (۶ گجت)', 'کارگاه ۳ ساعته برای تیم', '۲ هفته پشتیبانی پس از تحویل'] },
  { id: 'team', name: 'تیم رو به رشد', hot: 1, for: 'برای چند تیم که می‌خواهند با داده تصمیم بگیرند و OKR را به کار روزانه وصل کنند.', price: [90, 140, 210], time: 'تحویل در ۴ هفته',
    feats: ['همه موارد بسته شروع، برای حداکثر ۵ تیم', 'هر ۵ داشبورد نمونه، متناسب با داده شما', 'گزارش‌های eazyBI و کنترل‌چارت', 'اتصال OKR به اپیک‌ها و چک‌این', 'گردش‌کار باگ با SLA و گزارش کیفیت', '۱۵ قانون اتوماسیون + اتصال GitLab/GitHub', '۱ ماه پشتیبانی پس از تحویل'] },
  { id: 'org', name: 'سازمانی', for: 'برای واحد فنی با چند تیم، وابستگی‌های زیاد و نیاز به گزارش منظم برای مدیریت.', price: [220, 340, 480], time: 'تحویل در ۶ تا ۸ هفته',
    feats: ['همه موارد بسته تیم رو به رشد، بدون سقف تیم', 'نقشه راه پورتفولیو و مدیریت وابستگی', 'ثبت زمان و گزارش ظرفیت', 'داشبورد مدیریتی و گزارش ماهانه خودکار', 'استانداردسازی گردش‌کار بین تیم‌ها', 'راهنمای مکتوب حاکمیت جیرا', '۳ ماه پشتیبانی پس از تحویل'] }
];
const addonPrice = { support: [12, 20, 32], train: [18, 18, 28], migrate: [25, 45, 80], dash: [15, 15, 15] };
let size = 1, picked = 'team', qty = 0;
try { const s = JSON.parse(localStorage.getItem('rahgir-est') || 'null'); if (s) { size = s.size ?? 1; picked = s.picked ?? 'team'; qty = s.qty ?? 0; } } catch (e) {}
const mil = n => fa(n) + ' میلیون';
const latWrap = s => s.replace(/(eazyBI|OKR|SLA|GitLab\/GitHub)/g, '<span class="lat">$1</span>');
function renderPlans() {
  $('#planCards').innerHTML = plans.map(p => `<article class="plan ${p.hot ? 'hot' : ''}">${p.hot ? '<span class="badge">انتخاب بیشتر تیم‌ها</span>' : ''}<h3>${p.name}</h3><p class="for">${p.for}</p><div class="price"><span class="n">${fa(p.price[size])}</span><span class="u">میلیون تومان · یک‌باره</span></div><span class="time">${p.time} · ${sizes[size]}</span><ul>${p.feats.map((f, i) => `<li class="${i === 0 && p.id !== 'start' ? 'inh' : ''}">${ico.check}<span>${latWrap(f)}</span></li>`).join('')}</ul><button type="button" class="btn ${p.hot ? 'btn-primary' : 'btn-ghost'}" data-pick="${p.id}">انتخاب و برآورد</button></article>`).join('');
  document.querySelectorAll('#sizes button').forEach(b => b.setAttribute('aria-pressed', +b.dataset.size === size));
  $('#planPick').innerHTML = plans.map(p => `<button type="button" data-plan="${p.id}" aria-pressed="${p.id === picked}">${p.name}</button>`).join('');
  $('#pr-support').textContent = mil(addonPrice.support[size]) + ' / ماه';
  $('#pr-train').textContent = mil(addonPrice.train[size]);
  $('#pr-migrate').textContent = mil(addonPrice.migrate[size]);
  $('#pr-dash').textContent = mil(addonPrice.dash[size]) + ' هر یک';
  $('#qOut').textContent = fa(qty);
  summarize();
  try { localStorage.setItem('rahgir-est', JSON.stringify({ size, picked, qty })); } catch (e) {}
}
let summaryText = '';
function summarize() {
  const p = plans.find(q => q.id === picked);
  const lines = [[`بسته ${p.name} (${sizes[size]})`, p.price[size]]];
  if ($('#ad-train').checked) lines.push(['کارگاه آموزشی تکمیلی', addonPrice.train[size]]);
  if ($('#ad-migrate').checked) lines.push(['مهاجرت داده', addonPrice.migrate[size]]);
  if (qty) lines.push([`${fa(qty)} داشبورد سفارشی`, addonPrice.dash[size] * qty]);
  const once = lines.reduce((a, l) => a + l[1], 0), monthly = $('#ad-support').checked ? addonPrice.support[size] : 0;
  $('#pickedPlan').textContent = `${p.name} · ${sizes[size]} · ${p.time}`;
  $('#sumLines').innerHTML = lines.map(l => `<div class="line"><span>${l[0]}</span><b>${mil(l[1])}</b></div>`).join('');
  $('#sumOnce').textContent = mil(once) + ' تومان';
  $('#sumMonthly').textContent = monthly ? mil(monthly) + ' تومان' : 'ندارد';
  summaryText = ['درخواست برآورد خدمات جیرا (رهگیر)', ...lines.map(l => `- ${l[0]}: ${mil(l[1])} تومان`), monthly ? `- پشتیبانی ماهانه: ${mil(monthly)} تومان` : '', `جمع یک‌باره: ${mil(once)} تومان`].filter(Boolean).join('\n');
}
$('#sizes').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { size = +b.dataset.size; renderPlans(); } });
$('#planCards').addEventListener('click', e => { const b = e.target.closest('[data-pick]'); if (b) { picked = b.dataset.pick; renderPlans(); $('.estimator').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); } });
$('#planPick').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { picked = b.dataset.plan; renderPlans(); } });
['#ad-support', '#ad-train', '#ad-migrate'].forEach(s => $(s).addEventListener('change', summarize));
$('#qPlus').addEventListener('click', () => { qty = Math.min(10, qty + 1); renderPlans(); });
$('#qMinus').addEventListener('click', () => { qty = Math.max(0, qty - 1); renderPlans(); });
$('#copyBtn').addEventListener('click', () => {
  const ok = () => $('#copied').textContent = 'خلاصه کپی شد.';
  const fail = () => { $('#copied').textContent = 'کپی خودکار ممکن نشد؛ متن زیر را انتخاب و کپی کنید.'; const pre = document.createElement('pre'); pre.textContent = summaryText; pre.style.cssText = 'white-space:pre-wrap;font:inherit;font-size:13px;margin:0;user-select:all'; $('#copied').appendChild(pre); };
  try { navigator.clipboard.writeText(summaryText).then(ok, fail); } catch (e) { fail(); }
});
renderPlans();

/* comparison table */
const Y = '<span class="yes" aria-label="دارد">✓</span>', N = '<span class="no" aria-label="ندارد">—</span>';
const rows = [
  ['g', 'بورد و گردش‌کار'], ['تعداد تیم', '۱ تا ۲', 'تا ۵', 'بدون سقف'], ['طراحی گردش‌کار و انواع تیکت', Y, Y, Y], ['استانداردسازی بین تیم‌ها', N, N, Y],
  ['g', 'اتوماسیون و یکپارچگی'], ['قانون اتوماسیون', '۵', '۱۵', '۳۰+'], ['اتصال GitLab / GitHub', N, Y, Y], ['ورود یکپارچه (LDAP / SSO)', N, N, Y],
  ['g', 'داشبورد و گزارش'], ['داشبورد اسپرینت', Y, Y, Y], ['داشبورد جریان کار و کیفیت', N, Y, Y], ['OKR و نقشه راه', N, Y, Y], ['داشبورد مدیریتی و گزارش ماهانه', N, N, Y], ['ثبت زمان و ظرفیت', N, N, Y],
  ['g', 'آموزش و پشتیبانی'], ['کارگاه آموزشی', '۳ ساعت', '۶ ساعت', '۱۲ ساعت'], ['پشتیبانی پس از تحویل', '۲ هفته', '۱ ماه', '۳ ماه']
];
$('#cmp').innerHTML = `<caption class="sr-only">مقایسه بسته‌ها</caption><thead><tr><th>قابلیت</th>${plans.map(p => `<th>${p.name}</th>`).join('')}</tr></thead><tbody>${rows.map(r => r[0] === 'g' ? `<tr class="grp"><td colspan="4">${r[1]}</td></tr>` : `<tr><td>${latWrap(r[0]).replace(/(LDAP|SSO)/g, '<span class="lat">$1</span>')}</td>${r.slice(1).map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>`;

/* ---------- process ---------- */
const flow = [
  ['lz-todo', 'ارزیابی', '۱ هفته', 'مصاحبه با مدیر محصول، اسکرام‌مستر و چند توسعه‌دهنده؛ بررسی پروژه‌ها و فیلترهای فعلی.', 'خروجی: گزارش وضعیت فعلی و فهرست اولویت‌ها'],
  ['lz-todo', 'طراحی', '۱ هفته', 'طراحی گردش‌کار، فیلدها، قوانین اتوماسیون و چیدمان داشبوردها.', 'خروجی: سند طراحی برای تأیید شما'],
  ['lz-prog', 'پیاده‌سازی', '۱ تا ۵ هفته', 'پیاده‌سازی روی محیط تست، سپس انتقال به محیط اصلی بدون توقف کار تیم.', 'خروجی: جیرای پیکربندی‌شده و داشبوردهای زنده'],
  ['lz-prog', 'آموزش و تحویل', '۱ هفته', 'کارگاه برای هر نقش و راهنمای مکتوب برای اعضای جدید.', 'خروجی: تیمی که خودش داشبورد می‌خواند'],
  ['lz-done', 'پشتیبانی و بهبود', 'ماهانه', 'بازبینی ماهانه داده‌ها، تنظیم گزارش‌ها و پاسخ به درخواست‌های تیم.', 'خروجی: گزارش ماهانه بهبود']
];
$('#flow').innerHTML = flow.map(f => `<div class="step"><div class="box"><span class="lozenge ${f[0]}">${f[0] === 'lz-done' ? 'مستمر' : f[0] === 'lz-prog' ? 'اجرا' : 'آماده‌سازی'}</span><h3>${f[1]}</h3><span class="dur">${f[2]}</span><p>${f[3]}</p><p style="color:var(--ink);font-weight:600">${f[4]}</p></div><div class="arrow">${ico.arrow}</div></div>`).join('');

/* ---------- faq ---------- */
const faqs = [
  ['روی کدام نسخه جیرا کار می‌کنید؟', 'روی Jira Software Data Center، Server و Cloud. بخشی از افزونه‌ها فقط برای یکی از این نسخه‌ها عرضه می‌شوند؛ در جلسه ارزیابی مشخص می‌کنیم کدام قابلیت روی نسخه شما با تنظیمات بومی ساخته می‌شود و کدام به افزونه نیاز دارد.'],
  ['هزینه افزونه‌ها در قیمت بسته هست؟', 'نه. لایسنس جیرا و افزونه‌هایی مثل eazyBI یا Structure را خودتان تهیه می‌کنید. ما فهرست دقیق افزونه‌های لازم را قبل از شروع می‌دهیم و اگر بشود کاری را بدون افزونه انجام داد، همان راه را پیشنهاد می‌کنیم.'],
  ['داده‌های ما از سرور خودمان خارج می‌شود؟', 'نه. همه کارها روی نمونه جیرای خود شما و با دسترسی‌ای که خودتان تعیین می‌کنید انجام می‌شود و داده‌ای به بیرون منتقل نمی‌شود.'],
  ['کار تیم در زمان پیاده‌سازی متوقف می‌شود؟', 'نه. تغییرات اول روی محیط تست ساخته و آزمایش می‌شوند و بعد در یک بازه کم‌ترافیک به محیط اصلی منتقل می‌شوند.'],
  ['داشبوردها با داده واقعی ما همین شکلی می‌شوند؟', 'ساختار و نمودارها همین است، اما فیلترها، فیلدها و هدف‌ها را با تعریف‌های سازمان شما تنظیم می‌کنیم. اگر داده‌ای در جیرا ثبت نشود، اول عادت ثبتش را با تیم می‌سازیم.']
];
$('#faqList').innerHTML = faqs.map((f, i) => `<details ${i ? '' : 'open'}><summary>${f[0]}</summary><p>${f[1].replace(/(Jira Software Data Center|Server|Cloud|eazyBI|Structure)/g, '<span class="lat">$1</span>')}</p></details>`).join('');
})();
