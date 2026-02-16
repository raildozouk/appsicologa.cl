# appsicologa.cl — Brand & UI Guidelines (v1.0)
**Gerado:** 2026-02-15 (America/Sao_Paulo)  
**Objetivo:** identidade visual + sistema UI minimalista, acolhedor e moderno, evitando estética clínica/hospitalar.

---

## 1) Conceito de Marca

### 1.1 Ideia central (não-clínica)
**appsicologa** é um espaço digital “leve” para **descobrir**, **acompanhar conteúdo** e **agendar** com profissionais verificados — com privacidade por design e fricção mínima.

**Sensação alvo:** “calmo, humano, seguro, moderno”  
**Evitar:** “ambulatório”, “software corporativo”, “hospital”, “call center”, “blue hospital”.

### 1.2 Missão visual
- Transmitir **acolhimento sem infantilizar**
- Sinalizar **confiança verificável** sem “cara de banco”
- Ser **neutro e inclusivo** (sem estereótipos)
- Funcionar muito bem em **UI mobile** (PWA + app)

### 1.3 Tom de voz visual (regras práticas)
- **Pouco ruído:** espaços generosos, poucos contornos, sombras suaves
- **Cores orgânicas:** pastéis com neutros quentes (evitar branco estéril)
- **Tipografia humana:** sans arredondada, legível, sem “tech vibes”
- **Ícones lineares:** simples, amigáveis, sem símbolos médicos
- **Microinterações discretas:** hover/focus “respira”, não “pisca”

---

## 2) Paleta de Cores (HEX)

> Diretriz: **pastel + orgânico**, com neutros quentes para dar “pele” e não “hospital”.
> A paleta abaixo já considera contraste para texto em `ink` (quase-preto) e superfícies.

### 2.1 Base (neutros)
- **Ink (texto primário):** `#1F2933`
- **Muted Ink (texto secundário):** `#52606D`
- **Sand 50 (bg):** `#FAF7F2`
- **Sand 100 (surface):** `#F3EEE6`
- **Line (borda suave):** `#E6DFD6`

### 2.2 Primárias (marca)
- **Mint 500 (primária / CTA):** `#4FBFA8`
- **Mint 100 (bg suave):** `#DDF4EF`

### 2.3 Secundárias (calma + personalidade)
- **Lavender 400 (secundária):** `#A99BEA`
- **Lavender 100 (bg suave):** `#ECE9FF`

### 2.4 Acento (calor sem “promoção agressiva”)
- **Terracotta 400 (acento):** `#D9896A`
- **Terracotta 100 (bg suave):** `#F7E2DA`

### 2.5 Semânticas (feedback, sempre discreto)
- **Success:** `#2FB37A`  | **Success bg:** `#DDF5EA`
- **Warning:** `#D6A23A`  | **Warning bg:** `#FAF0D6`
- **Danger:**  `#D65C5C`  | **Danger bg:**  `#FBE0E0`
- **Info:**    `#4F7DBF`  | **Info bg:**    `#DEE9FA`

---

## 3) Tipografia

### 3.1 Fontes recomendadas (Google Fonts)
**Opção A (1 família, simples e humana):**
- **Manrope** (400/500/600/700/800) — títulos + UI + corpo

**Fallback:**
- `ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`

### 3.2 Escala tipográfica (Tailwind-friendly)
- **H1:** 32px / 40px — `font-semibold`  
- **H2:** 24px / 32px — `font-semibold`  
- **H3:** 20px / 28px — `font-semibold`  
- **Body:** 16px / 24px — `font-normal`  
- **Small:** 14px / 20px — `font-normal`  
- **Caption:** 12px / 16px — `font-medium`

### 3.3 Regras rápidas
- Corpo sempre `leading-relaxed` (24px em 16px)
- Títulos com `tracking-tight` leve
- Links: sublinhado só em hover; default com cor + peso

---

## 4) Logotipo e Símbolo (direção criativa)

### 4.1 Ideia do símbolo (abstrato e memorável)
**“Vínculo em equilíbrio”**: duas curvas suaves (ou dois arcos) que se aproximam e formam um **loop aberto** — sugerindo:
- conexão (pessoa ↔ profissional)
- fluxo (conteúdo → confiança → agenda)
- equilíbrio (sem “cérebro” literal)

**Não usar:** cruz, coração médico, estetoscópio, cérebro realista, “pulse line”.

### 4.2 Construção (geometria simples)
- Grade base: 8px / 16px
- Traço do símbolo (em versão outline): 2.5px (escala 24–48)
- Pontas arredondadas (`round cap`)
- Versões:
  - **Mark** (símbolo)
  - **Wordmark** “appsicologa” (lowercase, Manrope SemiBold)
  - **Lockup** horizontal e stacked

### 4.3 Cores do logo
- Preferência: **Mint 500** em fundo **Sand 50**
- Alternativas:
  - Mono Ink em fundos claros
  - White em fundo Mint 500 (uso limitado)

---

## 5) UI System (Tailwind-first)

### 5.1 Tokens (CSS variables)
Use no `globals.css`:

```css
:root {
  --bg: #FAF7F2;
  --surface: #F3EEE6;
  --ink: #1F2933;
  --muted-ink: #52606D;
  --line: #E6DFD6;

  --primary: #4FBFA8;
  --primary-soft: #DDF4EF;

  --secondary: #A99BEA;
  --secondary-soft: #ECE9FF;

  --accent: #D9896A;
  --accent-soft: #F7E2DA;

  --success: #2FB37A;
  --warning: #D6A23A;
  --danger: #D65C5C;
  --info: #4F7DBF;

  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 20px;

  --shadow-sm: 0 1px 2px rgba(31,41,51,0.06);
  --shadow-md: 0 6px 18px rgba(31,41,51,0.10);
}
```

---

## 6) Componentes (estilo e estados)

### 6.1 Botões
**Primary (CTA):**
- Fundo: `--primary`
- Texto: branco
- Raio: `--radius-md`
- Padding: `px-4 py-3`
- Hover: escurecer 6–8% (ou `opacity-90`)
- Focus: ring 2px `--primary` + offset 2px (sempre visível)

**Secondary:**
- Fundo: `--primary-soft`
- Texto: `--ink`
- Borda: `--line`

**Ghost:**
- Fundo transparente
- Texto `--ink`
- Hover em `--surface`

**Disabled:**
- Opacidade 50%
- Cursor not-allowed
- Sem sombra

### 6.2 Inputs
- Fundo: `--surface`
- Borda: `--line`
- Texto: `--ink`
- Placeholder: `--muted-ink` com opacidade
- Focus: borda `--primary` + ring suave
- Erro: borda `--danger`, helper text `--danger`

**Altura padrão:** 44–48px (mobile-first)

### 6.3 Cards
- Fundo: `--surface`
- Borda: `--line` (1px)
- Raio: `--radius-lg`
- Sombra: `--shadow-sm` (só em hover ou cards principais)

### 6.4 Chips/Tags
- Base: `--primary-soft`
- Texto: `--ink`
- Raio: `999px`
- Ícone opcional pequeno (16px)

### 6.5 Ícones (Lucide / Phosphor)
**Recomendação:** Lucide (traço consistente e leve)
- Tamanho padrão: 20–24px
- Stroke: 1.75–2.0
- `stroke-linecap: round; stroke-linejoin: round;`
- Evitar ícones “médicos”
- Sugestões: `shield-check`, `calendar`, `message-circle`, `map-pin`, `sparkles` (com moderação)

---

## 7) Placeholders (não-clínico)
Direção: **formas orgânicas abstratas**, texturas suaves (grain leve), sem fotos clínicas.
- Pessoas: se usar, **silhuetas simples** e diversidade; evitar “doctor coat”.
- Cenários: natureza abstrata, interiores neutros, objetos cotidianos.

---

## 8) Acessibilidade
- Contraste: texto `--ink` sempre sobre `--bg`/`--surface`.
- Focus visível em todos os componentes.
- Alvos de toque: mínimo 44px.
- Erros: mensagem clara + estado visual + aria.

---

## 9) Prompts (DALL·E / Midjourney)

### Prompt 1 — Logotipo
> Minimal modern logo for “appsicologa”, abstract symbol representing connection and balance using two soft interlaced arcs forming an open loop, no medical icons, no cross, no brain, friendly and calm, pastel mint + warm sand palette, clean vector, flat, geometric-soft, rounded ends, high legibility wordmark in a rounded sans font, white or warm-sand background, minimal brand system, SVG style, centered composition.  
> --no hospital, cross, brain, stethoscope, red cross, glossy 3D, aggressive corporate, neon

### Prompt 2 — Ícone PWA
> App icon design for “appsicologa”, squircle shape, abstract connection loop symbol, pastel mint background with subtle warm-sand gradient, soft grain texture very light, minimal vector, centered mark, high contrast, no text, no medical imagery, modern calm wellness aesthetic, iOS/Android style, 1024x1024.

### Prompt 3 — Placeholders
> A set of 6 minimal placeholder illustrations for a mental wellness platform: abstract organic shapes, soft curves, warm sand and mint and lavender accents, gentle gradients, subtle grain, lots of negative space, no clinical setting, no hospital cues, optional simple human silhouettes without faces, consistent stroke and style, modern editorial illustration, scalable for web, calm and welcoming.

---

## 10) Checklist “não-clínico”
- [ ] Nada de “azul hospital + branco puro” como base
- [ ] Nada de ícone médico literal
- [ ] Neutros quentes presentes (Sand)
- [ ] Cores em baixa saturação + foco no contraste do texto
- [ ] Componentes com raio e sombra suaves
- [ ] Linguagem visual “social + calma”, não “prontuário”
