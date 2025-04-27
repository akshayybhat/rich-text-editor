# Text Editing Tool

https://rich-text-editor-iota.vercel.app/

A lightweight, fully functional **Text Editor** built with React —  
without using any external WYSIWYG libraries.  

## Features

- **Basic Formatting**: Bold, Italic, Underline, Strikethrough, Code etc
- **Headings**: H1–H6 selection
- **Lists**: Ordered and Unordered Lists
- **Font and Background Colors**: Customizable
- **Inline Code Formatting**: Code tag toggling
- **Keyboard Shortcuts**:
  - `Cmd + Shift + *` → Insert Unordered List
  - `/<word>` + `Enter` → Insert the word in **bold**
- **State Persistence**: Auto-save content in `localStorage`
- **Accessibility**: High ARIA support and full keyboard navigation
- **Offline Support**: Works fully without internet once loaded
- **Mobile Responsive**: Smooth typing experience across devices
- **Performance Optimized**: Handles 10,000+ characters

---

## Technologies

- **React**
- **TailwindCSS** (for styling)
- **FontAwesome** (icons)
- **Context API** (for shared editor state)

---
## Architecture Decisions

- **Component Structure:**
  - `App.jsx` — Sets up layout and context provider.
  - `EditorContext.jsx` — Manages editor state (content, ref, commands).
  - `Toolbar.jsx` — Provides formatting buttons and dropdowns.
  - `Editor.jsx` — The editable text area (`contentEditable`) handling input and shortcuts.

- **No rich text libraries used** to meet constraints.
- **Direct DOM manipulation** (`document.execCommand`, `Range`, `Selection`) used carefully to handle formatting.
- **React Context API** provides clean, global access to editor operations without prop drilling.

---

##  Keyboard Commands

- **Cmd + Shift + \*** → Insert an unordered list (`<ul>`)
- **/word + Enter** → Insert "word" in bold (the slash will be removed automatically)
- **Tab / Shift + Tab** → Navigate between Toolbar buttons

---

##  Development Setup

1. **Install dependencies:**

```bash
npm install
