import {
  faBold, faItalic, faUnderline, faStrikethrough, faCode,
  faSuperscript, faSubscript, faListOl, faList,
  faRotateLeft, faRotateRight, faAlignLeft, faAlignCenter,
  faAlignRight, faAlignJustify, faIndent, faOutdent
} from '@fortawesome/free-solid-svg-icons';

export const toolbarButtons = [
  { id: "bold", icon: faBold, command: "bold" },
  { id: "italic", icon: faItalic, command: "italic" },
  { id: "underline", icon: faUnderline, command: "underline" },
  { id: "strikethrough", icon: faStrikethrough, command: "strikethrough" },
  { id: "code", icon: faCode, custom: true },
  { id: "superscript", icon: faSuperscript, command: "superscript" },
  { id: "subscript", icon: faSubscript, command: "subscript" },
  { id: "insertOrderedList", icon: faListOl, command: "insertOrderedList" },
  { id: "insertUnorderedList", icon: faList, command: "insertUnorderedList" },
  { id: "undo", icon: faRotateLeft, command: "undo" },
  { id: "redo", icon: faRotateRight, command: "redo" },
  { id: "justifyLeft", icon: faAlignLeft, command: "justifyLeft" },
  { id: "justifyCenter", icon: faAlignCenter, command: "justifyCenter" },
  { id: "justifyRight", icon: faAlignRight, command: "justifyRight" },
  { id: "justifyFull", icon: faAlignJustify, command: "justifyFull" },
  { id: "indent", icon: faIndent, command: "indent" },
  { id: "outdent", icon: faOutdent, command: "outdent" },
];
